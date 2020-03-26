import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { Job } from 'src/jobs/job.entity';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get()
  findAll(): Promise<Company[]> {
    return this.companyService.findAll();
  }

  @Post()
  create(@Body() companyInfo: Company): Promise<Company> {
    return this.companyService.create(companyInfo);
  }

  @Get('/:companyId')
  findOne(@Param('companyId') companyId: string): Promise<Company> {
    return this.companyService.findOne(companyId);
  }

  @Get('/:companyId/jobs')
  findAllJobs(@Param('companyId') companyId: string): Promise<Job[]> {
    return this.companyService.findAllJobs(companyId);
  }
}
