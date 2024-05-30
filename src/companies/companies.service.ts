import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose from 'mongoose';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private companiesModel: SoftDeleteModel<CompanyDocument>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const company = await this.companiesModel.create({
      name: createCompanyDto.name,
      address: createCompanyDto.address,
      description: createCompanyDto.description,
    });
    return company;
  }

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return `No user with id: ${id}`;

    return this.companiesModel.findOne({
      _id: id,
    });
  }

  findOneByName(name: string) {
    return this.companiesModel.findOne({
      name: name,
    });
  }

  async update(updateCompanyDto: UpdateCompanyDto) {
    return await this.companiesModel.updateOne(
      {
        _id: updateCompanyDto._id,
      },
      { ...updateCompanyDto },
    );
  }

  remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return `No user with id: ${id}`;

    return this.companiesModel.softDelete({
      _id: id,
    });
  }
}
