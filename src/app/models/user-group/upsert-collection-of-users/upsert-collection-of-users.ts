export interface UpsertUserCommand {
  id: number;
  isChecked: boolean;
}

export interface UpsertCollectionOfUsersCommand {
  groupId: number;
  users: UpsertUserCommand[];
}