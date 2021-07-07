const express = require('express')
const camioneros = express.Router()

const camionerosController = require('../controllers/camioneros.controllers.js')

camioneros.get('/choferes', camionerosController.index)

module.exports = camioneros