import mongoose, { models, Schema } from "mongoose";


const  userSchema=new Schema({
name:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
},
password:{
    type:String,
     required: function () {
    return this.provider === "credentials";
  },
},
provider: {
  type: String,
  default: "credentials",
},

},{timestamps:true});

const User=models.User||mongoose.model("User",userSchema);

 export default User;