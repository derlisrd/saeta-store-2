# AGENTS.md — Contexto de Saeta Store 2

> **Lee esto antes de explorar el código.** Es el índice de contexto del proyecto.
> Para detalles, consulta [`docs/README.md`](docs/README.md).

## 1. Qué es este proyecto

Sistema de ventas / administración **Saeta Store**:

- `backend/`: API **PHP nativa** (sin framework, PDO + MySQL).
- `frontend/`: SPA **React 18 + TypeScript + Vite**.
- Docker: **nginx + php-fpm + MySQL 8** (sin Apache).
- En el VPS hay un **nginx del host** (80/443) que hace proxy a `127.0.0.1:8080`.
- Cloudflare está delante del dominio. Zona real observada: **`wv.saeta.app`** (ojo: no `vw.saeta.app`).

## 2. Stack y versiones

| Parte | Tecnología |
|---|---|
| Frontend | React 18, TypeScript 5.5, Vite 5.4, MUI 5, React Router 6 |
| Build frontend | `vite build` → `frontend/dist` |
| Backend | PHP 8.1-FPM, PDO MySQL, Composer |
| Base de datos | MySQL 8.0 |
| Servidor web | nginx (contenedor) + nginx del host en el VPS |
| Tests | Vitest 2 + jsdom (configurado, sin tests todavía) |
| Lint | ESLint 9 con reglas relajadas para código legacy |

## 3. Mapa del repositorio

```text
.
├── AGENTS.md                 # este archivo
├── README.md                 # inicio rápido
├── docker-compose.yml        # stack tipo producción local
├── docker-compose.dev.yml    # stack de desarrollo con hot reload
├── Dockerfile                # build Vite + imagen nginx
├── .env / .env.example       # variables para docker compose
├── docker/
│   ├── nginx/
│   │   ├── default.conf      # SPA + /api/v1 + /uploads
│   │   └── default.dev.conf  # solo API/uploads para Vite dev
│   ├── php/
│   │   ├── Dockerfile
│   │   ├── php.ini
│   │   ├── zz-pool.conf
│   │   ├── entrypoint.sh
│   │   └── remove-bad-header.php
│   └── mysql/
│       ├── charset.cnf
│       └── init/02-set-configured.sql
├── backend/                  # API PHP
│   ├── index.php
│   ├── autoloads.php
│   ├── Config/, Controllers/, Globals/, Models/, Routes/, views/
│   ├── novedades.txt         # dump/esquema inicial (1113 líneas)
│   └── uploads/              # uploads en desarrollo
├── frontend/                 # SPA Vite
│   ├── index.html            # entry real de Vite
│   ├── vite.config.ts
│   ├── .env / .env.example
│   ├── .npmrc                # legacy-peer-deps=true
│   └── src/
└── docs/                     # documentación detallada
```

## 4. Arquitectura

```text
Navegador
   │ HTTPS
   ▼
Cloudflare (wv.saeta.app)
   │ HTTPS al origen
   ▼
nginx del VPS (80/443, SSL)
   │ proxy_pass 127.0.0.1:8080
   ▼
nginx del contenedor
   ├── /admin/      → build de Vite
   ├── /uploads/    → volumen compartido
   └── /api/v1/     → php-fpm :9000
                         │
                         ▼
                      MySQL :3306 (db)
```

- El frontend se compila **dentro de la imagen nginx** (multi-stage del `Dockerfile`).
- El PHP **no** se modifica para adaptarlo a Docker: los ajustes se hacen en `docker/`.

## 5. URLs y puertos

### Local, stack tipo producción (`docker-compose.yml`)

| Servicio | URL / puerto |
|---|---|
| Frontend | http://localhost:8080/admin/ |
| API | http://localhost:8080/api/v1/ |
| MySQL desde el host | `127.0.0.1:3307` |
| MySQL interno | `db:3306` |
| php-fpm | interno `php:9000` |

### Local, desarrollo (`docker-compose.dev.yml`)

| Servicio | URL / puerto |
|---|---|
| Vite (hot reload) | http://localhost:3000/admin/ |
| API vía proxy Vite | http://localhost:3000/api/v1/ |
| nginx / API directa | http://localhost:8080/api/v1/ |
| MySQL desde el host | `127.0.0.1:3307` |

> `docker-compose.yml` y `docker-compose.dev.yml` usan los mismos puertos host (`8080`, `3307`). **No los levantes a la vez**: detén uno antes de iniciar el otro.

### VPS

| Servicio | Recomendado |
|---|---|
| nginx host | `80` y `443` públicos |
| app (nginx contenedor) | `127.0.0.1:8080:80` |
| MySQL | `127.0.0.1:3307:3306` o sin publicar |
| SSH tunnel MySQL | local `13307` → VPS `127.0.0.1:3307` |

> En el VPS, **no** publiques `0.0.0.0:3307` ni `0.0.0.0:8080`. Usa `127.0.0.1` y deja que el nginx del host / túnel SSH hagan el acceso.

## 6. Comandos esenciales

```bash
# Stack tipo producción
docker compose up -d --build
docker compose ps
docker compose logs -f nginx

# Desarrollo con hot reload
docker compose down
docker compose -f docker-compose.dev.yml up -d --build

# Rebuild SOLO del frontend (en el VPS también)
docker compose build nginx
docker compose up -d --no-deps --force-recreate nginx

# Frontend sin Docker
cd frontend
npm install
npm run dev
npm run build
npm run lint
npm run test

# Backend / dependencias PHP
docker compose exec php composer install

# MySQL CLI
docker compose exec db mysql -usaeta -psaeta saeta -e "SHOW TABLES;"

# Reset total de la base (¡destructivo!)
docker compose down -v
docker compose up -d --build
```

## 7. Reglas críticas (no romper)

1. **No modificar el backend PHP** salvo que se pida explícitamente. Las adaptaciones van en `docker/` (symlinks de uploads, filtro de header, etc.).
2. **No reintroducir CRA / `react-scripts`**. El frontend es Vite.
3. `VITE_BASE_URL` debe ser **`/admin`** (sin barra final). El `vite.config.ts` la normaliza a `/admin/` para los assets.
4. **No agregar `basename` al `BrowserRouter`**. Las rutas de la app ya incluyen `/admin` (`env.BASEURL + ...`).
5. Mantener en `env` (`frontend/src/App/Config/config.js`):
   ```js
   DRAWER_WIDTH: 195,
   HOME_PAGE_URL: '/admin'
   ```
   Sin `DRAWER_WIDTH` el menú/drawer se rompe.
6. La API devuelve campos numéricos como **números** (por ejemplo `activo_moneda: 1`). No comparar con `=== "1"`; usar `Number(...) === 1`.
7. El frontend se sirve desde **`frontend/dist`**. `frontend/build` es el build viejo de CRA; no usarlo.
8. El Service Worker de CRA fue eliminado. No hay PWA activa.
9. No commitear `.env` ni secretos. `VITE_*` se embebe en el bundle (no es secreto real).
10. Un cambio de frontend en el VPS requiere **rebuild de `nginx`**, no de `php` ni `db`.

## 8. Variables de entorno

### Raíz `.env` (docker compose)

```env
MYSQL_ROOT_PASSWORD=...
MYSQL_DATABASE=saeta
MYSQL_USER=saeta
MYSQL_PASSWORD=...
X_API_TOKEN=...
SECRET_KEY=...
EMAIL_PASSWORD=...
```

### Frontend `.env` (local / Vite)

```env
VITE_BASE_URL=/admin
VITE_API_URL_END_POINT=/api/v1/
VITE_X_API_TOKEN=...
VITE_SECRETO=...
VITE_DEV_API_PROXY=http://localhost:8080
```

> En Docker, el frontend se compila con `ARG`/`ENV` (`VITE_*`), no con `frontend/.env`.

### Backend

`backend/.env` es generado en runtime por `docker/php/entrypoint.sh` desde las variables del contenedor. `Dotenv::load()` exige que exista.

## 9. Flujo de una petición

- **Estático**: nginx del host → nginx contenedor → `/var/www/html/admin`.
- **API**: nginx host → nginx contenedor `/api/v1/` → FastCGI `php:9000` → `index.php` → `Routes` → `Controllers` → `Models` → MySQL.
- **Uploads**: PHP escribe en `/var/www/html/uploads` (volumen); nginx lo sirve en `/uploads/`.
- **Sales (Ventas)**: `VentasProvider` carga monedas, cajas, depósitos, etc.; `insertarProductoTabla` calcula `precio_guardado`/`subtotal_precio`; `VentasTablaItems` divide por `valor_moneda`.

## 10. Problemas conocidos y fixes

| Síntoma | Causa | Fix / referencia |
|---|---|---|
| Precio/subtotal `NaN` en ventas | `activo_moneda` número vs `=== "1"`; `valor_moneda` undefined | `Number(...) === 1`, migración de localStorage, fallback `|| 1`. Ver `docs/TROUBLESHOOTING.md` |
| Drawer no funciona / sin ancho | `DRAWER_WIDTH` eliminado de `env` | Restaurar `DRAWER_WIDTH: 195`. Ver `docs/TROUBLESHOOTING.md` |
| `Connection refused` en DBeaver | El puerto no está publicado en el contenedor en ejecución | Recrear `db` y usar `127.0.0.1:3307`. Ver `docs/DATABASE.md` |
| Cloudflare 526 | Certificado de origen inválido / hostname distinto / autofirmado / vencido | Cloudflare Origin CA, `wv.saeta.app`, Full (strict). Ver `docs/DEPLOYMENT.md` |
| Vite dev: “import the top-level fullcalendar lib” | Pre-bundling de FullCalendar v5 | `optimizeDeps.exclude` + locale ESM local. Ver `docs/FRONTEND.md` |
| Vite dev: “Invalid header token” | `header('charset=utf-8')` malformado del backend | `docker/php/remove-bad-header.php`. Ver `docs/BACKEND.md` |
| Textos doble-codificados en MySQL | Import del dump como `latin1` | `docker/mysql/charset.cnf` + volumen recreado. Ver `docs/DATABASE.md` |
| Pantalla de instalación en vez de login | `empresas.configurado = 0` | `docker/mysql/init/02-set-configured.sql`. Ver `docs/DATABASE.md` |
| Cambios no aparecen en VPS | Falta rebuild del frontend / caché Cloudflare | `docker compose build nginx`, purgar CF, hard reload. Ver `docs/DEPLOYMENT.md` |

## 11. Checklist antes de terminar un cambio

```bash
# Frontend
cd frontend
npm run build
npm run lint

# Docker
cd ..
docker compose config >/dev/null
docker compose ps

# Humo
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8080/admin/
curl -s -o /dev/null -w "%{http_code}\n" -H "X-Api-Token: <token>" http://localhost:8080/api/v1/monedas
```

- Si tocaste ventas: probar producto con precio > 0 y cantidad > 1.
- Si tocaste el menú: probar drawer desktop y móvil.
- Si tocaste deploy: verificar asset hash nuevo y purgar Cloudflare.
- Si tocaste la base: recordar que `down -v` borra datos.

## 12. Documentación

| Documento | Contenido |
|---|---|
| [`docs/README.md`](docs/README.md) | Índice y guía de lectura |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Arquitectura, servicios, flujos, volúmenes |
| [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) | Desarrollo local, compose dev, scripts |
| [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) | VPS, nginx host, Cloudflare, SSL, rebuild |
| [`docs/FRONTEND.md`](docs/FRONTEND.md) | Vite, env, rutas, FullCalendar, gotchas |
| [`docs/BACKEND.md`](docs/BACKEND.md) | PHP, routing, uploads, headers, endpoints |
| [`docs/DATABASE.md`](docs/DATABASE.md) | MySQL, init, DBeaver, túnel SSH, backups |
| [`docs/TROUBLESHOOTING.md`](docs/TROUBLESHOOTING.md) | Errores comunes y soluciones |
| [`docs/DECISIONS.md`](docs/DECISIONS.md) | Decisiones de arquitectura y pendientes |

## 13. Historial reciente

- Migración de CRA a **Vite 5**.
- Dockerización con **nginx + php-fpm + MySQL 8** (sin Apache).
- Fix de **precio/subtotal NaN** en ventas (`activo_moneda` numérico).
- Fix del **Drawer** (`DRAWER_WIDTH`).
- Fix de **FullCalendar** en dev (locale ESM local + exclude).
- Corrección de **charset** en import MySQL y `configurado=1`.
- Filtro del header inválido `charset=utf-8`.
- Configuración de **Cloudflare + SSL** en VPS (`wv.saeta.app`).
