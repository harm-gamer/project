const listing = require("../models/listing.js");
const Review = require("../models/review.js");
module.exports.postReview =  async (req,res)=>{
    console.log(req.body.reviews);
    let listings = await listing.findById(req.params.id);
    let newreview = new Review(req.body.reviews);
    console.log(req.body.reviews);
 
    listings.reviews.push(newreview); 
 
    await newreview.save();
    await listings.save();
 //    console.log("review saved");
 //    res.send("reciew saved");
 req.flash("success" ,"review added sucessfully");
    res.redirect(`/listings/${listings.id}`);
 
 }
 module.exports.deleteReview = async (req,res)=>{
    let { id, reviewId} = req.params;

    await listing.findByIdAndUpdate(id, {$pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success" ,"review deleted");
    res.redirect(`/listings/${id}`);
}