const CACHE_NAME = 'quinta-cache-v1';
const ASSETS = ['./', './index.html', './style.css', './db.js', './wiki.js', './app.js', 'https://unpkg.com/dexie/dist/dexie.js'];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
