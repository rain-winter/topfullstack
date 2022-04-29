import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost',
    port: 8080,
    proxy: {
			'/videolist': {
				target: 'https://www.bilibili.com'
			}
		}
  },
  plugins: [vue()]
})
