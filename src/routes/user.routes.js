const express = require('express')
const router = express.Router()
const user = require('../controllers/user.controller')
const passport = require('passport')
const { isAuthenticated, authenticatedviews } = require('../helpers/auth')

router.get('/singup',isAuthenticated,user.singup)
router.post('/singup',user.singuppost)
router.get('/singin',authenticatedviews,user.singin)
router.post('/singin', passport.authenticate("local", {
    successRedirect: "http://facebook.com",
    failureRedirect: "/fallo",
    failureFlash: true,
  }))
router.get('/Singupcamion', user.singupCamion)
router.post('/singupCamion', user.singupCamionpost)

router.get('/logout', user.logout)
module.exports = router