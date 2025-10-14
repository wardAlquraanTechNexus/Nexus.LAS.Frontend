export interface DocumentTrackingActionDto {
  id: number;
  documentTrackingId?: number | null;
  actionType?: string | null;
  actionDate?: string | null;
  actionDescription?: string | null;
}