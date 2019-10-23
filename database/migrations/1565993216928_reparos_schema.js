'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReparosSchema extends Schema {
  up() {
    this.create('reparos', (table) => {
      table.increments()
      table.integer('car_id')// id do carro
        .unsigned()
        .references('id')
        .inTable('cars')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')

      table.integer('driver_id')//id do usuário
        .unsigned()
        .references('id')
        .inTable('drivers')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')

      table.integer('central_id')//id da central
        .unsigned()
        .references('id')
        .inTable('centrals')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')

      table.string('preco', 80).notNullable()
      table.string('detalhe', 254).notNullable()
      table.date('data').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('reparos')
  }
}

module.exports = ReparosSchema
