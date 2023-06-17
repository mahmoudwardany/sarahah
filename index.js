const express=require('express') ;
const app =express()
const indexRouter =require ('./routes/indexRouter.js')
const dotenv =require ('dotenv')
dotenv.config()
const connectDB =require ('./config/connectDb.js');
const baseUrl=process.env.BASE_URL
//DB
connectDB()
//middleware
app.use(express.json())
//routes
app.use(`/${baseUrl}/auth`,indexRouter.authRouter)
app.use(`/${baseUrl}/user`,indexRouter.userRouter)
app.use(`/${baseUrl}/message`,indexRouter.messageRouter)

const port=process.env.PORT;


app.listen(port||6000,()=>{
    console.log(`app is running ..... on port ${port}`)
})