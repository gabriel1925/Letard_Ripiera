const user = {}
const register = "register.hbs"
const login = "bienvenida.hbs"
const User = require('../models/user.models')
// const passport = require('passport')
// controlador de registro pasado por GET
user.singup=(req,res)=>{
    res.render(register,{session:req.isAuthenticated()})
}
// verificador del registro de los parametros aceptados 
user.singuppost = async (req,res)=>{
    const {nombre,apellido , email, password,tipoDeUsuario,dni, confirmPassword,telefono}= req.body
    console.log(req.body)
    console.log("hola")
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
        res.render(register,{errors, nombre, email, password, confirmPassword,session:req.isAuthenticated(),layout: "user"})
    }else{
        const emailUser = await User.findOne({email:email})
        console.log("este email esta repetido",emailUser)
        if(emailUser){
            // req.flash('error_msg',"ya este email esta registrado")
            const errors = [{text:'este email ya esta registrado'}]
            res.render(register,{ errors,nombre,session:req.isAuthenticated(),layout: "user"})
        }else{

            const newUser = new User({nombre,apellido , email, password,tipoDeUsuario,telefono,dni}) 
            newUser.password= await newUser.encryptPassword(password)
            await newUser.save()
            // res.render(login,{session:req.isAuthenticated(),layout: "user"})
            res.redirect('/')
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
    tipoDeUsuario = 'on'
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
module.exports = user