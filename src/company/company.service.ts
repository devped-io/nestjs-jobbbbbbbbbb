import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { Repository } from 'typeorm';
import { Job } from 'src/jobs/job.entity';
import { JobsService } from 'src/jobs/jobs.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    private jobsService: JobsService,
  ) {}

  findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  findOne(id: string): Promise<Company> {
    return this.companyRepository.findOne(id);
  }

  findAllJobs(id): Promise<Job[]> {
    return this.jobsService.findByCompany(id);
  }

  create(companyInfo: Company): Promise<Company> {
    const createdCompany: Company = this.companyRepository.create(companyInfo);

    return this.companyRepository.save(createdCompany);
  }
}
