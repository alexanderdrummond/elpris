self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('api-cache').then((cache) => {
      return cache.addAll([
        '/Icon.svg',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('elprisenligenu.dk') || event.request.url.endsWith('Icon.svg')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request).then((networkResponse) => {
          const clonedResponseForJson = networkResponse.clone();
          const clonedResponseForCache = networkResponse.clone();
          caches.open('api-cache').then((cache) => {
            cache.put(event.request, clonedResponseForCache);
          });
          return clonedResponseForJson;
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});