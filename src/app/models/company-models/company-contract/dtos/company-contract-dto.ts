import { FileDto } from "../../../base/file-dto";

export interface CompanyContractDto extends FileDto {
    id: number;
    companyId: number;
    contractType: number;
    documentDate?: string;
    commencementDate?: string;
    contractExpiryDate?: string;
    contractExpiryActiveReminder?: boolean;
    contractDescription?: string;
    contractStatus?: number | null;
}
