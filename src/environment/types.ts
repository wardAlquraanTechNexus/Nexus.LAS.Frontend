// Shared types for environment configuration to prevent drift between dev and prod

export interface Routes {
  // Core
  dashboard: string;

  // Persons module
  Persons: string;
  AllPersons: string;
  ActivePersons: string;
  ActivePrivatePersons: string;
  ActivePublicPersons: string;
  InactivePersons: string;
  ViewPersons: string;
  AddPerson: string;
  EditPerson: string;
  ViewPersonIdDetail: string;
  ViewPersonOtherDocument: string;

  // Companies module
  Companies: string;
  AllCompanies: string;
  ActiveCompanies: string;
  ActivePrivateCompanies: string;
  ActivePublicCompanies: string;
  InactiveCompanies: string;
  ViewCompanies: string;
  AddCompany: string;
  EditCompany: string;

  // Real Estates module
  RealEstates: string;
  AllRealEstates: string;
  ActiveRealEstates: string;
  ActivePrivateRealEstates: string;
  ActivePublicRealEstates: string;
  InactiveRealEstates: string;
  ViewRealEstates: string;
  AddRealEstate: string;
  EditRealEstate: string;

  // Law Firms module
  LawFirms: string;
  AllLawFirms: string;
  ActiveLawFirms: string;
  ActivePrivateLawFirms: string;
  ActivePublicLawFirms: string;
  InactiveLawFirms: string;
  ViewLawFirms: string;
  AddLawFirm: string;
  EditLawFirm: string;

  // Transactions module
  Transactions: string;
  AllTransactions: string;
  ActiveTransactions: string;
  ActivePrivateTransactions: string;
  ActivePublicTransactions: string;
  InactiveTransactions: string;
  ViewTransactions: string;
  AddTransaction: string;
  EditTransaction: string;

  // FPCs module
  FPCs: string;
  AllFPCs: string;
  ActiveFPCs: string;
  ActivePrivateFPCs: string;
  ActivePublicFPCs: string;
  InactiveFPCs: string;
  ViewFPCs: string;
  AddFpc: string; // note existing casing in current routes
  EditFpc: string;

  // Document Trackings module
  DocumentTrackings: string;
  AllDocumentTrackings: string;
  ActiveDocumentTrackings: string;
  ActivePrivateDocumentTrackings: string;
  ActivePublicDocumentTrackings: string;
  InactiveDocumentTrackings: string;
  ViewDocumentTrackings: string;
  AddDocumentTracking: string;
  EditDocumentTracking: string;

  // Settings
  Setting: string;
  DynamicList: string;
  Menus: string;
  Users: string;
  UserGroups: string;
  Groups: string;
  GroupsMenus: string;
  UserSettings:string;

}

export interface Environment {
  production: boolean;
  serverUrls: {
    host: string;
  };
  routes: Routes;

  rootDynamicLists: {
    nationality:number,
    companyType:number,
    companyClass:number,
    groupCompany:number,
    relevantCompany:number,
    legalType:number,
    placeOfRegistration:number,
    companyActivity:number,
    currencies:number,
    PersonsPhonesTypes: number,
    originalDocumentTypes:number
    otherDocumentType:number;
    companyContractType: number;
  }
}

