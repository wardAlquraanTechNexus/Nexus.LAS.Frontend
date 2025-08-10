import type { Environment } from './types';

export const environment: Environment = {
  production: false,
  serverUrls: {
      host: 'https://localhost:44325/api/'
  },
   

  routes:{
  // Keep keys and structure consistent with environment.ts
  dashboard : "dashboard",

  // Persons module
  Persons: 'Persons',
  AllPersons : 'All-Persons',
  ActivePersons : 'Active-Persons',
  ActivePrivatePersons: 'Active-private-Persons',
  ActivePublicPersons: 'Active-private-Persons',
  ViewPersons : 'view',
  AddPerson : 'add-Person',
  EditPerson : 'edit-Person',
  NotActivePersons: 'Active-Persons',
  ViewPersonIdDetail : 'person/view-person-id-detail',
  ViewPersonOtherDocument : 'person/view-person-other-document',

  // Companies module
  Companies: 'Companies',
  AllCompanies: 'all-companies',
  ActiveCompanies: 'all-companies',
  ActivePrivateCompanies: 'all-companies',
  ActivePublicCompanies: 'all-companies',
  ViewCompanies: 'all-companies',
  AddCompany: 'add-Company',
  EditCompany: 'all-companies',

  // Other modules
  AddRealEstate : 'Real-Estates/add-real-estate',
  AddLawFirm : 'law-firms/add-law-firm',
  AddTransaction : 'transactions/add-transaction',
  AddDocumentTracking : 'document-trackings/add-document-tracking',
  AddFpc : 'FPCs/add-FPC',

  // Settings
  Setting: 'Settings',
  DynamicList: 'Dynamic-List',
  Menus: 'Menus',
  }
} as const;