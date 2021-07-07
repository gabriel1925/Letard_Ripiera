const camioneros = {}
const camionerosDb = require('../models/user.models.js')


camioneros.index = (req,res)=>{
    let cosa = camionerosDb.find()
    console.log(cosa)
    res.render('camioneros')
}
module.exports = camioneros 