import { randomUUID } from 'crypto'
import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('users', table => {
		table.uuid('user_id').primary().defaultTo(randomUUID())
		table.string('email').notNullable().unique()
		table.string('password', 50).notNullable()
		table.string('display_name', 255).notNullable()
		table.string('status', 10).notNullable()
	})
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('users')
}
