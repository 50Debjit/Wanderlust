module.exports.isLoggedIn=(req,res,next)=>{
    console.log(req.user);
    if(!req.isAuthenticated()){
        
        req.flash("error"," You must be logginIn");
       return res.redirect("/login");
      }
      next();
}