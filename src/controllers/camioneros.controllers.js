const camioneros = {}
const camionerosDb = require('../models/user.models.js')


camioneros.index = (req,res)=>{
    let cosa = camionerosDb.find()
    console.log(cosa)
    res.render('camioneros')
}

// 
camioneros.camionesutilizados = async (req,res)=>{
    res.render('camionesUtilizados')
}

// controladores de la administracion de los camioneros 
camioneros.administracion = async (req,res)=>{
    let usuarios = await camionerosDb.find({tipoDeUsuario:false})
    console.log(usuarios)
        datosPasados = []
    usuarios.map(e=>{
        let dato = {}
        dato._id = e._id
        dato.nombre = e.nombre
        dato.apellido = e.apellido
        dato.email = e.email
        dato.password = e.password
        dato.telefono = e.telefono
        dato.tipoDeUsuario = e.tipoDeUsuario
        dato.dni = e.dni
        datosPesados = datosPasados.unshift(dato)
        console.log("dato")
        console.log(dato)
    })
    res.render('adminCamioneros',{usuarios:datosPasados})
}
module.exports = camioneros 