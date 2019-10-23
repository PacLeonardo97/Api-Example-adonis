'use strict'

const Driver = use('App/Models/Driver')
const Database = use('Database')

class DriverController {
    /*
     Mostrar todos os carros
    */
    async index({ request }) {
        const { page } = request.get()
        const driver = await Driver.query().paginate(page)

        return driver
    }

    /*
        * Cria/salva um Driver novo
        * Post Driver
    */
    async store({ request }) {
        const data = request.only([
            'foto_cnh_driver',
            'numero_cnh_driver',
            'curriculo_cnh',
            'foto_3x4'
        ]);

        const trx = await Database.beginTransaction();
        const task = await Driver.create(data, trx);

        await trx.commit();

        return task
    }
    /*
        * Mostra somente um driver
        * Get Driver/:id
    */
    async show({ params }) {

        const driver = await Driver.findOrFail(params.id)

        await driver.load('car')

        return driver
    }

    async update({ request, params }) {
        const trx = await Database.beginTransaction();

        const data = request.only([
            'foto_cnh_driver',
            'numero_cnh_driver',
            'curriculo_cnh',
            'foto_3x4'
        ])
        const driver = await Driver.findOrFail(params.id)

        let newdata = {
            foto_cnh_driver: data.foto_cnh_driver,
            numero_cnh_driver: data.numero_cnh_driver,
            curriculo_cnh: data.curriculo_cnh,
            foto_3x4: data.foto_3x4
        }

        driver.merge(newdata)

        await driver.save()
        await trx.commit();

        return driver
    }
}

module.exports = DriverController
