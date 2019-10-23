'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Vistoria extends Model {
    driver() {
        return this.belongsTo('App/Models/Driver')
    }
    static scopeHasDriver(query) {
        return query.has('driver')
    }
    car() {
        return this.belongsTo('App/Models/Car')
    }
}

module.exports = Vistoria
