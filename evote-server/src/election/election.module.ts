import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElectionController } from './election.controller';
import { ElectionService } from './election.service';
import { Election } from './entities/election.entity';
import { ElectionCandidate } from '../election-candidate/entities/election-candidate.entity';
import { ElectionCandidateModule } from '../election-candidate/election-candidate.module';

@Module({
  imports: [TypeOrmModule.forFeature([Election, ElectionCandidate]), ElectionCandidateModule],
  controllers: [ElectionController],
  providers: [ElectionService],
})
export class ElectionModule {}
