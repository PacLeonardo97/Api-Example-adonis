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
    Route.post('store', 'DriverController.store').validator('Driver')

    Route.post('step', 'ValidateStepController.step')

    Route.post('index', 'DriverController.index')


    Route.post('show/:id', 'DriverController.show')


    Route.put('updateAdm/:id', 'DriverController.updateAdm').middleware(['havepermission'])

    Route.post('update/:id', 'DriverController.update')

}).prefix('/driver/').middleware('auth')