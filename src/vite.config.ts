import { defineConfig } from 'vite';

export default defineConfig({
  // ...other config
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})