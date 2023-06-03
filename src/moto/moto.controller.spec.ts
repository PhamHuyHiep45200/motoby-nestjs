import { Test, TestingModule } from '@nestjs/testing';
import { MotoController } from './moto.controller';

describe('MotoController', () => {
  let controller: MotoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotoController],
    }).compile();

    controller = module.get<MotoController>(MotoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
