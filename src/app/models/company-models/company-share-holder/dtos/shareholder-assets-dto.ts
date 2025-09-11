export interface ShareholderAssetsDto {
    companyName: string;
    sharesCount: number;
    ownedSahresCount: number;
    date?: Date;
    sharePercentage?: number;
    isActive: boolean;
}