const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const wrapasync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const path = require("path");
app.use(express.urlencoded({ extended: true }));
const methodOverride = require("method-override");
app.use(express.static(path.join(__dirname,"/public")));
// app.use(express.static(path.join(__dirname,"/css")));
app.use(methodOverride("_method"));
const MONGO_URL = "mongodb://127.0.0.1:27017/wander";
const ejsMate=require("ejs-mate");
const listingRoute=require("./routes/listing.js");
const reviewRoute=require("./routes/review.js");
const userRoute=require("./routes/user.js");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./model/user.js");
const port=8084;
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}
app.set("viewengine","ejs");
app.set("views",path.join(__dirname,"views"));
app.engine("ejs",ejsMate);


app.use(session({
  secret: 'mysupersecretcode',
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now()+ 7*24*60*60*1000, // 7Days * 24 Hours * 60min * 60sec * 1000 milisec
    maxAge: 7*24*60*60*1000,
    httpOnly: true, 
   }
}))
app.use(flash());

//Passport user Authentication for login & signup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); //Store info of users in session
passport.deserializeUser(User.deserializeUser()); //Unstore or remove info of user from session


app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  next();
})
app.use((req,res,next)=>{
  res.locals.error=req.flash("error");
  next();
})
app.use((req,res,next)=>{
  res.locals.curruser=req.user;
  next();
})
app.get("/",(req,res)=>{
  res.render("listing/home.ejs");
})
// app.get("/demouser",async(req,res)=>{
//   let fakeUser=new User({
//     email:"stuhennttt@gmail.com",
//     username:"deltaaaa",
//   });
//   let registerUser=await User.register(fakeUser,"hellworld");
//   res.send(registerUser);
// })

app.use("/listings",listingRoute); //This is main route of all listing of listing.js in routes folder
app.use("/listings/:id/reviews",reviewRoute);  //This is main route of all review of review.js in routes folder
app.use("/",userRoute);
app.use("/",userRoute);



//ExpressError for all routes
app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"Page not Found!"));
});
// Error handelling Middleware
app.use(( err,req,res,next)=>{
  let{statusCode=500,message="Something Went Wrong"}=err;
  res.status(statusCode).render("listing/error.ejs",{err}); 
  // res.send("Wrong");
  res.status(statusCode=500).send(message);
})

app.listen(port, () => {
  console.log(`server is listening to ${port}`);
});