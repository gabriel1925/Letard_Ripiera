const camioneros = {}
const camionerosDb = require('../models/user.models.js')


camioneros.index = (req,res)=>{
    let cosa = camionerosDb.find()
    console.log(cosa)
    res.render('camioneros')
}



// controladores de la administracion de los camioneros 
camioneros.administracion = (req,res)=>{
    res.render('adminCamioneros')
}
module.exports = camioneros 