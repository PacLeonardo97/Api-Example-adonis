'use strict'

const Vistoria = use('App/Models/Vistoria')
const Car = use('App/Models/Car')

const Database = use('Database')

class VistoriaController {
    async index({ request, params, auth }) {
        const { page, limit } = request.post()
        return await Vistoria.query()
            .hasDriver().with('driver', (builder) => {
                builder.select(['id', 'nome_driver'])
            }
            ).with('car', (builder) => {
                builder.select(['id', 'placa_car'])
            }
            )
            .paginate(page, limit)
    }

    async store({ request, params, auth }) {
        let {
            driver_id,
            data_vistoria,
            cep,
            rua,
            numero_rua
        } = request.post()

        let dados = {
            driver_id,
            data_vistoria: new Date(data_vistoria),
            cep,
            rua,
            numero_rua
        }

        const trx = await Database.beginTransaction()
        const vistoria = await Vistoria.create(dados, trx)

        await trx.commit()

        return vistoria
    }

    async update({ request, params, auth }) {


        const {
            car_id
        } = request.all()

        const vistoria = await Vistoria.findOrFail(params.id)

        let newdata = {
            car_id
        }

        const car = await Car.findOrFail(car_id)

        car.driver_id = vistoria.driver_id

        car.save()

        vistoria.merge(newdata);

        await vistoria.save()

        return { vistoria, car }
    }

    async show({ request, params, auth }) {

    }
}

module.exports = VistoriaController
