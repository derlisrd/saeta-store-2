# Saeta Store 2

Monorepo con:

- `backend/`: API PHP nativa (PDO + MySQL).
- `frontend/`: SPA React 18 + TypeScript migrada a **Vite**.
- `docker/`: configuración de **nginx + php-fpm + MySQL 8**.

## Requisitos

- Docker Desktop y Docker Compose.
- (Opcional, para frontend sin Docker) Node.js 20+.

## Producción / entorno local

```bash
cp .env.example .env
# Editar contraseñas y secretos en .env

docker compose up -d --build
```

Servicios:

| Servicio | URL |
|---|---|
| Frontend | http://localhost:8080/admin/ |
| API | http://localhost:8080/api/v1/ |
| MySQL | interno `db:3306` (no expuesto al host) |

### Notas de producción

- nginx sirve el build de Vite en `/admin/` y pasa `/api/v1/` a php-fpm.
- `/uploads/` se sirve desde el volumen `uploads` compartido con php-fpm.
- La base se inicializa en el primer arranque desde:
  - `backend/novedades.txt` (esquema + datos)
  - `docker/mysql/init/02-set-configured.sql` (marca `empresas.configurado = 1`)
- Para reiniciar la base desde cero:

```bash
docker compose down -v   # OJO: elimina db_data y uploads
docker compose up -d --build
```

## Desarrollo (hot reload)

```bash
docker compose -f docker-compose.dev.yml up -d --build
```

| Servicio | URL |
|---|---|
| Vite (hot reload) | http://localhost:3000/admin/ |
| API vía proxy de Vite | http://localhost:3000/api/v1/ |
| nginx / API directa | http://localhost:8080/api/v1/ |
| MySQL desde el host | `localhost:3307` |

El código de `backend/` se monta en caliente y `frontend/` se sirve con Vite.

## Frontend sin Docker

```bash
cd frontend
npm install
npm run dev      # http://localhost:3000/admin/
npm run build    # genera dist/
npm run preview
```

Variables principales (`frontend/.env`):

```env
VITE_BASE_URL=/admin          # sin barra final
VITE_API_URL_END_POINT=/api/v1/
VITE_X_API_TOKEN=...
VITE_SECRETO=...
```

> Las variables `VITE_*` se embeben en el bundle en tiempo de build.

## Detalles de compatibilidad

- El proyecto original (CRA) tiene JSX dentro de archivos `.js`; Vite los transforma con el plugin `jsxInJs` de `vite.config.ts`.
- El backend emite un header inválido (`header('charset=utf-8')`). La imagen de PHP lo filtra en `docker/php/remove-bad-header.php` sin modificar el backend.
- El backend usa rutas relativas de `uploads`; la imagen de PHP crea enlaces para que subida y borrado apunten al mismo volumen (sin tocar el código PHP).
- Composer se ejecuta con `--no-blocking` porque `dompdf` y `firebase/php-jwt` tienen avisos de seguridad en las versiones fijadas por `backend/composer.json`.
