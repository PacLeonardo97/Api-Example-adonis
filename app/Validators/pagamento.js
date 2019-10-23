'use strict'

class pagamento {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      foto_pagamento: 'required|file|file_ext:PNG,png,jpg,JPG,jpeg,JPEG,pdf,PDF,tiff,TIFF,bmp,BMP|file_size:5mb|file_types:image,pdf', //depoos verificar se pode ser em pdf
      valor: 'required|float',
      user_id: 'unique:users,id',
      data_pagamento: 'required|date'
    }
  }
  get messages() {
    return Antl.list('validation')
  }
}

module.exports = pagamento
