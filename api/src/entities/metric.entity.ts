import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Backtest } from './backtest.entity';

@Entity('metrics')
export class Metric {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    value: number;

    @Column()
    unit: string;

    @Column('json')
    metadata: Record<string, any>; // Additional metric data

    @ManyToOne(() => Backtest, backtest => backtest.metrics)
    backtest: Backtest;

    @Column()
    backtestId: string;

    @CreateDateColumn()
    createdAt: Date;
} 