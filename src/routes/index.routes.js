const express = require('express')
const index = require('../controllers/index.controller')
const { isAuthenticated, authenticatedviews} = require('../helpers/auth')
const router = express.Router()

router.get('/', authenticatedviews,index.index )
// router.get('/fallo',(req,res)=>{
//     res.send("fallo")
// })
module.exports = router