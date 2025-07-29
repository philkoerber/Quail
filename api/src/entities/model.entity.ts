import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('models')
export class Model {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    type: string; // 'classification', 'regression', etc.

    @Column('text')
    modelPath: string; // Path to saved model file

    @Column('json')
    metrics: Record<string, any>; // Model performance metrics

    @ManyToOne(() => User, user => user.id)
    user: User;

    @Column()
    userId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 