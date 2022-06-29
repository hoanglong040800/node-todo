import { Knex } from 'knex'
import { USER_STATUS } from '../../src/constants/table.constants'

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('users', table => {
		table.uuid('user_id').primary()
		table.string('email').notNullable().unique()
		table.string('password', 50).notNullable()
		table.string('display_name', 255).notNullable()
		table.string('status', 10).notNullable().defaultTo(USER_STATUS.ACTIVE)
	})
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('users')
}
