import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() userData: RegisterDto) {
        return this.authService.register(userData);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() credentials: LoginDto) {
        return this.authService.login(credentials.email, credentials.password);
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(@Body() body: RefreshTokenDto) {
        return this.authService.refreshToken(body.refreshToken);
    }
} 