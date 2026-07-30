const CACHE_NAME = 'desan-graphic-v1.0.0';
const STATIC_ASSETS = [
  './',
  './index.html',
  './offline.html',
  './manifest.json',
  './favicon.png',
  './logo.png',
  './icon-192.png',
  './icon-512.png',
  './maskable-icon-512.png',
  './apple-touch-icon.png',
  './contact.vcf',
  './icons/whatsapp.png',
  './icons/telegram.png',
  './icons/instagram.png',
  './icons/bale.png',
  './icons/rubika.png',
  './icons/eitaa.png',
  './icons/phone.png',
  './icons/website.png',
  './icons/contact.png',
  './icons/location.png',
  './icons/email.png',
  './icons/share.png',
  './icons/download.png',
  './icons/home.png',
  './icons/install.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('[ServiceWorker] Precache partial fallback:', err);
      });
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

  if (url.origin !== location.origin) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
        return networkResponse;
      }).catch(async () => {
        if (event.request.mode === 'navigate') {
          const offlineCache = await caches.match('./offline.html');
          if (offlineCache) return offlineCache;
        }
        return new Response('Offline - Desan Graphic PWA', { status: 503 });
      });
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
