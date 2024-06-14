import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DatabasesService } from './databases.service';
@ApiTags('databases')
@Controller('databases')
export class DatabasesController {
  constructor(private readonly databasesService: DatabasesService) {}
}
