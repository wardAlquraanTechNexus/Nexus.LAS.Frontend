export const environment = {
  production: false,
  serverUrls: {
      host: 'https://localhost:44325/api/'
  },
  routes:{
    dashboard : "dashboard",
    AllPersons : 'Persons/All-Persons',
    ActivePersons : 'Persons/Active-Persons',
    ViewPersons : 'Persons/view',
    AddPerson : 'Persons/add-Person',
    EditPerson : 'Persons/edit-Person',
    ActivePrivatePersons: "Persons/Active-private-Persons",
    AddCompany : 'Companies/add-Company',
    AddRealEstate : 'Real-Estates/add-real-estate',
    AddLawFirm : "law-firms/add-law-firm",
    AddTransaction : "transactions/add-transaction",
    AddDocumentTracking : 'document-trackings/add-document-tracking',
    AddFpc : 'FPCs/add-FPC',
    ViewPersonIdDetail : 'person/view-person-id-detail',
    ViewPersonOtherDocument : 'person/view-person-other-document',


  }
};