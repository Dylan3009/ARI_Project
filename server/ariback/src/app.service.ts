import { Injectable } from '@nestjs/common';
const path = require('node:path');

import * as fs from 'fs';

const convertToJsonText = (filePath: string): void => {
  const fileContent = fs.readFileSync(filePath, 'utf-8').toString();
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

  fs.writeFileSync("output.txt", txtContent, "utf-8");
  console.log(txtContent);
};

// Ejemplo de uso

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getPathFile(): void {
    const filePath = "./src/files/prueba.json";
    convertToJsonText(filePath);
  }
}
