'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route')

// Cadastro de usuário
Route.post('/user', 'UserController.store').validator('User')

// Login com a token
Route.post('/sessions', 'SessionController.store').validator('Sessions')

Route.get('/user/index', 'UserController.index')

Route.post('user/show', 'UserController.show').middleware('auth')

/*
              Criando rotas para investor
*/

Route.group(() => {
  //criando um investor
  Route.post('store', 'InvestorController.store').validator('Investor')

  //mostrando todos os investors
  Route.post('index', 'InvestorController.index')

  //mostrar somente um investor
  Route.post('show/:id', 'InvestorController.show')

  //Update
  Route.post('update/:id', 'InvestorController.update')

}).prefix('/investor/')

/*
              Criando rotas Profile
*/
Route.group(() => {
  // criando um novo profile
  Route.post('store', 'ProfileController.store').validator('Profile')

  // mostrando todos os profiles
  Route.post('index', 'ProfileController.index')
  //update em um profile
  Route.post('update/:id', 'ProfileController.update')

  //Show one Profile
  Route.post('show/:id', 'ProfileController.show')

}).prefix('/profile/')

/*
              Rota para os cars
*/
Route.group(() => {
  Route.post('Store', 'CarController.store').validator('Car')

  //mostrando todos os carros
  Route.get('index', 'CarController.index')

  //mostrando um único carro
  Route.post('show/:id', 'CarController.show')

  //Update
  Route.post('update/:id', 'CarController.update')

}).prefix('/car/')

/*
              Rota para os driver
*/
Route.group(() => {
  Route.post('Store', 'DriverController.store').validator('Driver')

  //mostrando todos os carros
  Route.post('index', 'DriverController.index')

  //mostrando um único carro
  Route.post('show/:id', 'DriverController.show')

  //Update no ID
  Route.post('update/:id', 'DriverController.update')

}).prefix('/driver/').middleware('auth')


/*
              Rota para as files
*/
Route.group(() => {
  //Criar rota da imagem
  Route.post('store', 'FileController.store')

  //Pegar uma imagem
  Route.get(':id', 'FileController.show')
}).prefix('/file/')
// Route.post('adm/index', 'AdmController.index').middleware('auth:adm')

Route.post('/adm/store', 'AdmController.store').validator('adm')

Route.post('/sessionAdm/store', 'SessionAdmController.store')


//Criar rota da imagem
Route.group(() => {

  Route.post('show', 'AdmController.show')

}).prefix('/adm/').middleware('auth')
