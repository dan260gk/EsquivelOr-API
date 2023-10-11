const Joi = require('joi');
module. exports={
    registroSchema: Joi.object({
        nombre: Joi.string()
            .messages({'string.empty':"no puede dejar el campo vacio"})
            .required(),
        telefono: Joi.string()
            .pattern(new RegExp('[0-9]{10}$'))
            .messages({'string.pattern.base':"deben ser 10 digitos", 'string.empty':"no puede dejar el campo vacio"})
            .required(),
        correo:Joi.string()
            .email({minDomainSegments:2, tlds:{allow:['com','net']}})
            .messages({'string.email':"el correo esta mal escrito o no se utiliza un correo en terminacion .com o .net", 'string.empty':"no puede dejar el campo vacio"})
            .required()
            
    }).options({ abortEarly: false })
}