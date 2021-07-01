const User = require('../models/user.models')
const index = {}

index.index = (req,res)=>{
    console.log(req.user)
    res.render('bienvenida',{layout: "bienvenida"})
}

module.exports = index