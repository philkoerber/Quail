import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() userData: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    }) {
        return this.authService.register(userData);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() credentials: { email: string; password: string }) {
        return this.authService.login(credentials.email, credentials.password);
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(@Body() body: { refreshToken: string }) {
        return this.authService.refreshToken(body.refreshToken);
    }
} 