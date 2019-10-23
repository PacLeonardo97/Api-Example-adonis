'use strict'

const Antl = use('Antl')

class User {
  // Valida todos os campos enviados no body. O default é false.
  get validateAll() {
    return true
  }

  /**
   * required: obrigatório
   * unique:table: o campo não pode se repetir na tabela
   * confirmed:
   */
  get rules() {
    return {
      nome_user: 'required',
      email: 'required|email|unique:users',
      password: 'required'
    }
  }

  get messages() {
    return Antl.list('validation')
  }
}

module.exports = User
