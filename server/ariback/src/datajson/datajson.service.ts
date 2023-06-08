import { Injectable } from '@nestjs/common';
import { CreateDatajsonDto } from './dto/create-datajson.dto';
import { UpdateDatajsonDto } from './dto/update-datajson.dto';

@Injectable()
export class DatajsonService {
  create(createDatajsonDto: CreateDatajsonDto) {
    return 'This action adds a new datajson';
  }

  findAll() {
    return `This action returns all datajson`;
  }

  findOne(id: number) {
    return `This action returns a #${id} datajson`;
  }

  update(id: number, updateDatajsonDto: UpdateDatajsonDto) {
    return `This action updates a #${id} datajson`;
  }

  remove(id: number) {
    return `This action removes a #${id} datajson`;
  }
}
