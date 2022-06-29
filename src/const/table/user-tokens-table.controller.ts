enum FIELDS {
	REFRESH_TOKEN = 'ut.refresh_token',
	ACCESS_TOKEN = 'ut.access_token',
	ACCESS_TOKEN_EXPIRE = 'ut.access_token_expire',
	REFRESH_TOKEN_EXPIRE = 'ut.refresh_token_expire',
	CREATED_AT = 'ut.created_at',
	UPDATED_AT = 'ut.updated_at',
}

const USER_TOKENS_TABLE = {
	NAME: 'user_tokens as ut',
	FIELDS: { ...FIELDS, ALL: Object.values(FIELDS) },
}

export default USER_TOKENS_TABLE
