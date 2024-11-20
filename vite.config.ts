import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// npm install --save-dev @types/node required to find this module
import { fileURLToPath, URL } from 'url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
