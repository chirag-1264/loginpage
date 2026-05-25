import mongoose, { models, Schema } from "mongoose";

 
const  otpschema =new Schema({
email:{
    type:String,
    required:true,
},
otp:{
    type: String,
    required:true,
},

expiresAt:{
    type: Date,
    required:true
},

},{timestamps:true});

const Otp=models.Otp||mongoose.model("Otp",otpschema);

 export default Otp;
