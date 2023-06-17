const userModel = require("../../models/userModel")

module.exports.getUser=async(req,res)=>{
    try {
        const profile=await userModel.findById(req.user._id).select('name email ')
        res.json({message:"Done",profile})
    } catch (error) {
        res.json({message:"Not found"})
    }
}
