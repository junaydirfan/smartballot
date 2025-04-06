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
exports.CitizenService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const citizen_entity_1 = require("./entities/citizen.entity");
let CitizenService = class CitizenService {
    constructor(citizenRepository) {
        this.citizenRepository = citizenRepository;
    }
    async create(createCitizenDto) {
        const newCitizen = this.citizenRepository.create(createCitizenDto);
        return this.citizenRepository.save(newCitizen);
    }
    async findOne(id) {
        const citizen = await this.citizenRepository.findOne({ where: { citizenID: id } });
        if (!citizen) {
            throw new common_1.NotFoundException(`Citizen with ID ${id} not found`);
        }
        return citizen;
    }
};
exports.CitizenService = CitizenService;
exports.CitizenService = CitizenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(citizen_entity_1.Citizen)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CitizenService);
//# sourceMappingURL=citizen.service.js.map