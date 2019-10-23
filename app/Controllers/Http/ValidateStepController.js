'use strict'

const Driver = use('App/Models/Driver')
const Prova = use('App/Models/Prova')
const Database = use('Database')
const Treinamento = use('App/Models/Treinamento')
const Vistoria = use('App/Models/Vistoria')

class ValidateStepController {
    async step({ request, auth, parms, response }) {

        let userLogged = await auth.getUser();


        const driver = await Driver.findBy('user_id', userLogged.id)

        if (driver === null) {
            return { step: 0, message: 'Por favor faça seu cadastro na aba "complete seu cadastro " ', stepTitle: 'Cadastro' };
        }
        if (driver.status === 'aguardando') {

            return { step: 1, message: 'Estamos analisando seu perfil, por favor aguarde', stepTitle: 'Verificação' }
        } else if (driver.status === 'reprovado') { // tem que mudar o status para aprovado

            return { step: 1, message: 'Você foi reprovado', stepTitle: 'Verificação' }
        }

        const treinamento = await Treinamento.findBy('driver_id', driver.id)

        if (treinamento === null) {
            return { step: 2, message: 'Você ainda não iniciou o treinamento', stepTitle: 'Treinamento' }
        }

        if (treinamento.andamento_treinamento !== 'finalizado') {
            return { step: 2, message: 'Você tem que completar o treinamento', stepTitle: 'Treinamento' }
        }

        const prova = await Prova.findBy('driver_id', driver.id)

        if (prova === null) {
            return { step: 3, message: 'Você ainda não fez a prova', stepTitle: 'Prova' }
        }

        if (prova.nota < 5) {
            return { step: 3, message: 'Você não passou na prova, vá para a central para mais informações', stepTitle: 'Prova' }
        }

        const vistoria = await Vistoria.findBy('driver_id', driver.id)

        if (vistoria === null) {
            return { step: 4, message: 'Ainda não foi marcada a vistoria', stepTitle: 'Vistoria' }
        }
        // console.log(vistoria)
        if (vistoria.car_id === null) {
            return { step: 4, message: 'a data da vistoria é: ' + vistoria.data_vistoria + ', por favor, vá a central', stepTitle: 'Vistoria' }
        }
        return { step: 5, message: 'parabéns :D', stepTitle: 'Concluído' }

    }
}

module.exports = ValidateStepController
