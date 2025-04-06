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
exports.CitizenController = void 0;
const common_1 = require("@nestjs/common");
const citizen_service_1 = require("./citizen.service");
const create_citizen_dto_1 = require("./dto/create-citizen.dto");
let CitizenController = class CitizenController {
    constructor(citizenService) {
        this.citizenService = citizenService;
    }
    async create(createCitizenDto) {
        console.log('Received citizen data:', createCitizenDto);
        return this.citizenService.create(createCitizenDto);
    }
    async findOne(id) {
        return this.citizenService.findOne(id);
    }
};
exports.CitizenController = CitizenController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_citizen_dto_1.CreateCitizenDto]),
    __metadata("design:returntype", Promise)
], CitizenController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CitizenController.prototype, "findOne", null);
exports.CitizenController = CitizenController = __decorate([
    (0, common_1.Controller)('citizen'),
    __metadata("design:paramtypes", [citizen_service_1.CitizenService])
], CitizenController);
//# sourceMappingURL=citizen.controller.js.map