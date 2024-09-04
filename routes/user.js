const express=require("express");
const router=express.Router();
const User=require("../model/user.js");
const wrapasync=require("../utils/wrapAsync.js");
const passport=require("passport");

router.get("/signup",(req,res)=>{
    res.render("user/signup.ejs");
})
router.post ("/signup",wrapasync(async (req,res)=>{
   try{
        let username=req.body.username; 
        let email=req.body.email;
        let password=req.body.password;
        let newUser= new User({email,username});
        const registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        req.flash("success","Welcome to Wanderlust");
        res.redirect("/listings");
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
      
    })
)
router.get("/login", (req,res)=>{
    res.render("user/login.ejs");
})
router.post ("/login", passport.authenticate('local', { failureRedirect: '/login',failureFlash:true }),wrapasync(async (req,res)=>{
    try{
        // let { username,password }=req.body;
        // const newUser= new User({username});
        // console.log(newUser);
        // const registerUser=await User.register(newUser,password);
        // console.log(registerUser);
        req.flash("success"," Login Successfull");
        res.redirect("/listings");
        
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/login");
    }
    
})
)
router.get("/logout", (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Logout Successfully");
        res.redirect("/listings");
    })
    
})
module.exports=router;