import { Test, TestingModule } from '@nestjs/testing';
import { ReasonsResolver } from './reasons.resolver';

describe('ReasonsResolver', () => {
  let resolver: ReasonsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReasonsResolver],
    }).compile();

    resolver = module.get<ReasonsResolver>(ReasonsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
