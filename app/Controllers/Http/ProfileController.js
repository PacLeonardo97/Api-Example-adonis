'use strict'

const Profile = use('App/Models/Profile')
const Database = use('Database')
const Logger = use('Logger')


class ProfileController {
    async index({ request }) {
        const { page } = request.get()
        const profile = await Profile.query()
            .with('User')
            .with('driver')
            .paginate(page)

        Logger.info('pegar todos os investior', { profile: profile })

        return profile
    }

    async store({ request }) {
        const data = request.only([
            'user_id',
            'cpf_profile',
            'cep_profile',
            'endereco_profile',
            'bairro_profile',
            'cidade_profile',
            'estado_profile',
            'numero_casa_profile',
            'complemento_profile',
            'celular_profile',
            'Type_input'
        ])
        let newdata = {
            cpf_profile: data.cpf_profile,
            cep_profile: data.cep_profile,
            endereco_profile: data.endereco_profile,
            bairro_profile: data.bairro_profile,
            cidade_profile: data.cidade_profile,
            estado_profile: data.estado_profile,
            numero_casa_profile: data.numero_casa_profile,
            complemento_profile: data.complemento_profile,
            celular_profile: data.celular_profile
        }

        if (data.user_id) {
            newdata.user_id = data.user_id;
        }
        if (data.Type_input == "driver") {

            newdata.driver_id = data.driver_id
            newdata.id_investor = null

        } else if (data.Type_input == "investor") {
            newdata.id_investor = data.id_investor
            newdata.driver_id = null
        }

        const trx = await Database.beginTransaction();

        const profile = await Profile.create(newdata, trx);

        await trx.commit();

        Logger.info('foi criado o profile: ', { profile: profile });

        return profile
    }

    async update({ params, request }) {
        const trx = await Database.beginTransaction();

        const data = request.only([
            'cep_profile',
            'endereco_profile',
            'bairro_profile',
            'cidade_profile',
            'estado_profile',
            'numero_casa_profile',
            'complemento_profile',
            'celular_profile'
        ])
        const profile = await Profile.findOrFail(params.id)

        let newdata = {
            cep_profile: data.cep_profile,
            endereco_profile: data.endereco_profile,
            bairro_profile: data.bairro_profile,
            cidade_profile: data.cidade_profile,
            estado_profile: data.estado_profile,
            numero_casa_profile: data.numero_casa_profile,
            complemento_profile: data.complemento_profile,
            celular_profile: data.celular_profile
        }

        profile.merge(newdata);

        await profile.save()
        await trx.commit();

        return profile
    }

    async show({ params, auth }) {
        console.log('aqui carai ' + auth)

        const profile = await Profile.findOrFail(params.id)

        await profile.load('User')

        await profile.load('investor')

        return profile
    }
}

module.exports = ProfileController