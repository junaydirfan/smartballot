import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Organizer } from '../../organizer/entities/organizer.entity';
import { Vote } from '../../vote/entities/vote.entity';

@Entity()
export class Citizen {
    @PrimaryColumn()
    citizenID: number; // Custom ID provided by the government

    @Column()
    firstName: string;

    @Column()
    middleName: string;

    @Column()
    lastName: string;

    @Column()
    streetAddress: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    zipcode: string;

    @Column()
    dob: Date;
}