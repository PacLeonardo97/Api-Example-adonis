'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Multa extends Model {
    driver() {
        return this.belongsTo('App/Models/Driver') // um Carro só pode ter um motorista
    }

    user() {
        return this.belongsTo('App/Models/User') // um Carro só pode ter um motorista
    }

    car() {
        return this.belongsTo('App/Models/Car') // um Carro só pode ter um motorista
    }


    static scopeHasCar(query) {
        return query.has('car')
    }

    static scopeHasDriver(query) {
        return query.has('driver')
    }

}

module.exports = Multa
