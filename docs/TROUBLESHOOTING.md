# Troubleshooting

Problemas ya vistos en este proyecto y su solución.

## Tabla rápida

| Síntoma | Causa | Solución |
|---|---|---|
| Precio/subtotal `NaN` en ventas | `activo_moneda` numérico comparado con `"1"` | `Number(...) === 1`; ver §1 |
| Drawer sin ancho / no funciona | `DRAWER_WIDTH` ausente | restaurar `195`; ver §2 |
| DBeaver `Connection refused` | puerto no publicado en el contenedor actual | recrear `db`; ver §3 |
| Cloudflare 526 | cert de origen inválido/hostname distinto | Origin CA / SAN correcto; ver §4 |
| Vite dev: FullCalendar | singleton roto por pre-bundling | `optimizeDeps.exclude` + locale ESM; ver §5 |
| Vite dev: `Invalid header token` | header `charset=utf-8` malformado | `remove-bad-header.php`; ver §6 |
| Cambios no aparecen en VPS | falta rebuild de nginx / caché | rebuild + purge CF; ver §7 |
| Textos doble-codificados | import como `latin1` | `charset.cnf` + volumen nuevo; ver §8 |
| Pantalla de instalación | `empresas.configurado = 0` | `02-set-configured.sql`; ver §8 |
| Uploads 404 | volumen/rutas/permissions | revisar symlinks y volumen; ver §9 |
| 502/504 en API | php-fpm o timeouts | logs + timeouts; ver §10 |
| `port is already allocated` | puerto ocupado | `ss`, `docker ps`, cambiar host port; ver §11 |

---

## 1. Precio/subtotal `NaN` en ventas

### Causa

La API devuelve `activo_moneda` como número (`1`), pero el código legacy
filtraba con string:

```js
rMoneda.results.filter(e => e.activo_moneda === "1") // []
```

Resultado: `monedaActiva = {}` → `valor_moneda = undefined` →
`precio / undefined = NaN`.

### Fix aplicado

- `Number(e.activo_moneda) === 1` en `VentasProvider` y `NotasProvider`.
- Migración de `localStorage` (`facturasStorage`/`notas`) para reparar
  `monedaActiva` vacía sin perder ítems.
- Fallback de moneda en `VentasTablaItems`: `parseFloat(...) || 1`.
- Fallback de cantidad (`|| 1`) en inputs y `insertarProductoTabla`.

### Verificar

```bash
curl -s -H "X-Api-Token: <token>" http://localhost:8080/api/v1/monedas
```

Debe devolver `activo_moneda: 1` (número).

Si una venta vieja sigue con NaN, limpiar el storage y recargar:

```js
localStorage.removeItem('facturasStorage');
location.reload();
```

> Ojo: los productos 1 y 2 del dump tienen `precio_producto = 0`. Si el
> precio se muestra `0`, es correcto; para probar otro valor, edita el producto.

---

## 2. Drawer no funciona / sin ancho

### Causa

Durante la migración a Vite se perdió `DRAWER_WIDTH` del objeto `env`.
Eso deja:

```js
width: { md: undefined }
marginLeft: "undefinedpx"
```

### Fix

En `frontend/src/App/Config/config.js`:

```js
export const env = {
  // ...
  DRAWER_WIDTH: 195,
  HOME_PAGE_URL: '/admin',
}
```

Además, en `DrawerMobile.jsx` el CSS decía `bosmizing` (typo); debe ser
`boxSizing`.

### Verificar

- El drawer mide 195px.
- El contenido se desplaza con `margin-left: 195px`.
- Desktop: `isOpenMenu`; móvil: `mobileOpen`.

---

## 3. DBeaver `Connection refused` (MySQL)

### Causa

El puerto está mapeado en el `docker-compose.yml` pero el contenedor que está
corriendo fue creado antes del cambio. `docker ps` muestra solo `3306/tcp`
(puerto interno), no `0.0.0.0:3307->3306/tcp`.

### Fix

```bash
docker compose up -d --force-recreate db
docker port saeta-store-2-db-1
```

Debe mostrar `3306/tcp -> 0.0.0.0:3307`.

DBeaver:

- Host: `127.0.0.1`
- Port: `3307`
- DB: `saeta`
- User: `saeta`
- Password: `saeta`

> No usar `localhost` si hay problemas de IPv6; usar `127.0.0.1`.
> No usar `3306`: puede ser un MySQL local del host.

En VPS, usar túnel SSH ([`DATABASE.md`](DATABASE.md)).

---

## 4. Cloudflare 526 (Invalid SSL certificate)

### Causa

Cloudflare llegó al origen por HTTPS, pero el certificado no es válido para
el hostname solicitado. Causas:

- Autofirmado (Full strict no lo acepta).
- Vencido.
- No cubre `wv.saeta.app` (por ejemplo, es solo `vw.saeta.app`).
- Falta cadena intermedia.
- nginx sirve otro certificado por SNI/`server_name`.

### Diagnóstico

```bash
openssl x509 -in /etc/nginx/ssl/saeta.app.pem -noout \
  -subject -issuer -dates -ext subjectAltName

openssl s_client -connect 127.0.0.1:443 -servername wv.saeta.app </dev/null 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates -ext subjectAltName

sudo nginx -T | grep -nE "server_name|ssl_certificate|listen 443"
```

### Fix

- Alinear `server_name` y certificado con **`wv.saeta.app`**.
- Usar **Cloudflare Origin CA** (recomendado) con hostnames
  `wv.saeta.app` y `*.wv.saeta.app`.
- Cloudflare → SSL/TLS → **Full (strict)**.
- Si es Let's Encrypt, usar `fullchain.pem`.

Ver [`DEPLOYMENT.md`](DEPLOYMENT.md).

---

## 5. Vite dev: FullCalendar

### Error

```text
Please import the top-level fullcalendar lib before attempting to import a plugin
```

o:

```text
does not provide an export named 'default'
```

### Causa

Vite pre-empaqueta cada paquete de FullCalendar por separado y rompe el
singleton. El locale `es.js` es CommonJS.

### Fix

`vite.config.ts`:

```ts
optimizeDeps: {
  exclude: [
    '@fullcalendar/core',
    '@fullcalendar/daygrid',
    '@fullcalendar/interaction',
    '@fullcalendar/react',
  ],
}
```

Y usar el locale ESM local:

```js
import esLocale from "../../../Utils/fullcalendarEsLocale";
```

No importar `@fullcalendar/core/locales/es` directo en dev.

---

## 6. Vite dev: `Invalid header token`

### Causa

El backend ejecuta `header('charset=utf-8')`, que genera un header inválido:

```text
charset=utf-8:
```

Node/Vite lo rechaza.

### Fix

`docker/php/remove-bad-header.php` se ejecuta como `auto_prepend_file` y
filtra ese header antes de enviarlo. No se toca el backend.

Si en el VPS el API falla por el mismo motivo, verificar que la imagen PHP
incluya el archivo y `auto_prepend_file` en `php.ini`.

---

## 7. Cambios de frontend no aparecen en el VPS

El frontend se compila **dentro de la imagen nginx**. `git pull` no actualiza
el contenedor.

```bash
cd /ruta/al/proyecto
git pull
docker compose build nginx
docker compose up -d --no-deps --force-recreate nginx
```

Verificar:

```bash
docker compose exec nginx sh -c \
  "grep -o 'Number([^)]*activo_moneda[^)]*)===1' /usr/share/nginx/html/admin/assets/*.js | head"

curl -s https://wv.saeta.app/admin/ | grep -o '/admin/assets/index-[^"]*\.js'
```

Luego:

1. Hard reload (`Ctrl+Shift+R`).
2. Cloudflare → Caching → Purge Everything.

---

## 8. MySQL: charset y `configurado`

### Textos doble-codificados

Síntoma: `GuaranÃ­es` en vez de `Guaraníes`.

Causa: el dump se importó con `character_set_client=latin1`.

Fix:

- `docker/mysql/charset.cnf` fuerza `utf8mb4` en `[client]`/`[mysql]`.
- Recrear el volumen para reimportar:
  ```bash
  docker compose down -v
  docker compose up -d --build
  ```
- Verificar:
  ```sql
  SELECT HEX(nombre_moneda), nombre_moneda FROM monedas WHERE id_moneda = 1;
  ```

### Pantalla de instalación

Causa: `empresas.configurado = 0`.

Fix: `docker/mysql/init/02-set-configured.sql` lo pone en `1` en instalaciones
nuevas. Para una base existente:

```sql
UPDATE empresas SET configurado = 1 WHERE id_empresa = 1;
```

---

## 9. Uploads no se ven / 404

Revisar:

```bash
docker compose exec php sh -c \
  'cd /var/www/html/api/v1 && readlink -f ../uploads && readlink -f ../../uploads'

docker compose exec php sh -c 'ls -la /var/www/html/uploads'
```

Ambas rutas relativas deben apuntar a `/var/www/html/uploads`.
El volumen debe estar montado en php y nginx:

```yaml
volumes:
  - uploads:/var/www/html/uploads
```

y en nginx:

```yaml
volumes:
  - uploads:/var/www/html/uploads:ro
```

Permisos: `www-data` sobre `/var/www/html/uploads`.

---

## 10. 502 / 504 en la API

- **502**: php-fpm caído, `fastcgi_pass` incorrecto o contenedor php sin
  arrancar.
  ```bash
  docker compose ps
  docker compose logs php
  ```
- **504**: PDF/Excel tardan más que el timeout.
  ```nginx
  proxy_read_timeout 120s;
  fastcgi_read_timeout 120s;
  ```
- Verificar `SCRIPT_FILENAME` en el nginx contenedor:
  `/var/www/html/api/v1/index.php`.

---

## 11. Puertos ocupados

En Ubuntu:

```bash
sudo ss -ltnp
sudo ss -ltnp | grep -E ':(80|443|8080|3306|3307)\b'
sudo lsof -nP -iTCP:8080 -sTCP:LISTEN
docker ps --format 'table {{.Names}}\t{{.Ports}}'
docker port <contenedor>
```

Si el puerto lo tiene otro contenedor, cámbialo en el compose:

```yaml
ports:
  - "127.0.0.1:8081:80"
```

Y actualiza el `proxy_pass` del nginx del host.

Si el puerto lo tiene el propio stack de una ejecución anterior:

```bash
docker compose down
docker compose up -d
```

---

## 12. Composer bloquea dependencias

Composer 2.10+ bloquea paquetes con avisos de seguridad. El proyecto usa
`dompdf ^2.0` y `firebase/php-jwt ^6.2`, que tienen advisories.

Solución actual en Docker:

```bash
composer install --no-dev --optimize-autoloader --no-interaction --no-blocking
```

Pendiente recomendado: actualizar dependencias y volver a validar PDF/JWT.

---

## 13. Docker Hub timeout al construir

Síntoma:

```text
failed to do request: Head "https://registry-1.docker.io/...": context deadline exceeded
```

Solución:

```bash
docker pull node:20-alpine
docker pull php:8.1-fpm
docker pull composer:2
docker pull mysql:8.0
docker pull nginx:alpine
```

Luego reintentar el build.

---

## 14. `git pull` no trae el fix

Si el cambio está solo en tu máquina local y no se ha commiteado/pusheado,
el VPS no lo verá.

En local:

```bash
git status
git add ...
git commit -m "..."
git push
```

En el VPS:

```bash
git pull
grep -n "Number(e.activo_moneda)" frontend/src/Pages/Ventas/Vender/VentasProvider.jsx
```

Si el `grep` no devuelve nada, el fix no está en el VPS.

---

## 15. Gotcha de tipos

La API devuelve números como números. No comparar con strings:

```js
// mal
e.activo_moneda === "1"
e.tipo_producto === "1"
prod.preguntar_precio === "1"

// bien
Number(e.activo_moneda) === 1
String(e.tipo_producto) === "1"
```

Si un cálculo da `NaN`, revisar primero si un campo numérico llegó como
`undefined`/string.
