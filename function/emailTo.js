const axios = require('axios');
const Env = use('Env')

const Mail = use('Mail')
const crypto = require('crypto')
const moment = require('moment')
const Env = use('Env')


async function emailTo(user, email) {

    await Mail.send(
        // Email padrão de notificação
        ['emails.notificacao'],  // View para recuperação da senha
        {
            nome: user.nome_user,
            email,
            token: user.token,
            //link: `${request.input('request_url')}/${user.token}/${email}`
        },
        message => {
            message
                .to(user.email)
                .from(Env.get('MAIL_USERNAME'), 'RESTART')
                .subject('Recuperação de senha')
        }
    )
}

module.exports = emailTo;