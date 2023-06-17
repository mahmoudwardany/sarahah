const { getUser } = require("../controller/user/userCtrl")
const { verifyToken } = require("../middleware/auth")

const router=require("express").Router()


router.get('/',verifyToken(),getUser)

module.exports= router