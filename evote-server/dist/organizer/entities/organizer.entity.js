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
exports.Organizer = void 0;
const typeorm_1 = require("typeorm");
const citizen_entity_1 = require("../../citizen/entities/citizen.entity");
let Organizer = class Organizer {
};
exports.Organizer = Organizer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Organizer.prototype, "organizerID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => citizen_entity_1.Citizen, citizen => citizen.organizers),
    __metadata("design:type", citizen_entity_1.Citizen)
], Organizer.prototype, "citizen", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organizer.prototype, "otp", void 0);
exports.Organizer = Organizer = __decorate([
    (0, typeorm_1.Entity)()
], Organizer);
//# sourceMappingURL=organizer.entity.js.map