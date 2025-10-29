import { CommonStatus } from "../../enums/common-status";
import { BaseEntity } from "../base/base-entity";

export interface Company extends BaseEntity{
  companyIdc: string;
  id: number;
  companyCode: string;
  incorporationDate?: string; // ISO date string
  companyEnglishName: string;
  companyArabicName: string;
  companyShortName: string;
  companyTypeIdn?: string;
  companyType?: string;
  companyClassIdn?: string;
  companyClass?: string;
  groupCompany?: string;
  relevantCompany?: string;
  legalType?: string;
  cciNumber?: string;
  cciIssueDate?: string; // ISO date string
  cciExpiryDate?: string; // ISO date string
  cciExpiryActiveReminder?: boolean;
  placeOfRegistrationMainIdn?: string;
  placeOfRegistrationMain?: string;
  placeOfRegistrationSubIdn?: string;
  placeOfRegistrationSub?: string;
  capitalAmount?: number;
  totalShares?: number;
  numberOfPartners?: number;
  updateDate?: string; // ISO date string
  updateDescription?: string;
  personsIdn?: number;
  companyStatus: CommonStatus;
  private: boolean; // consider renaming to isPrivate in TS
}
