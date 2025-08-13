const mongoose=require("mongoose");
const userSchema= new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true , unique: true},
  isAdmin: {type:Boolean, default:false, required:true},
}, { timestamps: true });
module.exports=mongoose.model("User",userSchema);