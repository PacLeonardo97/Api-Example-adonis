'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Profile extends Model {

    User() {
        return this.belongsTo('App/Models/User') // profile só contém um usuário
    }

    investor() {
        return this.belongsTo('App/Models/Investor') // O profile pertence ao investidor
    }

    driver() {
        return this.belongsTo('App/Models/Driver') // profile pertence ao motorista 
    }
}
module.exports = Profile