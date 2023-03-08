import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost'
    }
  },
  plugins: [react()],
})
