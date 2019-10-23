'use strict'

const Antl = use('Antl')

class file {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      file: 'required|file|file_ext:PNG,png,jpg,JPG,jpeg,JPEG,pdf,PDF,tiff,TIFF,bmp,BMP|file_size:1024mb|file_types:image,pdf'
    }
  }
  get messages() {
    return Antl.list('validation')
  }
}

module.exports = file
// ends_with