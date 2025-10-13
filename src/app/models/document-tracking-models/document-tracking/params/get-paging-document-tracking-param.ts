import { BaseParam } from '../../../base/base-param';

export interface GetPagingDocumentTrackingQuery extends BaseParam {
  id?: number | null;
  searchBy?: string | null;
  documentTrackingCode?: string | null;
  referenceNumber?: string | null;
  personId?: number | null;
  registerIdc?: string | null;
  registerIdn?: number | null;
}
