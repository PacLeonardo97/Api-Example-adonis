'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PagamentosSchema extends Schema {
  up() {
    this.create('pagamentos', (table) => {
      table.increments()
      table.integer('valor', 80).notNullable()
      table.date('data_pagamento').notNullable()

      table.integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')

      table.integer('driver_id')
        .unsigned()
        .references('id')
        .inTable('drivers')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down() {
    this.drop('pagamentos')
  }
}

module.exports = PagamentosSchema
