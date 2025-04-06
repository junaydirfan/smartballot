import { IsString, IsInt, IsDate } from 'class-validator';

export class CreateCitizenDto {
    @IsInt()
    citizenID: number; // Custom ID provided by the government

    @IsString()
    firstName: string;

    @IsString()
    middleName: string;

    @IsString()
    lastName: string;

    @IsString()
    streetAddress: string;

    @IsString()
    city: string;

    @IsString()
    state: string;

    @IsString()
    zipcode: string;

    @IsDate()
    dob: Date;
}