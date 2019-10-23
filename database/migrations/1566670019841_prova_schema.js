'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProvaSchema extends Schema {
  up() {
    this.create('prova', (table) => {
      table.increments()
      table.integer('driver_id')
        .unsigned()
        .references('id')
        .inTable('drivers')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')

      table.string('nome_prova', 80).notNullable()
      table.string('descricao_prova', 80).notNullable()
      table.date('data_prova', 80).notNullable()
      table.float('nota', 10[2]).notNullable()
      table.string('flag_passou_nao').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('prova')
  }
}

module.exports = ProvaSchema
