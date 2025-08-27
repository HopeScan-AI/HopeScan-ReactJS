import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host:"0.0.0.0",
    port:3005,
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  build: {
    chunkSizeWarningLimit: 8000, // Set the chunk size warning limit to 8000 KB
  },
})
