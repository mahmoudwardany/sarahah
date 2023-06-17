const bcrycpt = require('bcryptjs');
const userModel = require('../../models/userModel');
const sendEmail = require('../../services/sendEmail')
const jwt = require('jsonwebtoken')
module.exports.signUp = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const emailExist = await userModel.findOne({ email });
        if (!emailExist) {
            //hash password
            const hashPassword = await bcrycpt.hash(password, parseInt(process.env.saltRound));
            const newUser = await new userModel({
                name, email, password: hashPassword
            }).save()
            //jwt id to put on url
            const token = jwt.sign({ id: newUser._id }, process.env.confirmEmailJwt,{
                expiresIn:60*60
            })
            const rfToken = jwt.sign({ id: newUser._id }, process.env.confirmEmailJwt)
            //token Link
            const url = `${req.protocol}://${req.headers.host}/${process.env.BASE_URL}/auth/confirm-email/${token}`
            //refresh token Link
            const rfLink = `${req.protocol}://${req.headers.host}/${process.env.BASE_URL}/auth/request-rftoken/${rfToken}`
            const htmlTemplete = `
            <h2>Confirm Email</h2>
            <a href='${url}'>Click me to confirm email !!</a>
            <br/>
            <a href='${rfLink}'>Request New Link !!</a>
            <br/> Thank you .
            `
            sendEmail(newUser.email, 'Confirm Email', htmlTemplete)
            res.status(201).json({
                message: "Account Created Successfully",
                newUser
            })
        } else {
            return res.status(409).json({ message: "Email Already Exists" })
        }

    } catch (error) {
        return res.status(500).json({ message: error })

    }
}
module.exports.refreshToken=async(req,res)=>{
    const {token}=req.params;
    const decoded= jwt.verify(token,process.env.confirmEmailJwt)
    if(!decoded?.id){
        res.status(400).json({
            message:"Invalid Token"
        })
    }else{
        const user=await userModel.findById(decoded.id)
        if (user?.confirmEmail) {
            res.status(400).json({
                message:"Already confirm email"
            })
        } else {
            const token = jwt.sign({ id: user?._id }, process.env.confirmEmailJwt,{
                expiresIn:60*2
            })
            const url = `${req.protocol}://${req.headers.host}/${process.env.BASE_URL}/auth/confirm-email/${token}`
            const htmlTemplete = `
            <h2>Confirm Email</h2>
            <a href='${url}'>Click me to confirm email !!</a>
            <br/> 
            Thank you .
            `
            sendEmail(user?.email, 'Confirm Email', htmlTemplete)
            res.status(200).json({
                message: "email confirmed plz login",            
            })
        }
    }

}
module.exports.confirmEmail = async (req, res) => {
    const { token } = req.params;
    try {
        const decoded = jwt.verify(token, process.env.confirmEmailJwt)
        const user = await userModel.updateOne({ _id: decoded.id, confirmEmail: false }, { confirmEmail: true })
        user.modifiedCount ? res.status(200).json({ message: "email confirmed plz login" }) : res.json({ message: "eaither email confiremd or in-valid email" })
    } catch (error) {
        res.status(500).json({ message: error })
    }

}
module.exports.signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            res.status(404).json({ message: "Invalid email or Password" })
        } else {
            if (user.confirmEmail) {
                const matchPassword = await bcrycpt.compare(password, user.password)
                if (matchPassword) {
                    const token = jwt.sign({ id: user._id, isLoggedIn: true }, process.env.TOKENSIGN)
                    res.status(200).json({ message: "Login Success", token })
                } else {
                    res.status(400).json({ message: "Invalid email or Password" })
                }
            } else {
                res.json({ message: "Please Confirm email!!" })
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error })

    }
}
module.exports.SendCode=async(req,res)=>{
    //email
    const {email}=req.body;
    const user=await userModel.findOne({email})
    if(user?.isBlocked ||user?.isDeleted ){
        res.status(400).json({
            message:"can not send code to an register account or blocked user"
        })
    }else{
        let code= Math.floor(Math.random() * (9999 - 1000) + 1000)
        sendEmail(user.email,'forgot password',`<h1>Please use this code : ${code} to reset password`)
        await userModel.updateOne({_id:user._id},{code})
        res.json({message:"Done please check your email!!"})
    }
}

module.exports.forgotPassword=async(req,res)=>{
    const {email,code,password}=req.body;
    const user =await userModel.findOne({email})
    if(!user){
        res.status(404).json({message:"User Not found"})
    }else{
        if(user?.code != code || code == null){
            res.status(400).json({message:"invalid code"})
        }else{
            const hashPassword=await bcrycpt.hash(password,++process.env.saltRound);
            await userModel.updateOne({_id:user._id},{password:hashPassword,code:null})
            res.json({
                message:"Done"
            })
        }
    }
}