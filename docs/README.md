# Documentación — Saeta Store 2

Índice de documentación. Para el contexto rápido de agentes, empieza por
[`../AGENTS.md`](../AGENTS.md).

| Documento | Cuándo leerlo |
|---|---|
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Entender servicios, flujos, puertos, volúmenes y topología local/VPS |
| [`DEVELOPMENT.md`](DEVELOPMENT.md) | Levantar el proyecto, hot reload, scripts, tests y lint |
| [`DEPLOYMENT.md`](DEPLOYMENT.md) | Desplegar/actualizar en VPS, nginx host, Cloudflare, SSL, rebuild |
| [`FRONTEND.md`](FRONTEND.md) | Vite, variables `VITE_*`, rutas, FullCalendar, drawer, ventas |
| [`BACKEND.md`](BACKEND.md) | API PHP, routing, uploads, headers, PDF/Excel/email |
| [`DATABASE.md`](DATABASE.md) | MySQL, init, DBeaver, túnel SSH, backups y queries útiles |
| [`TROUBLESHOOTING.md`](TROUBLESHOOTING.md) | Errores ya vistos (NaN, drawer, 526, puertos, caché, etc.) |
| [`DECISIONS.md`](DECISIONS.md) | Decisiones de arquitectura, motivos y pendientes |

## Regla de oro

Antes de tocar código:

1. Lee `AGENTS.md`.
2. Lee el documento del área que vas a modificar.
3. Revisa [`TROUBLESHOOTING.md`](TROUBLESHOOTING.md) si el síntoma ya ocurrió antes.
4. No modifiques el backend PHP salvo que se pida; usa adaptaciones en `docker/`.
5. Valida con `npm run build`, `npm run lint` y `docker compose config` antes de terminar.
