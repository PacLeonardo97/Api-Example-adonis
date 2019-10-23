'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Reparo extends Model {
    driver() {
        return this.belongsTo('App/Models/Driver')
    }

    investor() {
        return this.belongsTo('App/Models/Investor')
    }

    car() {
        return this.belongsTo('App/Models/Car')
    }
    central() {
        return this
            .belongsTo('App/Models/Central')
    }


    static scopeHasDriver(query) {
        return query.has('driver')
    }

    static scopeHasCar(query) {
        return query.has('car')
    }


    static scopeHasCentral(query) {
        return query.has('central')
    }
}

module.exports = Reparo
