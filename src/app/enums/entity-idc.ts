export class EntityIDc {
  static readonly Person = "P";
  static readonly Company = "C";
  static readonly Properties = "R";
  static readonly LawFirm = "LF";
  static readonly Transactions = "T";
  static readonly FPCs = "F";

  
}

// Define the type based on the values
export type EntityIDcType = typeof EntityIDc.Person | typeof EntityIDc.Company;