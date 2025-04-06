import { Test, TestingModule } from '@nestjs/testing';
import { ElectionCandidateController } from './election-candidate.controller';

describe('ElectionCandidateController', () => {
  let controller: ElectionCandidateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElectionCandidateController],
    }).compile();

    controller = module.get<ElectionCandidateController>(ElectionCandidateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
