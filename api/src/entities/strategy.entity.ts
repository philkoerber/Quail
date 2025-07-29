import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Backtest } from './backtest.entity';

@Entity('strategies')
export class Strategy {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('text')
    description: string;

    @Column('text')
    code: string; // Python code for the strategy

    @Column({ default: false })
    isActive: boolean;

    @ManyToOne(() => User, user => user.strategies)
    user: User;

    @Column()
    userId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Backtest, backtest => backtest.strategy)
    backtests: Backtest[];
} 