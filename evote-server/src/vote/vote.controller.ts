import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { VoteService } from './vote.service';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  async castVote(@Body() voteData: { electionId: number; citizenId: string; candidateId: string }) {
    return this.voteService.castVote(voteData.electionId, voteData.citizenId, voteData.candidateId);
  }

  @Get(':electionId/:candidateId')
  async getVoteCount(@Param('electionId') electionId: number, @Param('candidateId') candidateId: string) {
    return this.voteService.getVoteCount(electionId, candidateId);
  }
}
