const express = require('express')
const camiones = express.Router()
const camionesControllers = require('../controllers/camiones.controllers')
const { isAuthenticated} = require('../helpers/auth')

camiones.get('/camiones',isAuthenticated, camionesControllers.index)
camiones.get('/adminCamiones',isAuthenticated, camionesControllers.administracion)
camiones.get('/historialdecargas/:id',isAuthenticated, camionesControllers.historialDeCargas)
camiones.get('/historialdechoferes/:id',isAuthenticated, camionesControllers.historialDeChoferes)


module.exports = camiones
