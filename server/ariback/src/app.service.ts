import { Injectable } from '@nestjs/common';
const path = require('node:path');

const openDire = () => {
  var fs = require("fs");
  var text = fs.readFileSync("./src/files/prueba.txt").toString('utf-8');
  var textByLine = text.split("\n");
  console.log(textByLine);
}

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
