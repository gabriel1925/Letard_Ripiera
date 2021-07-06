const express = require('express')
const camiones = express.Router()
const camionesControllers = require('../controllers/camiones.controllers')
const { isAuthenticated} = require('../helpers/auth')

camiones.get('/camiones',isAuthenticated, camionesControllers.index)


module.exports = camiones