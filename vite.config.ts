import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // ⚠️ IMPORTANTE: Esto debe coincidir con el nombre de tu repositorio en GitHub
  // Si tu repo es https://usuario.github.io/haikuniki/, pon '/haikuniki/'
  base: '/haikunikki/', 

  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'HaikuNiki',
        short_name: 'HaikuNiki',
        description: 'Compañero de escritura vertical japonesa',
        theme_color: '#1a1a1a',
        background_color: '#1a1a1a',
        display: 'standalone',
        orientation: 'portrait',
        // Esto es importante para que la PWA funcione en subcarpetas de GH Pages
        start_url: './index.html', 
        scope: './',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})