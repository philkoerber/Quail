import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { StrategyModule } from './strategy/strategy.module';
import { BacktestModule } from './backtest/backtest.module';
import { User } from './entities/user.entity';
import { Strategy } from './entities/strategy.entity';
import { Backtest } from './entities/backtest.entity';
import { Model } from './entities/model.entity';
import { Token } from './entities/token.entity';
import { Metric } from './entities/metric.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            entities: [User, Strategy, Backtest, Model, Token, Metric],
            synchronize: true, // Only for development
            logging: true,
        }),
        AuthModule,
        StrategyModule,
        BacktestModule,
    ],
})
export class AppModule { } 