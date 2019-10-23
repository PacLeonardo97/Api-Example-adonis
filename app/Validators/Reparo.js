'use strict'
const Antl = use('Antl')

class Reparo {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      car_id: 'required',
      user_id: 'required',
      central_id: 'required',
      preco: 'required|integer', // Depois trocar para float, quando a validação float for criada
      detalhe: 'required|string',
      data: 'required|date'
    }
    }

  get messages() {
    return Antl.list('validation')
  }
}

module.exports = Reparo
