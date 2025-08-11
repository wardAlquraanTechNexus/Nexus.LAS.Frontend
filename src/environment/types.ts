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

  // Other modules
  AddRealEstate: string;
  AddLawFirm: string;
  AddTransaction: string;
  AddDocumentTracking: string;
  AddFpc: string;

  // Settings
  Setting: string;
  DynamicList: string;
  Menus: string;
}

export interface Environment {
  production: boolean;
  serverUrls: {
    host: string;
  };
  routes: Routes;
}
