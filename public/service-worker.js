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

// Install Event: Pre-cache static assets
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install Event');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching app shell & assets');
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('[ServiceWorker] Some assets failed to precache:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate Event');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Stale-While-Revalidate with Offline Fallback
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);

  // Ignore cross-origin analytics/external fonts or handle gracefully
  if (url.origin !== location.origin) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached and update in background
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => {/* Silent catch offline */});
        return cachedResponse;
      }

      // Network fallback
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(async () => {
        // If navigation request fails, show offline.html
        if (event.request.mode === 'navigate') {
          const offlineCache = await caches.match('./offline.html');
          if (offlineCache) return offlineCache;
        }
        return new Response('Offline - Desan Graphic PWA', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({ 'Content-Type': 'text/plain; charset=utf-8' })
        });
      });
    })
  );
});

// Listen for message from app (e.g. skipWaiting)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
