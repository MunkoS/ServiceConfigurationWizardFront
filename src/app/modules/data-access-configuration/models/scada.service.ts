export type IdentifyUserResult = {
  serverRandValue?: string;
};

export type AuthUserRequest = {
  serverRandValue?: string;
  authPacket?: string;
  clientInitSequence?: string;
};

export type AuthUserResult = {
  jwt?: string;
  errorMessage?: string;
};

export type PermissionDto = {
  permissionId?: string;

  permissionName?: string;

  scope?: string;
};

export type RoleDto = {
  roleId: string;

  roleName: string;

  permissions: PermissionDto[];
};

export type UserDto = {
  userId: string;

  name: string;

  email?: string;

  phoneNumber?: string;

  lockoutEndDateUtc?: Date;

  // eslint-disable-next-line no-use-before-define
  groups?: GroupDto[];
};

export type GroupDto = {
  groupId: string;

  groupName: string;

  roles: RoleDto[];

  users: UserDto[];

  objectsIds: string[];
};

export type RoleAddParams = {
  permissionsIds: string[];
  roleName: string;
};

export type GroupAddParams = {
  name: string;
  objectsIds?: string[];
  rolesIds: string[];
  usersIds?: string[];
};

export type UserSaveDto = {
  name: string;
  passwordHash?: string;
  groupsIds?: Array<string>;
};
