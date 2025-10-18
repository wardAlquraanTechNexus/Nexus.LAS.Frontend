export class EntityIDc {
  static readonly Person = "P";
  static readonly Company = "C";
  static readonly Properties = "R";
  static readonly LawFirm = "LF";
  static readonly Transactions = "T";
  static readonly FPCs = "F";
  static readonly DocumentTracking = "D";
  static readonly PersonIdDetail = "PID";
  static readonly CompaniesChamberOfCommerces = "CCOC";
  static readonly CompaniesLicenseIDC = "CL";
  static readonly CompaniesContracts = "CLC";
  static readonly PropertyDocuments = "PD";
}

// Define the type based on the values
export type EntityIDcType = typeof EntityIDc.Person | typeof EntityIDc.Company;