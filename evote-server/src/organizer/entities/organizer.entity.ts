import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Citizen } from '../../citizen/entities/citizen.entity';

@Entity()
export class Organizer {
    @PrimaryGeneratedColumn()
    organizerID: number;

    @Column()
    username: string;

    @Column()
    password: string;
}