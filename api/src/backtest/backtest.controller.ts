import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BacktestService } from './backtest.service';

@Controller('backtests')
@UseGuards(JwtAuthGuard)
export class BacktestController {
    constructor(private backtestService: BacktestService) { }

    @Post()
    async create(@Request() req, @Body() backtestData: {
        strategyId: string;
        name: string;
    }) {
        return this.backtestService.create(
            req.user.userId,
            backtestData.strategyId,
            backtestData,
        );
    }

    @Get()
    async findAll(@Request() req) {
        return this.backtestService.findAll(req.user.userId);
    }

    @Get(':id')
    async findOne(@Request() req, @Param('id') id: string) {
        return this.backtestService.findOne(req.user.userId, id);
    }

    @Delete(':id')
    async remove(@Request() req, @Param('id') id: string) {
        return this.backtestService.remove(req.user.userId, id);
    }
} 