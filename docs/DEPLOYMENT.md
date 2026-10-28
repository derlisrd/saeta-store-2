# Despliegue (VPS Ubuntu + nginx host + Cloudflare)

> En el VPS el proyecto observado se llama `wv-saeta` y la zona es
> **`wv.saeta.app`**. Cuidado con `vw.saeta.app`: no es el mismo hostname.

## 1. Topología

```text
Cloudflare (wv.saeta.app)
        │ HTTPS
        ▼
nginx del host :443
        │ proxy_pass http://127.0.0.1:8080
        ▼
contenedor nginx :80
        ├── /admin/
        ├── /uploads/
        └── /api/v1/ → php-fpm
```

## 2. Puertos y seguridad

En el VPS **no** publiques MySQL ni el nginx del contenedor en `0.0.0.0`.

`docker-compose.yml` recomendado:

```yaml
services:
  db:
    ports:
      - "127.0.0.1:3307:3306"   # o quitar el mapeo

  nginx:
    ports:
      - "127.0.0.1:8080:80"
```

Firewall:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

Solo 22, 80 y 443 deben estar públicos. El 8080 y el 3307 quedan en loopback.

## 3. nginx del host

Archivo sugerido: `/etc/nginx/sites-available/saeta.conf`

```nginx
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

server {
    listen 80;
    listen [::]:80;
    server_name wv.saeta.app;

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name wv.saeta.app;

    ssl_certificate     /etc/nginx/ssl/saeta.app.pem;
    ssl_certificate_key /etc/nginx/ssl/saeta.app.key;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;
    ssl_session_tickets off;

    client_max_body_size 32m;

    proxy_connect_timeout 10s;
    proxy_send_timeout    120s;
    proxy_read_timeout    120s;

    gzip on;
    gzip_proxied any;
    gzip_comp_level 5;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript application/xml image/svg+xml;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;

        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host  $host;

        proxy_set_header Upgrade    $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }
}
```

Activar:

```bash
sudo ln -s /etc/nginx/sites-available/saeta.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

> Si tu nginx es anterior a 1.25.1, usa `listen 443 ssl http2;` y quita `http2 on;`.

## 4. Cloudflare y SSL

### Error 526 (Invalid SSL certificate)

Significa que Cloudflare llegó al origen, pero el certificado de origen no es válido para el hostname solicitado. Causas:

- Certificado autofirmado.
- Certificado vencido.
- El certificado no cubre `wv.saeta.app` (por ejemplo, es solo para `vw.saeta.app`).
- Cadena incompleta (falta el intermedio).
- nginx sirve otro certificado por SNI/`server_name` incorrecto.

Diagnóstico en el VPS:

```bash
openssl x509 -in /etc/nginx/ssl/saeta.app.pem -noout \
  -subject -issuer -dates -ext subjectAltName

openssl s_client -connect 127.0.0.1:443 -servername wv.saeta.app </dev/null 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates -ext subjectAltName

sudo nginx -T | grep -nE "server_name|ssl_certificate|listen 443"
```

### Solución recomendada: Cloudflare Origin CA

1. Cloudflare → **SSL/TLS** → **Origin Server** → **Create Certificate**.
2. Hostnames:
   ```text
   wv.saeta.app
   *.wv.saeta.app
   ```
   Agrega `vw.saeta.app` solo si también se usa.
3. Guarda el certificado y la clave en `/etc/nginx/ssl/`.
4. Apunta `ssl_certificate` / `ssl_certificate_key` a esos archivos.
5. `sudo nginx -t && sudo systemctl reload nginx`.
6. Cloudflare → **SSL/TLS** → **Overview** → **Full (strict)**.

> Cloudflare Origin CA es confiable para Cloudflare, no para navegadores que conecten directo al origen. Es lo normal cuando Cloudflare está delante.

### Alternativa: Let's Encrypt

- Emitir para `wv.saeta.app`.
- Usar `fullchain.pem` y `privkey.pem`.
- Full (strict) confía en Let's Encrypt.
- Con Cloudflare proxied, usar DNS-01 o poner el registro en gris temporalmente para HTTP-01.

## 5. Actualizar el proyecto en el VPS

```bash
cd /ruta/al/proyecto
git pull

# Frontend: rebuild SOLO nginx
docker compose build nginx
docker compose up -d --no-deps --force-recreate nginx
```

Si hay dudas de caché:

```bash
docker compose build --no-cache nginx
docker compose up -d --no-deps --force-recreate nginx
```

Si cambió PHP/Composer:

```bash
docker compose build php
docker compose up -d --no-deps --force-recreate php
```

Si cambió el esquema/init de MySQL:

- Revisar `backend/novedades.txt` y `docker/mysql/init/`.
- Para reimportar desde cero: `docker compose down -v` (destructivo) y `up -d --build`.
- Para cambios no destructivos, aplicar SQL manualmente y dejar un script en `docker/mysql/init/` para instalaciones nuevas.

## 6. Verificar que el frontend nuevo está publicado

```bash
docker compose exec nginx sh -c \
  "grep -o 'Number([^)]*activo_moneda[^)]*)===1' /usr/share/nginx/html/admin/assets/*.js | head"

curl -s https://wv.saeta.app/admin/ | grep -o '/admin/assets/index-[^"]*\.js'
```

Luego:

1. **Hard reload** en el navegador (`Ctrl+Shift+R` / `Cmd+Shift+R`).
2. Cloudflare → **Caching** → **Purge Everything** (o purgar `/admin/` y assets).

## 7. MySQL por túnel SSH

En el VPS, MySQL está en `127.0.0.1:3307` (host) → `3306` (contenedor).
Desde tu equipo:

```bash
ssh -N -L 13307:127.0.0.1:3307 usuario@tu-vps
```

DBeaver:

| Campo | Valor |
|---|---|
| Host | `127.0.0.1` |
| Port | `13307` |
| Database | `saeta` |
| User | `saeta` |
| Password | `saeta` |
| URL | `jdbc:mysql://127.0.0.1:13307/saeta?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=America/Asuncion` |

Verificar:

```bash
nc -vz 127.0.0.1 13307
mysql -h 127.0.0.1 -P 13307 -usaeta -psaeta saeta -e "SELECT 1;"
```

## 8. Backups

```bash
# Base
docker compose exec -T db sh -c \
  'mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" --databases saeta' > backup_saeta.sql

# Uploads
docker run --rm -v wv-saeta_uploads:/data -v "$PWD":/backup alpine \
  tar czf /backup/uploads.tar.gz -C /data .
```

> Ajusta el nombre del volumen al proyecto (`wv-saeta_uploads`, `saeta-store-2_uploads`, etc.).

## 9. Errores comunes de despliegue

| Error | Causa probable | Fix |
|---|---|---|
| 502 Bad Gateway | php-fpm no responde / nombre de servicio incorrecto | `docker compose ps`, logs de php, revisar `fastcgi_pass php:9000` |
| 504 Gateway Timeout | PDF/Excel tardan más que el timeout | subir `proxy_read_timeout` y `fastcgi_read_timeout` |
| 526 | Certificado de origen inválido | Origin CA / SAN correcto / cadena completa |
| Cambios no aparecen | No se reconstruyó nginx o caché de Cloudflare | rebuild nginx, purge CF, hard reload |
| `Connection refused` MySQL | Puerto no publicado en el contenedor en ejecución | recrear `db`; usar `127.0.0.1:3307` |
| `port is already allocated` | Otro proceso/contenedor usa el puerto | `ss -ltnp`, `docker ps`, cambiar puerto host |

## 10. Pendiente recomendado: HTTPS detrás del proxy

El nginx del contenedor tiene:

```nginx
fastcgi_param HTTPS $https if_not_empty;
```

Como el nginx host le habla por HTTP, PHP puede generar URLs `http://` para las imágenes. Si aparecen imágenes bloqueadas por mixed content, aplicar:

```nginx
# arriba del server
map $http_x_forwarded_proto $saeta_https {
    default off;
    https   on;
}

# dentro de location /api/v1/
fastcgi_param HTTPS $saeta_https;
```

Luego rebuild de nginx. El nginx host ya envía `X-Forwarded-Proto $scheme`.
