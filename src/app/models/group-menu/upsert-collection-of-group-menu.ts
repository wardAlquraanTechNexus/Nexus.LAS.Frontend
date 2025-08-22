export interface UpsertManuCommand {
  id: number;
  isChecked: boolean;
  canInsert: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  access: boolean;
  admin: boolean;
}

export interface UpsertCollectionOfMenusCommand {
  groupId: number;
  menus: UpsertManuCommand[];
}