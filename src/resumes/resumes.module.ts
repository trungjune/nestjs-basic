import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResumesController } from './resumes.controller';
import { ResumesService } from './resumes.service';
import { Resume, ResumeSchema } from './schemas/resume.schema';

@Module({
  controllers: [ResumesController],
  providers: [ResumesService],
  imports: [
    MongooseModule.forFeature([{ name: Resume.name, schema: ResumeSchema }]),
  ],
})
export class ResumesModule {}
