import { Test, TestingModule } from '@nestjs/testing';
import { DatajsonService } from './datajson.service';

describe('DatajsonService', () => {
  let service: DatajsonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatajsonService],
    }).compile();

    service = module.get<DatajsonService>(DatajsonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
