import { Test, TestingModule } from '@nestjs/testing';
import { DatajsonController } from './datajson.controller';
import { DatajsonService } from './datajson.service';

describe('DatajsonController', () => {
  let controller: DatajsonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatajsonController],
      providers: [DatajsonService],
    }).compile();

    controller = module.get<DatajsonController>(DatajsonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
