'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DriverPhotosSchema extends Schema {
  up() {
    this.create('driver_photos', (table) => {
      table.increments()

      table.timestamps()
    })
  }

  down() {
    this.drop('driver_photos')
  }
}

module.exports = DriverPhotosSchema
