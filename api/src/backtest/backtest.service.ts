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

    try {
      const results = await this.leanService.runBacktest(strategyId, strategy.code);

      await this.backtestRepository.update(backtest.id, {
        results,
        status: 'completed',
      });
    } catch (err) {
      await this.backtestRepository.update(backtest.id, { status: 'failed' });
      throw err;
    }

    return this.findOne(userId, backtest.id);
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
} 