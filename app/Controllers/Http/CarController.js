'use strict'

const Database = use('Database')
const Car = use('App/Models/Car')
const Logger = use('Logger')

class CarController {

    // mostrar todos os carros
    async index({ params, auth, request }) {
        const { page } = request.get()
        const car = await Car.query().paginate(page)

        return car
    }

    // criando um novo carro
    async store({ request, auth }) {

        let data = request.only([
            'modelo_car',
            'ano_car',
            'combustivel_car',
            'no_ocupantes_car',
            'cor_car',
            'no_renavem',
            'placa_car',
            'obs_car']) // Seleciona username, email e password do body


        Logger.info('Detalhes do carro', {
            modelo_car: data.modelo_car,
            ano_car: data.ano_car,
            combustivel_car: data.combustivel_car,
            no_ocupantes_car: data.no_ocupantes_car,
            cor_car: data.cor_car,
            no_renavem: data.no_renavem,
            placa_car: data.placa_car,
            obs_car: data.obs_car
        });

        // data.created_at = new Date();
        // Utiliza o transaction para previnir erros no CRUD
        const trx = await Database.beginTransaction()
        const car = await Car.create(data, trx)

        // Se não houver nenhum erro no transaction, ele efetiva a query
        await trx.commit()

        // return json
        return car
    }

    async show({ params }) {

        const car = await Car.findOrFail(params.id)

        return car
    }

    async update({ params, request }) {
        const trx = await Database.beginTransaction();

        const data = request.only([
            'modelo_car',
            'ano_car',
            'combustivel_car',
            'no_ocupantes_car',
            'cor_car',
            'no_renavem',
            'placa_car',
            'obs_car',
            'central_id'
        ])
        const car = await Car.findOrFail(params.id)

        let newdata = {
            modelo_car: data.modelo_car,
            ano_car: data.ano_car,
            combustivel_car: data.combustivel_car,
            cor_car: data.cor_car,
            no_renavem: data.no_renavem,
            placa_car: data.placa_car,
            obs_car: data.obs_car,
            central_id: data.central_id
        }

        car.merge(newdata);

        await car.save()
        await trx.commit();

        return car
    }

}

module.exports = CarController