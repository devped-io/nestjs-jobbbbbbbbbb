import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { JobDto } from './dto/job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './job.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobsService {
  private readonly jobs: JobDto[] = [];

  constructor(@InjectRepository(Job) private jobsRepository: Repository<Job>) {}

  create(job: Job): Promise<Job> {
    const createdJob = this.jobsRepository.create(job);
    console.log('createdJob: ', createdJob);

    return this.jobsRepository.save(createdJob);
  }

  findByCompany(companyId): Promise<Job[]> {
    return this.jobsRepository
      .createQueryBuilder('job')
      .where('job.companyId = :companyId', { companyId })
      .getMany();
  }

  findAll(): Promise<Job[]> {
    return this.jobsRepository.find();
  }

  findOne(id: string): Promise<Job> {
    return this.jobsRepository.findOne(id);
  }
}
