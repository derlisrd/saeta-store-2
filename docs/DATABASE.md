# Base de datos (MySQL 8.0)

## 1. Servicio

- Imagen: `mysql:8.0`.
- Base: `saeta` (configurable en `.env`).
- Usuario: `saeta` (configurable).
- Puerto interno: `3306`.
- Puerto host local: **`3307`** (`docker-compose.yml` y dev).
- Volumen: `db_data` (base) / `db_data_dev` (dev).

## 2. Inicialización

En el primer arranque de un volumen vacío, MySQL ejecuta:

1. `backend/novedades.txt` → montado como `01-schema.sql`.
2. `docker/mysql/init/02-set-configured.sql` → `UPDATE empresas SET configurado = 1`.

Además:

- `docker/mysql/charset.cnf` fuerza `utf8mb4` en servidor y cliente.
  Sin esto, el dump se importa como `latin1` y los textos quedan doble-codificados.
- El dump tiene ~1113 líneas y crea **47 tablas** con datos iniciales.

## 3. Datos iniciales relevantes

- Empresa `id_empresa = 1` (configurada).
- Usuario `admin` (rol 1, estado 1). El hash bcrypt viene del dump.
- Monedas:
  - `1` Guaraníes, `valor_moneda = 1`, `activo_moneda = 1` (activa).
  - `2` Reales, `3` Dólares, `4` Pesos (inactivas).
- Productos iniciales (ambos con precio 0):
  - `1` Servicio Fotográfico.
  - `2` Filmación.

> Para probar ventas con precio distinto de 0, edita un producto o ejecuta:
> ```sql
> UPDATE productos
> SET precio_producto = 1000, preciom_producto = 1000
> WHERE id_producto = 1;
> ```

## 4. Credenciales

Desde `.env`:

```env
MYSQL_ROOT_PASSWORD=...
MYSQL_DATABASE=saeta
MYSQL_USER=saeta
MYSQL_PASSWORD=...
```

Uso típico en local:

- Usuario: `saeta`
- Password: `saeta`
- Base: `saeta`

> Para conexiones desde el host/DBeaver usa el usuario `saeta`, no `root`.
> El contenedor crea `root@localhost`; `saeta` se crea como `saeta@'%'`.

## 5. Conectar desde el host (local)

```bash
docker compose exec db mysql -usaeta -psaeta saeta -e "SHOW TABLES;"
```

DBeaver local:

| Campo | Valor |
|---|---|
| Host | `127.0.0.1` |
| Port | `3307` |
| Database | `saeta` |
| User | `saeta` |
| Password | `saeta` |
| URL | `jdbc:mysql://127.0.0.1:3307/saeta?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=America/Asuncion` |

> Si el puerto no aparece publicado en `docker ps`, recrea el contenedor:
> `docker compose up -d --force-recreate db`.

## 6. Conectar al VPS por túnel SSH

El MySQL del VPS está en `127.0.0.1:3307` (host) y no debe publicarse en
`0.0.0.0`. Túnel:

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

> No uses `db:3306` en el túnel: ese hostname solo existe dentro de Docker.

## 7. Reset / reinstalación

Destructivo:

```bash
docker compose down -v
docker compose up -d --build
```

En dev:

```bash
docker compose -f docker-compose.dev.yml down -v
docker compose -f docker-compose.dev.yml up -d --build
```

Esto borra `db_data`/`db_data_dev` y `uploads`/`uploads_dev`.

## 8. Backups

```bash
# Base
docker compose exec -T db sh -c \
  'mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" --databases saeta' > backup_saeta.sql

# Restaurar
docker compose exec -T db sh -c \
  'mysql -uroot -p"$MYSQL_ROOT_PASSWORD"' < backup_saeta.sql
```

Uploads:

```bash
docker run --rm -v wv-saeta_uploads:/data -v "$PWD":/backup alpine \
  tar czf /backup/uploads.tar.gz -C /data .
```

Ajusta el nombre del volumen (`wv-saeta_uploads`, `saeta-store-2_uploads`, etc.).

## 9. Queries útiles

```sql
-- Tablas
SHOW TABLES;

-- Empresa configurada
SELECT id_empresa, nombre_empresa, configurado FROM empresas;

-- Usuarios
SELECT id_user, username_user, rol_user, estado_user FROM users;

-- Moneda activa
SELECT id_moneda, nombre_moneda, valor_moneda, activo_moneda FROM monedas;

-- Productos con precio
SELECT id_producto, codigo_producto, nombre_producto, precio_producto
FROM productos
ORDER BY precio_producto DESC;
```

## 10. Notas

- `activo_moneda`, `precio_producto`, etc. son numéricos. El frontend debe
  tratarlos con `Number(...)`, no con comparaciones de string.
- Zona horaria: `America/Asuncion`.
- Charset: `utf8mb4` / `utf8mb4_unicode_ci`.
- El backend usa `set names utf8` (utf8mb3) en PDO; suficiente para los datos
  actuales, pero no para emojis de 4 bytes.
- Si aparece la pantalla de instalación, revisa `empresas.configurado`.
