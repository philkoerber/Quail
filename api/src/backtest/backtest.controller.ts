import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BacktestService } from './backtest.service';
import { CreateBacktestDto } from './dto';
import { IdParamDto } from '../common/dto';

@Controller('backtests')
@UseGuards(JwtAuthGuard)
export class BacktestController {
    constructor(private backtestService: BacktestService) { }

    @Post()
    async create(@Request() req, @Body() backtestData: CreateBacktestDto) {
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
    async findOne(@Request() req, @Param() params: IdParamDto) {
        return this.backtestService.findOne(req.user.userId, params.id);
    }

    @Delete(':id')
    async remove(@Request() req, @Param() params: IdParamDto) {
        return this.backtestService.remove(req.user.userId, params.id);
    }
} 