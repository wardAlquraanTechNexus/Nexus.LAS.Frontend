import { BaseParam } from "../../../base/base-param";

export interface GetPropertyDocumentQuery extends BaseParam {
    propertyId?: number | null;
    id?: number | null;
}
