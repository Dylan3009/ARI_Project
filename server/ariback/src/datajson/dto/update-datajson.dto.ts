import { PartialType } from '@nestjs/mapped-types';
import { CreateDatajsonDto } from './create-datajson.dto';

export class UpdateDatajsonDto extends PartialType(CreateDatajsonDto) {}
