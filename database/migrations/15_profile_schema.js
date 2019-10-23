'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfileSchema extends Schema {
  up() {
    this.create('profiles', (table) => {
      table.increments()
      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.integer('driver_id')
        .unsigned()
        .references('id')
        .inTable('drivers')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.integer('id_investor')
        .unsigned()
        .references('id')
        .inTable('investors')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('cpf_profile', 60).notNullable()
      table.string('cep_profile', 60).notNullable()
      table.string('endereco_profile', 60).notNullable()
      table.string('bairro_profile', 60).notNullable()
      table.string('cidade_profile', 60).notNullable()
      table.string('estado_profile', 60).notNullable()
      table.string('numero_casa_profile', 60).notNullable()
      table.string('complemento_profile', 60).notNullable()
      table.string('celular_profile', 60).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('Profiles')
  }
}
module.exports = ProfileSchema