import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCitizenDto } from './dto/create-citizen.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Citizen } from './entities/citizen.entity';

@Injectable()
export class CitizenService {
    constructor(
        @InjectRepository(Citizen)
        private readonly citizenRepository: Repository<Citizen>,
    ) {}

    async create(createCitizenDto: CreateCitizenDto): Promise<Citizen> {
        const newCitizen = this.citizenRepository.create(createCitizenDto);
        return this.citizenRepository.save(newCitizen);
    }

    async findOne(id: number): Promise<Citizen> {
        const citizen = await this.citizenRepository.findOne({ where: { citizenID: id } });
        if (!citizen) {
            throw new NotFoundException(`Citizen with ID ${id} not found`);
        }
        return citizen;
    }
}