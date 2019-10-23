'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers')

class FileController {
    /**
   * Return image file
   * GET files/:id
   */
    async show({ params, response }) {
        const file = await File.findOrFail(params.id)

        return response.download(Helpers.tmpPath(`uploads/${file.file}`))
    }

    /**
   * Create/save new file
   * POST files
   */
    async store({ request, response, auth }) {
        try {
            if (!request.file('file')) {
                return 'não é um arquivo';
            }

            // CAPTURA O ARQUIVO DA REQUISIÇÃO E O RENOMEIA PARA ENVIAR A PASTA LOCAL
            const upload = request.file('file', { size: '5mb' })
            const filename = `oie.${upload.subtype}`

            // SALVA O ARQUIVO
            await upload.move(Helpers.tmpPath('uploads'), {
                name: filename
            })

            // CASO TENHA ERROS EM ENVIAR O ARQUIVO PARA A PASTA, A API EMITE UM ERRO(catch(err))
            if (!upload.moved()) {
                throw upload.error()
            }

            // SALVA OS DADOS DO ARQUIVO NA TABELA FILE
            const image = await File.create({
                file: filename,
                name: upload.clientName,
                type: upload.type,
                subtype: upload.subtype
            })

            return image
        } catch (err) {
            return response
                .status(err.status)
                .send({ error: { message: 'Erro no upload do arquivo' } })
        }
    }
}

module.exports = FileController
