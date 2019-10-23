'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Driver = use('App/Models/Driver')

class PermissionMotorista {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ response, auth }, next) {
    let userLogged = await auth.getUser()

    if (Number(userLogged.tipo_entrada_user) === 1) {
      const drive = await Driver.findByOrFail('user_id', userLogged.id)

      if (drive) {
        await next()
      }
    }
    else {
      response.status(401).send({
        error: 'Você não tem permissão para isso'
      })
      return; new Error('error')
    }
  }
}

module.exports = PermissionMotorista
