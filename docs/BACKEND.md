# Backend (PHP nativo + MySQL)

## 1. Stack

- PHP 8.1-FPM (imagen `php:8.1-fpm`).
- Sin framework (no Laravel/Symfony).
- Composer para dependencias.
- PDO + `mysqli` para MySQL.
- Routing manual por método HTTP y `REQUEST_URI`.

## 2. Dependencias (`backend/composer.json`)

- `firebase/php-jwt ^6.2`
- `vlucas/phpdotenv ^5.4`
- `dompdf/dompdf ^2.0`
- `luecano/numero-a-letras ^3.0`
- `phpoffice/phpspreadsheet ^1.26`
- `phpmailer/phpmailer ^6.7`

> `composer install` se ejecuta con `--no-blocking` porque esas versiones
> tienen avisos de seguridad en Composer 2.10+. Ver [`DECISIONS.md`](DECISIONS.md).

## 3. Estructura

```text
backend/
├── index.php              # entry point
├── autoloads.php          # carga vendor, dotenv, helpers y clases
├── composer.json
├── .env / .env.example    # generado en Docker
├── Config/
│   ├── DataBaseConnect.php
│   └── helper.php
├── Globals/Globals.php    # RAIZ, UPLOADPATH, DOMINIO, etc.
├── Routes/
│   ├── Routes.php
│   ├── JsonResponse.php
│   └── Response.php
├── Controllers/
│   ├── Controllers.php
│   ├── GetController.php
│   ├── PostController.php
│   ├── PutController.php
│   ├── PatchController.php
│   ├── DeleteController.php
│   ├── AuthController.php
│   ├── PDFController.php
│   ├── ExcelController.php
│   ├── ExportController.php
│   └── EmailController.php
├── Models/Models.php
├── views/Factura.php
└── novedades.txt          # esquema + datos iniciales
```

## 4. Arranque y routing

`index.php`:

```php
require "autoloads.php";
Routes::methods();
```

`Routes::methods()` decide por `$_SERVER['REQUEST_METHOD']`:
`GET`, `POST`, `PUT`, `PATCH`, `DELETE`.

`Globals.php` calcula:

```php
ROOTPATH = 'api/v1/'
$request = substr($_SERVER['REQUEST_URI'], strlen($_ENV['ROOTPATH']));
define("RAIZ", $request);
```

Ejemplo:

```text
REQUEST_URI = /api/v1/productos
ROOTPATH    = api/v1/
RAIZ        = /productos
```

Los controladores hacen `explode("/", RAIZ)` para obtener tabla/id.

## 5. Variables de entorno

`backend/.env` es obligatorio porque `autoloads.php` ejecuta:

```php
Dotenv\Dotenv::createImmutable(__DIR__)->load();
```

En Docker lo genera `docker/php/entrypoint.sh` desde las variables del
contenedor. Variables usadas:

```env
ROOTPATH='api/v1/'
UPLOADPATH='../uploads'
UPLOADPATHNAME='uploads'
DBHOST=db
DBNAME=saeta
DBUSER=saeta
DBPASS=...
X_API_TOKEN=...
SECRET_KEY=...
ENCRYTED='HS256'
EMAIL_PASSWORD=...
```

## 6. Base de datos

`Config/DataBaseConnect.php`:

```php
new PDO("mysql:host=$host;dbname=$db", $user, $pass);
$con->exec("set names utf8");
```

- `connect()` valida `X-Api-Token` contra `API_TOKEN`.
- `connect_interno()` omite esa validación (uso interno).
- `Models.php` usa PDO y devuelve JSON/objetos.

> La API devuelve números como números (`activo_moneda: 1`, `precio_producto: 0`).
> El frontend debe usar `Number(...)`.

## 7. Endpoints principales

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/v1/{tabla}` | Lista/filtra tabla |
| GET | `/api/v1/pdf_factura/{id}` | PDF de factura |
| GET | `/api/v1/view_pdf_factura/{id}` | Ver PDF |
| GET | `/api/v1/generateReport/{...}` | Excel/Reporte |
| GET | `/api/v1/backup?token=...` | Exportar base |
| POST | `/api/v1/{tabla}` | Insertar |
| POST | `/api/v1/Auth/Login` | Login |
| POST | `/api/v1/Auth/Register` | Registro |
| POST | `/api/v1/Auth/ReValidateToken` | Revalidar JWT |
| POST | `/api/v1/uploadJustOneImage` | Subir imagen |
| POST | `/api/v1/Upload` | Subir imágenes |
| POST | `/api/v1/sendEmail` | Enviar email |
| PUT | `/api/v1/{tabla}/{id}` | Actualizar |
| PATCH | `/api/v1/{tabla}/{id}` | Upsert |
| DELETE | `/api/v1/{tabla}/{id}` | Borrar |

Ejemplos:

```bash
curl -s -H "X-Api-Token: <token>" http://localhost:8080/api/v1/monedas
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"username_user":"admin","password_user":"..."}' \
  http://localhost:8080/api/v1/Auth/Login
```

## 8. Uploads

- `PostController` guarda en:

  ```php
  $path = UPLOADPATH . "/" . $table . "/" . $path . "/";
  ```

- `DeleteController` borra en:

  ```php
  $path = "../" . UPLOADPATH . "/" . $table . "/" . $path . "/" . $name;
  ```

Es decir, subida y borrado usan rutas relativas distintas. En Docker se
resuelve **sin tocar PHP** con enlaces simbólicos en `entrypoint.sh`:

```sh
ln -sfn /var/www/html/uploads /uploads
ln -sfn /var/www/html/uploads /var/www/uploads
ln -sfn /var/www/html/uploads /var/www/html/api/uploads
```

- `UPLOADPATH='../uploads'` (relativo).
- `UPLOADPATHNAME='uploads'` (para URLs).
- Permisos: `www-data` sobre `/var/www/html/uploads`.

## 9. Header inválido `charset=utf-8`

`autoloads.php` hace:

```php
header('charset=utf-8');
```

Eso genera un header inválido (`charset=utf-8: `) que Node/Vite rechaza con
`Invalid header token`. No se modifica el backend: `docker/php/remove-bad-header.php`
se ejecuta como `auto_prepend_file` y filtra ese header antes de enviarlo.

## 10. PDF, Excel y email

- **PDF**: `dompdf` + `views/Factura.php`.
- **Excel**: `phpspreadsheet` (`ExcelController`).
- **Backup**: `ExportController` usa `mysqli` (no PDO); por eso la imagen
  instala `mysqli`, no solo `pdo_mysql`.
- **Email**: PHPMailer con SMTP Gmail y `EMAIL_PASSWORD`.
- Extensiones necesarias: `pdo_mysql`, `mysqli`, `gd`, `zip`, `mbstring`,
  `xml`, `dom`, `fileinfo`.

## 11. CORS y autenticación

- `autoloads.php` envía:
  - `Access-Control-Allow-Origin: *`
  - `Access-Control-Allow-Headers: ..., X-Api-Token`
  - `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH`
- `X-Api-Token` se valida en `DataBaseConnect::connect()`.
- Los endpoints privados (`users`) requieren JWT (`token` query param).
- El router no maneja `OPTIONS`; en mismo origen no hay preflight.

## 12. Adaptaciones Docker (sin tocar PHP)

| Problema | Adaptación Docker |
|---|---|
| `.env` obligatorio | `entrypoint.sh` lo genera |
| Uploads con rutas relativas distintas | symlinks en `entrypoint.sh` |
| Header `charset=utf-8` inválido | `remove-bad-header.php` + `auto_prepend_file` |
| Composer advisories | `--no-blocking` |
| Extensiones PHP | `docker/php/Dockerfile` |
| MySQL charset | `docker/mysql/charset.cnf` |
| `configurado=0` | `docker/mysql/init/02-set-configured.sql` |

## 13. Troubleshooting backend

- **502**: php-fpm caído o `fastcgi_pass` incorrecto.
- **504**: PDF/Excel tardan; subir timeouts.
- **Token invalid**: falta `X-Api-Token` o JWT.
- **`Dotenv` exception**: no existe `.env` en el contenedor.
- **Uploads 404**: volumen no montado o ruta incorrecta.
- **Texto doble-codificado**: import con charset incorrecto.
- **Composer security blocking**: usar `--no-blocking` o actualizar deps.
