const {userModel, validRegister} = require("../../DB/models/userModel")


const signup=async(req,res)=>{
    const {name,email,password}=req.body

    const {error}=validRegister({name,email,password})
    error&&res.status(400).json({message:error.details[0].message})
    try {
    const newUser=await new userModel({name,email,password}).save()
res.status(201).json({message:"Done ",newUser})
    } catch (error) {
res.status(400).json({message:"failed ",error})
    }
}


module.exports=signup