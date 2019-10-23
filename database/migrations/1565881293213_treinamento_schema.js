'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TreinamentoSchema extends Schema {
  up() {
    this.create('treinamentos', (table) => {
      table.increments()
      table.integer('motorista_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.date('data_treinamento').notNullable()
      table.string('andamento_treinamento', 80).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('treinamentos')
  }
}

module.exports = TreinamentoSchema
