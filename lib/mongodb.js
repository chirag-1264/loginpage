import mongoose from "mongoose";


export const connectMongodb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
       console.log("connected to mongodb");
    
    } catch (error) {
        console.log("error connecting to database",error);
    }
}