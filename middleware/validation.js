const reqMethod=['body','params','headers','query']
module.exports.validationFun=(schema)=>{
    return (req,res,next)=>{
        const errorArray=[]
        reqMethod.forEach(key=>{
            if(schema[key]){
            const validateResult=schema[key].validate(req[key])  
            if(validateResult?.error?.details){
                errorArray.push(validateResult?.error?.details)
            }  
            }
        })
        
        if(errorArray.length){
            res.json({
                status:401,
                message:"Invalid Data",
                error:errorArray
            })
        }else{
            next()
        }
        
    }
}