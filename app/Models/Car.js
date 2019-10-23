'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Car extends Model {

    driver() {
        return this.hasOne('App/Models/Driver') // um Carro só pode ter um motorista
    }
}

module.exports = Car
