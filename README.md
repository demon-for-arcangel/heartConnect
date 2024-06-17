![logo](image.png)
# HeartConnect
HeartConnect es una plataforma en línea diseñada para facilitar la conexión entre personas con el objetivo de encontrar pareja. Esta aplicación web ofrece una experiencia interactiva y personalizada para sus usuarios, permitiéndoles no solo establecer amistades con otros usuarios, sino también editar su perfil para reflejar mejor sus intereses y preferencias. Tenemos tambien un sistema de sugerencias, que recomienda a los usuarios otros usuarios basándose en sus preferencias individuales, mejorando así las posibilidades de encontrar a alguien compatible. Además, encontraremos que tiene una función que automáticamente convierte a dos usuarios en amigos si ambos han mostrado interés mutuo, permitiéndoles chatear entre sí una vez que inician sesión. 

# Documentación de la API

HeartConnect cuenta con una documentación detallada de su API REST y GraphQL para facilitar la integración y el desarrollo de aplicaciones que interactúan con la plataforma.

- **API REST**: La documentación de la API REST de HeartConnect incluye detalles sobre los endpoints disponibles, métodos HTTP, URLs, descripciones de las operaciones, y ejemplos de solicitudes y respuestas. [endpoints.md](./documentation/endpoints.md).

- **GraphQL**: una documentación específica que detalla las consultas y mutaciones disponibles. [endpoinstGraphQl.md](./documentation/endpoinstGraphQl.md).


# Instalación
## Requisitos
Los requisitos para poder usar la aplicacion es tener instaladas las siguientes herramientas:
- NodeJs.
- Angular 17.
- Xampp.

## Montar la base de datos
Para montar la base de datos tendremos que utilizar el siguiente comando: `npm run deploy-db`

En caso de que tengamos ya la base de datos montada y necesitemos refrescarla usaremos: `npm run refresh`

## Instalación
Para instalar el proyecto seguiremos los siguientes pasos:
- Añadiremos el archivo `.env` en el directorio `back`. El .env será una copia del .env.example en el que solo tendremos que añadir los datos que nos requieran.

- Necesitaremos crear una base de datos llama `heartconnect`

- Con una terminal nos iremos al directorio back: `cd back`, ejecutaremos el comando `npm update` esto lo que hara es instalar todas las dependencias necesarias del proyecto. Seguidamente podremos ejecutar el comando `npm run deploy-db` para ejecutar las migrations y los seeders. Para arrancar el servidor del back ejecutaremos `nodemon`.

- Con otra terminal iremos al directorio front: `cd front`, ejecutaremos de nuevo el comando `npm update` para las dependencias y seguidamente podremos lanzar el servidor del front con el comando `ng serve`.