import { Repository } from 'typeorm';
import { Election } from './entities/election.entity';
import { ElectionCandidate } from '../election-candidate/entities/election-candidate.entity';
export declare class ElectionService {
    private electionRepository;
    private candidateRepository;
    constructor(electionRepository: Repository<Election>, candidateRepository: Repository<ElectionCandidate>);
    handleCron(): Promise<void>;
    createElection(electionData: Partial<Election>): Promise<Election>;
    private determineStatus;
    updateElectionStatuses(): Promise<void>;
    findOne(electionID: number): Promise<Election>;
    findAll(): Promise<Election[]>;
    findElectionsByCity(city: string): Promise<Election[]>;
    findElectionsByProvince(province: string): Promise<Election[]>;
    findFederalElections(): Promise<Election[]>;
}
