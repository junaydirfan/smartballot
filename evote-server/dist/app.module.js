"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const citizen_module_1 = require("./citizen/citizen.module");
const typeorm_1 = require("@nestjs/typeorm");
const citizen_entity_1 = require("./citizen/entities/citizen.entity");
const election_entity_1 = require("./election/entities/election.entity");
const election_candidate_entity_1 = require("./election-candidate/entities/election-candidate.entity");
const organizer_entity_1 = require("./organizer/entities/organizer.entity");
const vote_entity_1 = require("./vote/entities/vote.entity");
const election_module_1 = require("./election/election.module");
const organizer_module_1 = require("./organizer/organizer.module");
const vote_module_1 = require("./vote/vote.module");
const election_candidate_module_1 = require("./election-candidate/election-candidate.module");
const schedule_1 = require("@nestjs/schedule");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'better-sqlite3',
                database: 'database.sqlite',
                entities: [
                    citizen_entity_1.Citizen,
                    election_entity_1.Election,
                    election_candidate_entity_1.ElectionCandidate,
                    organizer_entity_1.Organizer,
                    vote_entity_1.Vote,
                ],
                synchronize: true,
            }),
            citizen_module_1.CitizenModule,
            election_module_1.ElectionModule,
            organizer_module_1.OrganizerModule,
            vote_module_1.VoteModule,
            election_candidate_module_1.ElectionCandidateModule,
            schedule_1.ScheduleModule.forRoot(),
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map