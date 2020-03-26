export class Recruiter {}
export class Company {}
export class ResolvedJobDto {
  id: string;
  recruiter: Recruiter;
  company: Company;
  title: string;
  salary: number;
  min_edu_level?: any;
  years_of_exp?: number;
  employment_type: string;
  sex?: string;
  responsibility: string;
  open_positions: number;
  status: string;
  age_range?: string;
  workday?: number[];
  day_off?: number[];
  is_remote?: boolean;
  working_hours?: number;
  is_urgent?: boolean;
}
