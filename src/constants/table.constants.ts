interface ITable {
  NAME: string
  FIELDS: {
    ALL: Array<string>
  }
  VALUES?: any
}

enum USERS_FIELDS {
  ID = 'u.id',
  EMAIL = 'u.email',
  PASSWORD = 'u.password',
  DISPLAY_NAME = 'u.display_name as displayName',
  STATUS = 'u.status',
}

export enum USERS_STATUS {
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
  DEACTIVATED = 'DEACTIVATED',
}

const USERS: ITable = {
  NAME: 'users as u',
  FIELDS: { ...USERS_FIELDS, ALL: Object.values(USERS_FIELDS) },
  VALUES: {
    STATUS: USERS_STATUS,
  },
}

export const TABLE = {
  USERS,
}
