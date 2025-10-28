export interface LawFirmBranchDto {
  id: number;
  lawFirmId: number;
  branchName?: string;
  countryId?: number | null;
  city?: number | null;
  phone1?: string;
  phone2?: string;
  phone3?: string;
  fax?: string;
  email1?: string;
  email2?: string;
  branchPrimary: boolean;
}