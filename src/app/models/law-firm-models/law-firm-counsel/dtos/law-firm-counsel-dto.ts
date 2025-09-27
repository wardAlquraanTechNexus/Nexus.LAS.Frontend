export interface LawFirmCounselDto {
  id: number;
  lawFirmId: number;
  counselName?: string | null;
  counselLevel?: number | null;
  rate?: number ;
}
