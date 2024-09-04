
const mongoose = require('mongoose');
const { type } = require('os');
const{Schema}=mongoose;
main().then(()=>console.log("connected")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}
const orderSchema = new Schema({
  
   items: String,
   price: Number,
  });
  const CustomerSchema = new Schema({
    name: String,
    order:[{
        type:Schema.Types.ObjectId,
        ref:"Order",
    }
    ]
  })
  const Order = mongoose.model('User', orderSchema);
  const Customer = mongoose.model('Customer', CustomerSchema);
  const addCustomer= async()=>{
    // let Customer1=new Customer({
    //   name:"Pritam",
    // })
    // let order1=await Order.findOne({items:"Pen"});
    // let order2=await Order.findOne({items:"Book"});
    // Customer1.order.push(order1);
    // Customer1.order.push(order2);


    // let result= await Customer.find({});
    // console.log(result);
    let result= await Customer.find({}).populate("order");
    console.log(result);
}
    addCustomer();
//   const addOrder= async()=>{
//     let res= await Order.insertMany([
//       {items:"Pen",price:10},
//       {items:"Book",price:300},
//       {items:"Chocolate",price:20},
//     ])
    
//     // Order.save();
//     console.log(res);
//   }
//   addOrder();
