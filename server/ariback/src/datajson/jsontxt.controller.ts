import { Controller, Get, Post, Req, Res, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { Express } from 'express';
import * as multer from 'multer';
import { extname, join } from 'path';
//import * as path from 'path';

@Controller('convert')
export class JsonTextController {

    @Post('json/text')
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

        const filename: string = `./src/files/${file.filename}`;
        const fileContent = fs.readFileSync(filename, 'utf-8').toString();
        const jsonData: any[] = JSON.parse(fileContent);

        let txtContent = "documento,nombre,apellido,tarjeta,tipo,telefono,poligono\n";

        jsonData.forEach(item => {
            const row = [
                item.documento,
                item.nombre,
                item.apellido,
                item.tarjeta,
                item.tipo,
                item.telefono,
                ...item.poligono
            ].join(",");

            txtContent += row + "\n";
        });

        const outputFilename = filename.replace(".json", ".txt");
        fs.writeFileSync(outputFilename, txtContent, "utf-8");      

        console.log(txtContent);
        response.send(txtContent);
    }
}
