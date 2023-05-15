const{model,Schema, default: mongoose}=require('mongoose')

const messageSchema=new Schema({
messageBody:{
    type:String,
    required:true
},

reciverID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
},
},{
    timestamps:true
})
const messageModel=model('message',messageSchema)

module.exports=messageModel