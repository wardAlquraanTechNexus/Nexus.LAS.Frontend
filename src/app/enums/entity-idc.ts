export class EntityIDc {
  static readonly Person = "P";
  static readonly Company = "C";
  static readonly Properties = "R";
  
}

// Define the type based on the values
export type EntityIDcType = typeof EntityIDc.Person | typeof EntityIDc.Company;