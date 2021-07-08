const express = require('express')
const camioneros = express.Router()

const camionerosController = require('../controllers/camioneros.controllers.js')
const {isAuthenticated} = require("../helpers/auth")

camioneros.get('/choferes', camionerosController.index)


// peticiones de administracion en choferes


camioneros.get('/administracionchoferes', camionerosController.administracion)
camioneros.get('/camionesUtilizados/:id', isAuthenticated, camionerosController.camionesutilizados)

module.exports = camioneros