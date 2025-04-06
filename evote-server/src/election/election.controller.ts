import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { ElectionService } from './election.service';
import { Election } from './entities/election.entity';

@Controller('elections')
export class ElectionController {
    constructor(private readonly electionService: ElectionService) {}

    @Get('by-city')
    async getElectionsByCity(@Query('city') city: string): Promise<Election[]> {
        console.log("Received city parameter:", city);
        return this.electionService.findElectionsByCity(city);
    }

    @Get('federal')
    async getFederalElections(): Promise<Election[]> {
        console.log("Fetching federal elections");
        return this.electionService.findFederalElections();
    }

    @Get('by-province')
    async getElectionsByProvince(@Query('province') province: string): Promise<Election[]> {
        console.log("Received province parameter:", province);
        return this.electionService.findElectionsByProvince(province);
    }

    @Post()
    async create(@Body() electionData: Partial<Election>): Promise<Election> {
        console.log("Received election data:", electionData);
        return this.electionService.createElection(electionData);
    }

    @Get()
    async findAll(): Promise<Election[]> {
        console.log("Fetching all elections");
        return this.electionService.findAll();
    }

    @Get(':electionID') //CHANGE LATER
    async getElection(@Param('electionID') electionID: string): Promise<Election> {
        return this.electionService.findOne(parseInt(electionID));
    }
}