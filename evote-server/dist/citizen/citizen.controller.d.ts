import { CitizenService } from './citizen.service';
import { CreateCitizenDto } from './dto/create-citizen.dto';
import { Citizen } from './entities/citizen.entity';
export declare class CitizenController {
    private readonly citizenService;
    constructor(citizenService: CitizenService);
    create(createCitizenDto: CreateCitizenDto): Promise<Citizen>;
    findOne(id: number): Promise<Citizen>;
}
