import { Injectable } from '@nestjs/common';
const path = require('node:path');
import * as fs from 'fs';


interface Cliente {
  documento: string;
  nombres: string;
  apellidos: string;
  tarjeta: string;
  tipo: string;
  telefono: string;
  poligono: string[];
}

const openDire = () => {
  const filename: string = './src/files/prueba.txt';
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
};

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


@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getPathFile(): void {
    openDire();
    console.log(__filename);
  }
}
