if('serviceWorker' in navigator){
    navigator.serviceWorker
        .register('/sw.js')
        .then(function(){
            console.log('Service worker registered');
        });
}


window.addEventListener('beforeinstallpromt', function(event){
    console.log('beforeinstallpromt fired');
    event.preventDefault();
    deferredPromt = event;
    return false;
})