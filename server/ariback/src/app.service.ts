import { Injectable } from '@nestjs/common';

const openDire = () => {
  var fs = require("fs");
  var text = fs.readFileSync("./src/files/prueba.txt").toString('utf-8');
  var textByLine = text.split("\n");
  console.log(textByLine);
}

@Injectable()
export class AppService {
  getHello(): string {
    openDire();
    return 'Hello World!';
  }
}
