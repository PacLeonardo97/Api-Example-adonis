// 'use strict'
// const Investor = use('App/Models/Investor')
// const Database = use('Database')
// const Logger = use('Logger')

// class InvestorController {

//     async index({ request }) {
//         const { page } = request.get()
//         const investor = await Investor.query().paginate(page)

//         Logger.info('pegar todos os investior', { investor: investor })

//         return investor
//     }
//     async store({ request }) {
//         const data = request.only([
//             'user_id',
//             'valor_quota_investor'
//         ])
//         let newdata = {
//             valor_quota_investor: data.valor_quota_investor
//         }
//         if (data.user_id) {
//             newdata.user_id = data.user_id;
//         }

//         const trx = await Database.beginTransaction();
//         const envestidor = await Investor.create(newdata, trx);

//         await trx.commit();
//         Logger.info('Criando o investidor: ', { envestidor: envestidor })

//         return envestidor
//     }

//     async show({ params }) {

//         const investor = await Investor.findOrFail(params.id)


//         return investor
//     }

//     async update({ params, request }) {
//         const trx = await Database.beginTransaction();

//         const data = request.only([
//             'valor_quota_investor'
//         ])
//         const investor = await Investor.findOrFail(params.id)

//         let newdata = {
//             valor_quota_investor: data.valor_quota_investor,

//         }

//         investor.merge(newdata);

//         await investor.save()
//         await trx.commit();

//         return investor
//     }
// }

// module.exports = InvestorController
