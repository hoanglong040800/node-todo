import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del()

  // Inserts seed entries
  await knex('users').insert([
    {
      user_id: '24d0c684-30e1-40b0-9b1b-1d1609cc05d5',
      email: 'user1@gmail.com',
      password: '1',
      display_name: 'User 1',
      status: 'ACTIVE',
    },
    {
      user_id: '35d0c684-30e1-40b0-9b1b-1d1609cc05e1',
      email: 'user2@gmail.com',
      password: '1',
      display_name: 'User 2',
      status: 'ACTIVE',
    },
  ])
}
