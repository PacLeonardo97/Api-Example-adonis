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


Route.group(() => {
    Route.post('store', 'CarController.store').validator('Car').middleware('havepermission')

    //mostrando todos os carros
    Route.post('index', 'CarController.index').middleware('havepermission')

    //mostrando um único carro
    Route.post('show/:id', 'CarController.show').middleware('auth')

    //Update
    Route.post('update/:id', 'CarController.update').middleware('havepermission')

}).prefix('/car/')