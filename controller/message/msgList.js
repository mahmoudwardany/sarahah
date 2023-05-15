const messageModel = require('../../DB/models/message')
const { userModel } = require('../../DB/models/userModel')


const msgList=async(req,res)=>{
    try {
        const messages=await messageModel.find({reciverID:req.user._id})
        res.json({message:"done",messages})
    } catch (error) {
        res.status(400).json({message:error})
    }
}
module.exports=msgList