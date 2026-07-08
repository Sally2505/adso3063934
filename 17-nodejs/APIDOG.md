# APIDOG API Documentation

Base URL: `http://192.168.1.16:3000/api`

> Si usas Expo Go en un dispositivo Android físico, usa `http://192.168.1.16:3000/api` en `18-react-native/syte-react/api.js` y en APIDOG.

## Auth

### POST /api/register
Registrar usuario.

Body JSON:
```json
{
  "name": "Bruce Wayne",
  "email": "bruce@wayne.com",
  "password": "123456"
}
```

Respuesta ejemplo:
```json
{
  "message": "User registered",
  "id": 1,
  "token": "..."
}
```

### POST /api/login
Iniciar sesión.

Body JSON:
```json
{
  "email": "bruce@wayne.com",
  "password": "123456"
}
```

Respuesta ejemplo:
```json
{
  "message": "Successfully logged in",
  "token": "...",
  "user": {
    "id": 1,
    "username": null,
    "name": "Bruce Wayne",
    "email": "bruce@wayne.com",
    "phone": null
  }
}
```

### GET /api/me
Obtener perfil del usuario.

Headers:
- `Authorization: Bearer <token>`

### PUT /api/me
Actualizar perfil.

Headers:
- `Authorization: Bearer <token>`

Body JSON (al menos un campo):
```json
{
  "username": "batman",
  "phone": "+123456789"
}
```

### DELETE /api/users/:id
Eliminar un usuario por su id.

Headers:
- `Authorization: Bearer <token>`

Respuesta ejemplo:
```json
{
  "message": "User deleted"
}
```

### POST /api/logout
Cerrar sesión del usuario autenticado.

Headers:
- `Authorization: Bearer <token>`

Respuesta ejemplo:
```json
{
  "message": "Logged out"
}
```

## Characters

### GET /api/characters
Listar personajes.

### GET /api/characters/:id
Detalle de personaje.


### POST /api/characters
Agregar personaje.

Body JSON mínimo:
```json
{
  "name": "Batman",
  "photo_url": "https://example.com/batman.png",
  "real_name": "Bruce Wayne",
  "age": 35,
  "role": "Detective",
  "ability": "Martial arts",
  "alignment": "Hero",
  "enemy": "Joker",
  "city": "Gotham",
  "team": "Justice League",
  "history": "A billionaire vigilante who protects Gotham City."
}
```

Los campos válidos son:
- `photo_url`
- `name`
- `real_name`
- `age`
- `role`
- `ability`
- `alignment`
- `enemy`
- `city`
- `team`
- `history`

### PUT /api/characters/:id
Actualizar personaje.

Body JSON ejemplo:
```json
{
  "role": "Detective",
  "ability": "Martial arts",
  "city": "Gotham",
  "history": "Updated history text."
}
```

### DELETE /api/characters/:id
Eliminar personaje.

## Cities

### GET /api/cities
Listar ciudades.

### GET /api/cities/:id
Detalle de ciudad.


### POST /api/cities
Agregar ciudad.

Body JSON mínimo:
```json
{
  "name": "Gotham",
  "state": "New Jersey",
  "country": "USA"
}
```

### PUT /api/cities/:id
Actualizar ciudad.

Body JSON ejemplo:
```json
{
  "population_count": 1200000
}
```

### DELETE /api/cities/:id
Eliminar ciudad.

## Teams

### GET /api/teams
Listar equipos.

### GET /api/teams/:id
Detalle de equipo.


### POST /api/teams
Agregar equipo.

Body JSON mínimo:
```json
{
  "name": "Justice League",
  "type": "Superhero",
  "headquarters": "Hall of Justice",
  "members": ["Superman", "Batman", "Wonder Woman"]
}
```

### PUT /api/teams/:id
Actualizar equipo.

Body JSON ejemplo:
```json
{
  "members": ["Superman", "Batman", "Wonder Woman", "Flash"]
}
```

### DELETE /api/teams/:id
Eliminar equipo.
