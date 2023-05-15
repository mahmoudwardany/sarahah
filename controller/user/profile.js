const { userModel } = require("../../DB/models/userModel")


const profile=async(req,res)=>{
    try {
        const profile=await userModel.findById(req.user._id).select('name email role')
        res.json({message:"Done",profile})
    } catch (error) {
        res.json({message:"Not found"})
    }

}
module.exports=profile