'use strict'


const Antl = use('Antl')


class Central {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      //Validar se user_id é o mesmo na mesma tabela


      email: 'required|email|unique:users',
      password: 'required',

      nome: 'required|string|fullname',
      id_investor: 'unique:profiles',

      cep: 'required|min:8|zipCode',
      endereco: 'required|min:2|string',
      bairro: 'required|string',
      cidade: 'required|string',
      estado: 'required|string',
      numero_casa: 'required|min:1|integer',
      complemento: 'required|string',
      celular: 'required|min:9|phone'
    }
  }

  get messages() {
    return Antl.list('validation')
  }
}

module.exports = Central
