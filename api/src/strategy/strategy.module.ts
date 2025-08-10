import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StrategyController } from './strategy.controller';
import { StrategyService } from './strategy.service';
import { Strategy } from '../entities/strategy.entity';
import { Backtest } from '../entities/backtest.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Strategy, Backtest])],
    controllers: [StrategyController],
    providers: [StrategyService],
    exports: [StrategyService],
})
export class StrategyModule { } 