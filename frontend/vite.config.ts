import { defineConfig, loadEnv, transformWithEsbuild, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * El proyecto original (CRA) contiene JSX dentro de archivos .js.
 * Vite/rollup solo trata .jsx/.tsx como JSX por defecto, así que
 * pre-transformamos los .js de src con esbuild usando el loader jsx.
 */
function jsxInJs(): Plugin {
  return {
    name: 'saeta-jsx-in-js',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.includes('/src/') || !id.endsWith('.js')) return null
      const result = await transformWithEsbuild(code, id, {
        loader: 'jsx',
        jsx: 'automatic',
        sourcemap: true,
      })
      return { code: result.code, map: result.map as never }
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiTarget = env.VITE_DEV_API_PROXY || 'http://localhost:8080'
  const rawBase = env.VITE_BASE_URL || '/'
  // Vite necesita que base termine en "/" para resolver los assets,
  // pero la app usa VITE_BASE_URL sin barra final.
  const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`

  return {
    base,
    plugins: [jsxInJs(), react()],
    optimizeDeps: {
      // FullCalendar v5 comparte estado entre sus paquetes. Si Vite los
      // pre-empaqueta por separado se rompe el singleton y aparece
      // "Please import the top-level fullcalendar lib".
      exclude: [
        '@fullcalendar/core',
        '@fullcalendar/daygrid',
        '@fullcalendar/interaction',
        '@fullcalendar/react',
      ],
      esbuildOptions: {
        // El scanner de dependencias también encuentra JSX en .js
        loader: { '.js': 'jsx' },
      },
    },
    server: {
      host: true,
      port: 3000,
      proxy: {
        // Se conserva el Host original para que las URLs de imágenes
        // generadas por PHP apunten al navegador (localhost:3000).
        '/api/v1': { target: apiTarget, changeOrigin: false },
        '/uploads': { target: apiTarget, changeOrigin: false },
      },
    },
    build: { outDir: 'dist', sourcemap: false },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/setupTests.ts',
    },
  }
})
