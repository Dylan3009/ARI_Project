import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { Express } from 'express';
import * as multer from 'multer';
import { extname, join } from 'path';
var AES = require("crypto-js/aes");
//import * as path from 'path';
const CryptoJS = require('crypto-js');

const key = 'miClaveSecreta';
const iv = 'miVectorDeInicializacion';


@Controller('convert')
export class TextXmlController {
  @Post('text/xml')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: './src/files',
        filename: (req, file, cb) => {
          const extension = extname(file.originalname);
          const uniqueSuffix = `${Date.now()}-${Math.round(
            Math.random() * 1e9,
          )}`;
          const filename = `${uniqueSuffix}${extension}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async convertToXML(
    @UploadedFile() file: Express.Multer.File,
    @Res() response,
  ) {
    const filename: string = `./src/files/${file.filename}`;
    const fileText: string = fs.readFileSync(filename).toString();
    const allLines = fileText.split('\n');

    let xml = '<clientes>\n';

    // Saltar la primera línea que contiene los encabezados
    for (let i = 1; i < allLines.length; i++) {
      const line = allLines[i];
      if (line.trim() !== '') {
        const values = line.split(',');

        const documento = values[0];
        const nombres = values[1];
        const apellidos = values[2];
        const tarjeta = values[3];
        const tarjetaCifrada = CryptoJS.AES.encrypt(tarjeta, key, { iv: iv }).toString();
        const tipo = values[4];
        const telefono = values[5];
        const poligono = values.slice(6).map((coordenada) => `${coordenada}`);

        xml += '  <cliente>\n';
        xml += `    <documento>${documento}</documento>\n`;
        xml += `    <nombres>${nombres}</nombres>\n`;
        xml += `    <apellidos>${apellidos}</apellidos>\n`;
        xml += `    <tarjeta>${tarjetaCifrada}</tarjeta>\n`;
        xml += `    <tipo>${tipo}</tipo>\n`;
        xml += `    <telefono>${telefono}</telefono>\n`;
        xml += `    <poligono>\n`;

        for (const coordenada of poligono) {
          xml += `      <coordenada>${coordenada}</coordenada>\n`;
        }

        xml += '    </poligono>\n';
        xml += '  </cliente>\n';
      }
    }

    xml += '</clientes>';

    console.log(xml);
    response.send(xml);
  }
}
