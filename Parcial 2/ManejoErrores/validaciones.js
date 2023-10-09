const { checkSchema, validationResult } = require("express-validator")

function validar(){
    return checkSchema({
        'id': {isNumeric: {errorMessage: "ingrese un valor numerico"}},
        'contrasena':{isAlphanumeric: {errorMessage: "ingrese una contraseña con letras y numeros"}},
        'correo': {isEmail: {errorMessage: "email incorrecto, verifique que haya puesto el @ y la extension .com"}}
        }
        )
}


module.exports.validar=validar;

