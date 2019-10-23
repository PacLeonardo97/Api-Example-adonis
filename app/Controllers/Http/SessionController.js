'use strict'

class SessionController {
    async store({ request, auth }) {
        const { email, password } = request.all()

        // Gera um token JWT
        try {
            const token = await auth.attempt(email, password)
            console.log('ola' + JSON.stringify(token))
            return token

        } catch (error) {

            return {
                data: 'Email ou senha inválidos'
            }
        }
    }
}

module.exports = SessionController