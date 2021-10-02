let cacheName = 'OurBooks_cache';
let filesToCache = [
    '/',
    'templates/buy.html',
    'templates/layout.html',
    'templates/login.html',
    'templates/order.html',
    'templates/sale.html',
    'templates/sidebar.html',
    'templates/user.py',
    'static/css/buy.css',
    'static/css/login.css',
    'static/css/select.css',
    'static/images/ASD.png',
    'static/images/buy.png',
    'static/images/buy_hover.png',
    'static/images/delete.png',
    'static/images/MAT1.png',
    'static/images/MAT2.png',
    'static/images/order.png',
    'static/images/order_hover.png',
    'static/images/PROG1.png',
    'static/images/seller.png',
    'static/images/seller_hover.png',
    'static/images/S0.png',
    'static/js/script.js',
    'static/main.js',
    'static/manifest.json'
];


/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});