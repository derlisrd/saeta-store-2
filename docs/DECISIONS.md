# Decisiones de arquitectura

Registro de decisiones y pendientes. Formato corto tipo ADR.

## D1. Sin Apache: nginx + php-fpm

- **Contexto:** el proyecto original usaba `.htaccess`/Apache.
- **Decisión:** usar nginx + php-fpm en contenedores separados.
- **Motivo:** menos peso, más control, estándar en Docker.
- **Consecuencia:** el routing de `.htaccess` se replica con `fastcgi_pass`
  fijo a `index.php` y `REQUEST_URI` intacto. El backend no se modifica.

## D2. Frontend con Vite (no CRA)

- **Decisión:** migrar de `react-scripts` a Vite 5.
- **Motivo:** build/dev más rápidos y mantenibles.
- **Consecuencias:**
  - Env `REACT_APP_*` → `VITE_*`.
  - `public/index.html` → `index.html` raíz.
  - Build `build/` → `dist/`.
  - Service Worker de CRA eliminado.
  - JSX dentro de `.js` requiere el plugin `jsxInJs`.

## D3. Backend PHP intacto

- **Decisión:** no modificar PHP para adaptarlo a Docker.
- **Adaptaciones en Docker:**
  - `entrypoint.sh` genera `backend/.env` y symlinks de uploads.
  - `remove-bad-header.php` filtra `charset=utf-8`.
  - `charset.cnf` y `02-set-configured.sql` para MySQL.
  - Composer con `--no-blocking`.
- **Motivo:** minimizar riesgo en un backend legacy sin tests.

## D4. MySQL init desde `novedades.txt`

- **Decisión:** usar `backend/novedades.txt` como esquema/datos iniciales.
- **Extra:** `docker/mysql/init/02-set-configured.sql` fuerza `configurado=1`.
- **Consecuencia:** el dump debe importarse con `utf8mb4` (charset.cnf).
- **Riesgo:** `novedades.txt` es el único dump disponible; si falta una tabla
  o columna, hay que agregarla con un script de init.

## D5. Base URL `/admin` sin `basename`

- **Decisión:** `VITE_BASE_URL=/admin` (sin barra final) y `BrowserRouter` sin
  `basename`.
- **Motivo:** las rutas legacy ya incluyen `/admin` (`env.BASEURL + ...`).
  Agregar `basename` duplicaba `/admin/admin/`.
- **Consecuencia:** Vite normaliza el base a `/admin/` solo para assets.

## D6. `DRAWER_WIDTH` en `env`

- **Decisión:** mantener `DRAWER_WIDTH: 195` y `HOME_PAGE_URL: '/admin'`.
- **Motivo:** el layout y el drawer dependen de ese valor; al migrar env se
  perdió y el menú quedó roto.

## D7. FullCalendar: exclude + locale ESM local

- **Decisión:** excluir FullCalendar de `optimizeDeps` y usar
  `src/Utils/fullcalendarEsLocale.js`.
- **Motivo:** el pre-bundling de Vite rompe el singleton de FullCalendar 5 y
  el locale original es CommonJS.

## D8. Comparaciones numéricas en ventas

- **Decisión:** usar `Number(...) === 1` para `activo_moneda` y fallbacks
  numéricos.
- **Motivo:** la API devuelve números, no strings. El código legacy asumía
  strings y producía `NaN` en precio/subtotal.
- **Extra:** migración de `localStorage` para ventas/notas viejas.

## D9. Puertos y seguridad en VPS

- **Decisión:** nginx del host en 80/443; contenedor en
  `127.0.0.1:8080`; MySQL en `127.0.0.1:3307` o sin publicar.
- **Motivo:** no exponer MySQL ni el nginx interno a internet.
- **Acceso a MySQL:** túnel SSH (`13307` local → `127.0.0.1:3307` VPS).

## D10. Cloudflare Origin CA

- **Decisión:** usar certificado de origen válido para `wv.saeta.app`
  (Origin CA o Let's Encrypt fullchain); Cloudflare en Full (strict).
- **Motivo:** el error 526 era por certificado inválido/hostname distinto.
- **Ojo:** `wv.saeta.app` ≠ `vw.saeta.app`.

---

# Pendientes / deuda técnica

1. **HTTPS detrás del proxy**: el nginx contenedor aún usa
   `fastcgi_param HTTPS $https if_not_empty;`. Detrás del nginx host (HTTP),
   PHP puede generar URLs `http://` para imágenes. Aplicar el `map` de
   `X-Forwarded-Proto` descripto en [`DEPLOYMENT.md`](DEPLOYMENT.md).
2. **Composer advisories**: `dompdf ^2.0` y `firebase/php-jwt ^6.2` tienen
   avisos. Actualizar y revalidar PDF/JWT/email.
3. **Lockfiles**: `.gitignore` ignora `package-lock.json` y `composer.lock`.
   Para builds reproducibles, commitearlos.
4. **`frontend/build`**: build viejo de CRA; eliminar o ignorar. El output
   actual es `dist`.
5. **Tests**: Vitest está configurado pero no hay tests. Agregar cobertura
   para ventas/cálculos y login.
6. **Dependencias legacy**: `react-data-export`, `react-barcodes`, etc.
   Revisar compatibilidad con Vite si se tocan.
7. **Secretos en frontend**: `VITE_X_API_TOKEN`/`VITE_SECRETO` se embeben en
   el bundle (comportamiento heredado). No son secretos reales.
8. **Seguridad backend**: el código legacy construye SQL con concatenación.
   No se abordó en esta migración; evaluar prepared statements.
9. **Sin migraciones formales**: el esquema se maneja con SQL init. Para
   cambios futuros, crear `docker/mysql/init/NN-*.sql` idempotentes.
10. **Cloudflare cache**: recordar purgar después de cada deploy de frontend.
