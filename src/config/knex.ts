import knex from 'knex'

const env = process.env.ENVIRONMENT || 'development'
const config = require('../knexfile.js')[env]

export default knex(config)
