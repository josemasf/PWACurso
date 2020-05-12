
self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  //crear almacen de caché
  event.waitUntil(
    caches.open('static')
      .then(function(cache){
        console.log('[Service Worker] Preching APP Sell');
        cache.add('/src/js/app.js');
      })
  );
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(fetch(event.request));
});