const { signUp, confirmEmail, signIn, SendCode, forgotPassword,refreshToken } = require("../controller/auth/Auth")
const { validationFun } = require("../middleware/validation")
const { signupValidation, signInValidation } = require("../services/validator/authValidation")

const router=require("express").Router()

router.post('/signup',validationFun(signupValidation),signUp)
router.post('/login',validationFun(signInValidation),signIn)

router.get('/confirm-email/:token',confirmEmail)
router.get('/request-rftoken/:token',refreshToken)

router.post('/request-code',SendCode)
router.post('/forgot-password',forgotPassword)

module.exports= router