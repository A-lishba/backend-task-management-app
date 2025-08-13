const mongoose=require("mongoose");
const taskSchema=new mongoose.Schema({
    title: {type: String , required : true},
    description:{type:String},
    completed: {type:Boolean,default:false},
    priority: {type:String, enum: ['Low','Medium','High']},
    dueDate:{type:Date},
    user : {type:mongoose.Schema.Types.ObjectId, ref:"User",required:true},
},{timestamps:true}
)
module.exports=mongoose.model("task",taskSchema);