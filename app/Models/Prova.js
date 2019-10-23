'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Prova extends Model {
    driver() {
        return this.belongsTo('App/Models/Driver') // um Carro só pode ter um motorista
    }
    static scopeHasDriver(query) {
        return query.has('driver')
    }

}

module.exports = Prova
