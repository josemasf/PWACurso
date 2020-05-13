const CACHE_STATIC_NAME = 'static-v6';
const CACHE_DYNAMIC_NAME = 'dynamic-v2';

self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  //crear almacen de caché
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function(cache){
        console.log('[Service Worker] Preching APP Sell');        
        cache.addAll([
          '/',
          '/index.html',
          '/offline.html',
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

  //Como son promesas se debe esperar a que todas respondan. Recorremos las key y borramos las viejas
  event.waitUntil(
    caches.keys()
    .then(function(keyList){
      return Promise.all(keyList.map(function(key){
        if(key !== CACHE_STATIC_NAME && key !==CACHE_DYNAMIC_NAME) {
          console.log('[SW] Borrando cachés antiguas ...', key);
          return caches.delete(key);
        }
      }));
    })
  );

  return self.clients.claim();
});

/*
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
            caches.open(CACHE_DYNAMIC_NAME)
              .then(function(cache){
                cache.put(event.request.url, res.clone());
                return res;
              });
          }).catch(async function(err){
            const cache = await caches.open(CACHE_STATIC_NAME);
            return cache.match('/offline.html');
          });
        }
      })
  );
});
*/

///CACHE ONLY
self.addEventListener('fetch', function(event) {
  event.respondWith(
    ///Recupero los datos de la caché de datos
    caches.match(event.request)      
  );
});

//Devolver respuesta siempre que haya conectividad, si no caché.
self.addEventListener('fetch', function(event) {
  event.respondWith(
      fetch(event.request)
        .catch(function(err){
          ///Recupero los datos de la caché de datos
          return caches.match(event.request);         
        })
  );
});