const messageModel = require('../../DB/models/message')


const sendMsg=async(req,res)=>{
    const {id}=req.params
    const {messageBody}=req.body

    const findUser=await userModel.findById(id).select('name email')
    if(!findUser){
        return res.status(404).json({message:"user Not found"})
    }else{
        const message= await messageModel.insertMany({messageBody,reciverID:findUser._id})
        return res.json({message})
    }
}

const deleteMsg=async(req,res)=>{
    const {id}=req.params // id for message
    const deleteMsg=await messageModel.findByIdAndDelete({_id:id,reciverID:req.user._id})
    if(!deleteMsg){
        return res.status(404).json({message:"message Not found"})
    }else{
        return res.status(200).json({message:"Done",deleteMsg})
    }

}
module.exports={sendMsg,deleteMsg}