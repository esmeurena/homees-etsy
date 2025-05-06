import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/



export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    define: {
      "__GOOGLE_API": JSON.stringify(env.VITE_GOOGLE_API_KEY)
    },
    server: {
      open: true,
      // port: 5000,
      proxy: {
        '/api': {
          target: "http://127.0.0.1:5000",
          changeOrigin: true,
          secure: true,
        }
      }
    },
    optimizeDeps: {
      exclude: ['js-big-decimal']
    }
  }
})
