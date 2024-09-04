const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require ("../model/listing.js");

const MONGO_URL= "mongodb://127.0.0.1:27017/wander"; //Defining Mongo url

main().then((res)=>{console.log("Database Connected");
}) //calling main func
.catch((err)=>{console.log(err)});

async function main(){ // Main function for connect MD
    await mongoose.connect(MONGO_URL);
};
const initDb=async ()=>{
     await  Listing.deleteMany({});
     await Listing.insertMany(initData.data);
     console.log("Data initialized");
} 

initDb();