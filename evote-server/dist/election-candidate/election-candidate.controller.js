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
exports.ElectionCandidateController = void 0;
const common_1 = require("@nestjs/common");
const election_candidate_service_1 = require("./election-candidate.service");
let ElectionCandidateController = class ElectionCandidateController {
    constructor(candidateService) {
        this.candidateService = candidateService;
    }
    async create(candidatesData) {
        return this.candidateService.createCandidates(candidatesData);
    }
    async getCandidates(electionId) {
        return this.candidateService.findByElectionId(parseInt(electionId));
    }
};
exports.ElectionCandidateController = ElectionCandidateController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ElectionCandidateController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('electionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ElectionCandidateController.prototype, "getCandidates", null);
exports.ElectionCandidateController = ElectionCandidateController = __decorate([
    (0, common_1.Controller)('elections/:electionId/candidates'),
    __metadata("design:paramtypes", [election_candidate_service_1.ElectionCandidateService])
], ElectionCandidateController);
//# sourceMappingURL=election-candidate.controller.js.map