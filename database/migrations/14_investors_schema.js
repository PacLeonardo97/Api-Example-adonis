'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InvestorsSchema extends Schema {
  up() {
    this.create('investors', (table) => {
      table.increments()
      table.string('valor_quota_investor', 60).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('investors')
  }
}

module.exports = InvestorsSchema