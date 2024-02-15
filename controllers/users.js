const User = require("../models/user.js");
const listings = require("../models/listing.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middlewaires.js");
module.exports.getSignUp= (req,res)=>{
    res.render("../users/signup.ejs");
 }
module.exports.postSignUp = async (req,res)=>{
    try{
     let {username ,email,password} = req.body;
     const newUser = new  User({email,username});
     const registerUser = await User.register(newUser,password);
     req.flash("success","welcome to wanderlust");
     console.log(registerUser);
     req.login(registerUser,(err)=>{
        if(err)  {
           return next(err);
        }
        req.flash("success","welocme to listings");
        res.redirect("/listings");

     })
    }
    catch(e){

     req.flash("success","username exist");
     res.redirect("/signUp");
    }
};
module.exports.getLogin = (req,res)=>{
    res.render("../users/login.ejs");
 };
module.exports.postLogin = passport.authenticate("local",{
    failureRedirect : "/login",
     failureFlash  : true,
     
  }),
   async(req,res)=>{
     req.flash("success",("welcome to Listings"));
     let redirectUrl = req.locals.redirectUrl || "/listings";
     res.redirect(redirectUrl);
  };
  module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
   req.flash("success", "you are loggedout");
   res.redirect("/listings");
    })
 };
