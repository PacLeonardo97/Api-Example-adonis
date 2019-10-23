'use strict'

const Antl = use('Antl')

class Driver {
    get validateAll() {
        return true
    }

    get rules() {
        return {
            car_id: 'required|unique:drivers',
            foto_cnh_driver: 'required'
        }
    }

    get messages() {
        return Antl.list('validation')
    }
}

module.exports = Driver
