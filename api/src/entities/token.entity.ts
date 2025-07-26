import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('tokens')
export class Token {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    token: string;

    @Column()
    type: 'access' | 'refresh';

    @Column()
    expiresAt: Date;

    @Column({ default: false })
    isRevoked: boolean;

    @ManyToOne(() => User, user => user.id)
    user: User;

    @Column()
    userId: string;

    @CreateDateColumn()
    createdAt: Date;
} 