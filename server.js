// WinterMMORPG server — Node 16+, ไม่ต้องติดตั้งแพ็กเกจ: node server.js
const http=require('http'),fs=require('fs'),path=require('path'),crypto=require('crypto');
const ROOT=__dirname,SV=path.join(ROOT,'saves'),PUB=path.join(ROOT,'docs'),PORT=process.env.PORT||8080;fs.mkdirSync(SV,{recursive:true});
const fp=n=>path.join(SV,String(n).slice(0,20).replace(/[^\w\u0E00-\u0E7F]/g,'_')+'.json'),rd=n=>{try{return JSON.parse(fs.readFileSync(fp(n),'utf8'))}catch(e){return null}},wr=(n,d)=>fs.writeFileSync(fp(n),JSON.stringify(d));
const hash=(p,s)=>crypto.scryptSync(String(p),s,32),BT=rd('_bounty')||{},T0=Date.now()/1000-(+process.env.START_T||45),gt=()=>Date.now()/1000-T0,saveB=()=>wr('_bounty',BT);
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
// ===== มอนสเตอร์ส่วนกลาง (เซิร์ฟเวอร์คำนวณ: โลกภายนอก + ห้องดันเจี้ยนแยกตามปาร์ตี้) =====
const TW={x:350,y:220,w:700,h:560},TW2={x:1950,y:1300,w:400,h:300},WW=2800,WH=2000,MT=['imp','wolf','ghoul','wraith','boss'];
const ST=[{t:'imp',hp:40,ar:0,sp:40,d:7,xp:15,gd:14},{t:'wolf',hp:90,ar:15,sp:55,d:12,xp:32,gd:32},{t:'ghoul',hp:170,ar:45,sp:45,d:18,xp:60,gd:70},{t:'wraith',hp:280,ar:90,sp:52,d:26,xp:100,gd:130}];
const DGS={cave:{fl:3,t:1,lv:1,bs:['slam','sum','chg'],rc:'#ff4a2a'},dg2:{fl:4,t:2,lv:1.8,bs:['slam','nova','rain','sum'],rc:'#8ac8ff'},dg3:{fl:5,t:3,lv:2.6,bs:['rain','chg','heal','nova','sum'],rc:'#c0283c'}};
const MON=[],INS={};let MONID=1,bossCyc=-1,tk=0;
const LIST=sc=>sc=='o'?MON:(INS[sc]?INS[sc].mons:null),PL=sc=>[...CS].filter(c=>c.u&&c.s.sc==sc&&c.s.x!=null&&!c.s.am);
const DY=()=>1+(gt()/180|0),dark=()=>Math.max(0,-Math.sin(2*Math.PI*(gt()%180)/180))*.6;
function bio(a,b){if(Math.hypot(a-700,b-500)<780||Math.hypot(a-2150,b-1450)<330)return 0;const u=(a+Math.sin(b/80)*45)/380|0,v=(b+Math.sin(a/80)*45)/380|0;return[0,1,2,3,1,0,2][((u*7+v*13+u*v*5)%7+7)%7]}
const bt=(a,b,d)=>{const t=d<750?0:d<1150?1:d<1650?2:3,k=bio(a,b);return k==2?Math.min(3,t+1):k==3?Math.max(2,t):t};
const inT=(x,y,T,m)=>x>T.x-m&&x<T.x+T.w+m&&y>T.y-m&&y<T.y+T.h+m;
function oT(e,T){const m=14,L=T.x-m,Rr=T.x+T.w+m,Tp=T.y-m,B=T.y+T.h+m;if(e.x>L&&e.x<Rr&&e.y>Tp&&e.y<B){const a=[e.x-L,Rr-e.x,e.y-Tp,B-e.y],i=a.indexOf(Math.min(...a));if(i==0)e.x=L;else if(i==1)e.x=Rr;else if(i==2)e.y=Tp;else e.y=B}}
const base=(e,sc,o)=>Object.assign(e,{id:MONID++,cd:0,sl:0,stun:0,dm:{},sc},o);
function mspawn(){const P=PL('o');let X,Y,n=0;do{X=40+Math.random()*(WW-80);Y=40+Math.random()*(WH-80);n++}while(n<30&&(inT(X,Y,TW,70)||inT(X,Y,TW2,70)||P.some(c=>Math.hypot(c.s.x-X,c.s.y-Y)<250)));
const dd=Math.min(Math.hypot(X-700,Y-500),Math.hypot(X-2150,Y-1450)*1.3),e=Object.assign({x:X,y:Y},ST[bt(X,Y,dd)]),z=dd/700,dm=1+.12*(DY()-1),m=(1+.8*z*z)*dm;
e.mh=e.hp*m|0;e.hp=e.mh;e.d=e.d*(1+.9*z)*dm;e.sp*=Math.min(1.3,1+z*.1);e.xp=e.xp*m|0;e.gd=e.gd*m|0;e.ar=(e.ar||0)*(1+z)+z*10;MON.push(base(e,'o'))}
function insMake(sc){const[id,lid,f]=sc.split('#'),d=DGS[id],F=+f,ld=by(+lid),pm=ld&&ld.party?ld.party.m.length:1,m0=d.lv*(1+.08*(DY()-1))*(1+F*.2)*(1+.4*(pm-1)),I={mons:[],last:Date.now(),cl:0};
for(let i=0;i<4+F+Math.floor(1.5*(pm-1));i++){const e=Object.assign({x:30+Math.random()*260,y:40+Math.random()*110},ST[Math.min(3,d.t+(F>1?1:0))]);e.mh=e.hp*m0|0;e.hp=e.mh;e.d*=.6+.4*m0;e.xp=e.xp*m0|0;e.gd=e.gd*m0|0;I.mons.push(base(e,sc,{el:1}))}
if(F==d.fl){const e=Object.assign({x:160,y:50},ST[3]);e.mh=e.hp*(7+d.lv*3)*(1+.1*(DY()-1))*(1+.6*(pm-1))|0;e.hp=e.mh;e.ar=110;e.d*=1.3+d.lv*.3;e.xp*=4;e.gd*=6;I.mons.push(base(e,sc,{el:1,guard:1,big:1,gk:id,at:3}))}
INS[sc]=I}
function bai(e,dt,P,I){const d=DGS[e.gk];if(!P.length)return;e.at-=dt;const en=e.hp<e.mh*.5,all=t=>P.forEach(c=>tx(c,t));if(en&&!e.en){e.en=1;e.sp*=1.3;e.d*=1.3;all({t:'msg',m:'ผู้พิทักษ์โกรธ!'})}
if(e.cgt>0){e.cgt-=dt;e.x=Math.max(8,Math.min(312,e.x+e.cx*dt));e.y=Math.max(24,Math.min(212,e.y+e.cy*dt));P.forEach(c=>{if(!e.chit&&Math.hypot(c.s.x-e.x,c.s.y-e.y)<14){e.chit=1;tx(c,{t:'md',id:e.id,d:Math.round(e.d*1.4)})}})}
if(e.at>0)return;e.at=en?2:3.5;const T=P[Math.random()*P.length|0],k=d.bs[Math.random()*d.bs.length|0],dz=(x,y,r,tt,dd,c,sl)=>all({t:'dz',x,y,r,tt,d:dd,c,sl});
if(k=='slam')dz(T.s.x,T.s.y,42,1.1,Math.round(e.d*1.5),'#ff4a2a');
else if(k=='rain')for(let i=0;i<5;i++)dz(T.s.x+(Math.random()-.5)*120,T.s.y+(Math.random()-.5)*90,26,1+i*.15,Math.round(e.d),d.rc);
else if(k=='nova')dz(e.x,e.y,80,1,Math.round(e.d*1.2),'#8ac8ff',1);
else if(k=='chg'){const a=Math.atan2(T.s.y-e.y,T.s.x-e.x);e.cgt=.45;e.cx=Math.cos(a)*260;e.cy=Math.sin(a)*260;e.chit=0}
else if(k=='sum'){if(I.mons.filter(z=>z.mn).length<6)for(let i=0;i<2;i++){const m=Object.assign({x:e.x+(Math.random()-.5)*60,y:Math.min(210,e.y+20)},ST[Math.max(0,d.t-1)]);m.mh=m.hp*d.lv*1.5|0;m.hp=m.mh;m.d*=1+d.lv*.3;m.xp=m.xp*d.lv|0;I.mons.push(base(m,e.sc,{mn:1}))}}
else if(k=='heal')e.hp=Math.min(e.mh,e.hp+e.mh*.03)}
function mstep(m,P,dt,nt,ov,I){m.cd-=dt;m.sl-=dt;if(m.guard)bai(m,dt,P,I);if(m.stun>0){m.stun-=dt;return}
let T=null,dm=1e9;const cand=P.map(c=>({x:c.s.x,y:c.s.y,c,v:0}));if(ov)P.forEach(c=>{const v=c.s.vl;if(v&&typeof v.x=='number'&&typeof v.y=='number')cand.push({x:v.x,y:v.y,c,v:1})});
cand.forEach(a=>{const d=Math.hypot(a.x-m.x,a.y-m.y);if(d<dm){dm=d;T=a}});
if(T&&dm<(m.boss||m.guard?400:240)&&dm>10){const s=m.sp*(m.sl>0?.5:1)*dt;m.x+=(T.x-m.x)/dm*s;m.y+=(T.y-m.y)/dm*s;if(ov){oT(m,TW);oT(m,TW2)}else{m.x=Math.max(8,Math.min(312,m.x));m.y=Math.max(24,Math.min(212,m.y))}}
if(T&&dm<14&&m.cd<=0){m.cd=1;const d=Math.round(m.d*(nt?1.3:1));tx(T.c,T.v?{t:'vd',d}:{t:'md',id:m.id,d})}}
function mkill(mo){const L=LIST(mo.sc),i=L?L.indexOf(mo):-1;if(i<0)return;L.splice(i,1);if(mo.boss)bossCyc=gt()/180|0;const now=Date.now(),W=new Map(),near=(c,r)=>c.u&&c.s.sc==mo.sc&&Math.hypot(c.s.x-mo.x,c.s.y-mo.y)<r;
CS.forEach(c=>{if(!near(c,450))return;const t=mo.dm[c.id];if(t&&now-t<15000)W.set(c,c===mo.last?1:.6)});
[...W.keys()].forEach(c=>{if(c.party)c.party.m.forEach(o=>{if(!W.has(o)&&near(o,450))W.set(o,.5)})});
W.forEach((p,c)=>tx(c,{t:'mk',gd:mo.gd,xp:mo.xp,pct:p,mt:mo.t,boss:mo.boss?1:0,k:c===mo.last?1:0}));
CS.forEach(c=>{if(near(c,600))tx(c,{t:'mx',id:mo.id})});if(mo.guard)PL(mo.sc).forEach(c=>tx(c,{t:'dw'}))}
setInterval(()=>{const dt=.05,nt=dark()>.3,cy=gt()/180|0,P=PL('o'),n=MON.filter(m=>!m.boss).length;tk++;
if(P.length&&n<Math.min(120,40+P.length*14)&&(n<20||Math.random()<.06))mspawn();
const bo=MON.find(m=>m.boss);if(nt&&!bo&&bossCyc!=cy&&P.length){const h=900*(1+.1*(DY()-1))|0;MON.push(base({t:'boss',boss:1,x:1250,y:130,hp:h,mh:h,ar:100,sp:48,d:25*(1+.08*(DY()-1)),xp:250,gd:300},'o'))}
if(!nt&&bo)MON.splice(MON.indexOf(bo),1);
MON.forEach(m=>mstep(m,P,dt,nt,1));
const need=new Set();CS.forEach(c=>{if(c.u&&/^(cave|dg2|dg3)#\d+#\d+$/.test(c.s.sc||''))need.add(c.s.sc)});need.forEach(sc=>{if(!INS[sc])insMake(sc);INS[sc].last=Date.now()});
for(const sc in INS){const I=INS[sc],P2=PL(sc);if(Date.now()-I.last>10000){delete INS[sc];continue}I.mons.forEach(m=>mstep(m,P2,dt,0,0,I));if(!I.cl&&!I.mons.some(m=>m.el))I.cl=1;if(I.cl&&tk%40==0)P2.forEach(c=>tx(c,{t:'fc'}))}},50);
setInterval(()=>{CS.forEach(c=>{if(!c.u||c.s.x==null||!c.s.sc)return;const L=c.s.sc=='o'?MON.filter(m=>Math.hypot(m.x-c.s.x,m.y-c.s.y)<520):(INS[c.s.sc]?INS[c.s.sc].mons:null);if(!L)return;tx(c,{t:'ms',l:L.map(m=>[m.id,MT.indexOf(m.t),+m.x.toFixed(1),+m.y.toFixed(1),m.hp|0,m.mh|0,(m.stun>0?1:0)|(m.boss?2:0)|(m.big?4:0),m.ar|0])})})},125);
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
case'fx':if(m.e&&s.sc)CS.forEach(o=>{if(o!==c&&o.u&&o.s.sc==s.sc&&Math.hypot((o.s.x||0)-(s.x||0),(o.s.y||0)-(s.y||0))<700)tx(o,{t:'fx',from:c.id,e:m.e})});break;
case'chat':bc({t:'chat',n:c.u,m:String(m.m||'').slice(0,120)});break;
case'mh':{const mo=(LIST(s.sc)||[]).find(z=>z.id==m.id);if(!mo||Math.hypot(s.x-mo.x,s.y-mo.y)>450)break;mo.hp-=Math.min(Math.max(0,+m.d||0),mo.mh*.8);mo.dm[c.id]=Date.now();mo.last=c;if(mo.hp<=0)mkill(mo);break}
case'cc':{const mo=(LIST(s.sc)||[]).find(z=>z.id==m.id);if(!mo||Math.hypot(s.x-mo.x,s.y-mo.y)>450)break;mo.stun=Math.max(mo.stun,Math.min(+m.st||0,3));mo.sl=Math.max(mo.sl,Math.min(+m.sl||0,3));break}
case'adie':adie(c);break}}
setInterval(()=>{const l=[...CS].filter(c=>c.u).map(c=>({id:c.id,n:c.u,lv:c.s.lv||1,hero:c.s.hero||'w',it:c.s.it||[],ping:c.s.pg||0,pv:c.s.pv||0,b:BT[c.u]||0,sc:c.s.sc})),bt=Object.entries(BT).filter(a=>a[1]>0).sort((a,b)=>b[1]-a[1]).slice(0,5);bc({t:'pl',l,bt})},2000);
setInterval(()=>{const L=[...CS].filter(c=>c.u&&c.s.x!=null);L.forEach(c=>tx(c,{t:'ss',gt:gt(),l:L.filter(o=>o!==c).map(o=>{const s=o.s;return[o.id,o.u,s.x,s.y,s.sc,s.hero,s.lv,s.hp,s.mh,s.mp,s.mm,s.pv,s.a,s.am,s.fl||0]})}))},125);
const srv=http.createServer((q,r)=>{let u=q.url.split('?')[0];if(u=='/')u='/index.html';const f=path.join(PUB,path.normalize(u));if(!f.startsWith(PUB)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.writeHead(200);return r.end('WinterMMORPG server online')}r.writeHead(200,{'Content-Type':{'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css'}[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r)});
srv.on('upgrade',(q,sock)=>{const k=q.headers['sec-websocket-key'];if(!k)return sock.destroy();
sock.write('HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: '+crypto.createHash('sha1').update(k+'258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64')+'\r\n\r\n');
const c={sock,s:{},id:0};CS.add(c);let buf=Buffer.alloc(0);
sock.on('data',d=>{buf=Buffer.concat([buf,d]);for(;;){if(buf.length<2)return;let n=buf[1]&127,o=2;if(n==126){if(buf.length<4)return;n=buf.readUInt16BE(2);o=4}else if(n==127){if(buf.length<10)return;n=Number(buf.readBigUInt64BE(2));o=10}const mk=buf[1]&128;if(mk)o+=4;if(n>3e5)return sock.destroy();if(buf.length<o+n)return;const op=buf[0]&15,pl=Buffer.from(buf.slice(o,o+n));if(mk)for(let i=0;i<n;i++)pl[i]^=buf[o-4+(i&3)];buf=buf.slice(o+n);if(op==8)return sock.end();if(op==9)sock.write(Buffer.concat([Buffer.from([0x8a,n]),pl]));if(op==1){try{on(c,JSON.parse(pl.toString()))}catch(e){}}}});
sock.on('close',()=>{CS.delete(c);if(c.u){pleave(c);tcancel(c,'อีกฝ่ายออกจากเกม');adie(c);qx(c);bc({t:'msg',m:c.u+' ออกจากเกม'})}});sock.on('error',()=>{})});
srv.listen(PORT,()=>console.log('WinterMMORPG server: ws://localhost:'+PORT));
