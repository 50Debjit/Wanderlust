
const mongoose = require('mongoose');
const{Schema}=mongoose;
main().then(()=>console.log("connected")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}
const userSchema = new Schema({
  
   Username: String,
   Address:[
    {
      _id:false,
        location:String,
        city:String,
    }
   ]
  });
  const User = mongoose.model('User', userSchema);
  const addUser= async()=>{
    let user1=new User({
      Username:"Debjit",
      Address:[{
        location: "Baker Street",
        city:"London"
    }]
    })
    user1.Address.push({location:"P32 Street",city:"London"});
    let result=await user1.save();
    console.log(result);
  }
  addUser();
