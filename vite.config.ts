import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// vue-tsc --noEmit
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]
})
