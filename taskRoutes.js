const express=require("express");
const route=express.Router();
const {getTasks,createTask,updateTask,deleteTask,toggleTaskCompletion}=require("../controller/taskController");
const authenticate=require("../middleware/authMiddleware")

route.get("/",authenticate,getTasks);
// console.log("getTasks: ", getTasks); 
route.post("/add",authenticate,createTask);
route.put("/update/:id",authenticate,updateTask);
route.delete("/delete/:id",authenticate,deleteTask);
route.patch("/toggle/:id",authenticate,toggleTaskCompletion);
module.exports=route;
