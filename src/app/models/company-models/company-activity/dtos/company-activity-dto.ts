export interface CompanyActivityDto {
  id: number;
  activity: number;
  companyId: number;
  createdAt:string;
  modifiedAt?:string;
  date?:string;
}