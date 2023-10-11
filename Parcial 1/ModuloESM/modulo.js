
let estado=[
    "200 Ok",
    "400 Bad Request",
    "403 Forbidden",
    "404 Not Found",
    "408 Request Timeout",
    "429 Too Many Request",
    "500 Internal Server Error",
    "502 Bad Gateway",
    "521 Web Server Down"
]
export function obtenerEstado(){
    return estado[Math.floor(Math.random() * 9)];
}

