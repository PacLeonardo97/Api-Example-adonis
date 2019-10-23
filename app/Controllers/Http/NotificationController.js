'use strict'
const Database = use('Database')
const Notification = use('App/Models/notification')
const Logger = use('Logger')

class NotificationController {
    async store({ request, auth }) {

        let check = false

        try {
            check = await auth.check()
        } catch (error) {
            check = false;
        }

        if (check) {
            let userLogged = await auth.getUser()

            let { token } = request.post()

            let data = {
                user_id: userLogged.id,
                token
            }

            const trx = await Database.beginTransaction()
            const notification = await Notification.create(data, trx)

            await trx.commit()
            return notification;
        }
    }
}

module.exports = NotificationController
