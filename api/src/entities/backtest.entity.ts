import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Strategy } from './strategy.entity';

@Entity('backtests')
export class Backtest {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('json')
    results: Record<string, any>; // Backtest results

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

} 