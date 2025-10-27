import { BaseParam } from "../../base/base-param";

export interface GetAllMenusByGroupQuery extends BaseParam{
    groupId?: number | null;
}