enum USERS_FIELDS {
	USER_ID = 'u.user_id',
	EMAIL = 'u.email',
	PASSWORD = 'u.password',
	DISPLAY_NAME = 'u.display_name',
	STATUS = 'u.status',
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
	TASK_ID = 't.task_id',
	USER_ID = 't.user_id',
	CONTENT = 't.content',
	CREATED_AT = 't.created_at',
	UPDATED_AT = 't.updated_at',
}



const TASKS = {
	NAME: 'tasks as t',
	FIELDS: { ...TASKS_FIELDS, ALL: Object.values(TASKS_FIELDS) },
}

export const TABLE = {
	USERS,
	TASKS,
}
