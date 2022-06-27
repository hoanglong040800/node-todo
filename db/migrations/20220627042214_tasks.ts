import { randomUUID } from 'crypto'
import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	knex.schema.hasTable('user').then(exists => {
		if (exists) return

		return knex.schema.createTable('tasks', table => {
			table.uuid('task_id').primary().defaultTo(randomUUID())
			table.string('content', 255)
			table.timestamp('created_at').defaultTo(knex.fn.now())
			table.timestamp('updated_at').defaultTo(knex.fn.now())
			table.uuid('user_id').references('user_id').inTable('users')
		})
	})
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('tasks')
}
