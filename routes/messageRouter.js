const { sendMsg, getAllMsg, getOneMsg, updateMsg } = require("../controller/message/messageCtrl")
const { verifyToken } = require("../middleware/auth")

const router=require("express").Router()

router.post('/:reciverId',sendMsg)
router.get('/',verifyToken(),getAllMsg)
router.get('/:id',verifyToken(),getOneMsg)
router.patch('/:id',verifyToken(),updateMsg)

module.exports= router