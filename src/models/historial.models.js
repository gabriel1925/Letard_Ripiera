const mongose = require('mongoose')
const { Schema } = mongose
const bcrypt = require('bcryptjs')

const historialSchema = new Schema({
    idCamion:{ type:String},
    date:{type:String},
    litrosConsumidos:{ type: Number },
    kmCuentaVuelta: {type:Number},
    camioneroAsociado: {type:String}
})

module.exports = mongose.model('Historial',historialSchema)