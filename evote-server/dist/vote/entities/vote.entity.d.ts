import { Election } from '../../election/entities/election.entity';
export declare class Vote {
    voteID: number;
    election: Election;
    hashedCitizenID: string;
    votedAt: Date;
}
