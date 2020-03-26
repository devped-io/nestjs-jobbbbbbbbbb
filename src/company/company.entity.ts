import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm';
import { Job } from 'src/jobs/job.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  companyId: number;

  @Column()
  name: string;

  @OneToMany(
    type => Job,
    job => job.company,
  )
  jobs: Job[];
}
