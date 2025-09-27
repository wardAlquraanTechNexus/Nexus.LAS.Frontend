import { CommonStatus } from "../../../../enums/common-status";

export interface LawFirmDTO {
    id: number;
    lawFirmCode: string;
    englishName: string;
    arabicName: string;
    shortName: string;
    status?: CommonStatus | null;
    lasDate?: string | null;
    estYear?: number | null;
    website?: string | null;
    private: boolean;
    createdBy?: string;
    createdAt?: string;
    modifiedBy?: string | null;
    modifiedAt?: string | null;
    countryId?:  number | null;
}
