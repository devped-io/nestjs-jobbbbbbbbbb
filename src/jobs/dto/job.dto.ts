export class JobDto {
  id: string;
  recruiter_id: string;
  company_id: string;
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
