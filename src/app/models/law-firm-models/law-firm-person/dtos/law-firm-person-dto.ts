export interface LawFirmPersonDto {
  id: number;
  lawFirmId: number;
  staffLevel?: number;
  name?: string;
  practice?: string;
  email?: string;
  phone?: string;
  staffStatus?: boolean;
}