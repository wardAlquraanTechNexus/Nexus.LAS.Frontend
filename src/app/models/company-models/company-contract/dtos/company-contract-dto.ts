export interface CompanyContractDto {
    id: number;
    companyId: number;
    contractType: number;
    documentDate?: string;
    commencementDate?: string;
    contractExpiryDate?: string;
    contractExpiryActiveReminder?: boolean;
    contractDescription?: string;
    contractStatus?: number | null;
    contentType?: string;
    dataFile?: number[];
    imageUrl?: any;
    file?:any;
    fileName?:string;
}
