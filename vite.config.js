import { defineConfig } from 'vite'

export default defineConfig({
  base: '/AbhishekWEB/',
  build: {
    rollupOptions: {
      input: 'index.html'
    }
  }
})