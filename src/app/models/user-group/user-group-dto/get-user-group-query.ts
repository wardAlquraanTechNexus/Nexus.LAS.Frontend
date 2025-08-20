import { BaseParam } from "../../base/base-param";

export interface GetUserGroupDTOQuery extends BaseParam {
    username?: string | null;
    groupName?: string | null;
    userId?: number | null;
    groupId?: number | null;
}

export interface GetAllUserGroupDTOQuery {
    username?: string | null;
    groupName?: string | null;
    userId?: number | null;
    groupId?: number | null;
}