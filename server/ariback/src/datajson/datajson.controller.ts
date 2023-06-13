import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { Express } from 'express';
import { log } from 'console';
import { join } from 'path';
//import * as path from 'path';

@Controller('convert')
export class DatajsonController {

  @Get('json')
  getHello(): string {
    return 'XD!';
  }

  @Post('json')
  @UseInterceptors(FileInterceptor('file'))
    async convertToJson(@UploadedFile() file) {
    const filename: string = `./src/files/${file.originalname}`;
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
        if (headers[j] === "interests\r") {
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

    //return jsonResult;
    
  }
}
