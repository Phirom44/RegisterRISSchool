const CACHE_NAME = "riverland-v1";
const ASSETS = [
  "/RegisterRISSchool/",
  "/RegisterRISSchool/index.html",
  "/RegisterRISSchool/manifest.json",
  "/RegisterRISSchool/icon-ris-192.png",
  "/RegisterRISSchool/icon-ris-512.png",
  "/RegisterRISSchool/Logo1.PNG"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME)
      .map(key => caches.delete(key)))
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
