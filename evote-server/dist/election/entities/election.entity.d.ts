import { ElectionCandidate } from '../../election-candidate/entities/election-candidate.entity';
import { Vote } from '../../vote/entities/vote.entity';
export declare class Election {
    electionID: number;
    electionName: string;
    createdAt: Date;
    startAt: Date;
    endsAt: Date;
    liveResults: boolean;
    status: string;
    organizerID: number;
    province: string;
    city: string;
    electionType: string;
    candidates: ElectionCandidate[];
    votes: Vote[];
}
