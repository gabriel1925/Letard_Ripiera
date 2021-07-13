const user = {}
const register = "register.hbs"
const login = "bienvenida.hbs"
const User = require('../models/user.models')
// const passport = require('passport')
// controlador de registro pasado por GET
user.singup= async(req,res)=>{
    // console.log(req.isAuthenticated())
    // console.log(req.headers.referer)
    let banderaRegistro, usuarios
    // Verifico de que ruta viene para colocar el check 
    if(req.headers.referer=== "http://localhost/adminAdministradores"){
        console.log(await User.find({tipoDeUsuario:true}))

        banderaRegistro = true
    }else{
        banderaRegistro = false
        console.log(await User.find({tipoDeUsuario:false}))
    }
    res.render(register,{session:req.isAuthenticated(),banderaRegistro})
}
// verificador del registro de los parametros aceptados 
user.singuppost = async (req,res)=>{
    let {nombre,apellido , email, password,tipoDeUsuario,dni, confirmPassword,telefono}= req.body
    // console.log(req.body)
    const errors = []
    // Verifico los errores de registro
    if(nombre.length <=0){
        errors.push({text:"Por favor inserte su nombre"})
    }
    if(dni.length <=0){
        errors.push({text:"Por favor inserte su DNI"})
    }
    if(telefono.length <=0){
        errors.push({text:"Por favor inserte su telefono"})
    }
    if(email.length <= 0){
        errors.push({text:"Inserta un email"})

    }
    if(password.length <= 0){
        errors.push({text:"Inserta una contraseña"})

    }
    if(confirmPassword.length <= 0){
        errors.push({text:"Por favor repite la contraseña"})

    }
    if(password != confirmPassword){
        errors.push({text:"Las contraseñas no coinciden"})
    }
    if(password.length < 6){
        errors.push({text:"la contraseña deberia ser mayor de 6 caracteres"})
    }
    if(errors.length >0){
        res.render(register,{errors, nombre, email, password, confirmPassword,session:req.isAuthenticated()})
    }else{
        const emailUser = await User.findOne({email:email})
        console.log("este email esta repetido",emailUser)
        if(emailUser){
            // req.flash('error_msg',"ya este email esta registrado")
            const errors = [{text:'este email ya esta registrado'}]
            res.render(register,{ errors,nombre,session:req.isAuthenticated(),layout: "user"})
        }else{
            // conversimos el tipo de usuario a booleano
            console.log(tipoDeUsuario)
            if (tipoDeUsuario == 'on'){
                console.log('pase')
                tipoDeUsuario = true
            }else{
                console.log('no pase')
                tipoDeUsuario = false
            }
            const newUser = new User({nombre,apellido , email, password,tipoDeUsuario,telefono,dni}) 
            newUser.password= await newUser.encryptPassword(password)
            await newUser.save()
            // res.render(login,{session:req.isAuthenticated(),layout: "user"})
            res.redirect('/consumo')
        }
    }
}
//controlador de el logeo por GET
user.singin=(req,res)=>{
    const {nombre} = req.body
    res.redirect('/')
}
//Verifica y logea al usuario
user.singinpost = (req,res)=>{
    const {email ,password}= req.body
    const errors = []
    // console.log(email,password)
    if(email.length <= 0){
        errors.push({text:"ingresa tu email"})
    }
    if(password.length <= 0){
        errors.push({text:"ingresa la contraseña"})
    }
    if(errors.length > 0){
        res.render(login,{errors, email, password,session:req.isAuthenticated(),layout: "user"})
    }
    if(errors.length == 0) res.send("ok")
}
// Mata la session del usuario
user.logout = (req, res) => {
    req.logout();
    req.flash("error", "Has cerrado session");
    res.redirect("/"); 
};
// controlador de /singupcamion por GEt
user.singupCamion = (req,res)=>{
    res.render('registerCamion')
}
//recive el pedido de carga para registrar el camion en el sistema
user.singupCamionpost = (req,res)=>{
    res.send('ok')
}
//Cuando ingrese por primera vez colocamos este uuario para poder ingresar 
user.createAdmin = async (req,res)=>{
    let nombre,apellido , email, password,tipoDeUsuario,dni,telefono
    email= 'admin@admin'
    password = 'admin1234'
    tipoDeUsuario = true
    nombre = 'gabriel'
    apellido = 'vauccassovitch'
    telefono='2612496785'
    dni=38908755
    const emailUser = await User.findOne({email:email})
    console.log(emailUser)
    if(emailUser){
        // req.flash('error_msg',"ya este email esta registrado")
        const errors = [{text:'este email ya esta registrado'}]
        res.redirect('/consumo')
    }else{

        const newUser = new User({nombre,apellido , email, password,tipoDeUsuario,telefono,dni}) 
        newUser.password= await newUser.encryptPassword(password)
        await newUser.save()
        // res.render(login,{session:req.isAuthenticated(),layout: "user"})
        res.redirect('/consumo')
    }

}
// Cambios del adminiostrador 
user.adminadministradores = async (req,res)=>{
    let usuarios =await User.find({tipoDeUsuario:true})
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
    console.log(datosPasados)
    res.render("adminadministradores",{usuarios:datosPasados})
}
module.exports = user