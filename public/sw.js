self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('offline-cache').then((cache) => {
      return cache.add('/offline.html');
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('elprisenligenu.dk')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          const clonedResponse = networkResponse.clone();
          caches.open('api-cache').then((cache) => {
            cache.put(event.request, clonedResponse);
          });
          return networkResponse;
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).catch(() => {
          return caches.open('offline-cache').then((cache) => {
            return cache.match('/offline.html');
          });
        });
      })
    );
  }
});