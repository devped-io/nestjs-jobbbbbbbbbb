import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job } from './job.entity';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Get()
  findAll(): Promise<Job[]> {
    console.log(`Get all jobs`);
    return this.jobsService.findAll();
  }

  @Post()
  async create(@Body() job: Job) {
    const creationResult = await this.jobsService.create(job);

    console.log(`creationResult: `, creationResult);

    return creationResult;
  }
}
