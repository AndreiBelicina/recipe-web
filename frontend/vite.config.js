import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/recipe': 'http://localhost:4000', // Proxy requests to the backend server
    },
  },
})
