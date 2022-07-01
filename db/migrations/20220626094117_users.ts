import { Knex } from 'knex'
import { ROLES } from '../../src/auth/index'

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('users', table => {
		table.uuid('user_id').primary()
		table.string('email').notNullable().unique()
		table.string('password', 50).notNullable()
		table.string('display_name', 255).notNullable()
		table
			.string('role', 50)
			.notNullable()
			.checkIn(['SUPER_ADMIN', 'NORMAL_USER'])
			.defaultTo(ROLES.NORMAL_USER)
		table.string('status', 10).notNullable()
	})
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('users')
}
