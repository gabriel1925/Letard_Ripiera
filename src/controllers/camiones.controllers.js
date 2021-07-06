const camiones = {}
const camion = require('../models/camion.models')
const camioneros = require('../models/camionero.models')

camiones.index = (req,res)=>{
    res.render('camiones')
}

module.exports = camiones