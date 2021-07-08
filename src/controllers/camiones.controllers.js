const camiones = {}
const camion = require('../models/camion.models')
const camioneros = require('../models/user.models')

camiones.index = (req,res)=>{
    res.render('camiones')
}
camiones.historialDeCargas = async(req,res)=>{
    res.render("historialDeCargas")
}
camiones.historialDeChoferes = async (req,res)=>{
    res.render("historialDeChoferes")
}
// controladores de la administracion de los camioneros 
camiones.administracion = (req,res)=>{
    res.render('adminCamion')
}
module.exports = camiones