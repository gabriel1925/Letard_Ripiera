const express = require('express')
const camioneros = express.Router()

const camionerosController = require('../controllers/camioneros.controllers.js')
const {isAuthenticated, authenticatedChofer} = require("../helpers/auth")

camioneros.get('/choferes',isAuthenticated, camionerosController.index)
camioneros.get('/Soychofer',authenticatedChofer,camionerosController.soyChofer)



// peticiones de administracion en choferes


camioneros.get('/administracionchoferes', camionerosController.administracion)
camioneros.get('/camionesUtilizados/:id', isAuthenticated, camionerosController.camionesutilizados)

module.exports = camioneros