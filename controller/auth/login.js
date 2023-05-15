const bcrypt=require('bcryptjs')
const jwt=require("jsonwebtoken")
const { userModel ,loginValidation} = require('../../DB/models/userModel')
const signIn=async(req,res)=>{
    const {error}=loginValidation(req.body)
    error&&res.status(400).json({message:error.details[0].message})
    try {
     const {email,password}=req.body
const user=await userModel.findOne({email})
!user&&res.status(400).json({message:"Invalid email or password"})
if(user){
    const isMatch=await bcrypt.compare(password,user.password)
    if(isMatch){
        const token=jwt.sign({_id:user._id},process.env.SECRETKEY,{
            expiresIn:"1h"
        })
        res.json({token,user})
    }else{
        res.status(400).json({message:"Invalid email or password"})
    }
}
    } catch (error) {
res.status(400).json({message:"failed ",error})
    }
}

module.exports=signIn