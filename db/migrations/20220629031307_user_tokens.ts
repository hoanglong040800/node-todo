import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('user_tokens', table => {
		table.string('refresh_token').unique().notNullable()
		table.string('access_token').unique().notNullable()
		table.timestamp('refresh_token_expire').notNullable()
		table.timestamp('acess_token_expire').notNullable()
		table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
		table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
	})
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('user_tokens')
}
