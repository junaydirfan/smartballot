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
exports.ElectionCandidate = void 0;
const typeorm_1 = require("typeorm");
const election_entity_1 = require("../../election/entities/election.entity");
let ElectionCandidate = class ElectionCandidate {
};
exports.ElectionCandidate = ElectionCandidate;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ElectionCandidate.prototype, "candidateID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ElectionCandidate.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ElectionCandidate.prototype, "party", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => election_entity_1.Election, election => election.candidates),
    __metadata("design:type", election_entity_1.Election)
], ElectionCandidate.prototype, "election", void 0);
exports.ElectionCandidate = ElectionCandidate = __decorate([
    (0, typeorm_1.Entity)()
], ElectionCandidate);
//# sourceMappingURL=election-candidate.entity.js.map