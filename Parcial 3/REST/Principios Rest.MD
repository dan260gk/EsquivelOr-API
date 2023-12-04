## Los 6 principios de diseño de REST
- **Interfaz uniforme.** Todas las solicitudes de API para el mismo recurso deben tener el mismo aspecto, sin importar de dónde provenga la solicitud. La API REST debe garantizar que el mismo dato, como el nombre o la dirección de correo electrónico de un usuario, pertenezca a un solo identificador uniforme de recursos (URI). Los recursos no deben ser demasiado grandes, pero deben contener toda la información que el cliente necesite.

- **Desacoplamiento cliente-servidor.** En el diseño de API REST, las aplicaciones de cliente y servidor deben ser completamente independientes entre sí. La única información que debe conocer la aplicación del cliente es el URI del recurso solicitado; no puede interactuar con la aplicación del servidor de ninguna otra manera. De manera similar, una aplicación de servidor no debería modificar la aplicación del cliente además de pasarla a los datos solicitados a través de HTTP.

- **Sin estado.** Las API REST no tienen estado, lo que significa que cada solicitud debe incluir toda la información necesaria para procesarla. En otras palabras, las API REST no requieren ninguna sesión del lado del servidor. Las aplicaciones de servidor no pueden almacenar ningún dato relacionado con la solicitud de un cliente.

- **Capacidad de caché.** Cuando sea posible, los recursos deben almacenarse en la memoria caché en el lado del cliente o del servidor. Las respuestas del servidor también deben contener información sobre si se permite el almacenamiento en caché para el recurso entregado. El objetivo es mejorar el rendimiento en el lado del cliente, mientras aumenta la escalabilidad en el lado del servidor.

- **Arquitectura del sistema en capas.** En las API REST, las llamadas y respuestas pasan por diferentes capas. Como regla general, no asuma que las aplicaciones cliente y servidor se conectan directamente entre sí. Puede haber varios intermediarios diferentes en el bucle de comunicación. Las API REST deben diseñarse de modo que ni el cliente ni el servidor puedan saber si se comunican con la aplicación final o con un intermediario.

- **Código bajo demanda (opcional).** Las API REST generalmente envían recursos estáticos, pero en ciertos casos, las respuestas también pueden contener código ejecutable (como los subprogramas de Java). En estos casos, el código solo debe ejecutarse bajo demanda.

### Fuente:

*https://www.ibm.com/mx-es/topics/rest-apis*