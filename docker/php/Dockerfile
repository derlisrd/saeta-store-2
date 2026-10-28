# syntax=docker/dockerfile:1
FROM php:8.1-fpm

RUN apt-get update && apt-get install -y --no-install-recommends \
      libpng-dev libjpeg62-turbo-dev libfreetype6-dev libzip-dev \
      libxml2-dev libonig-dev unzip git default-mysql-client \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql mysqli gd zip mbstring xml dom fileinfo \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html/api/v1
COPY backend/ ./

RUN rm -rf uploads \
    && composer install --no-dev --optimize-autoloader --no-interaction --no-blocking \
    && mkdir -p /var/www/html/uploads \
    && chown -R www-data:www-data /var/www/html/api/v1 /var/www/html/uploads

COPY docker/php/php.ini /usr/local/etc/php/conf.d/zz-saeta.ini
COPY docker/php/remove-bad-header.php /usr/local/etc/php/remove-bad-header.php
COPY docker/php/zz-pool.conf /usr/local/etc/php-fpm.d/zz-pool.conf
COPY docker/php/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]
CMD ["php-fpm"]
