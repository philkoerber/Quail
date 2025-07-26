import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../entities/user.entity';
import { Token } from '../entities/token.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Token)
        private tokenRepository: Repository<Token>,
        private jwtService: JwtService,
    ) { }

    async register(userData: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    }) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const user = this.userRepository.create({
            ...userData,
            password: hashedPassword,
        });

        const savedUser = await this.userRepository.save(user);
        const { password, ...result } = savedUser;

        return result;
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findOne({ where: { email } });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const tokens = await this.generateTokens(user);

        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            ...tokens,
        };
    }

    async generateTokens(user: User) {
        const payload = { sub: user.id, email: user.email };

        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '7d',
        });

        // Save refresh token
        await this.tokenRepository.save({
            token: refreshToken,
            type: 'refresh',
            userId: user.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    async refreshToken(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });

            const tokenRecord = await this.tokenRepository.findOne({
                where: { token: refreshToken, type: 'refresh', isRevoked: false },
            });

            if (!tokenRecord) {
                throw new UnauthorizedException('Invalid refresh token');
            }

            const user = await this.userRepository.findOne({
                where: { id: payload.sub },
            });

            if (!user) {
                throw new UnauthorizedException('User not found');
            }

            return this.generateTokens(user);
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
} 