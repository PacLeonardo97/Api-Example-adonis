'use strict'

class ReparoCarroController {
    async index({ }) {
        const { page } = request.get()
    }
    async store({ }) {

    }
    async show({ }) {

    }
    async update({ }) {

    }
}
table.string('preco', 80).notNullable()
table.string('detalhe', 254).notNullable().unique()
table.date('data').notNullable()
module.exports = ReparoCarroController
