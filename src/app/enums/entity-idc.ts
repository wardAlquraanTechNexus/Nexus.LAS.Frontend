export class EntityIDc {
  static readonly Person = "P";
  static readonly Company = "C";
  static readonly Properties = "R";
  static readonly LawFirm = "LF";

  
}

// Define the type based on the values
export type EntityIDcType = typeof EntityIDc.Person | typeof EntityIDc.Company;