self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('bobo-cache-v3').then(function(cache) {
      return cache.addAll([
        'index.html',
        'manifest.json',
        'icons/icon-192.png'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys
          .filter(function(key) { return key !== 'bobo-cache-v2'; })
          .map(function(key) { return caches.delete(key); })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
