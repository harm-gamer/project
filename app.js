if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//app.set("views", path.join(__dirname, "users"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const user = require("./route/user.js");
const listings = require("./route/listing.js");
const reviews = require("./route/review.js");
const ejsmate = require("ejs-mate");
app.engine('ejs', ejsmate);
const Expresserror = require("./util/Express.js");
const ATLAS = process.env.ATLAS_DB;
main().then((res) => {console.log("connected to db")});
async function main(){
    await mongoose.connect(ATLAS);
}
const session = require("express-session");
const connectMongo = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const Localstartegies = require("passport-local");
const User = require("./models/user.js");
const store = connectMongo.create({
    mongoUrl : ATLAS,
    crypto : {
        secret : process.env.ENV_VAR,
    },
    touchAfter : 24 * 3600,
})
app.use(session({
    store,
    secret : process.env.ENV_VAR,
    resave : false,
    saveUninitialized : true,

    cookie : {
        expires : Date() + 7 * 24 * 60 *60*1000,
        maxAge :  7 * 24 * 60 *60*1000
    }
}))
app.use(flash());
// passport confurigation initiallization
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Localstartegies(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// session success or error  middleware
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();  
})

app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);
app.use("/",user);

app.all("*",(req,res,next)=>{
    next(new Expresserror(404,"page not found"));
})
app.use((err,req,res,next)=>{
    let{status = 500,message= "please fo for a valid"} = err;
    res.status(status).render("listings/error.ejs",{message});
})



app.listen(3000, () =>{ console.log("connection sussesful")});
