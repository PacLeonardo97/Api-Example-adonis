'use strict'

const Prova = use('App/Models/Prova')
const Driver = use('App/Models/Driver')
const Database = use('Database')
const Logger = use('Logger')

class ProvaController {
    async index({ request }) {

        const { page, limit, pesquisa } = request.post()

        var prova = Prova.query()
        if (pesquisa) {
            prova.where('nome_prova', 'LIKE', '%' + pesquisa + '%')
                .orWhere('descricao_prova', 'LIKE', '%' + pesquisa + '%')
                .orWhere('flag_passou_nao', 'LIKE', '%' + pesquisa + '%')
                .orWhere('nota', 'LIKE', '%' + pesquisa + '%')

        }

        return await prova
            .hasDriver().with('driver', (builder) => {
                builder.select(['id', 'nome_driver', 'numero_cnh_driver'])
            })
            .paginate(page, limit)

    }

    async store({ request }) {
        let flag_passou_nao;

        let {
            nome_prova,
            descricao_prova,
            nota,
            driver_id,
            data_prova,
        } = request.post()

        const driver = await Driver.findOrFail(driver_id)

        if (nota < 5) {
            flag_passou_nao = 'não passou'
            driver.status = 'Reprovado'
        }
        else {
            flag_passou_nao = 'passou'
            driver.status = 'Aprovado'
        }
        driver.save()

        let dados = {
            nome_prova,
            descricao_prova,
            nota,
            driver_id,
            data_prova: new Date(data_prova),
            flag_passou_nao
        }


        // Utiliza o transaction para previnir erros no CRUD
        const trx = await Database.beginTransaction()

        const prova = await Prova.create(dados, trx)


        // Se não houver nenhum erro no transaction, ele efetiva a query
        await trx.commit()


        // return json
        return { prova, driver }
    }

    async show({ auth }) {
        let userLogged = await auth.getUser()

        return await Prova.query().where('user_id', userLogged.id).fetch()
    }

    async update({ params, request }) {

        const trx = await Database.beginTransaction();

        const {
            nome_prova,
            descricao_prova,
            nota
        } = request.post();

        const prova = await Prova.findOrFail(params.id)

        let newdata = {
            nome_prova,
            descricao_prova,
            nota
        }

        reparo.merge(newdata);

        await prova.save()
        await trx.commit();

        return prova

    }

}
module.exports = ProvaController
