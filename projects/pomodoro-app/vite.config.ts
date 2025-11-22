import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Pomodoro App',
        short_name: 'Pomodoro',
        description: 'A simple Pomodoro timer application.',
        theme_color: '#161932',
        background_color: '#161932',
        display: 'standalone',
        start_url: '.',
        icons: [
          {
            src: '32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            src: '192.png',
            sizes: '192x192',
            type: 'image/svg+xml',
          },
          {
            src: '512.png',
            sizes: '512x512',
            type: 'image/svg+xml',
          },
        ],
      },
    }),
  ],
});
