const user = {}
const register = "register.hbs"
const login = "bienvenida.hbs"
const User = require('../models/user.models')
// const passport = require('passport')
user.singup=(req,res)=>{

    res.render(register,{session:req.isAuthenticated(),layout: "user"})
}
user.singuppost = async (req,res)=>{
    const {nombre,apellido , email, password,tipoDeUsuario,dni, confirmPassword,telefono}= req.body
    console.log(req.body)
    console.log("hola")
    const errors = []
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
user.singin=(req,res)=>{
    const {nombre} = req.body
    res.render(login ,{nombre,session:req.isAuthenticated(),layout: "user"})
}
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
user.logout = (req, res) => {
    req.logout();
    req.flash("error", "Has cerrado session");
    res.redirect("/"); 
};
user.singupCamion = (req,res)=>{
    res.render('registerCamion')
}
user.singupCamionpost = (req,res)=>{
    res.send('ok')
}
module.exports = user