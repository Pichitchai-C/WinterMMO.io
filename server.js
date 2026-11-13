// WinterMMORPG server — Node 16+, ไม่ต้องติดตั้งแพ็กเกจ: node server.js
const http=require('http'),fs=require('fs'),path=require('path'),crypto=require('crypto');
const ROOT=__dirname,SV=path.join(ROOT,'saves'),PUB=path.join(ROOT,'docs'),PORT=process.env.PORT||8080;fs.mkdirSync(SV,{recursive:true});
const fp=n=>path.join(SV,String(n).slice(0,20).replace(/[^\w\u0E00-\u0E7F]/g,'_')+'.json'),rd=n=>{try{return JSON.parse(fs.readFileSync(fp(n),'utf8'))}catch(e){return null}},wr=(n,d)=>fs.writeFileSync(fp(n),JSON.stringify(d));
const hash=(p,s)=>crypto.scryptSync(String(p),s,32),BT=rd('_bounty')||{},T0=Date.now()/1000-45,gt=()=>Date.now()/1000-T0,saveB=()=>wr('_bounty',BT);
const CS=new Set(),by=id=>[...CS].find(c=>c.u&&c.id==id),Q={1:[],3:[]},ARN={x:1500,y:900,w:320,h:240};let NID=1,q3t=0;
const enc=s=>{const b=Buffer.from(s),n=b.length;let h;if(n<126)h=Buffer.from([0x81,n]);else if(n<65536){h=Buffer.alloc(4);h[0]=0x81;h[1]=126;h.writeUInt16BE(n,2)}else{h=Buffer.alloc(10);h[0]=0x81;h[1]=127;h.writeBigUInt64BE(BigInt(n),2)}return Buffer.concat([h,b])};
const tx=(c,o)=>{if(!c||c.sock.destroyed)return;try{c.sock.write(enc(JSON.stringify(o)))}catch(e){}},bc=(o,ex)=>CS.forEach(c=>c.u&&c!==ex&&tx(c,o));
function pbc(P){const l=P.m.map(o=>({id:o.id,n:o.u}));P.m.forEach(o=>tx(o,{t:'party',ld:P.ld,m:l}))}
function pleave(c){const P=c.party;if(!P)return;P.m=P.m.filter(o=>o!==c);c.party=null;tx(c,{t:'party',ld:0});if(P.m.length<2){P.m.forEach(o=>{o.party=null;tx(o,{t:'party',ld:0})});return}if(P.ld==c.id)P.ld=P.m[0].id;pbc(P)}
function tcancel(c,m){if(!c.tr)return;const w=c.tr.w;tx(c,{t:'tx',m});tx(w,{t:'tx',m});c.tr=null;w.tr=null}
function trd(c){const o=c.tr.w;if(!(c.tr.ok&&o.tr.ok))return;const okf=(x,y)=>{const f=x.tr.off,h=y.tr.off,it=x.s.it||[];return f.gd<=(x.s.gd||0)&&f.it.every(k=>it.includes(k))&&it.length-f.it.length+h.it.length<=6&&h.it.every(k=>!it.includes(k)||f.it.includes(k))};
if(!okf(c,o)||!okf(o,c))return tcancel(c,'แลกเปลี่ยนไม่ผ่านการตรวจ (เงิน/ไอเทม/ช่องไม่พอ)');tx(c,{t:'tdone',give:c.tr.off,get:o.tr.off});tx(o,{t:'tdone',give:o.tr.off,get:c.tr.off});c.tr=o.tr=null}
function qx(c){for(const k of[1,3])Q[k]=Q[k].filter(o=>o!==c)}
function start(ps){const mt={t:[[],[]]};ps.forEach((c,i)=>{const t=i%2;mt.t[t].push(c);c.am=mt;c.at=t;c.ad=0;tx(c,{t:'am',team:t,sp:{x:ARN.x+30+t*(ARN.w-60),y:ARN.y+60+(mt.t[t].length-1)*50}})})}
function arena(){if(Q[1].length>=2)start(Q[1].splice(0,2));if(Q[3].length>=6)start(Q[3].splice(0,6));else if(Q[3].length>=2&&!q3t)q3t=setTimeout(()=>{q3t=0;if(Q[3].length>=2)start(Q[3].splice(0,6))},10000)}
function aend(mt,w){[...mt.t[0],...mt.t[1]].forEach(o=>{if(o.am===mt){o.am=null;tx(o,{t:'aend',win:w});if(o.at==w)tx(o,{t:'rew',gd:200,m:'ชนะแมตช์ +200 ทอง'})}});bc({t:'msg',m:'แมตช์ PvP จบ ทีม '+(w?'น้ำเงิน':'แดง')+' ชนะ'})}
function adie(c){const mt=c.am;if(!mt||c.ad)return;c.ad=1;if(mt.t[c.at].every(o=>o.ad||o.am!==mt))aend(mt,1-c.at)}
function die(c,m){if(m.am)return;const b=BT[c.u]||0;BT[c.u]=0;const ks=(m.by||[]).map(by).filter(o=>o&&o!==c&&!o.am);
if(ks.length){const pool=Math.min(+m.lost||0,100000)+b,sh=Math.floor(pool/ks.length);ks.forEach(k=>{BT[k.u]=(BT[k.u]||0)+100+(c.s.lv||1)*20;tx(k,{t:'rew',gd:sh,m:'ปราบ '+c.u+' +'+sh+' ทอง'+(b?' (รวมค่าหัว '+b+')':'')})});bc({t:'msg',m:ks.map(k=>k.u).join(', ')+' ปราบ '+c.u+(b?' รับค่าหัว '+b:'')})}else BT[c.u]=Math.floor(b/2);saveB()}
function on(c,m){
if(m.t=='ping')return tx(c,{t:'pong',n:m.n});
if(m.t=='reg'||m.t=='login'){const u=String(m.u||'').slice(0,12),d=rd(u);if(!u||u[0]=='_')return tx(c,{t:'err',m:'ชื่อไม่ถูกต้อง'});
if(m.t=='reg'){if(d||String(m.p||'').length<4)return tx(c,{t:'err',m:'ชื่อนี้ถูกใช้แล้ว หรือรหัสสั้นเกินไป'});const s=crypto.randomBytes(16).toString('hex');wr(u,{s,h:hash(m.p,s).toString('hex'),save:null})}
else if(!d||!crypto.timingSafeEqual(hash(m.p||'',d.s),Buffer.from(d.h,'hex')))return tx(c,{t:'err',m:'ชื่อหรือรหัสผ่านไม่ถูกต้อง'});
if([...CS].some(o=>o.u==u))return tx(c,{t:'err',m:'บัญชีนี้ออนไลน์อยู่แล้ว'});
c.u=u;c.id=NID++;tx(c,{t:'ok',id:c.id,u,save:(rd(u)||{}).save,gt:gt()});bc({t:'msg',m:u+' เข้าสู่เกม'},c);return}
if(!c.u)return;const s=c.s;
switch(m.t){
case'st':if(m.s&&typeof m.s=='object')c.s=m.s;break;
case'save':if(m.save&&JSON.stringify(m.save).length<2e5){const d=rd(c.u);if(d){d.save=m.save;wr(c.u,d)}}break;
case'hit':tx(by(m.to),{t:'hit',from:c.id,d:Math.min(+m.d||0,3000)});break;
case'die':die(c,m);break;
case'pinv':tx(by(m.to),{t:'pinv',from:c.id,n:c.u});break;
case'pacc':{const l=by(m.from);if(!l||c.party||l===c)break;const P=l.party||(l.party={ld:l.id,m:[l]});if(P.m.length>=4)break;P.m.push(c);c.party=P;pbc(P);break}
case'pleave':pleave(c);break;
case'dg':case'dgx':if(c.party&&c.party.ld==c.id)c.party.m.forEach(o=>o!==c&&tx(o,m.t=='dg'?{t:'dg',id:m.id,f:m.f}:{t:'dgx'}));break;
case'share':if(c.party)c.party.m.forEach(o=>{if(o!==c&&o.s.sc==s.sc&&Math.hypot(o.s.x-s.x,o.s.y-s.y)<300)tx(o,{t:'sh',gd:Math.floor(Math.min(+m.gd||0,5000)*.7),xp:Math.floor(Math.min(+m.xp||0,5000)*.7)})});break;
case'tinv':tx(by(m.to),{t:'tinv',from:c.id,n:c.u});break;
case'tacc':{const o=by(m.from);if(!o||o.tr||c.tr||o===c)break;c.tr={w:o,off:{it:[],gd:0},ok:0};o.tr={w:c,off:{it:[],gd:0},ok:0};tx(c,{t:'tstart',w:o.id,n:o.u});tx(o,{t:'tstart',w:c.id,n:c.u});break}
case'toff':if(c.tr){c.tr.off={it:(m.it||[]).slice(0,6),gd:Math.max(0,+m.gd||0)};c.tr.ok=0;c.tr.w.tr.ok=0;tx(c.tr.w,{t:'toff',it:c.tr.off.it,gd:c.tr.off.gd})}break;
case'tok':if(c.tr){c.tr.ok=1;trd(c)}break;
case'tx':tcancel(c,'ยกเลิกการแลกเปลี่ยน');break;
case'pq':if(c.am)break;qx(c);c.qm=m.m==3?3:1;Q[c.qm].push(c);arena();break;
case'pqx':qx(c);break;
case'adie':adie(c);break}}
setInterval(()=>{const l=[...CS].filter(c=>c.u).map(c=>({id:c.id,n:c.u,lv:c.s.lv||1,hero:c.s.hero||'w',it:c.s.it||[],ping:c.s.pg||0,pv:c.s.pv||0,b:BT[c.u]||0,sc:c.s.sc})),bt=Object.entries(BT).filter(a=>a[1]>0).sort((a,b)=>b[1]-a[1]).slice(0,5);bc({t:'pl',l,bt})},2000);
setInterval(()=>{const L=[...CS].filter(c=>c.u&&c.s.x!=null);L.forEach(c=>tx(c,{t:'ss',gt:gt(),l:L.filter(o=>o!==c).map(o=>{const s=o.s;return[o.id,o.u,s.x,s.y,s.sc,s.hero,s.lv,s.hp,s.mh,s.mp,s.mm,s.pv,s.a,s.am]})}))},125);
const srv=http.createServer((q,r)=>{let u=q.url.split('?')[0];if(u=='/')u='/index.html';const f=path.join(PUB,path.normalize(u));if(!f.startsWith(PUB)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.writeHead(200);return r.end('WinterMMORPG server online')}r.writeHead(200,{'Content-Type':{'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css'}[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r)});
srv.on('upgrade',(q,sock)=>{const k=q.headers['sec-websocket-key'];if(!k)return sock.destroy();
sock.write('HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: '+crypto.createHash('sha1').update(k+'258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64')+'\r\n\r\n');
const c={sock,s:{},id:0};CS.add(c);let buf=Buffer.alloc(0);
sock.on('data',d=>{buf=Buffer.concat([buf,d]);for(;;){if(buf.length<2)return;let n=buf[1]&127,o=2;if(n==126){if(buf.length<4)return;n=buf.readUInt16BE(2);o=4}else if(n==127){if(buf.length<10)return;n=Number(buf.readBigUInt64BE(2));o=10}const mk=buf[1]&128;if(mk)o+=4;if(n>3e5)return sock.destroy();if(buf.length<o+n)return;const op=buf[0]&15,pl=Buffer.from(buf.slice(o,o+n));if(mk)for(let i=0;i<n;i++)pl[i]^=buf[o-4+(i&3)];buf=buf.slice(o+n);if(op==8)return sock.end();if(op==9)sock.write(Buffer.concat([Buffer.from([0x8a,n]),pl]));if(op==1){try{on(c,JSON.parse(pl.toString()))}catch(e){}}}});
sock.on('close',()=>{CS.delete(c);if(c.u){pleave(c);tcancel(c,'อีกฝ่ายออกจากเกม');adie(c);qx(c);bc({t:'msg',m:c.u+' ออกจากเกม'})}});sock.on('error',()=>{})});
srv.listen(PORT,()=>console.log('WinterMMORPG server: ws://localhost:'+PORT));
