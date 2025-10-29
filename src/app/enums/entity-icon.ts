import { EntityIDc } from "./entity-idc";

export const entityIcons : { [key: string]: string } = {
    [EntityIDc.Person]: 'person',
    [EntityIDc.Company]: 'business',
    [EntityIDc.Properties]: 'home_work',
    [EntityIDc.LawFirm]: 'gavel',
    [EntityIDc.FPCs]: 'business_center',
    [EntityIDc.Transactions]: 'swap_horiz',
    [EntityIDc.DocumentTracking]: 'track_changes',
    [EntityIDc.Group]: 'groups'
  };