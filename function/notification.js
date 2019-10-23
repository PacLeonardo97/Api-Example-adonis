const axios = require('axios');
const Env = use('Env')


async function notification(user, title, body) {

    return await axios.post('https://fcm.googleapis.com/fcm/send',
        {
            "notification": {
                "title": title,
                "body": body
            },
            "to": user
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=' + Env.get('ID_NOTIFICATION'),
                "Accept": "application/json",
            }
        });
}

module.exports = notification;