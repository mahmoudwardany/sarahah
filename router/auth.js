const signIn = require('../controller/auth/login')
const signup = require('../controller/auth/signup')

const router=require('express').Router()

router.post('/signup',signup)
router.post('/signin',signIn)



module.exports=router