import knex from 'knex'
const knexStringcase = require('knex-stringcase')

const env = process.env.ENVIRONMENT || 'development'
const config = require('../../knexfile')[env]
const db = knex(knexStringcase(config))

export default db
