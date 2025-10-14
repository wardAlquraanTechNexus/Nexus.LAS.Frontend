import { BaseParam } from "../../../base/base-param";

export interface GetPagingDocumentTrackingActionQuery extends BaseParam {
  documentTrackingId?: number | null;
  actionType?: string | null;
}