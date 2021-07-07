const express = require('express')
const camioneros = express.Router()

const camionerosController = require('../controllers/camioneros.controllers.js')

camioneros.get('/choferes', camionerosController.index)


// peticiones de administracion en choferes


camioneros.get('/administracionchoferes', camionerosController.administracion)

module.exports = camioneros