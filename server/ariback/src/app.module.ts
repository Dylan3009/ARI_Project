import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatajsonModule } from './datajson/datajson.module';

@Module({
  imports: [DatajsonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
