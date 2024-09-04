const express=require("express");
const router=express.Router(); // Restructuring code of app.js
const Listing = require("../model/listing.js");
const wrapasync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {isLoggedIn}=require("../middleware.js");
// router.use(express.urlencoded({ extended: true }));
// const methodOverride = require("method-override");
  //index route
  router.get("/", async(req,res)=>{
       const allList= await Listing.find({});

          res.render("listing/index.ejs",{allList});
      })
      //New list
      router.get("/new",isLoggedIn, async(req,res)=>{
        //let { title,description,price,location,country,}=req.body;
        res.render("listing/new.ejs");
      });
      //Show Route
      router.get("/:id",isLoggedIn,wrapasync(async(req,res)=>{
    let {id}=req.params;
    let listing= await Listing.findById(id).populate("review");
    if(!listing){
      req.flash("error","Listing does not exist!");
      res.redirect("/listings") ;
    }
      res.render("show.ejs",{listing});
  })
      );
  //Create new route norammly
  // app.post("/listings",async(req,res,)=>{
     
  //   const newListing=new Listing(req.body.listing);
  //   await newListing.save();
  //   res.redirect("/listings");
  // })
  
  //create new route with error handelling
  router.post("/",isLoggedIn,wrapasync(async(req,res,next)=>{
    if(!req.body.listing){
      throw new ExpressError(400,"Send Valid Data for Listing");
    }
     const newListing=new Listing(req.body.listing);
     if(!newListing.title){
      throw new ExpressError(400,"Title is missing");
    }
    if(!newListing.description){
      throw new ExpressError(400,"Description is missing");
    }
    if(!newListing.country){
      throw new ExpressError(400,"Country is missing");
    }
      await newListing.save();
      req.flash("success","New Listing Added!"); //Express-Flash middleware to flash msg on screen
      res.redirect("/listings");
      
  })
  );
  
  //Edit
  router.get("/:id/edit",isLoggedIn,async(req,res)=>{
    let {id}=req.params;
    let listing= await Listing.findById(id);
    req.flash("success","Listing Edited!"); 
    res.render("listing/edit.ejs",{listing})
  })
  //Update
  router.put("/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success"," Listing Updated!"); 
    res.redirect("/listings")
  })
  //Delete list
  router.delete("/:id",isLoggedIn,async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success"," Listing Deleted!"); 
    res.redirect("/listings")
});
module.exports =router;