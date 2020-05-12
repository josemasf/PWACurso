self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  //crear almacen de caché
  event.waitUntil(
    caches.open('static')
      .then(function(cache){
        console.log('[Service Worker] Preching APP Sell');        
        cache.add('/');
        cache.add('/index.html');
        cache.add('/src/js/app.js');
      })
  );
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    ///Recupero los datos de la caché de datos
    caches.match(event.request)
      .then(function(response){
        if(response){
          return response;
        } else{
          return fetch(event.request);
        }
      })
  );
});