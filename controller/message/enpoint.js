const { Roles } = require("../../middleware/authorzation");




const endpointMsg={
    delete:[Roles.USER],

}

module.exports=endpointMsg