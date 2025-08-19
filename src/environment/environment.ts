import type { Environment } from './types';

export const environment: Environment = {
  production: false,
  serverUrls: {
    host: 'https://localhost:44325/api/'
  },
  routes: {
    // Core
    dashboard: 'dashboard',

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
    AllCompanies: 'all-companies',
    ActiveCompanies: 'Active-Companies',
    ActivePrivateCompanies: 'Active-Private-Companies',
    ActivePublicCompanies: 'Active-Public-Companies',
    InactiveCompanies: 'Inactive-Companies',
    ViewCompanies: 'view-Companies',
    AddCompany: 'add-Company',
    EditCompany: 'edit-Company',

    // Real Estates module
    RealEstates: 'Real-Estates',
    AllRealEstates: 'All-Real-Estates',
    ActiveRealEstates: 'Active-Real-Estates',
    ActivePrivateRealEstates: 'Active-Private-Real-Estates',
    ActivePublicRealEstates: 'Active-Public-Real-Estates',
    InactiveRealEstates: 'Inactive-Real-Estates',
    ViewRealEstates: 'view-Real-Estates',
    AddRealEstate: 'Real-Estates/add-real-estate',
    EditRealEstate: 'Real-Estates/edit-real-estate',

    // Law Firms module
    LawFirms: 'law-firms',
    AllLawFirms: 'all-law-firms',
    ActiveLawFirms: 'active-law-firms',
    ActivePrivateLawFirms: 'active-private-law-firms',
    ActivePublicLawFirms: 'active-public-law-firms',
    InactiveLawFirms: 'inactive-law-firms',
    ViewLawFirms: 'view-law-firms',
    AddLawFirm: 'law-firms/add-law-firm',
    EditLawFirm: 'law-firms/edit-law-firm',

    // Transactions module
    Transactions: 'transactions',
    AllTransactions: 'all-transactions',
    ActiveTransactions: 'active-transactions',
    ActivePrivateTransactions: 'active-private-transactions',
    ActivePublicTransactions: 'active-public-transactions',
    InactiveTransactions: 'inactive-transactions',
    ViewTransactions: 'view-transactions',
    AddTransaction: 'transactions/add-transaction',
    EditTransaction: 'transactions/edit-transaction',

    // FPCs module
    FPCs: 'FPCs',
    AllFPCs: 'All-FPCs',
    ActiveFPCs: 'Active-FPCs',
    ActivePrivateFPCs: 'Active-Private-FPCs',
    ActivePublicFPCs: 'Active-Public-FPCs',
    InactiveFPCs: 'Inactive-FPCs',
    ViewFPCs: 'view-FPCs',
    AddFpc: 'FPCs/add-FPC',
    EditFpc: 'FPCs/edit-FPC',

    // Document Trackings module
    DocumentTrackings: 'document-trackings',
    AllDocumentTrackings: 'all-document-trackings',
    ActiveDocumentTrackings: 'active-document-trackings',
    ActivePrivateDocumentTrackings: 'active-private-document-trackings',
    ActivePublicDocumentTrackings: 'active-public-document-trackings',
    InactiveDocumentTrackings: 'inactive-document-trackings',
    ViewDocumentTrackings: 'view-document-trackings',
    AddDocumentTracking: 'document-trackings/add-document-tracking',
    EditDocumentTracking: 'document-trackings/edit-document-tracking',

    // Settings
    Setting: 'Settings',
    DynamicList: 'Dynamic-List',
    Menus: 'Menus',
    Users: 'Users',
    UserGroups: 'User-Groups',
    Groups: 'Groups',
    GroupsMenus: 'GroupsMenus'
  },

  rootDynamicLists: {
    nationality: 1036,
    companyType: 1008,
    companyClass: 1006,
    groupCompany: 1004,
    relevantCompany: 1032,
    legalType: 1005,
    placeOfRegistration: 1025
  }
} as const;