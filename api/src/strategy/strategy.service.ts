import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Strategy } from '../entities/strategy.entity';
import { Backtest } from '../entities/backtest.entity';

@Injectable()
export class StrategyService {
    constructor(
        @InjectRepository(Strategy)
        private strategyRepository: Repository<Strategy>,
        @InjectRepository(Backtest)
        private backtestRepository: Repository<Backtest>,
    ) { }

    async create(userId: string, strategyData: {
        name: string;
        description?: string;
        code: string;
    }) {
        const strategy = this.strategyRepository.create({
            ...strategyData,
            userId,
        });

        return this.strategyRepository.save(strategy);
    }

    async findAll(userId: string) {
        return this.strategyRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(userId: string, id: string) {
        const strategy = await this.strategyRepository.findOne({
            where: { id, userId },
        });

        if (!strategy) {
            throw new NotFoundException('Strategy not found');
        }

        return strategy;
    }

    async update(userId: string, id: string, updateData: Partial<Strategy>) {
        const strategy = await this.findOne(userId, id);

        Object.assign(strategy, updateData);

        return this.strategyRepository.save(strategy);
    }

    async remove(userId: string, id: string) {
        const strategy = await this.findOne(userId, id);

        // First, delete all backtests associated with this strategy
        await this.backtestRepository.delete({ strategyId: id });

        // Then delete the strategy
        return this.strategyRepository.remove(strategy);
    }

    async getStats(userId: string) {
        const [totalStrategies, activeStrategies] = await Promise.all([
            this.strategyRepository.count({ where: { userId } }),
            this.strategyRepository.count({ where: { userId, isActive: true } })
        ]);

        return {
            totalStrategies,
            activeStrategies
        };
    }

} 