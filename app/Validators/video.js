'use strict'
const Antl = use('Antl')

class video {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      file: 'required|file|file_ext:mp4,MP4,wmv,WMV,flv,FLV,avi,AVI|file_size:2048mb|file_types:video'
    }
  }
  get messages() {
    return Antl.list('validation')
  }
}

module.exports = video
