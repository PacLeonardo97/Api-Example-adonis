'use strict'

const Env = use('Env')
// const Youch = use('Youch')
const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle(error, { request, response }) {
    /**
     * Valida o error do validation
     */
    if (error.name === 'ValidationException') {
      // retorna o erro em formato JSON para o front-end
      return response.status(error.status).send(error.messages)
    }

    // Retorno mais detalhado em ambiente de DEV
    if (Env.get('NODE_ENV') === 'development') {
      console.log(request)
      // const youch = new Youch(error, request.request)
      // const errorJSON = await youch.toJSON()

      return response.status(error.status).send(error)
    }

    return response.status(error.status)
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report(error, { request }) {
    console.log(error)
  }
}

module.exports = ExceptionHandler
