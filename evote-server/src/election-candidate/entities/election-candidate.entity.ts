import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Election } from '../../election/entities/election.entity';

@Entity()
export class ElectionCandidate {
    @PrimaryGeneratedColumn()
    candidateID: number;

    @Column()
    name: string;

    @Column()
    party: string;

    @ManyToOne(() => Election, election => election.candidates)
    election: Election;
}