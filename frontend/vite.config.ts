import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': resolve(__dirname, '.') },
  },
})
