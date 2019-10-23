'use strict'

class multa {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      valor: 'required',
      data_multa: 'required|date',
      natureza: 'required|string'
    }
  }
  get messages() {
    return Antl.list('validation')
  }
}

module.exports = multa
