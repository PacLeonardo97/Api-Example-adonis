'use strict'

const Antl = use('Antl')

class Car {
    get validateAll() {
        return true
    }

    get rules() {
        return {
            modelo_car: 'required',
            ano_car: 'required',
            combustivel_car: 'required',
            no_ocupantes_car: 'required',
            cor_car: 'required',
            no_renavem: 'required',
            placa_car: 'required',
            obs_car: 'required'
        }
    }

    get messages() {
        return Antl.list('validation')
    }
}

module.exports = Car


