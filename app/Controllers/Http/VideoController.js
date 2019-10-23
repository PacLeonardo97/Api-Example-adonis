'use strict'

const Video = use('App/Models/Video')
const Helpers = use('Helpers')

class VideoController {
    async index({ request }) {
        const { page, limit, pesquisa } = request.post()
        var video = Video.query();
        if (pesquisa) {
            video
                .where('name', 'LIKE', '%' + pesquisa + '%')
                .orWhere('materia', 'LIKE', '%' + pesquisa + '%')
        }

        return await video.paginate(page, limit)
    }

    async show({ params, response }) {
        const video = await Video.findOrFail(params.id)

        //local do aquivo é: video/:id
        return response.download(Helpers.tmpPath(`video/${video.file}`))
    }

    async store({ request, response, auth }) {

        // try {
        if (!request.file('file')) {
            return 'não é um arquivo';
        }
        let {
            name,
            materia
        } = request.post(
            'name',
            'materia'
        )
        materia = materia.toLowerCase()
        if (materia === 'atendimento ao cliente') {
            materia = 'atendimento ao cliente'
        } else if (materia === 'educação financeira') {
            materia === 'educação financeira'
        } else if (materia === 'primeiros socorros') {
            materia = 'primeiros socorros'
        } else if (materia === 'direção defensiva') {
            materia = 'direção defensiva'
        } else {
            return response
                .status(401)
                .send({ error: { message: 'Sinto muito, você não pode escolher esta opção no campo matéria' } })
        }

        // CAPTURA O ARQUIVO DA REQUISIÇÃO E O RENOMEIA PARA ENVIAR A PASTA LOCAL
        const upload = request.file('file')

        const filename = `${Date.now()}.${upload.subtype}`

        // SALVA O ARQUIVO
        await upload.move(Helpers.tmpPath('video'), {
            name: filename
        })

        // CASO TENHA ERROS EM ENVIAR O ARQUIVO PARA A PASTA, A API EMITE UM ERRO(catch(err))
        if (!upload.moved()) {
            throw upload.error()
        }

        return await Video.create({
            file: filename,
            name: name,
            type: upload.type,
            subtype: upload.subtype,
            materia: materia
        })

        // } catch (err) {
        //     return response
        //         .status(err.status)
        //         .send({ error: { message: 'Erro no upload do arquivo' } })
        // }
    }
}

module.exports = VideoController
