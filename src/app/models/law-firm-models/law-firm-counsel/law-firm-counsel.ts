import { BaseEntity } from "../../base/base-entity";

export interface LawFirmCounsel extends BaseEntity {
  id: number;
  lawFirmId: number;
  counselName: string;
  counselLevel: number;
  rate: number;
}
