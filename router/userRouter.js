const profile = require('../controller/user/profile')
const { auth } = require('../middleware/authorzation')
const msgList=require('../controller/message/msgList')
const endpoint=require('../controller/user/endpoint')
const router=require('express').Router()


router.get('/',auth(endpoint.profile),profile)
router.get('/message',auth(endpoint.profileMsg),msgList)


module.exports=router