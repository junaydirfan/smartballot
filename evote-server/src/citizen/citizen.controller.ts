import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CitizenService } from './citizen.service';
import { CreateCitizenDto } from './dto/create-citizen.dto';
import { Citizen } from './entities/citizen.entity';

@Controller('citizen')
export class CitizenController {
    constructor(private readonly citizenService: CitizenService) {}

    @Post()
    async create(@Body() createCitizenDto: CreateCitizenDto) {
        console.log('Received citizen data:', createCitizenDto); // Log the received data
        return this.citizenService.create(createCitizenDto);
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Citizen> {
        return this.citizenService.findOne(id);
    }
}