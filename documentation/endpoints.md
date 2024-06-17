# Documentación de la API de HeartConnect

## Endpoints
- [1. Registro de Usuario](#1-registro-de-usuario)
- [2. Inicio de Sesión](#2-inicio-de-sesión)
- [3. Enviar Correo Electrónico](#3-enviar-correo-electrónico)
- [4. Restablecer Contraseña](#4-restablecer-contraseña)
- [5. Listar Usuarios](#5-listar-usuarios)
- [6. Listar Usuarios con Cuenta Activa](#6-listar-usuarios-con-cuenta-activa)
- [7. Listar Usuarios con Cuenta Inactiva](#7-listar-usuarios-con-cuenta-inactiva)
- [8. Listar Usuario por Id](#8-listar-usuario-por-id)
- [9. Listar Usuario por Email](#9-listar-usuario-por-email)
- [10. Crear Usuario Siendo Administrador](#10-crear-usuario-siendo-administrador)
- [11. Eliminar Usuarios](#11-eliminar-usuarios)
- [12. Actualizar Usuario](#12-actualizar-usuario)
- [13. Activar Usuario](#13-activar-usuario)
- [14. Desactivar Usuario](#14-desactivar-usuario)
- [15. Listar Roles](#15-listar-roles)
- [16. Listar Rol por su Id](#16-listar-rol-por-su-id)
- [17. Actualizar Rol](#17-actualizar-rol)
- [18. Listar todas las preferencias](#18-listar-todas-las-preferencias)
- [19. Listar las preferencias por id](#19-listar-las-preferencias-por-id)
- [20. Crear Nuevas Preferencias](#20-crear-nuevas-preferencias)
- [21. Actualizar Preferencias](#21-actualizar-preferencias)
- [22. Eliminar las preferencias por id](#22-eliminar-las-preferencias-por-id)
- [23. Listar todas los eventos](#23-listar-todas-los-eventos)
- [24. Listar los eventos por id](#24-listar-los-eventos-por-id)
- [25. Crear Nuevo Evento](#25-crear-nuevo-evento)
- [26. Actualizar Evento](#26-actualizar-evento)
- [27. Eliminar eventos por id](#27-eliminar-eventos-por-id)
- [28. Listar Amistades del Usuario](#28-listar-amistades-del-usuario)
- [29. Consultar Usuario por su Token](#29-consultar-usuario-por-su-token)
- [30. Listar Chats](#30-listar-chats)
- [31. Listar Mensajes por el Id de un Chat](#31-listar-mensajes-por-el-id-de-un-chat)
- [32. Buscar Usuarios](#32-buscar-usuarios)
- [33. Usuarios Recomendados](#33-usuarios-recomendados)
- [34. Listar las Preferencias de un Usuario](#34-listar-las-preferencias-de-un-usuario)
- [35. Listar Preferencias de un Usuario por el Id](#35-listar-preferencias-de-un-usuario-por-el-id)
- [36. Crear Preferencias de un Usuario](#36-crear-preferencias-de-un-usuario)
- [37. Actualizar Preferencias de un Usuario](#37-actualizar-preferencias-de-un-usuario)
- [38. Eliminar Preferencias de un usuario](#38-eliminar-preferencias-de-un-usuario)
- [39. Listar la Opcion del tipo de Relacion del Usuario](#39-listar-las-opciones-del-tipo-de-relacion-del-usuario)
- [40. Listar la Opcion del tipo de Interes del Usuario](#40-listar-las-opciones-del-tipo-de-interes-del-usuario)
- [41. Obtener posibles opciones del tipo de relacion](#41-obtener-posibles-opciones-del-tipo-de-relacion)
- [42. Obtener posibles opciones del tipo de interes](#42-obtener-posibles-opciones-del-tipo-de-interes)
- [43. Listar Los Eventos Activos](#43-listar-los-eventos-activos)
- [44. Listar Los Eventos Inactivos](#44-listar-los-eventos-inactivos)
- [45. Activar Eventos](#45-activar-eventos)
- [46. Desactivar Evento](#46-desactivar-eventos)
- [47. Buscar Eventos](#47-buscar-eventos)
- [48. Crear Inscripcion a un evento](#48-crear-inscripcion-a-un-evento)
- [49. Listar Inscripciones de un evento](#49-listar-inscripciones-de-un-evento)
- [50. Eliminar Inscripciones de un evento](#50-eliminar-inscripciones-de-un-evento)
- [51. Listar Assets de un Usuario](#51-listar-assets-de-un-usuario)
- [52. Listar Assets por su Id](#52-listar-assets-por-su-id)
- [53. Cargar Assets](#53-cargar-assets)
- [54. Eliminar Assets](#54-eliminar-assets)
- [55. Actualizar foto de perfil](#55-actualizar-foto-de-perfil)

### 1. Registro de Usuario

- **Método**: POST
- **URL**: `localhost:9292/api/register/`
- **Descripción**: Registra un nuevo usuario en el sistema.
- **Cuerpo de la solicitud**:
```json 
{ 
    "firstName": "Marcos", 
    "lastName": "Pérez", 
    "email": "marcos.perez@example.com", 
    "password": "1234", 
    "photo_profile": 1, 
    "born_date": "1990-01-01", 
    "domicile": "Calle Falsa 123", 
    "phone_number": 123456789, 
    "roles": 2 
}
```

### 2. Inicio de Sesión

- **Método**: POST
- **URL**: `localhost:9292/api/login`
- **Descripción**: Inicia sesión en el sistema con un usuario existente.
- **Cuerpo de la solicitud**:
```json 
{ 
    "email": "asdas@gmail.com", 
    "password": "1234"
}
```

### 3. Enviar Correo Electrónico

- **Método**: POST
- **URL**: `localhost:9292/api/mail/request-reset`
- **Descripción**: Envía un correo electrónico para solicitar el restablecimiento de la contraseña.
- **Cuerpo de la solicitud**:
```json 
{ 
    "email": "marinalaguna2004@gmail.com" 
}
```

### 4. Restablecer Contraseña

- **Método**: POST
- **URL**: `localhost:9292/api/mail/reset/{token}`
- **Descripción**: Restablece la contraseña de un usuario utilizando un token de restablecimiento.
- **Cuerpo de la solicitud**:
```json 
{ 
    "newPassword": "1234", 
    "confirmPassword": "1234"
}
```
- **Nota**: Reemplaza `{token}` en la URL con el token de restablecimiento recibido por correo electrónico.

### 5. Listar Usuarios
- **Método**: GET
- **URL**: `localhost:9292/api/users/`
- **Descripción**: Listar todos los usuarios de la base de datos, tanto los que tienen la cuenta activa como los que tienen la cuenta desactivada.

### 6. Listar Usuarios con Cuenta Activa
- **Método**: GET
- **URL**: `localhost:9292/api/users/active`
- **Descripción**: Listar los usuarios que tienen su cuenta activada.

### 7. Listar Usuarios con Cuenta Inactiva
- **Método**: GET
- **URL**: `localhost:9292/api/users/inactive`
- **Descripción**: Listar los usuarios que tienen su cuenta desactivada.

### 8. Listar Usuario por Id
- **Método**: GET
- **URL**: `localhost:9292/api/user/{id}`
- **Descripción**: Listar el usuario que coincida con el id.
¡
### 9. Listar Usuario por Email
- **Método**: POST
- **URL**: `localhost:9292/api/user/`
- **Descripción**: Listar el usuario que coincida con el email.
- **Cuerpo de la solicitud**:
```json 
{ 
    "email": "marinalaguna2004@gmail.com"
}
```

### 10. Crear Usuario Siendo Administrador
- **Método**: POST
- **URL**: `localhost:9292/api/user/new-user`
- **Descripción**: Crear usuarios desde el rol de administrador.
- **Cuerpo de la solicitud**: 
```json 
{
    "firstName": "Juanvfdvfbv",
    "lastName": "Pvfvfvdférez",
    "email": "marinalaguna2004@gmail.com",
    "born_date": "1990-05-15",
    "domicile": "Calle Principal 123",
    "phone_number": "+1234567890",
    "roles": ["usuario"],
    "active": true
}
```

### 11. Eliminar Usuarios
- **Método**: DELETE
- **URL**: `localhost:9292/api/users/delete`
- **Descripción**: Eliminar usuarios. Se puede eliminar un usuario o varios usuarios a la vez.
- **Cuerpo de la solicitud**:
```json 
{
 "userIds": [11, 12, 13]
}

### 12. Actualizar Usuario
- **Método**: PUT
- **URL**: `localhost:9292/api/user/`
- **Descripción**: Actualizar usuario.
- **Cuerpo de la solicitud**:
```json 
{
    "firstName": "Juanvfdvfbv",
    "lastName": "Pvfvfvdférez",
    "email": "marinalaguna2004@gmail.com",
    "born_date": "1990-05-15",
    "domicile": "Calle Principal 123",
    "phone_number": "+1234567890",
}
```

### 13. Activar Usuario
- **Método**: PUT
- **URL**: `localhost:9292/api/users/activate`
- **Descripción**: Actualizar la cuenta del usuario.
- **Cuerpo de la solicitud**:
```json 
{
    "userIds": [8, 9]
}
```

### 14. Desactivar Usuario
- **Método**: PUT
- **URL**: `localhost:9292/api/users/desactivate`
- **Descripción**: Desactivar la cuenta del usuario.
- **Cuerpo de la solicitud**:
```json 
{
    "userIds": [8, 9]
}
```

### 15. Listar Roles
- **Método**: GET
- **URL**: `localhost:9292/api/rols/`
- **Descripción**: Listar todos los roles de la aplicación.

### 16. Listar Rol por su Id
- **Método**: GET
- **URL**: `localhost:9292/api/rols/{id}`
- **Descripción**: Listar el rol de la aplicación al que le corresponde el id.

### 17. Actualizar Rol
- **Método**: PUT
- **URL**: `localhost:9292/api/rols/{id}`
- **Descripción**: Actualizar el rol que coincida con el id.
- **Cuerpo de la solicitud**:
```json 
{
    "name": "Administrador",
    "description": "nueva descripcion",
}
```

### 18. Listar todas las preferencias
- **Método**: GET
- **URL**: `localhost:9292/api/preferences/`
- **Descripción**: Listar las preferencias que haya guardadas en la aplicación.

### 19. Listar las preferencias por id
- **Método**: GET
- **URL**: `localhost:9292/api/preferences/{id}`
- **Descripción**: Listar las preferencias que coincidan con ese id.

### 20. Crear Nuevas Preferencias
- **Método**: POST
- **URL**: `localhost:9292/api/preferences/`
- **Descripción**: Crear nuevas preferencias.
- **Cuerpo de la solicitud**:
```json 
{
  "sports": "Soccer",
  "artistic": "Painting",
  "politicians": "Democrat",
  "relationship_type": "esporádica",
  "has_children": true,
  "wants_children": false,
  "interest": "ambos"
}
```

### 21. Actualizar Preferencias
- **Método**: PUT
- **URL**: `localhost:9292/api/preferences/{id}`
- **Descripción**: Actualizar las preferencias que coincidan con ese id.
- **Cuerpo de la solicitud**:
```json 
{
  "sports": "Volleyball",
  "artistic": "Painting",
  "politicians": "Democrat",
  "relationship_type": "seria",
  "has_children": false,
  "wants_children": true,
  "interest": "mujeres"
}
```

### 22. Eliminar las preferencias por id
- **Método**: DELETE
- **URL**: `localhost:9292/api/preferences/{id}`
- **Descripción**: Eliminar las preferencias que coincidan con ese id.

### 23. Listar todas los eventos
- **Método**: GET
- **URL**: `localhost:9292/api/events/`
- **Descripción**: Listar los eventos que haya guardador en la aplicación.

### 24. Listar los eventos por id
- **Método**: GET
- **URL**: `localhost:9292/api/preferences/{id}`
- **Descripción**: Listar los eventos que coincidan con ese id.

### 25. Crear Nuevo Evento
- **Método**: POST
- **URL**: `localhost:9292/api/events/`
- **Descripción**: Crear nuevo evento.
- **Cuerpo de la solicitud**:
```json 
{
 "name": "Evento de Prueba",
 "des": "Este es un evento de prueba para verificar la funcionalidad de creación de eventos.",
 "date": "2023-04-15T10:00:00Z",
 "public": true
}
```

### 26. Actualizar Evento
- **Método**: PUT
- **URL**: `localhost:9292/api/events/{id}`
- **Descripción**: Actualizar un evento que coincidan con ese id.
- **Cuerpo de la solicitud**:
```json 
{
 "name": "Nuevo nombre del evento",
 "des": "Nueva descripción del evento",
 "date": "2023-04-20T10:00:00Z",
 "public": false
}
```

### 27. Eliminar eventos por id
- **Método**: DELETE
- **URL**: `localhost:9292/api/events/`
- **Descripción**: Eliminar los eventos que coincidan con los ids del cuerpo de la solicitud.
- **Cuerpo de la solicitud**:
```json 
{
 "ids": [3, 6]
}
```

### 28. Listar Amistades del Usuario
- **Método**: GET
- **URL**: `localhost:9292/api/friendship/{id}`
- **Descripción**: Listar las amistades del usuario que le pasamos con ese id.

### 29. Consultar Usuario por su Token
- **Método**: GET
- **URL**: `localhost:9292/api/userToken/`
- **Headers**: `x-token`.
- **Descripción**: Listar el usuario que coincidan con tenga ese token.

### 30. Listar Chats
- **Método**: GET
- **URL**: `localhost:9292/api/chats/{id}`
- **Descripción**: Listar los chats que tiene el usuario se busca con el id de este.

### 31. Listar Mensajes por el Id de un Chat
- **Método**: GET
- **URL**: `localhost:9292/api/messages/{id}`
- **Descripción**: Listar los mensajes que contiene el chat.

### 32. Buscar Usuarios
- **Método**: GET
- **URL**: `localhost:9292/api/preferences/{value}`
- **Descripción**: Listar los usuarios que coincidan con el valor proporcionado.

### 33. Usuarios Recomendados
- **Método**: GET
- **URL**: `localhost:9292/api/preferences/{id}`
- **Descripción**: Listar los usuarios recomendados para el usuario del que se proporciona el id.

### 34. Listar las Preferencias de un Usuario
- **Método**: GET
- **URL**: `localhost:9292/api/userPreferences`
- **Descripción**: Listar las preferencias de todos los usuarios.

### 35. Listar Preferencias de un Usuario por el Id
- **Método**: GET
- **URL**: `localhost:9292/api/userPreferences/{id}`
- **Descripción**: Listar las preferencias que tiene el usuario con ese id.

### 36. Crear Preferencias de un Usuario
- **Método**: POST
- **URL**: `localhost:9292/api/userPreferences/{id}`
- **Descripción**: Crear preferencias para un usuario.
- **Cuerpo de la solicitud**:
```json 
{
    "sports": 14,
    "artistic": 30,
    "politicians": 70,
    "relationship_type": 1,  
    "has_children": false,
    "wants_children": true,
    "interest": 3
}
```
### 37. Actualizar Preferencias de un Usuario
- **Método**: PUT
- **URL**: `localhost:9292/api/userPreferences/{id}`
- **Descripción**: Actualizar las preferencias de un usuario.
- **Cuerpo de la solicitud**:
```json 
{
    "sports": 10,
    "artistic": 10,
    "politicians": 10,
    "relationship_type": 2,  
    "has_children": true,
    "wants_children": false,
    "interest": 1  
}
```

### 38. Eliminar Preferencias de un usuario
- **Método**: DELETE
- **URL**: `localhost:9292/api/userPreferences/{id}`
- **Descripción**: Eliminar las preferencias de un usuario.

### 39. Listar la Opcion del tipo de Relacion del Usuario
- **Método**: GET
- **URL**: `localhost:9292/api/userPreferences/options/relation`
- **Descripción**: Listar las opciones del tipo de relacion posible.

### 40. Listar la Opcion del tipo de Interes del Usuario
- **Método**: GET
- **URL**: `localhost:9292/api/userPreferences/options/interest`
- **Descripción**: Listar las opciones del tipo de interes posible.

### 43. Listar Los Eventos Activos
- **Método**: GET
- **URL**: `localhost:9292/api/events/show/active`
- **Descripción**: Listar los eventos que esten disponibles.

### 44. Listar Los Eventos Inactivos
- **Método**: GET
- **URL**: `localhost:9292/api/events/show/inactive`
- **Descripción**: Listar los eventos que no esten disponibles.

### 45. Activar Eventos
- **Método**: PUT
- **URL**: `localhost:9292/api/events/update/activate`
- **Descripción**: Activar los eventos.
- **Cuerpo de la solicitud**:
```json 
{
  "eventsIds": [2, 3, 4]
}
```

### 46. Desactivar Evento
- **Método**: PUT
- **URL**: `localhost:9292/api/events/update/desactivate`
- **Descripción**: Activar los eventos.
- **Cuerpo de la solicitud**:
```json 
{
  "eventsIds": [2, 3, 4]
}
```

### 47. Buscar Eventos
- **Método**: GET
- **URL**: `localhost:9292/api/events/search/{value}`
- **Descripción**: Listar los eventos que se encuentren con ese valor.

### 48. Crear Inscripcion a un evento
- **Método**: POST
- **URL**: `localhost:9292/api/userEvents`
- **Descripción**: Crear inscripcion para un evento.
- **Cuerpo de la solicitud**:
```json 
{
    "userId": 2,
    "eventId": 2
}
```

### 49. Listar Inscripciones de un evento
- **Método**: GET
- **URL**: `localhost:9292/api/userEvents/{id}`
- **Descripción**: Listar las inscripciones que se encuentren en el evento del que pasamos el id.

### 50. Eliminar Inscripciones de un evento
- **Método**: DELETE
- **URL**: `localhost:9292/api/userEvents/{id}`
- **Descripción**: Eliminar las inscripciones que coincidan con ese id.

### 51. Listar Assets de un Usuario
- **Método**: GET
- **URL**: `localhost:9292/api/assets/user/{id}`
- **Descripción**: Listar los assets que contiene el usuario del que pasamos el id.

### 52. Listar Assets por su Id
- **Método**: GET
- **URL**: `localhost:9292/api/assets/{id}`
- **Descripción**: Listar assets que coincida con ese id.

### 53. Cargar Assets
- **Método**: POST
- **URL**: `localhost:9292/api/assets/upload`
- **Descripción**: Crear inscripcion para un evento.
- **Cuerpo de la solicitud**:
    - form-data:
        - file: File
        - user-id: Text

### 54. Eliminar Assets
- **Método**: DELETE
- **URL**: `localhost:9292/api/assets/{id}`
- **Descripción**: Eliminar los assets que coincidan con ese id.
