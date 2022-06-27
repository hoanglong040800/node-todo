enum USERS_FIELDS {
	USER_ID = 'user_id',
	EMAIL = 'email',
	PASSWORD = 'password',
	DISPLAY_NAME = 'display_name',
	STATUS = 'status',
}

export enum USERS_STATUS {
	ACTIVE = 'ACTIVE',
	ARCHIVED = 'ARCHIVED',
	DEACTIVATED = 'DEACTIVATED',
}

const USERS = {
	NAME: 'users as u',
	FIELDS: { ...USERS_FIELDS, ALL: Object.values(USERS_FIELDS) },
	VALUES: {
		STATUS: USERS_STATUS,
	},
}

enum TASKS_FIELDS {
	TASK_ID = 'task_id',
	USER_ID = 'user_id',
	CONTENT = 'content',
	CREATED_AT = 'created_at',
	UPDATED_AT = 'updated_at',
}

const TASKS = {
	NAME: 'tasks as t',
	FIELDS: { ...TASKS_FIELDS, ALL: Object.values(TASKS_FIELDS) },
}

export const TABLE = {
	USERS,
	TASKS,
}
