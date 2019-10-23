'use strict'
const Antl = use('Antl')

class vistoria {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      driver_id: 'required',
      data_vistoria: 'required|date',
      cep: 'required|zipCode',
      rua: 'required|string',
      numero_rua: 'required|integer'
    }
  }
  get messages() {
    return Antl.list('validation')
  }
}

module.exports = vistoria
