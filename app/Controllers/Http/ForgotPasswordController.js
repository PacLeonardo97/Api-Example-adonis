'use strict'
const User = use('App/Models/User')

const Mail = use('Mail')
const crypto = require('crypto')
const moment = require('moment')
const Env = use('Env')

class ForgotPasswordController {
    /**
       * SOLICITA A ALTERAÇÃO DE SENHA
       */
    async store({ request, response }) {
        try {
            const email = request.input('email')

            /**
             * @description: findByOrFail tenta encontrar na coluna email o valor request.email.
             * caso não encontre, retorna um erro, caindo no catch(err)
             */
            const user = await User.findByOrFail('email', email)

            user.token = crypto.randomBytes(10).toString('hex')
            user.token_created_at = new Date()

            await user.save()

            // Envia e-mail para reset de senha
            await Mail.send(
                ['emails.forgot_password'],  // View para recuperação da senha
                {
                    nome: user.nome_user,
                    email,
                    token: user.token,
                    link: `${request.input('request_url')}/${user.token}/${email}`
                },
                message => {
                    message
                        .to(user.email)
                        .from(Env.get('MAIL_USERNAME'), 'RESTART')
                        .subject('Recuperação de senha')
                }
            )
        }

        catch (err) {
            console.log(err);
            return response.status(err.status).send({
                error: {
                    message: 'Algo deu errado. Verifique o e-mail e tente novamente'
                }
            })
        }
    }

    /**
     * UPDATE PASSWORD
     */
    async update({ request, response }) {
        try {
            const { token, password } = request.all()

            const user = await User.findByOrFail('token', token)

            console.log(user)
            // Valida se a data de criação do token nao expirou o prazo de 2 dias
            const tokenExpired = moment()
                .subtract('2', 'days')
                .isAfter(user.token_created_at)

            if (tokenExpired) {
                return response
                    .status(401)
                    .send({ error: { message: 'O token de recuperação está expirado.' } })
            }

            user.token = null
            user.token_created_at = null
            user.password = password

            await user.save()
            return response.send('Sua senha foi alterada com sucesso!')
        }
        catch (err) {
            return response
                .status(err.status)
                .send({ error: { message: 'Algo não deu certo. Tente novamente.' } })
        }
    }

    async passwordRecovery({ auth, request, response }) {
        const { token, password } = request.post();
        const user = await User.findByOrFail('token', token)

        // if (user.token !== token) {
        //     return response.validateFailed([
        //         {
        //             message: "Token inválido",
        //             field: "code"
        //         }
        //     ]);
        // }

        // delete user.token;
        // user.password = password;

        // await user.save();

        // this._saveLog(user.id, "PASSWORD_UPDATE", user.id, user.toJSON());

        return response.apiSuccess(user);
    }

}

module.exports = ForgotPasswordController
