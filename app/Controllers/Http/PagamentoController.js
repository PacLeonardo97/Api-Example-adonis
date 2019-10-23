'use strict'
const Pagamento = use('App/Models/Pagamento')
const Database = use('Database')
const Logger = use('Logger')
const registerImages = require('../../../function/registerImages');

class PagamentoController {

    async index({ request }) {

        const { page, limit } = request.post()
        return await Pagamento.query()
            .hasFile().with('file')
            .hasDriver().with('driver', (builder) => {
                builder.select(['id', 'nome_driver', 'numero_cnh_driver'])
            })
            .paginate(page, limit)

    }

    async store({ auth, request }) {

        let userLogged = await auth.getUser()

        let imagem1 = request.file('foto_pagamento')

        let listaImages = [
            { image: imagem1, name: 'foto_pagamento' },
        ]

        let names = await registerImages(listaImages, userLogged.id);

        let {
            valor,
            data_pagamento,
            driver_id,
        } = request.post()

        let dados = {
            valor,
            data_pagamento: new Date(data_pagamento),
            file_id: names[0].id,
            driver_id
        }

        Logger.info('Detalhes do pagamento', dados);

        let trx = await Database.beginTransaction()
        let pagamento = await Pagamento.create(dados, trx)

        await trx.commit()

        return pagamento
    }
}


module.exports = PagamentoController
