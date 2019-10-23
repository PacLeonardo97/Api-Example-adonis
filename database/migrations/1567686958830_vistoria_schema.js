'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VistoriaSchema extends Schema {
  up() {
    this.create('vistorias', (table) => {
      table.increments()
      table.integer('driver_id')
        .unsigned()
        .references('id')
        .inTable('drivers')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')

      table.date('data_vistoria').notNullable()
      table.string('cep').notNullable()
      table.string('rua').notNullable()
      table.string('numero_rua').notNullable()

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
    this.drop('vistorias')
  }
}

module.exports = VistoriaSchema
