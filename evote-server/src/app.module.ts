import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitizenModule } from './citizen/citizen.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Citizen } from './citizen/entities/citizen.entity';
import { Election } from './election/entities/election.entity';
import { ElectionCandidate } from './election-candidate/entities/election-candidate.entity';
import { Organizer } from './organizer/entities/organizer.entity';
import { Vote } from './vote/entities/vote.entity';
import { ElectionModule } from './election/election.module';
import { OrganizerModule } from './organizer/organizer.module';
import { VoteModule } from './vote/vote.module';
import { ElectionCandidateModule } from './election-candidate/election-candidate.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BetterSqlite3ConnectionOptions } from 'typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions';
import { BlockchainService } from './blockchain/blockchain.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3', // Change from 'sqlite' to 'better-sqlite3'
      database: 'database.sqlite',
      entities: [
        Citizen,
        Election,
        ElectionCandidate,
        Organizer,
        Vote,
      ],
      synchronize: true, // Set to false in production
    } as BetterSqlite3ConnectionOptions), // Cast to BetterSqlite3ConnectionOptions
    CitizenModule,
    ElectionModule,
    OrganizerModule,
    VoteModule,
    ElectionCandidateModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [BlockchainService],
})
export class AppModule {}
