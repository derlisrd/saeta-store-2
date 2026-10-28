# Saeta Store 2

Sistema de ventas/administración con:

- `backend/`: API **PHP nativa** (PDO + MySQL).
- `frontend/`: SPA **React 18 + TypeScript + Vite**.
- Docker: **nginx + php-fpm + MySQL 8** (sin Apache).

> En el VPS hay un nginx del host (80/443) delante de Cloudflare que hace
> proxy a `127.0.0.1:8080`. La zona real observada es **`wv.saeta.app`**.

## Contexto para agentes

- [`AGENTS.md`](AGENTS.md): contexto principal, reglas y comandos.
- [`docs/README.md`](docs/README.md): índice de documentación detallada.
  - Arquitectura, desarrollo, despliegue, frontend, backend, base de datos,
    troubleshooting y decisiones.

## Requisitos

- Docker Desktop + Docker Compose.
- Node.js 20+ (solo si trabajas el frontend fuera de Docker).

## Inicio rápido

### Stack tipo producción (local)

```bash
cp .env.example .env
# Editar contraseñas y secretos

docker compose up -d --build
```

| Servicio | URL / puerto |
|---|---|
| Frontend | http://localhost:8080/admin/ |
| API | http://localhost:8080/api/v1/ |
| MySQL desde el host | `127.0.0.1:3307` |
| MySQL interno | `db:3306` |

### Desarrollo con hot reload

```bash
docker compose down
docker compose -f docker-compose.dev.yml up -d --build
```

| Servicio | URL / puerto |
|---|---|
| Vite | http://localhost:3000/admin/ |
| API vía proxy Vite | http://localhost:3000/api/v1/ |
| MySQL desde el host | `127.0.0.1:3307` |

> El stack base y el de dev usan los mismos puertos (`8080`, `3307`). No los
> levantes a la vez.

### Frontend sin Docker

```bash
cd frontend
npm install
npm run dev      # http://localhost:3000/admin/
npm run build    # dist/
npm run lint
npm run test
```

## Estructura

```text
.
├── AGENTS.md
├── docs/
├── docker/
│   ├── nginx/
│   ├── php/
│   └── mysql/
├── backend/
├── frontend/
├── docker-compose.yml
├── docker-compose.dev.yml
└── Dockerfile
```

## Actualizar en el VPS

El frontend se compila dentro de la imagen de nginx. Después de `git pull`:

```bash
docker compose build nginx
docker compose up -d --no-deps --force-recreate nginx
```

Luego purgar Cloudflare y hacer hard reload. Ver
[`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

## Notas clave

- El backend PHP **no se modifica** para Docker; las adaptaciones están en
  `docker/`.
- MySQL se inicializa desde `backend/novedades.txt` +
  `docker/mysql/init/02-set-configured.sql`.
- `docker compose down -v` es **destructivo** (borra base y uploads).
- No exponer MySQL (`3307`) ni el nginx del contenedor (`8080`) en `0.0.0.0`
  en el VPS.
- Documentación completa en [`docs/`](docs/README.md).
