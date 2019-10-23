'use strict'
const Antl = use('Antl')

class adm {
  get rules() {
    return {
      nome_adm: 'required',
      email: 'required|email|unique:adms',
      password: 'required'
    }
  }

  get messages() {
    return Antl.list('validation')
  }

}

module.exports = adm
