'use strict'

const Database = use('Database')
const User = use('App/Models/User')
const Logger = use('Logger')



class UserController {

    async index({ params, auth, request }) {

        const { page } = request.get()

        const users = await User.query()
            .paginate(page)

        Logger.info('Pegando todos os dados', { users: users });

        return users
    }

    async store({ request }) {

        let { nome_user, email, password, tipo_entrada_user } = request.only([
            'nome_user',
            'email',
            'password',
            'tipo_entrada_user'
        ]) // Seleciona username, email e password do body

        Logger.info('Detalhes do cadastro', {
            nome_user,
            email,
            password,
            tipo_entrada_user
        });

        // data.created_at = new Date();
        // Utiliza o transaction para previnir erros no CRUD
        const trx = await Database.beginTransaction()
        const user = await User.create(data, trx)

        // Se não houver nenhum erro no transaction, ele efetiva a query
        await trx.commit()

        // return json
        return user

    }

    async show({ auth }) {
        const user = await auth.getUser();

        return user
    }

}

module.exports = UserController
