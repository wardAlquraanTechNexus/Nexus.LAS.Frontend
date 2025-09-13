import { Direction } from "@angular/cdk/bidi";
import { LanguageCode } from "../../../models/types/lang-type";

export interface Language {
  name: string; 
  value: LanguageCode; 
  dir: Direction
}