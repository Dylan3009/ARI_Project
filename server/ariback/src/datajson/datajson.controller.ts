import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatajsonService } from './datajson.service';
import { CreateDatajsonDto } from './dto/create-datajson.dto';
import { UpdateDatajsonDto } from './dto/update-datajson.dto';

@Controller('datajson')
export class DatajsonController {
  constructor(private readonly datajsonService: DatajsonService) {}

  @Post()
  create(@Body() createDatajsonDto: CreateDatajsonDto) {
    return this.datajsonService.create(createDatajsonDto);
  }

  @Get()
  findAll() {
    return this.datajsonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.datajsonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDatajsonDto: UpdateDatajsonDto) {
    return this.datajsonService.update(+id, updateDatajsonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datajsonService.remove(+id);
  }
}
