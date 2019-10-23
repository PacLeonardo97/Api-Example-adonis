'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MultaSchema extends Schema {
  up() {
    this.create('multas', (table) => {
      table.increments()
      table.float('valor', 80).notNullable()
      table.string('natureza', 80).notNullable()
      table.integer('pontos', 80).notNullable()
      table.date('data_multa').notNullable()

      table.integer('driver_id')
        .unsigned()
        .references('id')
        .inTable('drivers')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')

      table.integer('car_id')
        .unsigned()
        .references('id')
        .inTable('cars')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down() {
    this.drop('multas')
  }
}

module.exports = MultaSchema
