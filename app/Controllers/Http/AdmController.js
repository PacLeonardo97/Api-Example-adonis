'use strict'

const Database = use('Database')
const Adm = use('App/Models/Adm')
const Logger = use('Logger')

class AdmController {
    async index({ }) {
        const { page } = request.get()
        let adm = await Database.Select(
            'nome_adm',
            'email')
            .paginate(page)

        Logger.info('Pegando todos os Adms', { adm: adm });

        return adm
    }

    async store({ request }) {
        let data = request.only([
            'nome_adm',
            'email',
            'password'
        ]) // Seleciona username, email e password do body

        Logger.info('Detalhes do cadastro', {
            nome_adm: data.nome_adm,
            email: data.email,
            password: data.password
        });

        // data.created_at = new Date();
        // Utiliza o transaction para previnir erros no CRUD
        const trx = await Database.beginTransaction()
        const adm = await Adm.create(data, trx)

        // Se não houver nenhum erro no transaction, ele efetiva a query
        await trx.commit()

        // return json
        return adm
    }

    async show({ auth }) {

        return auth.adm
    }
    async update({ }) { }
}

module.exports = AdmController
