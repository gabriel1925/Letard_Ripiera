const helpers = {}
helpers.isAuthenticated = (req,res,next)=>{
    // console.log(req.isAuthenticated()) 
    const session =req.isAuthenticated()
    if (req.isAuthenticated()){
        console.log(req.user.tipoDeUsuario)
        if (req.user.tipoDeUsuario) {
            return next()
        }else{
            res.redirect('/chofer')
        }
    }else{
        req.flash('error', 'No autorizado')
        res.redirect('/')
    }
}
helpers.authenticatedviews = (req,res,next)=>{
    // console.log(req.isAuthenticated()) 
    const session =req.isAuthenticated()
    if (req.isAuthenticated()){
        console.log(req.user.tipoDeUsuario)
        if (req.user.tipoDeUsuario) {
            res.redirect('/consumo')
        }else{
            res.redirect('/chofer')
        }
    }else{
        return next()
    }
}
helpers.authenticatedChofer = (req,res,next)=>{
    const session =req.isAuthenticated()
    if (req.isAuthenticated()){
        console.log(req.user.tipoDeUsuario)
        if (req.user.tipoDeUsuario) {
            res.redirect('/consumo')
        }else{
            return next()
        }
    }else{
        req.flash('error', 'No autorizado')
        res.redirect('/')
    }
}
module.exports = helpers
