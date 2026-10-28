# Frontend (React + Vite)

## 1. Stack

- React 18 + TypeScript.
- Vite 5.4 + `@vitejs/plugin-react`.
- MUI 5 (`@mui/material`, `@mui/styles`, `@mui/lab`).
- React Router 6.
- FullCalendar 5.
- Axios, Chart.js, SimpleBar, SweetAlert, etc.
- Build: `vite build` → `frontend/dist`.

## 2. Estructura

```text
frontend/
├── index.html               # entry real de Vite
├── vite.config.ts
├── .env / .env.example
├── .npmrc                   # legacy-peer-deps=true
├── eslint.config.js
└── src/
    ├── index.tsx            # ReactDOM.createRoot
    ├── App.jsx              # providers + lazy Pages
    ├── App/Config/config.js # env de la app
    ├── Pages/index.jsx      # BrowserRouter + providers
    ├── Routes/RoutesMain.jsx
    ├── Contexts/            # Login, Tema, Configuración, etc.
    ├── Components/Menu/     # drawer, toolbar, menú
    ├── Pages/Ventas/Vender/ # flujo de venta
    ├── Services/api.js      # Axios
    ├── Functions/           # helpers (numberSeparator, fechas, etc.)
    └── Utils/               # config y utilidades
```

## 3. Configuración de Vite

`frontend/vite.config.ts`:

- Normaliza `base`:
  - `VITE_BASE_URL=/admin` → `base: '/admin/'`.
  - Vite necesita barra final para los assets; la app usa sin barra final.
- Proxy de desarrollo:
  - `/api/v1` → `VITE_DEV_API_PROXY` (default `http://localhost:8080`).
  - `/uploads` → mismo target.
  - `changeOrigin: false` para conservar el `Host`.
- `jsxInJs`: transforma `.js` de `src` con JSX (legacy de CRA).
- `optimizeDeps.exclude`: FullCalendar (singleton).
- `build.outDir: 'dist'`.
- `test`: Vitest + jsdom + `src/setupTests.ts`.

## 4. Variables de entorno

```env
VITE_BASE_URL=/admin
VITE_API_URL_END_POINT=/api/v1/
VITE_X_API_TOKEN=...
VITE_SECRETO=...
VITE_WEBSITE_NAME=Saeta
VITE_ICON=rocket
VITE_APP_NAME=Saeta Store
VITE_DEV_API_PROXY=http://localhost:8080
```

- Solo las variables `VITE_*` llegan al navegador.
- Se **embeben en tiempo de build**.
- En Docker, el build usa `ARG`/`ENV` del `Dockerfile`/compose; `frontend/.env` no se copia.
- No pongas secretos reales en `VITE_*`.

## 5. `env` de la aplicación

`frontend/src/App/Config/config.js`:

```js
export const env = {
  BASEURL,
  ICONAPP,
  APIURL,
  APPNAME,
  XAPITOKEN,
  SECRETO,
  DRAWER_WIDTH: 195,
  HOME_PAGE_URL: '/admin',
}
```

> `DRAWER_WIDTH` es crítico: sin él, el drawer y los márgenes del layout quedan `undefined`.

`Utils/config.js` mantiene una copia equivalente para compatibilidad.

## 6. Rutas y base URL

- `VITE_BASE_URL=/admin` (sin barra final).
- Las rutas de la app ya incluyen `/admin`:
  ```js
  const R = env.BASEURL + `/`;
  ```
- `BrowserRouter` **no** lleva `basename`. No agregarlo: duplicaría `/admin/admin/`.
- En el VPS, nginx sirve `/admin/` y hace fallback a `/admin/index.html`.

## 7. Flujo de login / configuración inicial

- `ConfiguracionProvider` consulta `empresas.configurado`.
- Si `configurado === 0`, `LoginForm` muestra `ConfigIniciales`.
- En el dump inicial se fuerza `configurado = 1` desde
  `docker/mysql/init/02-set-configured.sql`.
- Si aparece la pantalla de instalación, revisar ese valor.

## 8. Flujo de ventas (Vender)

Archivos principales:

- `Pages/Ventas/Vender/VentasProvider.jsx`: estado y cálculo.
- `DialogBuscarProducto.jsx`: búsqueda/alta de producto.
- `VentasTablaItems.jsx`: tabla de ítems.
- `Inputs.jsx`: código/cantidad.
- `DialogFinalizar.jsx`: cobro.
- `Impresiones/`: tickets, A4, PDF.

Cálculo:

```js
precio_guardado = parseFloat(prod.precio_producto)
subtotal_precio = precio_guardado * cantidad
```

La tabla divide por `valor_moneda`:

```js
const valorMoneda =
  parseFloat(datosFactura.datosMoneda?.valor_moneda) || 1;
```

### Fix NaN (importante)

La API devuelve `activo_moneda` como **número** (`1`). El código legacy comparaba:

```js
e.activo_moneda === "1" // incorrecto
```

Eso dejaba `monedaActiva = {}` y `valor_moneda = undefined` → `NaN`.
El fix:

```js
rMoneda.results.filter(e => Number(e.activo_moneda) === 1)
```

Además:

- Migración de `facturasStorage`/`notas` en `localStorage` para reparar
  `monedaActiva` vacía sin perder ítems.
- Fallback de cantidad (`|| 1`) y de moneda (`|| 1`).

## 9. Drawer / menú

- `Components/Menu/index.jsx`: `Box` con `width: { md: DRAWER_WIDTH }`.
- `DrawerDesktop`: `variant="persistent"`, `open={isOpenMenu}`.
- `DrawerMobile`: `variant="temporary"`, `open={mobileOpen}`.
- `ToolbarMain` y `MainPage` usan `DRAWER_WIDTH` para márgenes.
- `DRAWER_WIDTH` debe ser `195` en `env`.

## 10. FullCalendar

- Se usa en `Pages/Agendas/Agenda/AgendaLista.jsx`.
- Vite dev pre-empaqueta los paquetes por separado y rompe el singleton.
- Solución:
  - `optimizeDeps.exclude`: `@fullcalendar/core`, `daygrid`, `interaction`, `react`.
  - Locale `es` como ESM local: `src/Utils/fullcalendarEsLocale.js`.
  - No importar `@fullcalendar/core/locales/es` directamente en dev.

## 11. Service Worker / PWA

- Se eliminaron `service-worker.ts`, `serviceWorkerRegistration.ts` y
  `reportWebVitals.ts`.
- No hay PWA activa.
- Si se necesita offline, usar `vite-plugin-pwa` y documentar el cambio.

## 12. JSX dentro de `.js`

El proyecto legacy tiene JSX en archivos `.js` (no solo `.jsx`).
No renombrar masivamente: `vite.config.ts` ya los transforma con `jsxInJs`.

## 13. Build, lint y tests

```bash
cd frontend
npm run dev
npm run build
npm run lint
npm run test        # Vitest; hoy no hay archivos de test
npm run preview
```

- `frontend/build/` es el build viejo de CRA. **No usarlo**.
- `frontend/dist/` es el output actual.
- `.npmrc` usa `legacy-peer-deps=true` por `react-barcodes` (peer React 17).

## 14. Gotchas

1. No agregar `basename` al `BrowserRouter`.
2. No cambiar `VITE_BASE_URL` a `/admin/` en la app: debe ser `/admin`.
3. No quitar `DRAWER_WIDTH`.
4. No comparar campos numéricos de la API con strings.
5. No reintroducir `react-scripts` ni `public/index.html` de CRA.
6. FullCalendar: no quitar el `exclude` sin probar dev.
7. Los cambios de frontend en el VPS requieren rebuild de `nginx`.
8. Después de desplegar, hard reload + purga de Cloudflare.
