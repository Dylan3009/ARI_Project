import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatajsonModule } from './datajson/datajson.module';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [DatajsonModule
    // ,
    // MulterModule.register({
    //   dest: './src/files', single: 'file.txt'
     // Carpeta donde se guardarán los archivos subidos
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
