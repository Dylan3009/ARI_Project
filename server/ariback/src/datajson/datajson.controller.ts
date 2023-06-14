import { Controller, Get, Post, Req, Res, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { Express } from 'express';
import * as multer from 'multer';
import { extname, join } from 'path';
//import * as path from 'path';

@Controller('convert')
export class DatajsonController {

  @Get('json')
  @UseInterceptors(FileInterceptor('file'))
  getHello(@UploadedFile() file) {
    return file.originalname;
  }

  @Post('json')
  @UseInterceptors(FileInterceptor('file', 
    {
      storage: multer.diskStorage({
        destination: './src/files',
        filename: (req, file, cb) => {
          const extension = extname(file.originalname);
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const filename = `${uniqueSuffix}${extension}`;
          cb(null, filename);
        }
      })
    }
  ))
   async convertToJson(@UploadedFile() file: Express.Multer.File, @Res() response) {

    //const filename: string = `./src/files/${file.originalname}`;
    const filename: string = `./src/files/${file.filename}`;
    const fileText: string = fs.readFileSync(filename).toString();
    const allLines: string[] = fileText.split("\r\n");

    const headers: string[] = allLines[0].split(',');

    const result: any[] = [];

    for (let i = 1; i < allLines.length; i++) {
      const currentLine: string = allLines[i];
      if (currentLine.trim() === '') continue;

      const values: string[] = currentLine.split(',');

      const obj: any = {};
      for (let j = 0; j < headers.length; j++) {
        if (headers[j] === "poligono") {
          obj[headers[j]] = values.slice(j).filter(Boolean);
          break;
        }
        obj[headers[j]] = values[j];
      }

      result.push(obj);
    }

    const jsonResult: string = JSON.stringify(result, null, 2);
    console.log(jsonResult);
    const outputFilename = filename.replace(".txt", ".json");
    fs.writeFileSync(outputFilename, jsonResult);

    response.send(jsonResult);

  }
}
