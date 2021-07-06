const express = require('express')
const router = express.Router()
const user = require('../controllers/user.controller')
const passport = require('passport')
const { isAuthenticated, authenticatedviews } = require('../helpers/auth')

router.get('/singup',isAuthenticated,user.singup)
router.post('/singup',user.singuppost)
router.get('/singin',authenticatedviews,user.singin)
router.post('/singin', passport.authenticate("local", {
    successRedirect: "/consumo",
    failureRedirect: "/fallo",
    failureFlash: true,
  }))
router.get('/Singupcamion', isAuthenticated,user.singupCamion)
router.post('/singupCamion', isAuthenticated,user.singupCamionpost)

router.get('/logout', user.logout)
router.get('/createAdmin', user.createAdmin)
module.exports = router