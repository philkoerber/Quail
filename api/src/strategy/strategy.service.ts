import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Strategy } from '../entities/strategy.entity';

@Injectable()
export class StrategyService {
    constructor(
        @InjectRepository(Strategy)
        private strategyRepository: Repository<Strategy>,
    ) { }

    async create(userId: string, strategyData: {
        name: string;
        description: string;
        code: string;
        parameters: Record<string, any>;
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

        return this.strategyRepository.remove(strategy);
    }

    async getImprovementSuggestions(strategyId: string, backtestResults: any) {
        // This would integrate with Ollama to get LLM suggestions
        // For now, returning a mock response
        return {
            suggestions: [
                {
                    type: 'parameter_optimization',
                    description: 'Consider adjusting the moving average period from 20 to 14 for better responsiveness',
                    code: '// Update the moving average calculation\nself.sma_period = 14',
                },
                {
                    type: 'risk_management',
                    description: 'Add a stop-loss mechanism to limit potential losses',
                    code: '// Add stop-loss logic\nif self.Portfolio.TotalUnrealizedProfit < -0.05:\n    self.Liquidate()',
                },
            ],
        };
    }
} 