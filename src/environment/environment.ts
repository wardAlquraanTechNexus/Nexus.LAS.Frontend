import type { Environment } from './types';

export const environment: Environment = {
  production: false,
  serverUrls: {
    host: 'https://localhost:44325/api/'
  },
  routes: {
    // Core
    dashboard: 'Dashboard',

    // Persons module
    Persons: 'Persons',
    AllPersons: 'All-persons',
    ActivePersons: 'Active-persons',
    ActivePrivatePersons: 'Active-private-persons',
    ActivePublicPersons: 'Active-public-persons',
    InactivePersons: 'Inactive-persons',
    ViewPersons: 'View-persons',
    AddPerson: 'Add-person',
    EditPerson: 'Edit-person',
    ViewPersonIdDetail: 'Person/view-person-id-detail',
    ViewPersonOtherDocument: 'Person/view-person-other-document',

    // Companies module
    Companies: 'Companies',
    AllCompanies: 'All-companies',
    ActiveCompanies: 'Active-companies',
    ActivePrivateCompanies: 'Active-private-companies',
    ActivePublicCompanies: 'Active-public-companies',
    InactiveCompanies: 'Inactive-companies',
    ViewCompanies: 'View-companies',
    AddCompany: 'Add-company',
    EditCompany: 'Edit-company',

    // Real Estates module
    RealEstates: 'Real-estates',
    AllRealEstates: 'All-real-estates',
    ActiveRealEstates: 'Active-real-estates',
    ActivePrivateRealEstates: 'Active-private-real-estates',
    ActivePublicRealEstates: 'Active-public-real-estates',
    InactiveRealEstates: 'Inactive-real-estates',
    ViewRealEstates: 'View-real-estates',
    AddRealEstate: 'Real-estates/add-real-estate',
    EditRealEstate: 'Real-estates/edit-real-estate',

    // Law Firms module
    LawFirms: 'Law-firms',
    AllLawFirms: 'All-law-firms',
    ActiveLawFirms: 'Active-law-firms',
    ActivePrivateLawFirms: 'Active-private-law-firms',
    ActivePublicLawFirms: 'Active-public-law-firms',
    InactiveLawFirms: 'Inactive-law-firms',
    ViewLawFirms: 'View-law-firms',
    AddLawFirm: 'Law-firms/add-law-firm',
    EditLawFirm: 'Law-firms/edit-law-firm',

    // Transactions module
    Transactions: 'Transactions',
    AllTransactions: 'All-transactions',
    ActiveTransactions: 'Active-transactions',
    ActivePrivateTransactions: 'Active-private-transactions',
    ActivePublicTransactions: 'Active-public-transactions',
    InactiveTransactions: 'Inactive-transactions',
    ViewTransactions: 'View-transactions',
    AddTransaction: 'Transactions/add-transaction',
    EditTransaction: 'Transactions/edit-transaction',

    // FPCs module
    FPCs: 'Fpcs',
    AllFPCs: 'All-fpcs',
    ActiveFPCs: 'Active-fpcs',
    ActivePrivateFPCs: 'Active-private-fpcs',
    ActivePublicFPCs: 'Active-public-fpcs',
    InactiveFPCs: 'Inactive-fpcs',
    ViewFPCs: 'View-fpcs',
    AddFpc: 'Fpcs/add-fpc',
    EditFpc: 'Fpcs/edit-fpc',

    // Document Trackings module
    DocumentTrackings: 'Document-trackings',
    AllDocumentTrackings: 'All-document-trackings',
    ActiveDocumentTrackings: 'Active-document-trackings',
    ActivePrivateDocumentTrackings: 'Active-private-document-trackings',
    ActivePublicDocumentTrackings: 'Active-public-document-trackings',
    InactiveDocumentTrackings: 'Inactive-document-trackings',
    ViewDocumentTrackings: 'View-document-trackings',
    AddDocumentTracking: 'Document-trackings/add-document-tracking',
    EditDocumentTracking: 'Document-trackings/edit-document-tracking',

    // Settings
    Setting: 'Settings',
    DynamicList: 'Dynamic-list',
    Menus: 'Menus',
    Users: 'Users',
    UserGroups: 'User-groups',
    Groups: 'Groups',
    GroupsMenus: 'Groups-menus',
    UserSettings: "User-settings"
  },

  rootDynamicLists: {
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
    boardPosition: 1000,
    designation : 1012,
    country: 1010,
    classOfShares: 1053,
  }
} as const;