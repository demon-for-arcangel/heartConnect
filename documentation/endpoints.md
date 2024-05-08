# Documentación de la API de HeartConnect

## Endpoints

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
``

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