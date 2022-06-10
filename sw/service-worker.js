var version = 1;
var cacheName = 'stale- ' + version;
self.addEventListener('install', function(event) {
    self.skipWaiting();
});
self.addEventListener('activate', function(event) {
    if (self.clients && clients.claim) {
        clients.claim();
    }
});
self.addEventListener('fetch', function(event) {
    //In the service-worker.js file, we always fetch the response from the network:
    event.respondWith( fetch(event.request)
    .then(function(response) {
        caches.open(cacheName)
        .then(function(cache) {
            //If we received an error response, we return the stale version from the cache:
            if(response.status >= 400) {
                cache.match(event.request)
                .then(function(response) {
                    // Return stale version from cache
                    return response;
                })
                //If we can't find the stale version, we return the network response, which is the error:
                .catch(function() {
                    return response;
                });
            } else {
                //If the response was successful (response code 200), we update the cached version:
            cache.put(event.request, response.clone());
            return response;
            }
        });
    })
    );
});
