import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { Express } from 'express';
import { log } from 'console';
//import * as path from 'path';

@Controller('convert')
export class DatajsonController {
  @Post('json')
  @UseInterceptors(FileInterceptor('file'))
  async convertToJson(@UploadedFile() file: Express.Multer.File) {
    //const filename = process.argv[2];
    // const filename: string = "./src/files/prueba.txt";
    //const filename: string = file.buffer.toString();
    const filePath = file.path;

    const fileText: string = fs.readFileSync(filePath).toString();
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
    const outputFilename = file.path.replace(".txt", ".json");
    // const outputFilename = filename.replace(".txt", ".json");
    fs.writeFileSync(outputFilename, jsonResult);
    
  }
}
