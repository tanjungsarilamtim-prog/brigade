const V='brigade-v1',CDN='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js',
SHELL=['./','index.html','admin.html','lapangan.html','manifest-admin.json','manifest-lapangan.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(async c=>{await c.addAll(SHELL).catch(()=>{});try{await c.add(new Request(CDN,{mode:'no-cors'}))}catch(x){}}));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);
 if(u.href===CDN)return e.respondWith(caches.match(CDN).then(r=>r||fetch(CDN,{mode:'no-cors'}).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(CDN,cp));return res})));
 if(u.origin===location.origin)e.respondWith(fetch(e.request).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(e.request,cp));return res}).catch(()=>caches.match(e.request,{ignoreSearch:true})))});
