import { Organizer } from '../../organizer/entities/organizer.entity';
export declare class Citizen {
    citizenID: number;
    firstName: string;
    middleName: string;
    lastName: string;
    streetAddress: string;
    city: string;
    state: string;
    zipcode: string;
    dob: Date;
    organizers: Organizer[];
}
