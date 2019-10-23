'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CarPhotosSchema extends Schema {
  up() {
    this.create('car_photos', (table) => {
      table.increments()

      table.integer('car_id')
        .unsigned()
        .references('id')
        .inTable('cars')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')

      table.integer('files_1')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')

      table.integer('files_2')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')


      table.integer('files_3')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')



      table.integer('files_4')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')



      table.integer('files_5')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')

      table.timestamps()
    })
  }

  down() {
    this.drop('car_photos')
  }
}

module.exports = CarPhotosSchema
