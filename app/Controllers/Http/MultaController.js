'use strict'
const Multa = use('App/Models/Multa')
const Car = use('App/Models/Car')
const Database = use('Database')
const Logger = use('Logger')

const Profile = use('App/Models/Profile')

class MultaController {
    async index({ request }) {

        const { page, limit, pesquisa } = request.post()
        var multa = Multa.query()
        if (pesquisa) {
            multa
                .where('valor', 'LIKE', '%' + pesquisa + '%')
                .orWhere('natureza', 'LIKE', '%' + pesquisa + '%')
                .orWhere('pontos', 'LIKE', '%' + pesquisa + '%')
        }

        return await multa
            .hasDriver().with('driver', (builder) => {
                builder.select(['id', 'nome_driver', 'numero_cnh_driver'])
            })
            .hasCar().with('car', (builder) => {
                builder.select(['id', 'modelo_car', 'ano_car', 'combustivel_car', 'cor_car', 'no_renavem', 'placa_car', 'no_ocupantes_car', 'obs_car', 'driver_id', 'central_id'])
            }).paginate(page, limit)
    }

    async store({ auth, params, request }) {
        let {
            valor,
            natureza,
            pontos,
            data_multa,
            driver_id,
            car_id
        } = request.post()

        let car = await Car.findBy('driver_id', driver_id);

        let dados = {
            valor,
            natureza,
            pontos,
            data_multa: new Date(data_multa),
            driver_id,
            car_id: car.id
        }

        Logger.info('Detalhes da Multa', dados);

        // Utiliza o transaction para previnir erros no CRUD
        const trx = await Database.beginTransaction()
        const multa = await Multa.create(dados, trx)

        // Se não houver nenhum erro no transaction, ele efetiva a query
        await trx.commit()

        // return json
        return multa
    }

    async show({ auth, params, request }) {
        let userLogged = await auth.getUser()

        return await Multa.query().where('user_id', userLogged.id).fetch()
    }

    async update({ auth, params, request }) {

    }

}

module.exports = MultaController
