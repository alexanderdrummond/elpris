self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('elprisenligenu.dk')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request).then((networkResponse) => {
         
          const clonedResponseForJson = networkResponse.clone();
          const clonedResponseForCache = networkResponse.clone();
          return clonedResponseForJson.json().then(data => {
           
            caches.open('api-cache').then((cache) => {
              cache.put(event.request, clonedResponseForCache);
            });
            return networkResponse; 
          });
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