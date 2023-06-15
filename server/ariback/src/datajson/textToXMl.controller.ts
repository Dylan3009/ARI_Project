import { Controller, Get, Post, Req, Res, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { Express } from 'express';
import * as multer from 'multer';
import { extname, join } from 'path';
//import * as path from 'path';

interface Cliente {
    documento: string;
    nombres: string;
    apellidos: string;
    tarjeta: string;
    tipo: string;
    telefono: string;
    poligono: string[];
  }

  const generateXML = (clientes: Cliente[]): string => {
    let xml = '<clientes>\n';
  
    for (const cliente of clientes) {
      xml += '  <cliente>\n';
      xml += `    <documento>${cliente.documento}</documento>\n`;
      xml += `    <nombres>${cliente.nombres}</nombres>\n`;
      xml += `    <apellidos>${cliente.apellidos}</apellidos>\n`;
      xml += `    <tarjeta>${cliente.tarjeta}</tarjeta>\n`;
      xml += `    <tipo>${cliente.tipo}</tipo>\n`;
      xml += `    <telefono>${cliente.telefono}</telefono>\n`;
      xml += `    <poligono>\n`;
  
      for (const coordenada of cliente.poligono) {
        xml += `      <coordenada>${coordenada}</coordenada>\n`;
      }
  
      xml += '    </poligono>\n';
      xml += '  </cliente>\n';
    }
  
    xml += '</clientes>';
  
    return xml;
  };

@Controller('convert')
export class TextXmlController {

    @Post('text/xml')
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
        const fileText: string = fs.readFileSync(filename).toString();
        const allLines: string[] = fileText.split('\r\n');
      
        const clientes: Cliente[] = [];
      
        // Saltar la primera línea que contiene los encabezados
        for (let i = 1; i < allLines.length; i++) {
          const line = allLines[i];
          if (line.trim() !== '') {
            const values: string[] = line.split(',');
      
            const cliente: Cliente = {
              documento: values[0],
              nombres: values[1],
              apellidos: values[2],
              tarjeta: values[3],
              tipo: values[4],
              telefono: values[5],
              poligono: values.slice(6).map((coordenada) => `<${coordenada}>`)
            };
      
            clientes.push(cliente);
          }
        }
      
        const xmlClientes = generateXML(clientes);
        console.log(xmlClientes);
        response.send(xmlClientes);
      };  
    }

