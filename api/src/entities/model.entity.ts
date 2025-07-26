import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('models')
export class Model {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('text')
    description: string;

    @Column()
    type: string; // 'classification', 'regression', etc.

    @Column('json')
    parameters: Record<string, any>; // Model parameters

    @Column('text')
    modelPath: string; // Path to saved model file

    @Column('json')
    performance: Record<string, any>; // Model performance metrics

    @ManyToOne(() => User, user => user.id)
    user: User;

    @Column()
    userId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 