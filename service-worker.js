const CACHE='acus-cache-v1';
const URLS=['./','./index.html','./main.js','./manifest.json','./icons/microfono-192.png','./icons/microfono-512.png'];

self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(URLS))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
