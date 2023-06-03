import { Test, TestingModule } from '@nestjs/testing';
import { MotoService } from './moto.service';

describe('MotoService', () => {
  let service: MotoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MotoService],
    }).compile();

    service = module.get<MotoService>(MotoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
