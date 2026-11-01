import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    base: '/',
    plugins: [
      react(), 
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        manifestFilename: 'manifest.json',
        injectRegister: null,
        includeAssets: [
          'icon-192.png',
          'icon-512.png',
          'screenshot-1.png',
          'screenshot-2.png',
          'icon.svg'
        ],
        workbox: {
          maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
          globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,json}']
        },
        manifest: ({
          id: '/',
          name: 'GAME',
          short_name: 'GAME',
          description: 'Sistema de entrenamiento forzado y memorización técnica para mecánicos de aviación.',
          start_url: '/',
          scope: '/',
          lang: 'es',
          dir: 'ltr',
          display: 'standalone',
          display_override: ['standalone', 'window-controls-overlay'],
          background_color: '#050b16',
          theme_color: '#050b16',
          orientation: 'portrait-primary',
          categories: ['education', 'utilities'],
          prefer_related_applications: false,
          related_applications: [
            {
              platform: 'play',
              url: 'https://play.google.com/store/apps/details?id=com.aviation.tma_ste',
              id: 'com.aviation.tma_ste'
            }
          ],
          iarc_rating_id: 'e0dfcc8a-2c6e-4ad5-9c94-1a3b9845014a',
          scope_extensions: [
            { origin: '*.vercel.app' },
            { origin: '*.github.io' }
          ],
          shortcuts: [
            {
              name: 'Módulo Verbos MMA 1',
              short_name: 'MMA 1',
              description: 'Entrenamiento forzado de verbos de aviación',
              url: '/?module=mma1',
              icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }]
            },
            {
              name: 'Módulo Estados MMA 2',
              short_name: 'MMA 2',
              description: 'Estudiar estados y discrepancias',
              url: '/?module=mma2',
              icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }]
            }
          ],
          file_handlers: [
            {
              action: '/?file',
              accept: {
                'text/plain': ['.txt', '.tma']
              }
            }
          ],
          launch_handler: {
            client_mode: 'navigate-existing'
          },
          protocol_handlers: [
            {
              protocol: 'web+tma',
              url: '/?protocol=%s'
            }
          ],
          share_target: {
            action: '/?share',
            method: 'GET',
            params: {
              title: 'title',
              text: 'text',
              url: 'url'
            }
          },
          widgets: [
            {
              name: 'Progreso Semanal TMA',
              short_name: 'TMA Widgets',
              description: 'Estadísticas acumuladas de entrenamiento.',
              tag: 'tma-widget',
              template: 'widget-template',
              ms_ac_template: 'widget-template.json',
              data: 'widget-data.json',
              icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }],
              screenshots: [
                {
                  src: '/screenshot-1.png',
                  sizes: '1280x720',
                  type: 'image/png',
                  form_factor: 'wide'
                }
              ]
            }
          ],
          edge_side_panel: {
            preferred_width: 480
          },
          note_taking: {
            new_note_url: '/?note=new'
          },
          icons: [
            {
              src: '/icon-192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: '/icon-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: '/icon-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable'
            }
          ],
          screenshots: [
            {
              src: '/screenshot-1.png',
              sizes: '1280x720',
              type: 'image/png',
              form_factor: 'wide'
            },
            {
              src: '/screenshot-2.png',
              sizes: '1080x1920',
              type: 'image/png',
              form_factor: 'narrow'
            }
          ]
        } as any),
        devOptions: {
          enabled: false
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-dom/client', 'lucide-react'],
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
