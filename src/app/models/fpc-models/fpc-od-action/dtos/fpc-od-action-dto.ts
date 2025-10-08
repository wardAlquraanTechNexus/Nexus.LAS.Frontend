export interface FPCODActionDto {
  id: number;
  fpcOdIdn: number;
  actionType?: number | null;
  actionDate?: string | null;
  actionDescription?: string | null;
}