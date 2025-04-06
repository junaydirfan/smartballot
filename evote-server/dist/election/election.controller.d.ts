import { ElectionService } from './election.service';
import { Election } from './entities/election.entity';
export declare class ElectionController {
    private readonly electionService;
    constructor(electionService: ElectionService);
    getElectionsByCity(city: string): Promise<Election[]>;
    getFederalElections(): Promise<Election[]>;
    getElectionsByProvince(province: string): Promise<Election[]>;
    create(electionData: Partial<Election>): Promise<Election>;
    findAll(): Promise<Election[]>;
    getElection(electionID: string): Promise<Election>;
}
