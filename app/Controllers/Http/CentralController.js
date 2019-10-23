'use strict'

const Database = use('Database')
const Central = use('App/Models/Central')
const Logger = use('Logger')

class CentralController {
    async index({ request }) {
        const { page } = request.get()
        const central = await Central.query().paginate(page)

        return central
    }

    async store({ request }) {
        const data = request.only([
            'nome_central',
            'local_central'
        ]);

        const trx = await Database.beginTransaction();
        const central = await Central.create(data, trx);

        await trx.commit();

        return central

    }

    async show({ params }) {
        const central = await Central.findOrFail(params.id)

        return central

    }

    async update({ request, params }) {
        const trx = await Database.beginTransaction();

        const data = request.only([
            'nome_central',
            'local_central'
        ])
        const central = await Central.findOrFail(params.id)

        let newdata = {
            nome_central: data.nome_central,
            local_central: data.local_central
        }

        central.merge(newdata);

        await car.save()
        await trx.commit();

        return central
    }
}

module.exports = CentralController
