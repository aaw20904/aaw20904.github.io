// @ts-check
/**
 * Service Worker 4.2
 * 
 * Caches an array of app resources
 */

// service worker version number
const SW_VERSION = 1;
// the root name for our cache
const CACHE_ROOT = 'pwa-learn-cache'
// generates a custom cache name per service worker version
const CACHE_NAME = `${CACHE_ROOT}-v${SW_VERSION}`;

var urlList = [
  '/',
  '/sw/app.webmanifest',
  '/sw/index.html',
  '/sw/css/main.css',
  '/sw/css/bootstrap.min.css',
  '/sw/img/cat_270.jpg',
  '/sw/img/cat_540.jpg',
  '/sw/img/cat_1080.jpg',
  '/sw/img/tip-200.png',
  '/sw/favicon-32x32.png',
  '/sw/favicon.ico',
  '/sw/js/main.js',
  '/sw/js/sw.js',
  '/sw/icons/ms-icon-144x144.png'

];

self.addEventListener('install', event => {
  console.log(`SW: ${event.type} event fired`);
  // the service worker is installing, so it's our chance
  // to setup the app. In this case, we're telling   
  // the browser to wait until we've populated the cache
  // before considering this service worker installed
  event.waitUntil(
    // create a local cache for our app resources
    caches.open(CACHE_NAME)
      // once it's open...
      .then(cache => {
        console.log('SW: Cache opened');
        // cache all of resources from the array
        return cache.addAll(urlList);
      })
      .catch(error => {
        console.error(error);
      })
  );
});


self.addEventListener('activate', event => {
    // fires after the service worker completes its installation. 
    // it's a place for the service worker to clean up from previous 
    // service worker versions
    console.log(`SW: ${event.type} event fired`);
    // don't complete the activation until all the code runs
    event.waitUntil(
      // get the list of cache keys (cache names)
      caches.keys().then(cacheList => {
        // don't stop until all complete
        return Promise.all(
          cacheList.map(theCache => {
            // is the cache key different than the 
            // current cache name and has the same root?
            if ((CACHE_NAME !== theCache) && (theCache.startsWith(CACHE_ROOT))) {
              // yes? Then delete it. 
              console.log(`SW: deleting cache ${theCache}`);
              return caches.delete(theCache);
            }
          })
        );
      })
    );
  });

  
  self.addEventListener('fetch', event => {
    console.log(`SW: ${event.type} ${event.request.url}`);
    // fires whenever the app requests a resource (file or data)
    event.respondWith(
      // check to see if it's in the cache
      caches.match(event.request)
        .then(response => {
          // if it is, then return the cached response
          // object from the cache
          if (response) {
            console.log(`SW: Return Cache ${event.request.url}`);
            return response;
          }
          // otherwise, tell the browser to go get the
          // resource from the network
          console.log(`SW: Return Network ${event.request.url}`);
          return fetch(event.request)
        })
    );
  });
  
