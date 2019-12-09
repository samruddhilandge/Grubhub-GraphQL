const Joi = require('@hapi/joi') 
const schemas = Joi.object().keys({

    email:Joi.string().trim().email(),
    password:Joi.string().min(6).max(10)

})
module.exports = schemas;