'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CarSchema extends Schema {
  up() {
    this.create('cars', (table) => {
      table.increments()
      table.string('modelo_car', 80).notNullable()
      table.string('ano_car', 254).notNullable()
      table.string('combustivel_car', 60).notNullable()
      table.string('no_ocupantes_car', 60).notNullable()
      table.string('cor_car', 60).notNullable()
      table.string('no_renavem', 60).notNullable()
      table.string('placa_car', 60).notNullable()
      table.string('obs_car', 250).notNullable()

      table.integer('driver_id')
        .unsigned()
        .references('id')
        .inTable('drivers')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')

      table.integer('central_id')
        .unsigned()
        .references('id')
        .inTable('centrals')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')


      table.timestamps()
    })
  }

  down() {
    this.drop('cars')
  }
}

module.exports = CarSchema
