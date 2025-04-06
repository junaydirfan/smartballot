import { Repository } from 'typeorm';
import { ElectionCandidate } from './entities/election-candidate.entity';
export declare class ElectionCandidateService {
    private candidateRepository;
    constructor(candidateRepository: Repository<ElectionCandidate>);
    createCandidates(candidatesData: Partial<ElectionCandidate>[]): Promise<ElectionCandidate[]>;
    findByElectionId(electionId: number): Promise<ElectionCandidate[]>;
}
