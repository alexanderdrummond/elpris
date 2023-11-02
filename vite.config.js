import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import compression from 'vite-plugin-compression';


export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'], 
    }),
    compression()
  ]
})