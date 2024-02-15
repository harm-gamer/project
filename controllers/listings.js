const listing =   require("../models/listing");
const mbxTilesets = require('@mapbox/mapbox-sdk/services/geocoding');
const mapboxToken = process.env.MAP_TOKEN;
const geocodingClient = mbxTilesets({accessToken: mapboxToken});
module.exports.index = async (req,res,next)=>{
    
    let listings =  await listing.find({});
     
    res.render("listings/index.ejs",{listings})
}
module.exports.new = (req,res)=>{
   
    res.render("listings/new.ejs")
}
module.exports.show = async (req,res,next)=>{
    let {id} = req.params;
    let listings = await listing.findById(id).populate("reviews").populate("owner");
    if(!listings){
        req.flash("success" ,"failed to add");
        res.redirect("./listings");
    }
    console.log(listings);
    res.render("listings/show.ejs",{listings})
}
module.exports.create = async  (req,res,next)=>{
  let response = await geocodingClient
  .forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
        .send();
       console.log(response.body.features[0].geometry);
        
  let url = req.file.path;
  let filename = req.file.filename;
    let listings = new listing(req.body.listing);
   //  listings.owner = req.user._id;
   listings.image = {url,filename};
  listings.geometry = response.body.features[0].geometry;
    await listings.save();
    req.flash("success" ,"new list added sucessfully");
     res.redirect("/listings");
};
module.exports.edit = async (req,res,next)=>{
    let {id} = req.params;
    let listings = await listing.findById(id);
    req.flash("success" ," List edited");
    let originalimageUrl = listings.image.url;
   originalimageUrl =  originalimageUrl.replace("/upload", "/upload/h_300,w_250");
    res.render("listings/edit.ejs",{listings, originalimageUrl});
    res.redirect("./listings");
};
module.exports.update = async (req,res,next)=>{
   let {id} = req.params;
 let listings = await listing.findByIdAndUpdate(id,{...req.body.listing});
 if(typeof req.file != "undefined"){
 let url = req.file.path;
 let filename = req.file.filename;
 listings.image = {url,filename};
 await listings.save();
 }
 req.flash("success" ,"list updated sucessfully");
   res.redirect("/listings");
}
module.exports.delete =  async (req,res)=>{
    let {id} = req.params;
    let deleted = await listing.findByIdAndDelete(id);
    req.flash("success" ," list deleted sucessfully");
    res.redirect("/listings");
  };
