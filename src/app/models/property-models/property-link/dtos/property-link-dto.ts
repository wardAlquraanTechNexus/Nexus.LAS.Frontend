import { CommonStatus } from "../../../../enums/common-status";

export interface PropertyLinkDTO {
    id: number;
    registerIdc: string;
    registerIdn: number;
    propertyLinksValue: number;
    propertyLinksRemarks?: string;
    locationDetails?: string;
    propertyLinkedStatus?: CommonStatus | null;
    propertyLinkedCode?: string | null;
}