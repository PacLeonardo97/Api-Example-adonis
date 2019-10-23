'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Central extends Model {
    car() {
        return this.hasMany('App/Models/Car')

    }
    reparo() {
        return this.hasMany('App/Models/ReparoCarro')
    }
}

module.exports = Central
