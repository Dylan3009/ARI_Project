import { Module } from '@nestjs/common';
import { DatajsonService } from './datajson.service';
import { DatajsonController } from './datajson.controller';

@Module({
  controllers: [DatajsonController],
  providers: [DatajsonService]
})
export class DatajsonModule {}
