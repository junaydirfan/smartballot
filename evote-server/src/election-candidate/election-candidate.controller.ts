import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ElectionCandidateService } from './election-candidate.service';
import { ElectionCandidate } from './entities/election-candidate.entity';

@Controller('elections/:electionId/candidates')
export class ElectionCandidateController {
    constructor(private readonly candidateService: ElectionCandidateService) {}

    @Post()
    async create(@Body() candidatesData: Partial<ElectionCandidate>[]): Promise<ElectionCandidate[]> {
        return this.candidateService.createCandidates(candidatesData);
    }

    @Get()
    async getCandidates(@Param('electionId') electionId: string): Promise<ElectionCandidate[]> {
        return this.candidateService.findByElectionId(parseInt(electionId));
    }

    // Additional endpoints for managing candidates can be added here
}
