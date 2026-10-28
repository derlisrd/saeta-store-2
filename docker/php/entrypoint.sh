#!/bin/sh
set -e

# El backend hace Dotenv::createImmutable(__DIR__)->load(), por lo que
# necesita un .env real dentro de /var/www/html/api/v1.
ENV_FILE=/var/www/html/api/v1/.env
cat > "$ENV_FILE" <<EOF
ROOTPATH='${ROOTPATH}'
UPLOADPATH='${UPLOADPATH}'
UPLOADPATHNAME='${UPLOADPATHNAME}'
DBHOST='${DBHOST}'
DBNAME='${DBNAME}'
DBUSER='${DBUSER}'
DBPASS='${DBPASS}'
X_API_TOKEN='${X_API_TOKEN}'
SECRET_KEY='${SECRET_KEY}'
ENCRYTED='${ENCRYTED}'
EMAIL_PASSWORD='${EMAIL_PASSWORD}'
EOF

chown www-data:www-data "$ENV_FILE" 2>/dev/null || true

mkdir -p /var/www/html/uploads
chown www-data:www-data /var/www/html/uploads 2>/dev/null || true

# Adaptación solo-Docker para no modificar el backend:
# PostController usa UPLOADPATH (../uploads) y DeleteController usa
# "../" + UPLOADPATH. Creamos enlaces para que ambas rutas relativas
# terminen siempre en el volumen /var/www/html/uploads.
ln -sfn /var/www/html/uploads /uploads
mkdir -p /var/www
ln -sfn /var/www/html/uploads /var/www/uploads
mkdir -p /var/www/html/api
ln -sfn /var/www/html/uploads /var/www/html/api/uploads

exec docker-php-entrypoint "$@"
