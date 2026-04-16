import mongoose from "mongoose";

const db = async()=>{
try{
await mongoose.connect("mongodb://127.0.0.1:27017/DBUser"); 
console.log("Mongodb is connected with port number: 27017");
}catch(err){
    console.log("mongoDB connection err");
}
}

//db(); 

export default db; 