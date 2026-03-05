const CACHE = 'tripulacion-v3';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  if (e.request.url.includes('firebasedatabase')) return;
  if (e.request.url.includes('push.cesyson.es')) return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});

self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : { title: 'Aviso', body: 'Nuevo mensaje del Capitán' };
  e.waitUntil(self.registration.showNotification(data.title, {
    body:      data.body,
    icon:      data.icon  || '/icon-192.png',
    badge:     data.badge || '/icon-192.png',
    vibrate:   [200, 100, 200],
    timestamp: data.timestamp || Date.now(),
    requireInteraction: true
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/'));
});
