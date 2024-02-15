const express = require("express");
const router = express.Router();
const Expresserror = require("../util/Express.js");
const WrapAsync = require("../util/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const flash = require("connect-flash");
const {isLogedin} = require("../middlewaires.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

const validateListing = (req,res,next) => {
    let {error} = listingSchema.validate(req.body);
   
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new Expresserror(400,errMsg);
    }
}
// all route
router.get("/" , WrapAsync(listingController.index));
// new route
router.get("/new",listingController.new);
// show route
router.get("/:id" , WrapAsync(listingController.show));
//create
 router.post("/", upload.single('listing[image]'),WrapAsync(listingController.create));
  
// edit route
router.get("/:id/edit",WrapAsync( listingController.edit))

// update route
router.put("/:id", upload.single('listing[image]'), WrapAsync(listingController.update))
router.delete("/:id",WrapAsync(listingController.delete));
module.exports = router;