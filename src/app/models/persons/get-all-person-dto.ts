export interface GetAllPersonDTO {
    id?: number;
    personIdc?: string;
    personCode?: string;
    personEnglishName?: string;
    personArabicName?: string;
    personShortName?: string;
    personStatus?: number;
    fpcCode?: string;
    private?: boolean;
}