const{model,Schema}=require('mongoose')
const bcrypt=require('bcryptjs')
const Joi=require('joi')
const userSchema=new Schema({
name:{
    type:String,
    required:true
},

email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true,
},
age:Number,
phone:String,
profilePic:String,
loginStatus:{type:Boolean,default:false},
lastSeen:String,
confirmEmail:{type:Boolean,default:false},
role:{type:String,default:'user'}

},{
    timestamps:true
})

userSchema.pre('save',async function(next){
    const user=this
    user.password=await bcrypt.hash(user.password,8)
    next()
})

function validRegister(obj){
const schema=Joi.object({
    name:Joi.string().required().min(3).max(20),
    email:Joi.string().email(),
    password:Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    rePassword:Joi.ref('password')
})
return schema.validate(obj)

}
function loginValidation(obj){
    const schema=Joi.object({
        email:Joi.string().email(),
        password:Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    })
    return schema.validate(obj)
    }
const userModel=model('user',userSchema)

module.exports={userModel,validRegister,loginValidation}