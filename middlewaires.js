module.exports.isLogedin = (req,res,next)=>{
    if(!req.isAuthenticated()){ 
        req.session.redirectUrl = req.originalUrl;
        req.flash("success" ,"you should singnUp for create new Listings");
       return res.redirect("/login");
    }
    next();
}
module.exports.saveRedirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
        req.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}