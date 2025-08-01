import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StrategyService } from './strategy.service';
import { CreateStrategyDto, UpdateStrategyDto, IdParamDto } from '../dto';

@Controller('strategies')
@UseGuards(JwtAuthGuard)
export class StrategyController {
    constructor(private strategyService: StrategyService) { }

    @Post()
    async create(@Request() req, @Body() strategyData: CreateStrategyDto) {
        return this.strategyService.create(req.user.userId, strategyData);
    }

    @Get()
    async findAll(@Request() req) {
        return this.strategyService.findAll(req.user.userId);
    }

    @Get(':id')
    async findOne(@Request() req, @Param() params: IdParamDto) {
        return this.strategyService.findOne(req.user.userId, params.id);
    }

    @Put(':id')
    async update(@Request() req, @Param() params: IdParamDto, @Body() updateData: UpdateStrategyDto) {
        return this.strategyService.update(req.user.userId, params.id, updateData);
    }

    @Delete(':id')
    async remove(@Request() req, @Param() params: IdParamDto) {
        return this.strategyService.remove(req.user.userId, params.id);
    }
} 