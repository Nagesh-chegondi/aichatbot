import mongoose from "mongoose";
let isconnect = false;
export async function connectDB(){
    if(isconnect){
        return;
     

    }
    console.log(process.env.MONGODB_URI)
       const db = await mongoose.connect(process.env.MONGODB_URI)
          isconnect= db.connection.readyState === 1;
 
}