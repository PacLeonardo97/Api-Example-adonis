'use strict'
const Reparo = use('App/Models/Reparo')

const Database = use('Database')
const Logger = use('Logger')
const Central = use('App/Models/Central')
const Driver = use('App/Models/Driver')
const Car = use('App/Models/car')


class ReparoController {
    async index({ params, auth, request }) {

        const { page, limit, pesquisa } = request.post()
        var reparo = Reparo.query().select('driver_id', 'car_id', 'central_id', 'id', 'preco', 'data', 'detalhe')
        if (pesquisa) {
            reparo
                .where('preco', 'LIKE', '%' + pesquisa + '%')
                .orWhere('detalhe', 'LIKE', '%' + pesquisa + '%')
        }

        reparo = await reparo
            .hasDriver().with('driver', (builder) => {
                builder.select(['id', 'nome_driver', 'numero_cnh_driver'])
            })
            .hasCar().with('car', (builder) => {
                builder.select(['id', 'modelo_car', 'no_renavem', 'placa_car'])
            })
            .hasCentral().with('central', (builder) => {
                builder.select(['id', 'nome_central'])
            })
            .paginate(page, limit)

        return reparo

    }

    async store({ auth, request }) {

        let userLogged = await auth.getUser()
        let central = await Central.findBy('user_id', userLogged.id);
        if (userLogged.id === 2) {
            let {

                driver_id,
                preco,
                detalhe,
                data
            } = request.post();
            let car = await Car.findBy('driver_id', driver_id);
            let dados = {
                car_id: car.id,
                driver_id,
                preco,
                detalhe,
                data: new Date(data),
                central_id: central.id
            }


            Logger.info('Detalhes do Reparo', dados);

            // Utiliza o transaction para previnir erros no CRUD
            const trx = await Database.beginTransaction()
            const reparo = await Reparo.create(dados, trx)

            // Se não houver nenhum erro no transaction, ele efetiva a query
            await trx.commit()

            // return json
            return reparo
        } else {
            return { message: 'Sinto muito, você não é uma Central' }
        }


    }

    async show({ auth, request }) {
        let userLogged = await auth.getUser()

        const { page, limit, data_inicio, data_fim, pesquisa } = request.post()

        const driver = await Driver.findBy('user_id', userLogged.id);

        var reparo = Reparo.query().where('driver_id', driver.id)


        if (data_inicio, data_fim) {
            reparo
                .whereBetween('data', [data_inicio, data_fim])
        }
        if (pesquisa) {
            reparo
                .where('preco', 'LIKE', '%' + pesquisa + '%')
                .orWhere('detalhe', 'LIKE', '%' + pesquisa + '%')
        }

        return await reparo.paginate(page, limit)
    }

    async update({ params, request }) {

        const trx = await Database.beginTransaction();

        const {
            car_id,
            driver_id,
            preco,
            detalhe,
            data
        } = request.post()

        const reparo = await Reparo.findOrFail(params.id)

        let newdata = {
            car_id,
            driver_id,
            preco,
            detalhe,
            data: new Date(data),
        }

        reparo.merge(newdata);

        await reparo.save()
        await trx.commit();

        return reparo
    }

}
module.exports = ReparoController
