
enum FIELDS {
	TASK_ID = 't.task_id',
	USER_ID = 't.user_id',
	CONTENT = 't.content',
	CREATED_AT = 't.created_at',
	UPDATED_AT = 't.updated_at',
}

const TASKS_TABLE = {
	NAME: 'tasks as t',
	FIELDS: { ...FIELDS, ALL: Object.values(FIELDS) },
}

export default TASKS_TABLE