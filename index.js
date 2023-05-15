const express=require('express')
const app=express()
const cors=require('cors')
const connectDB = require('./DB/connectDb')
require('dotenv').config()
app.use(express.json())
app.use(cors())
 port=process.env.PORT

connectDB()

//route
 app.use('/api/user',require('./router/userRouter'))
 app.use('/api/auth',require('./router/auth'))
 app.use('/api/message',require('./router/messageRouter'))

app.listen(port,()=>{
    console.log(`app is running... on port ${port}`)
})