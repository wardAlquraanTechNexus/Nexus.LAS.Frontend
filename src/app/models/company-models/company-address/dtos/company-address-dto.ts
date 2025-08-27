
export interface CompanyAddressDto {
  id: number;
  companyId: number;
  addressPrimary: boolean;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  poBoxNumber?: string;
  poBoxCity?: number;
  poBoxCountry: number;
}