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
    Route.post('store', 'TreinamentoController.store').middleware('havepermission')


    Route.post('index', 'TreinamentoController.index').middleware('havepermission')


    Route.post('show/:id', 'TreinamentoController.show')


    Route.post('update/:id', 'TreinamentoController.update').middleware('havepermission')

}).prefix('/treinamento/').middleware('auth')