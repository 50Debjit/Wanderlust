const express=require("express");
const router=express.Router({mergeParams:true});
const Listing = require("../model/listing.js");
const wrapasync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review = require("../model/Review.js");

//Review Route
//POST method
router.post("/", wrapasync(async(req,res)=>{
  let listing= await Listing.findById(req.params.id);
  let newReview=new Review(req.body.reviews);// this reviews is from show.ejs
  listing.review.push(newReview);//this review is from listing.js model array
  await newReview.save();
  await listing.save();
  req.flash("success"," Review Added!"); 
  console.log("New review saved");
  res.redirect(`/listings/${listing._id}`);
})
);
//Delete review
router.delete("/:reviewsid",wrapasync(async(req,res)=>{
  let {id,reviewsid}=req.params;
  await Listing.findByIdAndUpdate(id,{$pull:{review:reviewsid}} ); 
  await Review.findByIdAndDelete(reviewsid);
  req.flash("success"," review Deleted!"); 
  res.redirect(`/listings/${id}`);
 
})
);
module.exports= router;