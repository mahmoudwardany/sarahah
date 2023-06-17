const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');


module.exports.verifyToken=()=>{
    return  async(req,res,next)=>{
        const {authorization}=req.headers;
        if(!authorization?.startsWith(process.env.BEARER)){
            res.status(401).json({
                message:"No token Provide"
            })
        }else{
            try {
                let token=authorization.split(process.env.BEARER)[1]
                const decoded=jwt.verify(token,process.env.TOKENSIGN)
                const user=await userModel.findById(decoded.id)
                if(user){
                    req.user=user
                    next()
                }else{
                    res.status(401).json({
                        message:"Invalid token user"
                    })
                }
            } catch (error) {
                res.json({message:error})
            }
        }

    }
}
