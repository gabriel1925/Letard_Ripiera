const express = require('express')
const consumo = express.Router()
const Consumo = require('../controllers/consumo.controller')
const { isAuthenticated, authenticatedviews } = require('../helpers/auth')

consumo.get('/consumo',isAuthenticated, Consumo.index)


module.exports = consumo