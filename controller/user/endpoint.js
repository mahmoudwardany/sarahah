const {  Roles } = require('../../middleware/authorzation')



const endpoint={
    profile:[Roles.ADMIN,Roles.USER],
    delete:[Roles.ADMIN],
    profileMsg:[Roles.ADMIN,Roles.USER]
}
module.exports=endpoint