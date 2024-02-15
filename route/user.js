const express = require("express");
const wrapAsync = require("../util/wrapAsync.js");
const router = express.Router();
const WrapAsync = require("../util/wrapAsync.js");
const User = require("../models/user.js");

const {saveRedirectUrl} = require("../middlewaires.js");
const {islogedin} = require("../middlewaires.js");
const userController = require("../controllers/users.js");
router.get("/signUp",userController.getSignUp);
router.post("/signUp", WrapAsync(userController.postSignUp));
router.get("/login",userController.getLogin);
router.post("/login",saveRedirectUrl,userController.postLogin);
// logout
router.get("/logout",userController.logout);
 module.exports = router;
