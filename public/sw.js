const CACHE_NAME = 'ste-aviador-cache-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/icon.svg',
  '/screenshot-1.png',
  '/screenshot-2.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  // Never intercept or cache dev server internals, src files during Vite dev, or hot updates
  if (
    url.pathname.startsWith('/src') ||
    url.pathname.startsWith('/@') ||
    url.pathname.startsWith('/node_modules') ||
    url.pathname.endsWith('.ts') ||
    url.pathname.endsWith('.tsx') ||
    url.search.includes('v=') ||
    url.search.includes('t=')
  ) {
    return;
  }

  // 1. Navigation requests (HTML pages) - Instant launch in hangars (Cache-First)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        // En hangares la señal suele ser débil o intermitente ("lie-fi").
        // Buscamos inmediatamente en caché para abrir la app al instante (0ms de espera).
        const cached = (await caches.match(event.request)) || (await caches.match('/')) || (await caches.match('/index.html'));
        if (cached) {
          // Si hay conexión de fondo, actualizamos la caché silenciosamente sin bloquear al usuario
          fetch(event.request).then(async (networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const cache = await caches.open(CACHE_NAME);
              cache.put(event.request, networkResponse);
            }
          }).catch(() => { /* Sin señal en hangar, seguro ignorar */ });
          return cached;
        }

        // Si es la primera vez y no hay caché aún
        try {
          const networkResponse = await fetch(event.request);
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            const cache = await caches.open(CACHE_NAME);
            cache.put(event.request, responseToCache);
          }
          return networkResponse;
        } catch {
          return new Response('STE Aviador Offline', {
            headers: { 'Content-Type': 'text/html' }
          });
        }
      })()
    );
    return;
  }

  // 2. Static assets (JS, CSS, images, icons, manifest)
  event.respondWith(
    (async () => {
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) {
        // Return instantly from cache for zero latency & offline functionality
        // Refresh cache in background if online
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => { /* Offline, ignore background update */ });
        return cachedResponse;
      }

      try {
        const networkResponse = await fetch(event.request);
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, responseToCache);
        }
        return networkResponse;
      } catch {
        // If resource is missing offline, try root match for subpaths
        const fallback = await caches.match(event.request.url);
        if (fallback) return fallback;
        return new Response('', { status: 408, statusText: 'Request Timed Out / Offline' });
      }
    })()
  );
});
