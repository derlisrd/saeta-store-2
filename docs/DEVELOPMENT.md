# Desarrollo

## 1. Requisitos

- Docker Desktop + Docker Compose.
- Node.js 20+ solo si trabajas el frontend fuera de Docker.
- PHP no es necesario en el host: el backend corre en el contenedor.

## 2. Primer arranque

```bash
cp .env.example .env
# Editar contraseñas y secretos
docker compose up -d --build
```

URLs:

- Frontend: http://localhost:8080/admin/
- API: http://localhost:8080/api/v1/
- MySQL host: `127.0.0.1:3307`

## 3. Stack de desarrollo (hot reload)

El compose de dev levanta además un contenedor Vite y monta `backend/` y `frontend/`.

```bash
# Detén el stack base para liberar 8080/3307
docker compose down

docker compose -f docker-compose.dev.yml up -d --build
```

URLs:

- Vite: http://localhost:3000/admin/
- API vía proxy Vite: http://localhost:3000/api/v1/
- nginx directo: http://localhost:8080/api/v1/
- MySQL host: `127.0.0.1:3307`

Cómo funciona el proxy:

- Vite sirve los assets y el HTML en `/admin/`.
- `/api/v1` y `/uploads` se proxyean a `http://nginx:80`.
- `changeOrigin: false` conserva el `Host` para que PHP genere URLs coherentes.

## 4. Frontend sin Docker

```bash
cd frontend
npm install
npm run dev      # http://localhost:3000/admin/
npm run build    # dist/
npm run preview
```

Necesita el backend/API corriendo (por ejemplo, con `docker compose up -d`).
Ajusta `VITE_DEV_API_PROXY` si el API no está en `http://localhost:8080`.

## 5. Scripts del frontend

| Script | Qué hace |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | `tsc --noEmit` + `vite build` → `dist/` |
| `npm run preview` | Sirve `dist/` localmente |
| `npm run lint` | ESLint (reglas relajadas para legacy) |
| `npm run test` | Vitest (`vitest run`); hoy no hay tests |

## 6. Variables de entorno

### Raíz `.env` (compose)

```env
MYSQL_ROOT_PASSWORD=...
MYSQL_DATABASE=saeta
MYSQL_USER=saeta
MYSQL_PASSWORD=...
X_API_TOKEN=...
SECRET_KEY=...
EMAIL_PASSWORD=...
```

### `frontend/.env`

```env
VITE_BASE_URL=/admin
VITE_API_URL_END_POINT=/api/v1/
VITE_X_API_TOKEN=...
VITE_SECRETO=...
VITE_DEV_API_PROXY=http://localhost:8080
```

> En Docker, el build usa `ARG`/`ENV` del `Dockerfile`/compose; `frontend/.env` no se copia (está en `.dockerignore`).

### `backend/.env`

No se versiona. El entrypoint de PHP lo genera desde las variables del contenedor.

## 7. Comandos útiles

```bash
# Logs
docker compose logs -f nginx
docker compose logs -f php
docker compose logs -f db

# Shell
docker compose exec php sh
docker compose exec db mysql -usaeta -psaeta saeta

# Rebuild de un servicio
docker compose build nginx
docker compose up -d --no-deps --force-recreate nginx

# Rebuild total
docker compose up -d --build
```

## 8. Reset de base (destructivo)

```bash
docker compose down -v          # borra db_data y uploads
docker compose up -d --build
```

En dev:

```bash
docker compose -f docker-compose.dev.yml down -v
docker compose -f docker-compose.dev.yml up -d --build
```

## 9. Añadir dependencias

### Frontend

```bash
cd frontend
npm install paquete
# o npm install -D paquete
```

> `.npmrc` tiene `legacy-peer-deps=true` por `react-barcodes` (peer React 17). No lo quites sin revisar.

### Backend

El backend no tiene framework. Se usa Composer dentro del contenedor:

```bash
docker compose exec php composer require vendor/paquete
```

Si se cambia `backend/composer.json`, reconstruir PHP:

```bash
docker compose build php
docker compose up -d --no-deps --force-recreate php
```

## 10. Flujo recomendado para un cambio

1. Leer `AGENTS.md` y el doc del área.
2. Cambiar código.
3. `cd frontend && npm run build && npm run lint` (si tocó frontend).
4. `docker compose config` (si tocó compose/Docker).
5. Rebuild del servicio afectado:
   - Frontend → `nginx`.
   - PHP/Composer → `php`.
   - SQL/init → `db` + volumen.
6. Probar endpoints/UI.
7. Commit y push.

## 11. Notas

- El stack base y el dev comparten puertos (`8080`, `3307`). No correr ambos.
- `frontend/build` es el build viejo de CRA; el actual es `frontend/dist`.
- No hay tests automatizados todavía; Vitest está configurado.
- Ver [`TROUBLESHOOTING.md`](TROUBLESHOOTING.md) para errores conocidos.
