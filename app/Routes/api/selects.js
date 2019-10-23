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


Route.post('pickDriver', 'DriverController.pickDriver').middleware('havepermission') //se o motorista tem carro

Route.post('pickDriverNormal', 'DriverController.pickDriverNormal').middleware('havepermission') //pegar motorista normal

Route.post('pickNameCentral', 'UserController.pickNameCentral').middleware('havepermission') // Pegar Usuarios Centrais

Route.post('pickCars', 'CarController.pickCars').middleware('havepermission') //pegar carro que tem motorista

Route.post('doesntHaveCar', 'CarController.doesntHaveCar').middleware('havepermission') //Pegar Carro que não tem motorista

Route.post('dontHaveDriver', 'DriverController.dontHaveDriver').middleware('havepermission') //Motorista que não tem carro
