import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BacktestController } from './backtest.controller';
import { BacktestService } from './backtest.service';
import { Backtest } from '../entities/backtest.entity';
import { Metric } from '../entities/metric.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Backtest, Metric])],
    controllers: [BacktestController],
    providers: [BacktestService],
    exports: [BacktestService],
})
export class BacktestModule { } 