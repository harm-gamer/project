const express = require("express");
const router = express.Router({mergeParams : true});
const Review = require("../models/review.js");
const Expresserror = require("../util/Express.js");
const wrapAsync = require("../util/wrapAsync.js");
const { reviewSchema } = require("../schema.js");
const listing = require("../models/listing.js");
const reviewController = require("../controllers/reviews.js");

const validateReview = (req,res,next) => {
    let{error} = reviewSchema.validate(req.body);

    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new Expresserror(400,errMsg);
    }
}
// review route
router.post("/",wrapAsync(reviewController.postReview));
 // review
 // delete route
 
 router.delete("/:reviewId", wrapAsync (reviewController.deleteReview));

 module.exports = router;