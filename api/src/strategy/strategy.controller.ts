import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StrategyService } from './strategy.service';

@Controller('strategies')
@UseGuards(JwtAuthGuard)

export class StrategyController {
    constructor(private strategyService: StrategyService) { }

    @Post()
    async create(@Request() req, @Body() strategyData: {
        name: string;
        description: string;
        code: string;
    }) {
        return this.strategyService.create(req.user.userId, strategyData);
    }

    @Get()
    async findAll(@Request() req) {
        return this.strategyService.findAll(req.user.userId);
    }

    @Get(':id')
    async findOne(@Request() req, @Param('id') id: string) {
        return this.strategyService.findOne(req.user.userId, id);
    }

    @Put(':id')
    async update(@Request() req, @Param('id') id: string, @Body() updateData: any) {
        return this.strategyService.update(req.user.userId, id, updateData);
    }

    @Delete(':id')
    async remove(@Request() req, @Param('id') id: string) {
        return this.strategyService.remove(req.user.userId, id);
    }
} 