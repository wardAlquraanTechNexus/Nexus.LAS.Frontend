import { CommonStatus } from "../../../../enums/common-status";

export interface PropertyDTO {
    id: number;

    code: string;

    typeOfTitle?: string | null;
    grantor: boolean;
    grantorAddress?: string | null;
    grantorTitleCommencementDate?: string | null; // use string to hold ISO date from API
    grantorTitleExpiryDate?: string | null;
    grantorTitleExpiryActiveReminder: boolean;
    grantorDescription?: string | null;

    locationCountryId?: number | null;
    locationCityId?: number | null;
    locationAreaId?: number | null;
    locationDetails?: string | null;

    type?: number | null;
    purpose?: number | null;
    legalStatuses?: string | null; // comma-separated values
    legalStatusIds?: number[] | null;

    status?: CommonStatus | null | string;
    private: boolean;

    plot?: string | null;
    plotFArea?: string | null;
    plotMArea?: string | null;
    propertyFArea?: string | null;
    propertyMArea?: string | null;

    createdBy?: string;
    createdAt?: string;
    modifiedBy?: string | null;
    modifiedAt?: string | null;
}