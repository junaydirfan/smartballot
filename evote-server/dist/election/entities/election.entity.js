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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Election = void 0;
const typeorm_1 = require("typeorm");
const election_candidate_entity_1 = require("../../election-candidate/entities/election-candidate.entity");
const vote_entity_1 = require("../../vote/entities/vote.entity");
let Election = class Election {
};
exports.Election = Election;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Election.prototype, "electionID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Election.prototype, "electionName", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Election.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Election.prototype, "startAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Election.prototype, "endsAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Election.prototype, "liveResults", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Election.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Election.prototype, "organizerID", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Election.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Election.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Election.prototype, "electionType", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => election_candidate_entity_1.ElectionCandidate, electionCandidate => electionCandidate.election),
    __metadata("design:type", Array)
], Election.prototype, "candidates", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vote_entity_1.Vote, vote => vote.election),
    __metadata("design:type", Array)
], Election.prototype, "votes", void 0);
exports.Election = Election = __decorate([
    (0, typeorm_1.Entity)()
], Election);
//# sourceMappingURL=election.entity.js.map