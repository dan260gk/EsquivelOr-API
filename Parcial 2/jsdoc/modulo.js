
/**
 * Un arreglo que contiene diferentes estados de respuesta HTTP.
 * @type {string[]}
 */
let estado = [
    "200 Ok",
    "400 Bad Request",
    "403 Forbidden",
    "404 Not Found",
    "408 Request Timeout",
    "429 Too Many Request",
    "500 Internal Server Error",
    "502 Bad Gateway",
    "521 Web Server Down"
];

/**
 * Obtiene un estado aleatorio del arreglo 'estado'.
 * @returns {string} Un estado de respuesta HTTP aleatorio.
 */
export function obtenerEstado() {
    return estado[Math.floor(Math.random() * 9)];
}


