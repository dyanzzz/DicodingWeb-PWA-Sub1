const CACHE_NAME = "firstpwa-v4";
var urlToCache = [
    "/",
    "./manifest.json",
    "./nav.html",
    "./index.html",
    "./pages/home.html",
    "./pages/hotNews.html",
    "./pages/getVoucher.html",
    "./pages/discount.html",
    "./pages/recommendation.html",
    "./asset/css/materialize.min.css",
    "./asset/js/materialize.min.js",
    "./asset/js/nav.js",
    "./asset/img/logo.png",
    "./asset/img/news/galaxy-s20.jpg",
    "./asset/img/news/lenovo-legion.jpg",
    "./asset/img/news/surface-go-2.jpg",
    "./asset/img/voucher/blibli.jpg",
    "./asset/img/voucher/ilotte.jpg",
    "./asset/img/voucher/zalora.jpg",
    "./asset/img/discount/htc-one-e9-plus.jpg",
    "./asset/img/discount/meizu-m1-note.jpg",
    "./asset/img/discount/oppo-r11.jpg",
    "./asset/img/discount/oppo-r17.jpg",
    "./asset/img/recommendation/b-pro5-alpha-edition.jpg",
    "./asset/img/recommendation/lenovo-m720-tiny.jpg",
    "./asset/img/recommendation/lg-ts75vm.jpg",
    "./asset/img/recommendation/nintendo-3ds.jpg",
    "./asset/img/recommendation/xiaomi-43.jpg"
];

self.addEventListener("install", function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll(urlToCache);
        })
    );
});

self.addEventListener("fetch", function(event){
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME})
            .then(function(response){
                if(response){
                    console.log(
                        "ServiceWorker gunakan asset dari cache:", 
                        response.url
                    );
                    return response;
                }

                console.log(
                    "ServiceWorker memuat asset dari server: ", 
                    event.request.url
                );
                return fetch(event.request);
            })
    );
});

self.addEventListener("activate", function(event){
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.map(function(cacheName){
                    if(cacheName != CACHE_NAME){
                        console.log("ServiceWorker: cache "+ cacheName + "dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
})