'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DriverSchema extends Schema {
  up() {
    this.create('drivers', (table) => {
      table.increments()
      table.integer('car_id')
        .unsigned()
        .references('id')
        .inTable('car')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('numero_cnh_driver').notNullable()
      table.string('curriculo_cnh').notNullable()
      table.string('foto_3x4').notNullable()
      table.string('foto_cnh_driver').notNullable()

      table.timestamps()
    })
  }

  down() {
    this.drop('drivers')
  }
}

module.exports = DriverSchema