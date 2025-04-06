"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const election_entity_1 = require("./entities/election.entity");
const election_candidate_entity_1 = require("../election-candidate/entities/election-candidate.entity");
const schedule_1 = require("@nestjs/schedule");
let ElectionService = class ElectionService {
    constructor(electionRepository, candidateRepository) {
        this.electionRepository = electionRepository;
        this.candidateRepository = candidateRepository;
    }
    async handleCron() {
        await this.updateElectionStatuses();
    }
    async createElection(electionData) {
        try {
            console.log("Creating election with data:", electionData);
            const election = this.electionRepository.create(electionData);
            election.status = 'scheduled';
            election.createdAt = new Date(new Date().getTime() - 4 * 60 * 60 * 1000);
            const savedElection = await this.electionRepository.save(election);
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
        }
        catch (error) {
            console.error("Error creating election:", error);
            throw error;
        }
    }
    determineStatus(startAt, endsAt) {
        const now = new Date(new Date().getTime() - 4 * 60 * 60 * 1000);
        if (now < startAt) {
            return 'scheduled';
        }
        else if (now >= startAt && now <= endsAt) {
            return 'ongoing';
        }
        else {
            return 'over';
        }
    }
    async updateElectionStatuses() {
        const elections = await this.electionRepository.find();
        for (const election of elections) {
            const newStatus = this.determineStatus(election.startAt, election.endsAt);
            if (election.status !== newStatus) {
                election.status = newStatus;
                await this.electionRepository.save(election);
            }
        }
    }
    async findOne(electionID) {
        return this.electionRepository.findOneBy({ electionID });
    }
    async findAll() {
        return this.electionRepository.find();
    }
    async findElectionsByCity(city) {
        return this.electionRepository.find({ where: { city } });
    }
    async findElectionsByProvince(province) {
        return this.electionRepository.find({ where: { province } });
    }
    async findFederalElections() {
        return this.electionRepository.find({ where: { electionType: 'Federal' } });
    }
};
exports.ElectionService = ElectionService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ElectionService.prototype, "handleCron", null);
exports.ElectionService = ElectionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(election_entity_1.Election)),
    __param(1, (0, typeorm_1.InjectRepository)(election_candidate_entity_1.ElectionCandidate)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ElectionService);
//# sourceMappingURL=election.service.js.map