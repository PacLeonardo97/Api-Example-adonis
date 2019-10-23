'use strict'

const Route = use('Route')

Route.group('user', () => {
    Route.post('motor', 'ProfileController.store').validator('Profile')

    Route.post('sessions', 'SessionController.store').validator('Sessions')
}).prefix('/user')

Route.post('passwords', 'ForgotPasswordController.store').validator('ForgotPassword')

Route.put('passwords', 'ForgotPasswordController.update').validator('ResetPassword')

Route.post('passwordRecovery', 'ForgotPasswordController.passwordRecovery')