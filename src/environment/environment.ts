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
    ViewPersons: 'View-Persons',
    AddPerson: 'Add-Person',
    EditPerson: 'Edit-Person',
    ViewPersonIdDetail: 'Person/View-Person-Id-Detail',
    ViewPersonOtherDocument: 'Person/View-Person-Other-Document',

    // Companies module
    Companies: 'Companies',
    AllCompanies: 'All-Companies',
    ActiveCompanies: 'Active-Companies',
    ActivePrivateCompanies: 'Active-Private-Companies',
    ActivePublicCompanies: 'Active-Public-Companies',
    InactiveCompanies: 'Inactive-Companies',
    ViewCompanies: 'View-Companies',
    AddCompany: 'Add-Company',
    EditCompany: 'Edit-Company',

    // Real Estates module
    RealEstates: 'Real-Estates',
    AllRealEstates: 'All-Real-Estates',
    ActiveRealEstates: 'Active-Real-Estates',
    ActivePrivateRealEstates: 'Active-Private-Real-Estates',
    ActivePublicRealEstates: 'Active-Public-Real-Estates',
    InactiveRealEstates: 'Inactive-Real-Estates',
    ViewRealEstates: 'View-Real-Estates',
    AddRealEstate: 'Real-Estates/Add-Real-Estate',
    EditRealEstate: 'Real-Estates/Edit-Real-Estate',

    // Law Firms module
    LawFirms: 'Law-Firms',
    AllLawFirms: 'All-Law-Firms',
    ActiveLawFirms: 'Active-Law-Firms',
    ActivePrivateLawFirms: 'Active-Private-Law-Firms',
    ActivePublicLawFirms: 'Active-Public-Law-Firms',
    InactiveLawFirms: 'Inactive-Law-Firms',
    ViewLawFirms: 'View-Law-Firms',
    AddLawFirm: 'Law-Firms/Add-Law-Firm',
    EditLawFirm: 'Law-Firms/Edit-Law-Firm',

    // Transactions module
    Transactions: 'Transactions',
    AllTransactions: 'All-Transactions',
    ActiveTransactions: 'Active-Transactions',
    ActivePrivateTransactions: 'Active-Private-Transactions',
    ActivePublicTransactions: 'Active-Public-Transactions',
    InactiveTransactions: 'Inactive-Transactions',
    ViewTransactions: 'View-Transactions',
    AddTransaction: 'Transactions/Add-Transaction',
    EditTransaction: 'Transactions/Edit-Transaction',

    // FPCs module
    FPCs: 'FPCs',
    AllFPCs: 'All-FPCs',
    ActiveFPCs: 'Active-FPCs',
    ActivePrivateFPCs: 'Active-Private-FPCs',
    ActivePublicFPCs: 'Active-Public-FPCs',
    InactiveFPCs: 'Inactive-FPCs',
    ViewFPCs: 'View-FPCs',
    AddFpc: 'FPCs/Add-FPC',
    EditFpc: 'FPCs/Edit-FPC',

    // Document Trackings module
    DocumentTrackings: 'Document-Trackings',
    AllDocumentTrackings: 'All-Document-Trackings',
    ActiveDocumentTrackings: 'Active-Document-Trackings',
    ActivePrivateDocumentTrackings: 'Active-Private-Document-Trackings',
    ActivePublicDocumentTrackings: 'Active-Public-Document-Trackings',
    InactiveDocumentTrackings: 'Inactive-Document-Trackings',
    ViewDocumentTrackings: 'View-Document-Trackings',
    AddDocumentTracking: 'Document-Trackings/Add-Document-Tracking',
    EditDocumentTracking: 'Document-Trackings/Edit-Document-Tracking',

    // Settings
    Setting: 'Settings',
    DynamicList: 'Dynamic-List',
    Menus: 'Menus',
    Users: 'Users',
    UserGroups: 'User-Groups',
    Groups: 'Groups',
    GroupsMenus: 'GroupsMenus',
    UserSettings: "User-Settings"
  },

  rootDynamicLists: {
    nationality: 1010,
    companyType: 1008,
    companyClass: 1006,
    groupCompany: 1004,
    relevantCompany: 1032,
    legalType: 1005,
    placeOfRegistration: 1025,
    companyActivity: 1001,
    currencies: 1011,
    PersonsPhonesTypes: 1024,
    originalDocumentTypes: 1018,
    otherDocumentType: 1023,
    companyContractType: 1003,
    rule : 1033,
    boardPosition: 1000
  }
} as const;