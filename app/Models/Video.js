'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')

class Video extends Model {
    static get computed() {
        return ['url']
    }

    /**
     * Utiliza o Env APP_URL para montar o campo virtual
     */
    getUrl({ id }) {
        return `${Env.get('APP_URL')}/video/${id}`
    }
}

module.exports = Video
