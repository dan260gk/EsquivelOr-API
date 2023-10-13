# Implementación del Módulo randomstatus en JavaScript

En este tutorial, aprenderás cómo implementar un módulo que te permite obtener un estado de respuesta HTTP aleatorio en tu aplicación. El módulo se compone de un arreglo que contiene diferentes estados de respuesta HTTP y una función para obtener un estado aleatorio de ese arreglo.

## Requisitos

Antes de comenzar, asegúrate de tener instalado Node.js en tu sistema.

## Paso 1: Crear un proyecto de Node.js

Si aún no tienes un proyecto de Node.js, puedes crear uno siguiendo estos pasos:

1. Abre tu terminal y navega hasta la carpeta donde deseas crear tu proyecto.

2. Ejecuta el siguiente comando para crear un archivo `package.json`:

```shell
npm init -y
```

## Paso 2: Crear un archivo JavaScript para el Módulo

Crea un archivo JavaScript en la misma carpeta de tu proyecto. Puedes nombrarlo como `http-status.js` o cualquier otro nombre que prefieras.

## Paso 3: Agregar el Código del Módulo

Abre el archivo JavaScript que creaste y agrega el siguiente código:

```javascript
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
 return estado[Math.floor(Math.random() * estado.length)];
}
```
Este código define el arreglo de estados HTTP y una función obtenerEstado que retorna un estado aleatorio.

## Paso 4: Usar el Módulo en tu Aplicación
Ahora que tienes el módulo, puedes utilizarlo en tu aplicación Node.js. Aquí hay un ejemplo de cómo hacerlo:

```javascript
// Importa el módulo de estados HTTP
const { obtenerEstado } = require('./randomstatus');

// Usa la función para obtener un estado aleatorio
const estadoAleatorio = obtenerEstado();
console.log(`Estado HTTP Aleatorio: ${estadoAleatorio}`);
```

## Paso 5: Ejecutar tu Aplicación
Guarda los cambios en tu archivo JavaScript y ejecuta tu aplicación Node.js con el siguiente comando:

```shell
node tu-aplicacion.js
```