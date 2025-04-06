import { ElectionCandidateService } from './election-candidate.service';
import { ElectionCandidate } from './entities/election-candidate.entity';
export declare class ElectionCandidateController {
    private readonly candidateService;
    constructor(candidateService: ElectionCandidateService);
    create(candidatesData: Partial<ElectionCandidate>[]): Promise<ElectionCandidate[]>;
    getCandidates(electionId: string): Promise<ElectionCandidate[]>;
}
