import { USER_STATUS } from 'const'
import { ROLES } from 'auth/index'

enum FIELDS {
	USER_ID = 'u.user_id',
	EMAIL = 'u.email',
	PASSWORD = 'u.password',
	DISPLAY_NAME = 'u.display_name',
	STATUS = 'u.status',
	ROLE = 'u.role',
}

const USERS_TABLE = {
	NAME: 'users as u',
	FIELDS: { ...FIELDS, ALL: Object.values(FIELDS) },
	VALUES: {
		STATUS: USER_STATUS,
		ROLE: ROLES,
	},
}

export default USERS_TABLE
