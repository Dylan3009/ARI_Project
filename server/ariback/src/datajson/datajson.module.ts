import { Module } from '@nestjs/common';
import { DatajsonService } from './datajson.service';
import { DatajsonController } from './datajson.controller';
import { JsonTextController } from './jsontxt.controller';

@Module({
  controllers: [DatajsonController, JsonTextController],
  providers: [DatajsonService]
})
export class DatajsonModule {}
