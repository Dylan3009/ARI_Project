import {
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as xml2js from 'xml2js';
import { Express, Response } from 'express';
import * as multer from 'multer';
import { extname } from 'path';

@Controller('convert')
export class XmlToTxtController {
  @Get('txt')
  @UseInterceptors(FileInterceptor('file'))
  getHello(@UploadedFile() file) {
    return file.originalname;
  }

  @Post('txt')
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
  async convertToTxt(
    @UploadedFile() file: Express.Multer.File,
    @Res() response: Response,
  ) {
    const filename: string = `./src/files/${file.filename}`;
    const fileText: string = fs.readFileSync(filename).toString();

    let txtResult: string = '';
    xml2js.parseString(fileText, (err, result) => {
      if (err) {
        console.error('Error al parsear el archivo XML:', err);
        return;
      }
      txtResult = this.convertingToTxt(result);
    });

    if (!txtResult) {
      console.error('Error al convertir el archivo XML a TXT');
      return;
    }

    const outputFilename = filename.replace('.xml', '.txt');
    fs.writeFileSync(outputFilename, txtResult);

    response.send(txtResult);
  }

  private convertingToTxt(data: any): string {
    // Verifica si el objeto data tiene la estructura adecuada según tu archivo XML
    if (!data || !data.clientes || !data.clientes.cliente) {
      console.error('Estructura de datos XML incorrecta');
      return '';
    }
  
    // Extrae los datos necesarios del objeto data y construye el texto en formato TXT
    const clientes = data.clientes.cliente;
    let txtResult = '';
  
    for (const cliente of clientes) {
      const documento = cliente.documento[0];
      const nombres = cliente.nombres[0];
      const apellidos = cliente.apellidos[0];
      const tarjeta = cliente.tarjeta[0];
      const tipo = cliente.tipo[0];
      const telefono = cliente.telefono[0];
  
      txtResult += `Documento: ${documento}\n`;
      txtResult += `Nombres: ${nombres}\n`;
      txtResult += `Apellidos: ${apellidos}\n`;
      txtResult += `Tarjeta: ${tarjeta}\n`;
      txtResult += `Tipo: ${tipo}\n`;
      txtResult += `Teléfono: ${telefono}\n`;
  
      const poligono = cliente.poligono[0].coordenada;
      for (const coordenada of poligono) {
        txtResult += `Coordenada: ${coordenada}\n`;
      }
  
      txtResult += '\n'; // Agregar una línea en blanco entre cada cliente
    }
  
    return txtResult;
  }
  
}
