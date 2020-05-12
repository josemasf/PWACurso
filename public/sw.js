self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  //crear almacen de caché
  event.waitUntil(
    caches.open('static')
      .then(function(cache){
        console.log('[Service Worker] Preching APP Sell');        
        cache.addAll([
          '/',
          '/index.html',
          '/src/js/app.js',
          '/src/js/feed.js',
          '/src/js/material.min.js',
          '/src/css/app.css',
          '/src/css/feed.css',
          '/src/images/main-image.jpg',
          'https://fonts.googleapis.com/css?family=Roboto:400,700',
          'https://fonts.googleapis.com/icon?family=Material+Icons',
          'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
        ]);
        
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
          return fetch(event.request)
          .then(function(res){
            //creo una caché dinamica para las cosas no forzadas a cachear
            caches.open('dynamic')
              .then(function(cache){
                cache.put(event.request.url, res.clone());
                return res;
              });
          });
        }
      })
  );
});