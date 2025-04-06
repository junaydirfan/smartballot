import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ElectionCandidate } from './entities/election-candidate.entity';

@Injectable()
export class ElectionCandidateService {
    constructor(
        @InjectRepository(ElectionCandidate)
        private candidateRepository: Repository<ElectionCandidate>,
    ) {}

    async createCandidates(candidatesData: Partial<ElectionCandidate>[]): Promise<ElectionCandidate[]> {
        const candidates = candidatesData.map(candidateData => this.candidateRepository.create(candidateData));
        return this.candidateRepository.save(candidates);
    }

    async findByElectionId(electionId: number): Promise<ElectionCandidate[]> {
        return this.candidateRepository.find({ where: { election: { electionID: electionId } } });
    }

    // Additional methods for managing candidates can be added here
}
