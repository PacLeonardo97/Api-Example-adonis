'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class HavePermission {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ response, auth }, next) {
    let userLogged = await auth.getUser()

    if (Number(userLogged.tipo_entrada_user) === 3 ||
      Number(userLogged.tipo_entrada_user) === 2) {
      await next()
    } else {
      response.status(401).send({
        error: 'Você não tem permissão para isso'
      })
      return;
    }
    // call next to advance the request
  }
}

module.exports = HavePermission
