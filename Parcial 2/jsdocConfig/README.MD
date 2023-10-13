# modulo de prueba

Este modulo devuelve un código de estado de respuesta HTTP aleatorio

Estados disponibles:
    "200 Ok"
    "400 Bad Request"
    "403 Forbidden"
    "404 Not Found"
    "408 Request Timeout"
    "429 Too Many Request"
    "500 Internal Server Error"
    "502 Bad Gateway"
    "521 Web Server Down"

instalacion:
```
$npm install randomstatus
```

uso del modulo:
```js
const randomstatus=require('randomstatus');

let estado=randomstatus.obtenerEstado();
```