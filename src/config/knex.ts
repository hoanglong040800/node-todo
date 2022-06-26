import knex from 'knex'

const env = process.env.ENVIRONMENT || 'development'
const config = require('../../knexfile')[env]
const db = knex(config)

export default db
