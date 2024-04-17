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
