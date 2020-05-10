self.addEventListener('install', function(event){
    console.log('[SW] Instaling service worker', event);
});

self.addEventListener('activate', function(event){
    console.log('[SW] Activating service worker', event);

    return self.clients.claim();
});



self.addEventListener('fetch', function(event){
    console.log('[SW] Feaching something ....', event);

    //se puede sobre escribir la respuesta.
    event.respondWith(fetch(event.request));

    return self.clients.claim();
});