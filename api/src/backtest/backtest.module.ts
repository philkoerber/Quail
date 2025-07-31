import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BacktestController } from './backtest.controller';
import { BacktestService } from './backtest.service';
import { Backtest } from '../entities/backtest.entity';
import { Strategy } from '../entities/strategy.entity';
import { LeanModule } from 'src/lean/lean.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([Backtest, Strategy]),
        LeanModule,
    ],
    controllers: [BacktestController],
    providers: [BacktestService],
    exports: [BacktestService],
})
export class BacktestModule {}