import { CreateCitizenDto } from './dto/create-citizen.dto';
import { Repository } from 'typeorm';
import { Citizen } from './entities/citizen.entity';
export declare class CitizenService {
    private readonly citizenRepository;
    constructor(citizenRepository: Repository<Citizen>);
    create(createCitizenDto: CreateCitizenDto): Promise<Citizen>;
    findOne(id: number): Promise<Citizen>;
}
