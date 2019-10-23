'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Driver extends Model {

    car() {
        return this.belongsTo('App/Models/Car')// um motorista só pode ter um carro
    }

    profile() {
        return this.hasOne('App/Models/Profile')// um motorista pertence a um carro
    }
}

module.exports = Driver
