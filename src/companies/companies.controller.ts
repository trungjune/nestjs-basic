import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.inteface';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  create(@Body() createUserDto: CreateCompanyDto, @User() user: IUser) {
    return this.companiesService.create(createUserDto, user);
  }

  @Get()
  @ResponseMessage('Fetch List Company with paginate')
  findAll(
    @Query('page') currentPage: string, //const currentPage:string = req.query.page
    @Query('limit') limit: string,
    @Query() qs: string,
  ) {
    return this.companiesService.findAll(+currentPage, +limit, qs);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateCompanyDto,
    @User() user: IUser,
  ) {
    return this.companiesService.update(id, updateUserDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.companiesService.remove(id, user);
  }
}
