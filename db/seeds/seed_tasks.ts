import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('tasks').del()

	// Inserts seed entries
	await knex('tasks').insert([
		{
			content: 'abc',
			user_id: '24d0c684-30e1-40b0-9b1b-1d1609cc05d5',
		},
	])
}
