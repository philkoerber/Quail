import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Strategy } from './strategy.entity';
import { Metric } from './metric.entity';

@Entity('backtests')
export class Backtest {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('json')
    results: Record<string, any>; // Backtest results

    @Column('json')
    performance: {
        totalReturn: number;
        sharpeRatio: number;
        maxDrawdown: number;
        winRate: number;
    };

    @Column('date')
    startDate: Date;

    @Column('date')
    endDate: Date;

    @Column({ default: 'completed' })
    status: 'running' | 'completed' | 'failed';

    @ManyToOne(() => User, user => user.backtests)
    user: User;

    @Column()
    userId: string;

    @ManyToOne(() => Strategy, strategy => strategy.backtests)
    strategy: Strategy;

    @Column()
    strategyId: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Metric, metric => metric.backtest)
    metrics: Metric[];
} 