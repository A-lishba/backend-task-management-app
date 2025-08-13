const jwt=require("jsonwebtoken");
const User=require("../model/userModel");
const authenticate=async(req,res,next)=>{
    
    const authHeader=req.headers.authorization;
   if (!authHeader || !authHeader.startsWith("Bearer ")) {
  return res.status(401).json({ message: "No token, authorization denied" });
}
try {
  
        const token=authHeader.split(" ")[1];
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
         console.log("token",token);
        req.user=await User.findById(decoded.id).select("-password");
        next();
    }catch(error){
        res.status(401).json({message:"Invalid or expired token", error:error.message});
    }
   
}
module.exports= authenticate;