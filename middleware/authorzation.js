const jwt=require('jsonwebtoken')
const { userModel } = require('../DB/models/userModel')

const Roles={
    ADMIN:"admin",
    USER:"user"
}

const auth=(accessRole)=>{
    return async(req,res,next)=>{
        try {
           const headerToken=req.headers['token']
        if(!headerToken || headerToken ==null || headerToken==undefined || !headerToken.startsWith(`${process.env.BEARERTOKEN} `)){
            res.json('invalid token')
        }else{
            const token = headerToken.split(" ")[1]
            const decoded=jwt.verify(token,process.env.SECRETKEY)
            const findUser=await userModel.findById(decoded._id).select("name email role")
            if(findUser){
                if(accessRole.includes(findUser.role)){
                    req.user=findUser
                next()  
                }else{
                    res.json('you are not authorized to access this api')
                }
                
            }else{
                res.json('invalid log In')
            }
            
        }   
        } catch (error) {
            res.json({message:" token catch error",error})
        }
      
    }
}

module.exports={auth,Roles}