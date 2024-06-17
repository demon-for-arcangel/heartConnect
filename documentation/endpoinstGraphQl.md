# Documentación de la API de HeartConnect

## Endpoints GraphQL
- [1. Consultar Usuarios que Damos Like](#1-consultar-usuarios-que-damos-like)
- [2. Añadir Like](#2-añadir-like)
- [3. Eliminar like a un usuario](#3-eliminar-like-a-un-usuario)
- [4. Consultar Amistades](#4-consultar-amistades)
- [5. Eliminar Amistades](#5-eliminar-amistades)

### 1. Consultar Usuario que Damos Like
```
query {
  userPeopleInterests(userId: 3) {
    id
    userId
    personId
  }
}
```

### 2. Añadir Like
```
mutation {
  addUserPeopleInterest(userId: 2, personId: 3) {
    id
    userId
    personId
  }
}
```

### 3. Eliminar like a un usuario
```
mutation {
  deleteUserPeopleInterest(id: 18){
    success
    message
  }
}
```
### 4. Consultar Amistades
```
query {
  getListFriends(id_user: 3) {
    id
    id_user
    id_friendship
  }
}
```
### 5. Eliminar Amistades
```
mutation {
  deleteUserFriendShip (id: 5){
    success
    message
  }
}
```