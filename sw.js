const CACHE_NAME="erh-launcher-v3";
const CORE=["./","./index.html","./launcher-config.js","./install.js","./manifest.json","./icons/icon-192.png","./icons/icon-512.png","./icons/favicon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(CORE)));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(u.origin===self.location.origin)e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));});
