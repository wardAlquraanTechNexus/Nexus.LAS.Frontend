import type { Environment } from './types';

export const environment: Environment = {
  production: true,
  serverUrls: {
      host: 'https://localhost:44325/api/'
  },
  routes:{
    // Keep keys and structure consistent with environment.ts
    dashboard: "dashboard",

    // Persons module
    Persons: 'Persons',
    AllPersons: 'All-Persons',
    ActivePersons: 'Active-Persons',
    ActivePrivatePersons: 'Active-Private-Persons',
    ActivePublicPersons: 'Active-Public-Persons',
    InactivePersons: 'Inactive-Persons',
    ViewPersons: 'view',
    AddPerson: 'add-Person',
    EditPerson: 'edit-Person',
    ViewPersonIdDetail: 'person/view-person-id-detail',
    ViewPersonOtherDocument: 'person/view-person-other-document',

    // Companies module
    Companies: 'Companies',
    AllCompanies: 'All-Companies',
    ActiveCompanies: 'Active-Companies',
    ActivePrivateCompanies: 'Active-Private-Companies',
    ActivePublicCompanies: 'Active-Public-Companies',
    InactiveCompanies: 'Inactive-Companies',
    ViewCompanies: 'view-Companies',
    AddCompany: 'add-Company',
    EditCompany: 'edit-Company',

    // Other modules
    AddRealEstate: 'Real-Estates/add-real-estate',
    AddLawFirm: 'law-firms/add-law-firm',
    AddTransaction: 'transactions/add-transaction',
    AddDocumentTracking: 'document-trackings/add-document-tracking',
    AddFpc: 'FPCs/add-FPC',

    // Settings
    Setting: 'Settings',
    DynamicList: 'Dynamic-List',
    Menus: 'Menus',

  }
} as const;