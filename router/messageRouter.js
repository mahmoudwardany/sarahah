const sendMsg = require('../controller/message/sendMsg')
const router=require('express').Router()
const { auth } = require('../middleware/authorzation')
const endpoint=require('../controller/message/enpoint')


router.post('/:id',sendMsg.sendMsg)
router.delete('/:id',auth(endpoint.delete),sendMsg.deleteMsg)


module.exports=router