import { Module } from '@nestjs/common';
import { DatajsonService } from './datajson.service';
import { DatajsonController } from './datajson.controller';
import { JsonTextController } from './jsontxt.controller';
import { XmlToTxtController } from './xmlToTextController';
import { TextXmlController } from './textToXMl.controller'


@Module({
  controllers: [DatajsonController, JsonTextController, XmlToTxtController,TextXmlController],
  providers: [DatajsonService]
})
export class DatajsonModule {}
