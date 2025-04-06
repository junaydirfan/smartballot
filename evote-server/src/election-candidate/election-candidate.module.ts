import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElectionCandidateService } from './election-candidate.service';
import { ElectionCandidateController } from './election-candidate.controller';
import { ElectionCandidate } from './entities/election-candidate.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ElectionCandidate])],
    providers: [ElectionCandidateService],
    controllers: [ElectionCandidateController],
    exports: [ElectionCandidateService], // Export the service if needed elsewhere
})
export class ElectionCandidateModule {}
