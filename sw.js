// Service worker: guarda la app en el teléfono para abrirla sin señal.
const VERSION = 'checklist-20261006084446';
const SHELL = ['./', './index.html', './config.js', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
const CDN = ['https://cdn.jsdelivr.net/', 'https://cdnjs.cloudflare.com/', 'https://fonts.googleapis.com/', 'https://fonts.gstatic.com/'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = req.url;
  // Microsoft 365 (inicio de sesión y Graph) siempre va directo a la red
  if (url.includes('login.microsoftonline.com') || url.includes('graph.microsoft.com')) return;

  // Página de la app: primero la red (para recibir actualizaciones), si no hay señal, la copia guardada
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put('./index.html', copy)); return r; })
      .catch(() => caches.match('./index.html')));
    return;
  }

  // Archivos propios y librerías: la copia guardada al tiro, y se actualiza en segundo plano
  const sameOrigin = url.startsWith(self.location.origin);
  if (sameOrigin || CDN.some(p => url.startsWith(p))) {
    e.respondWith(caches.open(VERSION).then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(r => { if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
  }
});
