# Arquitectura

## 1. Vista general

```text
┌─────────────────────────────────────────────────────────────┐
│ Navegador                                                   │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTPS
┌───────────────────────────▼─────────────────────────────────┐
│ Cloudflare (zona wv.saeta.app)                              │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTPS al origen
┌───────────────────────────▼─────────────────────────────────┐
│ nginx del VPS (80/443)                                      │
│  - SSL                                                      │
│  - proxy_pass http://127.0.0.1:8080                         │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTP local
┌───────────────────────────▼─────────────────────────────────┐
│ nginx del contenedor (8080:80)                              │
│  ├── /admin/      → /usr/share/nginx/html/admin (Vite)      │
│  ├── /uploads/    → volumen uploads                         │
│  └── /api/v1/     → FastCGI php:9000                        │
└───────────────────────────┬─────────────────────────────────┘
                            │ FastCGI
┌───────────────────────────▼─────────────────────────────────┐
│ php-fpm 8.1 (backend/)                                      │
│  - index.php → Routes → Controllers → Models                │
│  - uploads → /var/www/html/uploads                          │
└───────────────────────────┬─────────────────────────────────┘
                            │ PDO / mysqli
┌───────────────────────────▼─────────────────────────────────┐
│ MySQL 8.0 (db:3306)                                         │
│  - init: backend/novedades.txt                              │
│  - init: docker/mysql/init/02-set-configured.sql            │
└─────────────────────────────────────────────────────────────┘
```

## 2. Componentes

| Componente | Imagen / build | Responsabilidad |
|---|---|---|
| `nginx` | `Dockerfile` raíz (Node build + nginx:alpine) | Sirve el build de Vite en `/admin`, `/uploads` y proxy FastCGI a `/api/v1` |
| `php` | `docker/php/Dockerfile` (php:8.1-fpm) | API PHP, Composer, extensiones, uploads |
| `db` | `mysql:8.0` | Base de datos y datos iniciales |
| nginx host (VPS) | nginx del sistema | Termina SSL, proxy a `127.0.0.1:8080` |
| Cloudflare | SaaS | DNS, proxy, SSL edge, caché |

## 3. Local vs VPS

### Local

- Un solo nginx (contenedor) sirve frontend, API y uploads.
- `docker-compose.yml`: nginx `8080:80`, db `3307:3306`.
- `docker-compose.dev.yml`: Vite `3000`, nginx `8080`, db `3307`.
- No hay nginx de host ni Cloudflare.

### VPS

- nginx del host escucha 80/443 y hace proxy a `127.0.0.1:8080`.
- El contenedor nginx no debería publicar 8080 en `0.0.0.0`.
- MySQL no debería publicarse en `0.0.0.0`; usar `127.0.0.1:3307` o túnel SSH.
- Cloudflare puede estar en **Full (strict)** con un certificado de origen válido (Origin CA o CA pública).

## 4. Flujos

### 4.1 Frontend

1. El navegador pide `/admin/`.
2. nginx del host → nginx contenedor.
3. nginx contenedor sirve `index.html` de Vite.
4. Los assets se sirven desde `/admin/assets/...`.
5. Las rutas SPA caen en `try_files ... /admin/index.html`.

### 4.2 API

1. El frontend llama a `/api/v1/...` (mismo origen).
2. nginx contenedor pasa a `php:9000` con `SCRIPT_FILENAME=/var/www/html/api/v1/index.php`.
3. `index.php` carga `autoloads.php` y ejecuta `Routes::methods()`.
4. El backend calcula `RAIZ` con `REQUEST_URI` y `ROOTPATH='api/v1/'`.
5. Los controladores usan PDO/MySQL.
6. La respuesta JSON vuelve por el mismo camino.

### 4.3 Uploads

1. PHP escribe en `/var/www/html/uploads` (volumen `uploads`).
2. nginx sirve `/uploads/...` desde el mismo volumen.
3. Las URLs absolutas las genera PHP con `PROTOCOLO.DOMINIO.UPLOADPATHNAME`.

> **Caveat:** detrás del proxy del VPS, el nginx contenedor recibe HTTP. Si no se propaga `X-Forwarded-Proto`, PHP puede generar URLs `http://` para las imágenes. Ver [`DEPLOYMENT.md`](DEPLOYMENT.md) (pendiente recomendado).

## 5. Volúmenes

| Volumen | Contenido |
|---|---|
| `db_data` | Datos MySQL (stack base) |
| `uploads` | Imágenes subidas (stack base) |
| `db_data_dev` | Datos MySQL (dev) |
| `uploads_dev` | Imágenes (dev) |
| `backend_vendor` | `vendor/` de Composer en dev |
| `frontend_node_modules` | `node_modules` de Vite en dev |

> `docker compose down -v` elimina los volúmenes. Es destructivo.

## 6. Responsabilidades del código

| Ruta | Responsabilidad |
|---|---|
| `frontend/src/App/Config/config.js` | `env` del frontend (`BASEURL`, `DRAWER_WIDTH`, etc.) |
| `frontend/src/Pages/index.jsx` | Providers + `BrowserRouter` |
| `frontend/src/Routes/RoutesMain.jsx` | Rutas de la app (incluyen `/admin`) |
| `frontend/src/Pages/Ventas/Vender/` | Flujo de venta |
| `frontend/src/Components/Menu/` | Drawer, toolbar, menú |
| `backend/index.php` | Entry point API |
| `backend/Routes/Routes.php` | Dispatch por método HTTP |
| `backend/Controllers/` | Lógica de endpoints |
| `backend/Models/Models.php` | Acceso a datos |
| `backend/Config/DataBaseConnect.php` | Conexión PDO/MySQL |
| `backend/Globals/Globals.php` | `RAIZ`, `UPLOADPATH`, `DOMINIO`, etc. |

## 7. Decisiones relacionadas

- Sin Apache: nginx + php-fpm.
- Frontend con Vite (no CRA).
- Backend PHP intacto; adaptaciones en Docker.
- MySQL init desde `backend/novedades.txt`.
- Cloudflare Origin CA en el VPS.

Ver [`DECISIONS.md`](DECISIONS.md).
