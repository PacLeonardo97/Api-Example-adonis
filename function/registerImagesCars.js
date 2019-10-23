const Env = use('Env')
const File = use('App/Models/CarPhoto')
const Helpers = use('Helpers')

async function registerImagesCars(listaImages, user_id) {

    let names = await Promise.all(listaImages.map(async (imagem) => {

        const upload = imagem.image;

        const filename = `${Date.now()}_${imagem.name}.${upload.subtype}`

        // SALVA O ARQUIVO
        await upload.move(Helpers.tmpPath('file'), {
            name: filename
        })

        // CASO TENHA ERROS EM ENVIAR O ARQUIVO PARA A PASTA, A API EMITE UM ERRO(catch(err))
        if (!upload.moved()) {
            throw upload.error()
        }

        let file = await File.create({
            file: filename,
            name: upload.clientName,
            type: upload.type,
            subtype: upload.subtype,
            user_id: user_id
        })

        return { filename: filename, name: imagem.name, urlFile: `${Env.get('APP_URL')}/file/${file.id}`, id: file.id }
    }))

    return names;
}

module.exports = registerImagesCars;