'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')

class CarPhoto extends Model {
    /**
* Cria um campo virtual(não existe no BD) com o caminho da imagem
* Dessa maneira não é necessário montar a url no front, basta retornar o campo virtual
*/

    /**
     * Utiliza o Env APP_URL para montar o campo virtual
     */
    getUrl({ id }) {
        return `${Env.get('APP_URL')}/file/${id}`
    }

    car() {
        return this.belongsTo('App/Models/Car')// um motorista pertence a um carro
    }

}

module.exports = CarPhoto
