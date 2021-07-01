const mongose = require('mongoose')
const { Schema } = mongose
const bcrypt = require('bcryptjs')

const camionSchema = new Schema({
    marca:{type:String, required:true },
    modelo:{ type: String, required:true},
    capacidad:{type:Number},
    choferActual:{type:String}
})
modele.exports = mongose.model('Camion',camionSchema)