import { BaseSchema } from '@adonisjs/lucid/schema'

/*
----------------------------------------------------
https://docs.adonisjs.com/guides/authentication/session-guard#creating-the-remember-me-tokens-table
----------------------------------------------------
*/

export default class extends BaseSchema {
  protected tableName = 'remember_me_tokens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments()
      table
        .integer('tokenable_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users') //user table relation
        .onDelete('CASCADE')

      table.string('hash').notNullable().unique() //verify if is valid
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
      table.timestamp('expires_at').notNullable() // eat
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
