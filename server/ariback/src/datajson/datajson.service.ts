import { Injectable } from '@nestjs/common';

@Injectable()
export class DatajsonService {

  findAll() {
    return `This action returns all datajson`;
  }

  findOne(id: number) {
    return `This action returns a #${id} datajson`;
  }

  remove(id: number) {
    return `This action removes a #${id} datajson`;
  }
}
