import { Module } from '@nestjs/common';
import { DatajsonService } from './datajson.service';
import { DatajsonController } from './datajson.controller';
import { JsonTextController } from './jsontxt.controller';
import { XmlToTxtController } from './xmlToTextController';


@Module({
  controllers: [DatajsonController, JsonTextController, XmlToTxtController],
  providers: [DatajsonService]
})
export class DatajsonModule {}
