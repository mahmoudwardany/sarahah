const {Schema, model} =require("mongoose");

const messageSchema=new Schema({
    text:{type:String,required:true,trim:true},
    reciverId:
    {
        type:Schema.Types.ObjectId, 
        ref:"User",
        required: true,
    },
    isDeleted:
    {
        type:Boolean,
        default:false},
},{timestamps:true})

const messageModel=model('message',messageSchema)

module.exports=messageModel