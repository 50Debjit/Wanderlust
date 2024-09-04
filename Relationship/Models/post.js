const mongoose = require('mongoose');
const{Schema}=mongoose;
main().then(()=>console.log("connected")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}
const userSchema = new Schema({
  
   Username: String,
   email: String,
  });
  const postSchema = new Schema({
    likes: Number,
    content: String,
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
   });
  const User = mongoose.model('User', userSchema);
  const Post= mongoose.model('Post', postSchema);
  const addUser= async()=>{
    let user1=new User({
        Username:"pritamghosh",
        email:"pritam@gmail.com",
    })
  let post1=new Post({
    likes:40,
    content:"hello",
  })
   post1.user=user1;
   await user1.save();
  await post1.save();
  }
  addUser();