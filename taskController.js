const Task=require("../model/taskModel");
const {findByIdAndUpdate} = require("../model/userModel");
const getTasks=async(req,res)=>{
    try {
        const tasks=await Task.find({user:req.user});
        res.status(200).json({message:"Tasks fetching", tasks});
    }catch(error){
        res.status(500).json({message:"Server error while fetching tasks", error:error.message})
    }
}
// const createTask= async (req,res)=>{
//     try {
//         const {title,description,priority,dueDate}=req.body;
//         const newTask=new Task ({
//           title,description,priority,dueDate,
//           user:req.user.id,
//         });
//         await newTask.save();
//         res.status(200).json({message:"New task created", task: newTask});
//     }catch(er){
//         res.status(500).json({message:"Error while creating task", error:er.message});
//     }
// }
const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, completed } = req.body;

    if (!title || !description || !priority || !dueDate || !completed===undefined) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newTask = new Task({
      title,
      description,
      priority,
      dueDate,
      completed: completed || false,
      user: req.user.id,
    });

    await newTask.save();

    res.status(200).json({ message: "New task created", task: newTask });
  } catch (er) {
    console.error("CREATE TASK ERROR:", er); 
    res.status(500).json({
      message: "Error while creating task",
      error: er.message,
    });
  }
};



const updateTask = async (req,res)=>{
    try {
        const taskId=req.params.id;
    const updatedTask=await Task.findByIdAndUpdate(taskId,req.body, { new: true},)
    res.status(200).json({message:"task updated", task:updatedTask})
    }catch(e){
  res.status(500).json({message:"Error while updating task", error:e.message})
    }
}
const deleteTask=async(req,res)=>{
    try{
        const taskId=req.params.id;
        const deletedTask= await Task.findByIdAndDelete(taskId);
        if (!deletedTask){
            return res.status(409).json({message:"Task not deleted"});
        }
        res.status(200).json({message:"Task deleted succesfully", task:deletedTask})
    }catch(err){
        res.status(500).json({message:"Error while deleting task", error:err.message})
    }
}
const toggleTaskCompletion =async(req,res)=>{
try{
    const taskId=req.params.id;
    const task= await Task.findById(taskId);
    if(!task){
        return res.status(404).json({message:"Task not found"});
    }
    task.completed=!task.completed;
    await task.save();
    res.status(200).json({message:"Task completion toggled", task })
}catch(errors){
    res.status(500).json({message:"Error toggling task",error:errors.message})
}
}
module.exports={getTasks,createTask,updateTask,deleteTask,toggleTaskCompletion};
