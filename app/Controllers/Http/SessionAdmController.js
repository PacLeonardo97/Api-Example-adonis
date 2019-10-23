'use strict'

class SessionAdmController {
    async store({ request, auth }) {
        const { email, password } = request.all()

        // Gera um token JWT
        try {

            const token = await auth.attempt(email, password)

            return token

        } catch (error) {
            console.log('Olha o erro ' + error)
            return error
        }
    }
}

module.exports = SessionAdmController
