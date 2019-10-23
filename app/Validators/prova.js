'use strict'
const Antl = use('Antl')

class prova {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      nome_prova: 'required|string',
      descricao_prova: 'required|string',
      nota: 'required|integer|range:0,10',
      data_prova: 'required|date'
    }
  }

  get messages() {
    return Antl.list('validation')
  }



}

module.exports = prova
