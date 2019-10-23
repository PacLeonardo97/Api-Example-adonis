'use strict'

const Antl = use('Antl')

class notification {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      token: 'required|unique:notifications'
    }
  }
  get messages() {
    return Antl.list('validation')
  }
}

module.exports = notification
