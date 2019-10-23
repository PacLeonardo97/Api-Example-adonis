'use strict'

/*
|--------------------------------------------------------------------------
| RestartSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')
const Hash = use('Hash')

class RestartSeeder {
  async run() {
    let password = await Hash.make('1234');
    await Database.table('users').insert([
      {
        id: 1,
        nome_user: 'Adm',
        email: 'teste@teste.com',
        password: password,
        tipo_entrada_user: 3,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 2,
        nome_user: 'Central',
        email: 'central@teste.com',
        password: password,
        tipo_entrada_user: 2,
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
    console.log('Adm criado com sucesso')

    await Database.table('centrals').insert([
      {
        id: 1,
        user_id: 2,
        nome_central: 'Central',
        cep_central: '032121050',
        endereco_central: 'Rua de teste',
        bairro_central: 'Bairro de teste',
        cidade_central: 'Cidade de teste',
        estado_central: 'Estado de teste',
        numero_casa_central: 1234,
        complemento_central: 'Teste',
        celular_central: '123123123',
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
    await Database.table('cars').insert([{
      id: 1,
      modelo_car: "Gol",
      ano_car: "1970",
      combustivel_car: "Gasosa",
      no_ocupantes_car: "5",
      cor_car: "Preto",
      no_renavem: "49871654984",
      placa_car: "ABC-1235",
      obs_car: "Este carro é muito lindo",
      created_at: new Date(),
      updated_at: new Date(),
    }])
    console.log('carro criado com sucesso')

  }
}


module.exports = RestartSeeder
