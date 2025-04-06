import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { ElectionCandidate } from '../../election-candidate/entities/election-candidate.entity';
import { Vote } from '../../vote/entities/vote.entity';

@Entity()
export class Election {
    @PrimaryGeneratedColumn()
    electionID: number;

    @Column()
    electionName: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    startAt: Date;

    @Column()
    endsAt: Date;

    @Column()
    liveResults: boolean;

    @Column()
    status: string;

    @Column()
    organizerID: number; // Foreign key to Organizer

    @Column({ nullable: true })
    province: string; // New field for province

    @Column({ nullable: true })
    city: string; // New field for city

    @Column()
    electionType: string; // New field for election type

    @OneToMany(() => ElectionCandidate, electionCandidate => electionCandidate.election)
    candidates: ElectionCandidate[];

    @OneToMany(() => Vote, vote => vote.election)
    votes: Vote[];
}