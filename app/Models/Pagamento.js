'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pagamento extends Model {
    file() {
        return this.belongsTo('App/Models/File')
    }

    driver() {
        return this.belongsTo('App/Models/Driver')
    }

    static scopeHasFile(query) {
        return query.has('file')
    }

    static scopeHasDriver(query) {
        return query.has('driver')
    }
}

module.exports = Pagamento
