import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Election } from '../../election/entities/election.entity';
import { Citizen } from '../../citizen/entities/citizen.entity';

@Entity()
export class Vote {
    @PrimaryGeneratedColumn()
    voteID: number;

    @ManyToOne(() => Election, election => election.votes)
    election: Election;

    @Column()
    hashedCitizenID: string; // Anonymized citizen ID using ZKP hash

    @CreateDateColumn()
    votedAt: Date;
}