const mongose = require('mongoose')
const { Schema } = mongose
const bcrypt = require('bcryptjs')

const historialSchema = new Schema({
    idCamion:{ type:String},
    date:{type:Date,default:Date.now},
    litrosCargados:{ type: Number },
    kmCuentaVuelta: {type:Number}
})

module.exports = mongose.model('Historial',historialSchema)