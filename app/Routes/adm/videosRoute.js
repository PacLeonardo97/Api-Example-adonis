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
    Route.post('index', 'VideoController.index')

    Route.post('store', 'VideoController.store').validator('video').middleware('havepermission')

    Route.get(':id', 'VideoController.show')

}).prefix('/video/').middleware('auth')