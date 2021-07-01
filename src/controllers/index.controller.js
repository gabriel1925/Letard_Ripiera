const User = require('../models/user.models')
const index = {}

index.index = (req,res)=>{
    res.render('bienvenida',{layout: "bienvenida"})
}

module.exports = index