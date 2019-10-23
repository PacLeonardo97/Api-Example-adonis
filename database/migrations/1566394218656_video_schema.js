'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VideoSchema extends Schema {
  up() {
    this.create('videos', (table) => {
      table.increments()
      table.string('file').notNullable()
      table.string('name').notNullable()
      table.string('type', 20)
      table.string('subtype', 20)
      table.string('materia', 80).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('videos')
  }
}

module.exports = VideoSchema
