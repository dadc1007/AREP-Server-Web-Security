# AREP-Server-Web-Security

Aplicacion Spring Boot con autenticacion basica (`signup` y `login`) usando MongoDB.

## Endpoints

- `POST /auth/signup`
- `POST /auth/login`

### Body de ejemplo

```json
{
  "email": "usuario@correo.com",
  "password": "claveSegura123"
}
```

## Ejecucion con Docker Compose

```bash
docker compose up --build
```

Servicios:

- App: `https://localhost:5000`
- MongoDB: `localhost:27017`
