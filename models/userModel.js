const {Schema, model} =require("mongoose");

const userSchema=new Schema({
    fName:{ 
        type: String,
        trim: true
    },
    lName:{ type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
        },
    password:
    {
        type:String,        
        required: true
        ,minLength:6
    },
    confirmEmail:{type:Boolean,default:false},
    isBlocked:{type:Boolean,default:false},
    isDeleted:{type:Boolean,default:false},
    profileImg:String,
    coverPics:Array,
    online:{type:Boolean,default:false},
    code:String

},{timestamps:true})

const userModel=model('User',userSchema)
module.exports=userModel