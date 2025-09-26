export interface LawFirmDTO {
    id: number;
    lawFirmCode: string;
    englishName: string;
    arabicName: string;
    shortName: string;
    status: string;
    lasDate?: string | null;
    estYear?: number | null;
    website?: string | null;
    private: boolean;
    createdBy?: string;
    createdAt?: string;
    modifiedBy?: string | null;
    modifiedAt?: string | null;
}
