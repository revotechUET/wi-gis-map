import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
  ],
  build: {
    target: 'esnext',
    lib: {
      entry: "./src/GisMap.jsx",
      name: 'GisMap',
      formats: ['es'],
      fileName: 'GisMap',
    },
    rollupOptions: {
      external: ["react", "react-dom"],
    },
  },
})
