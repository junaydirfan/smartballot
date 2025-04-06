import { Test, TestingModule } from '@nestjs/testing';
import { ElectionCandidateService } from './election-candidate.service';

describe('ElectionCandidateService', () => {
  let service: ElectionCandidateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElectionCandidateService],
    }).compile();

    service = module.get<ElectionCandidateService>(ElectionCandidateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
