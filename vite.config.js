import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/recharts')) {
            return 'charts';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'icons';
          }
          if (id.includes('src/features/ai')) {
            return 'feature-ai';
          }
          if (id.includes('src/features/reports')) {
            return 'feature-reports';
          }
          if (id.includes('src/features/marketplace')) {
            return 'feature-marketplace';
          }
          if (id.includes('src/features/community')) {
            return 'feature-community';
          }
          if (id.includes('src/features/finance')) {
            return 'feature-finance';
          }
          if (id.includes('src/features/super-admin')) {
            return 'feature-super-admin';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
})
