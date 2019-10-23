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
    Route.post('store', 'PagamentoController.store').middleware('auth')


    Route.post('index', 'PagamentoController.index').middleware('havepermission')


    Route.post('show/:id', 'PagamentoController.show').middleware('auth')

    Route.post('update/:id', 'PagamentoController.update').middleware('havepermission')

}).prefix('/pagamento/')