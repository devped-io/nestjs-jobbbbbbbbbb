import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Company } from 'src/company/company.entity';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  jobId: number;

  @ManyToOne(
    type => Company,
    company => company.jobs,
  )
  company: Company;

  @Column()
  title: string;

  @Column()
  minEduLevel: string;

  @Column()
  salary: number;
}
