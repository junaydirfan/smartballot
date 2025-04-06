import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Election } from './entities/election.entity';
import { ElectionCandidate } from '../election-candidate/entities/election-candidate.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ElectionService {
    constructor(
        @InjectRepository(Election)
        private electionRepository: Repository<Election>,
        @InjectRepository(ElectionCandidate)
        private candidateRepository: Repository<ElectionCandidate>,
    ) {}

    @Cron(CronExpression.EVERY_10_SECONDS)
    async handleCron() {
        await this.updateElectionStatuses();
    }

    async createElection(electionData: Partial<Election>): Promise<Election> {
        try {
            console.log("Creating election with data:", electionData);
            const election = this.electionRepository.create(electionData);
            election.status = 'scheduled'; // Set default status to scheduled
            election.createdAt = new Date(new Date().getTime() - 4 * 60 * 60 * 1000); // Adjust createdAt to current time minus 4 hours
            const savedElection = await this.electionRepository.save(election);

            // Save candidates
            const candidates = electionData.candidates.map(candidateData => {
                if (!candidateData.party) { 
                    throw new Error('Candidate party is required');
                }
                const candidate = this.candidateRepository.create({
                    ...candidateData,
                    election: savedElection,
                });
                return this.candidateRepository.save(candidate);
            });

            await Promise.all(candidates);

            console.log("Election created successfully!");
            return savedElection;
        } catch (error) {
            console.error("Error creating election:", error);
            throw error;
        }
    }

    private determineStatus(startAt: Date, endsAt: Date): string {
        const now = new Date(new Date().getTime() - 4 * 60 * 60 * 1000); // Get current time minus 4 hours

        // Directly compare the database values with the current time
        if (now < startAt) {
            return 'scheduled';
        } else if (now >= startAt && now <= endsAt) {
            return 'ongoing';
        } else {
            return 'over';
        }
    }

    async updateElectionStatuses(): Promise<void> {
        const elections = await this.electionRepository.find();
        for (const election of elections) {
            const newStatus = this.determineStatus(election.startAt, election.endsAt);
            if (election.status !== newStatus) {
                election.status = newStatus;
                await this.electionRepository.save(election);
            }
        }
    }

    async findOne(electionID: number): Promise<Election> {
        return this.electionRepository.findOneBy({ electionID });
    }

    async findAll(): Promise<Election[]> {
        return this.electionRepository.find();
    }

    async findElectionsByCity(city: string): Promise<Election[]> {
        return this.electionRepository.find({ where: { city } });
    }

    async findElectionsByProvince(province: string): Promise<Election[]> {
        return this.electionRepository.find({ where: { province } });
    }

    async findFederalElections(): Promise<Election[]> {
        return this.electionRepository.find({ where: { electionType: 'Federal' } });
    }
}