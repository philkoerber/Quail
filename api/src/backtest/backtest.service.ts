import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Backtest } from '../entities/backtest.entity';
import { Strategy } from 'src/entities/strategy.entity';
import { LeanService } from 'src/lean/lean.service';

@Injectable()
export class BacktestService {
  constructor(
    @InjectRepository(Backtest)
    private readonly backtestRepository: Repository<Backtest>,

    @InjectRepository(Strategy)
    private readonly strategyRepository: Repository<Strategy>,

    private readonly leanService: LeanService,
  ) { }

  async create(
    userId: string,
    strategyId: string,
    data: { name: string; },
  ) {
    const strategy = await this.strategyRepository.findOne({
      where: { id: strategyId, userId },
    });
    if (!strategy) throw new NotFoundException('Strategy not found');

    const backtest = await this.backtestRepository.save(
      this.backtestRepository.create({
        ...data,
        userId,
        strategyId,
        status: 'running',
      }),
    );

    // Start backtest asynchronously
    this.runBacktestAsync(backtest.id, strategy.code);

    return this.findOne(userId, backtest.id);
  }

  private async runBacktestAsync(backtestId: string, strategyCode: string) {
    try {
      const results = await this.leanService.runBacktest(backtestId, strategyCode);

      await this.backtestRepository.update(backtestId, {
        results,
        status: 'completed',
      });
    } catch (err) {
      console.error('Backtest failed:', err);
      await this.backtestRepository.update(backtestId, {
        status: 'failed',
        results: { error: err.message }
      });
    }
  }

  async findAll(userId: string, strategyId?: string) {
    const where: any = { userId };
    if (strategyId) {
      where.strategyId = strategyId;
    }

    return this.backtestRepository.find({
      where,
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
} 