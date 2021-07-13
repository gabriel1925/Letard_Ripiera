const consumo = {}
// Get de la pagina principal del administrador 
consumo.index = (req,res)=>{
    res.render('consumo',{usuario:req.user})
}


module.exports = consumo