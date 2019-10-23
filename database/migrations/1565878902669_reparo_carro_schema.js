'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReparoCarroSchema extends Schema {
  up() {
    this.create('reparo_carros', (table) => {
      table.increments()
      table.integer('car_id')// id do carro
        .unsigned()
        .references('id')
        .inTable('car')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.integer('user_id')//id do usuário
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.integer('central_id')//id da central
        .unsigned()
        .references('id')
        .inTable('centrals')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('preco', 80).notNullable()
      table.string('detalhe', 254).notNullable().unique()
      table.date('data').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('reparo_carros')
  }
}

module.exports = ReparoCarroSchema
