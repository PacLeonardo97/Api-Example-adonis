'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CentralSchema extends Schema {
  up() {
    this.create('centrals', (table) => {
      table.increments()
      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('nome_central', 60).notNullable()

      table.string('cep_central', 60).notNullable()
      table.string('endereco_central', 60).notNullable()
      table.string('bairro_central', 60).notNullable()
      table.string('cidade_central', 60).notNullable()
      table.string('estado_central', 60).notNullable()
      table.string('numero_casa_central', 60).notNullable()
      table.string('complemento_central', 60).notNullable()
      table.string('celular_central', 60).notNullable()

      table.timestamps()
    })
  }

  down() {
    this.drop('centrals')
  }
}

module.exports = CentralSchema
