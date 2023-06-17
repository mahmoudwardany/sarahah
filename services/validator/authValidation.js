const joi=require('joi')

module.exports.signupValidation={
body:joi.object().required().keys({
    name:joi.string().required('name is required'),
    email:joi.string().email().required('email is required'),
    password: joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{6,}$')).required()
})
}
module.exports.signInValidation={
    body:joi.object().required().keys({
        email:joi.string().email().required('email is required'),
        password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{6,}$')).required()
    })
    }