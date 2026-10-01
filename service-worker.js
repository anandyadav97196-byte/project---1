const CACHE_NAME = "flashcard-app-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js"
];


// Install Service Worker
self.addEventListener("install", function (event) {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(function (cache) {

                return cache.addAll(FILES_TO_CACHE);

            })

    );

});


// Fetch cached files
self.addEventListener("fetch", function (event) {

    event.respondWith(

        caches.match(event.request)
            .then(function (response) {

                if (response) {

                    return response;

                }

                return fetch(event.request);

            })

    );

});


// Activate Service Worker
self.addEventListener("activate", function (event) {

    event.waitUntil(

        caches.keys()
            .then(function (cacheNames) {

                return Promise.all(

                    cacheNames
                        .filter(function (cacheName) {

                            return cacheName !== CACHE_NAME;

                        })

                        .map(function (cacheName) {

                            return caches.delete(cacheName);

                        })

                );

            })

    );

});