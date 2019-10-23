'use strict'

const Antl = use('Antl')

class Profile {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      //Validar se user_id é o mesmo na mesma tabela
      user_id: 'required|unique:profiles',
      driver_id: 'unique:profiles',
      id_investor: 'unique:profiles',

      cpf_profile: 'required|unique:profiles',
      cep_profile: 'required',
      endereco_profile: 'required',
      bairro_profile: 'required',
      cidade_profile: 'required',
      estado_profile: 'required',
      numero_casa_profile: 'required',
      complemento_profile: 'required',
      celular_profile: 'required'
    }
  }
  get messages() {
    return Antl.list('validation')
  }

}

module.exports = Profile