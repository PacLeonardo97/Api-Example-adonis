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

    Route.post('index', 'ProfileController.index')

    //Update
    Route.post('update', 'ProfileController.update').validator('Profile').middleware('auth')

    //update em um profile
    Route.post('update/:id', 'ProfileController.updateAdm').validator('Profile').middleware('auth')

    //Show one Profile
    Route.post('show/:id', 'ProfileController.show').middleware('auth')

}).prefix('/profile/').middleware('auth')