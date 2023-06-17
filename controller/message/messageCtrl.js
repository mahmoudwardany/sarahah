const messageModel = require("../../models/messageModel");
const userModel = require("../../models/userModel");




module.exports.sendMsg = async (req, res) => {
    const { text } = req.body;
    const { reciverId } = req.params;
    try {
        const user = await userModel.findById(reciverId)
        if (!user) {
            res.status(404).json({ message: "User Not Found" })
        } else {
            const newMsg = new messageModel({ text, reciverId })
                // .populate("User")
            const saveMsg = await newMsg.save()
            res.status(200).json({
                message: saveMsg
            })
        }

    } catch (error) {
        res.status(500).json({
            msg: 'error' + error
        })
    }
}

module.exports.getAllMsg=async(req,res)=>{
    let message= await messageModel.find({reciverId:req.user._id,isDeleted:false})
    res.status(200).json({
        messages:message
    })
}
module.exports.getOneMsg=async(req,res)=>{
    let messages= await messageModel.findOne({_id:req.params.id,reciverId:req.user._id,isDeleted:false})
    res.status(200).json({
        messages
    })
}
module.exports.updateMsg=async(req,res)=>{
    let messages= await messageModel.findByIdAndUpdate({_id:req.params.id,reciverId:req.user._id,isDeleted:false},{isDeleted:true},{new:true})
    res.json({
        messages
    })
}