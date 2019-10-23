'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Notification extends Model {

    user() {
        return this.hasMany('App/Models/Token')
    }
}

module.exports = Notification
