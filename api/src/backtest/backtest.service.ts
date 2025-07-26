import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Backtest } from '../entities/backtest.entity';
import { Metric } from '../entities/metric.entity';

@Injectable()
export class BacktestService {
    constructor(
        @InjectRepository(Backtest)
        private backtestRepository: Repository<Backtest>,
        @InjectRepository(Metric)
        private metricRepository: Repository<Metric>,
    ) { }

    async create(userId: string, strategyId: string, backtestData: {
        name: string;
        startDate: Date;
        endDate: Date;
    }) {
        const backtest = this.backtestRepository.create({
            ...backtestData,
            userId,
            strategyId,
            status: 'running',
        });

        const savedBacktest = await this.backtestRepository.save(backtest);

        // In a real implementation, this would trigger LEAN CLI backtest
        // For now, we'll simulate the backtest results
        await this.simulateBacktest(savedBacktest.id);

        return savedBacktest;
    }

    async findAll(userId: string) {
        return this.backtestRepository.find({
            where: { userId },
            relations: ['strategy'],
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(userId: string, id: string) {
        const backtest = await this.backtestRepository.findOne({
            where: { id, userId },
            relations: ['strategy', 'metrics'],
        });

        if (!backtest) {
            throw new NotFoundException('Backtest not found');
        }

        return backtest;
    }

    async remove(userId: string, id: string) {
        const backtest = await this.findOne(userId, id);

        return this.backtestRepository.remove(backtest);
    }

    private async simulateBacktest(backtestId: string) {
        // Simulate LEAN CLI backtest results
        const mockResults: Record<string, any> = {
            totalReturn: 0.15,
            sharpeRatio: 1.2,
            maxDrawdown: -0.08,
            winRate: 0.65,
        };

        const mockMetrics = [
            { name: 'Total Return', value: 15, unit: '%' },
            { name: 'Sharpe Ratio', value: 1.2, unit: '' },
            { name: 'Max Drawdown', value: -8, unit: '%' },
            { name: 'Win Rate', value: 65, unit: '%' },
        ];

        // Update backtest with results
        await this.backtestRepository.update(backtestId, {
            status: 'completed',
            results: mockResults,
            performance: mockResults,
        });

        // Save metrics
        for (const metric of mockMetrics) {
            await this.metricRepository.save({
                ...metric,
                backtestId,
                metadata: {},
            });
        }
    }
} 