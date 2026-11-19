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
function trd(c){const o=c.tr.w;if(!(c.tr.ok&&o.tr.ok))return;const okf=(x,y)=>{const f=x.tr.off,h=y.tr.off,it=x.pr.it;return f.gd<=x.pr.gd&&f.it.every(k=>it.includes(k))&&it.length-f.it.length+h.it.length<=6&&h.it.every(k=>!it.includes(k)||f.it.includes(k))};
if(!okf(c,o)||!okf(o,c))return tcancel(c,'แลกเปลี่ยนไม่ผ่านการตรวจ (เงิน/ไอเทม/ช่องไม่พอ)');{const a=c.tr.off,b=o.tr.off;c.pr.gd+=b.gd-a.gd;o.pr.gd+=a.gd-b.gd;c.pr.it=c.pr.it.filter(k=>!a.it.includes(k)).concat(b.it);o.pr.it=o.pr.it.filter(k=>!b.it.includes(k)).concat(a.it);fin(c);fin(o)}tx(c,{t:'tdone',give:c.tr.off,get:o.tr.off});tx(o,{t:'tdone',give:o.tr.off,get:c.tr.off});c.tr=o.tr=null}
function qx(c){for(const k of[1,3])Q[k]=Q[k].filter(o=>o!==c)}
function start(ps){const mt={t:[[],[]]};ps.forEach((c,i)=>{const t=i%2;mt.t[t].push(c);c.am=mt;c.at=t;c.ad=0;tx(c,{t:'am',team:t,sp:{x:ARN.x+30+t*(ARN.w-60),y:ARN.y+60+(mt.t[t].length-1)*50}})})}
function arena(){if(Q[1].length>=2)start(Q[1].splice(0,2));if(Q[3].length>=6)start(Q[3].splice(0,6));else if(Q[3].length>=2&&!q3t)q3t=setTimeout(()=>{q3t=0;if(Q[3].length>=2)start(Q[3].splice(0,6))},10000)}
function aend(mt,w){[...mt.t[0],...mt.t[1]].forEach(o=>{if(o.am===mt){o.am=null;tx(o,{t:'aend',win:w});if(o.at==w){if(o.pr){o.pr.gd+=200;fin(o)}tx(o,{t:'rew',m:'ชนะแมตช์ +200 ทอง'})}}});bc({t:'msg',m:'แมตช์ PvP จบ ทีม '+(w?'น้ำเงิน':'แดง')+' ชนะ'})}
function adie(c){const mt=c.am;if(!mt||c.ad)return;c.ad=1;if(mt.t[c.at].every(o=>o.ad||o.am!==mt))aend(mt,1-c.at)}
function die(c,m){if(m.am||!c.pr)return;const lost=Math.floor(c.pr.gd*BAL.econ.death);c.pr.gd-=lost;fin(c);const b=BT[c.u]||0;BT[c.u]=0;const ks=(m.by||[]).map(by).filter(o=>o&&o!==c&&!o.am&&o.pr);
if(ks.length){const pool=lost+b,sh=Math.floor(pool/ks.length);ks.forEach(k=>{k.pr.gd+=sh;fin(k);BT[k.u]=(BT[k.u]||0)+100+c.pr.lv*20;tx(k,{t:'rew',m:'ปราบ '+c.u+' +'+sh+' ทอง'+(b?' (รวมค่าหัว '+b+')':'')})});bc({t:'msg',m:ks.map(k=>k.u).join(', ')+' ปราบ '+c.u+(b?' รับค่าหัว '+b:'')})}else BT[c.u]=Math.floor(b/2);saveB()}
// ===== มอนสเตอร์ส่วนกลาง (เซิร์ฟเวอร์คำนวณ: โลกภายนอก + ห้องดันเจี้ยนแยกตามปาร์ตี้) =====
const TW={x:350,y:220,w:700,h:560},TW2={x:1950,y:1300,w:400,h:300},TW3={x:3250,y:800,w:400,h:300},TW4={x:1650,y:2450,w:400,h:300},TWS=[TW,TW2,TW3,TW4],WW=4200,WH=3000,MT=['imp','wolf','ghoul','wraith','boss','scorp','mummy','djinn','spider','ape','drake','wboss'];
const ST=[{t:'imp',hp:40,ar:0,sp:40,d:7,xp:15,gd:14},{t:'wolf',hp:90,ar:15,sp:55,d:12,xp:32,gd:32},{t:'ghoul',hp:170,ar:45,sp:45,d:18,xp:60,gd:70},{t:'wraith',hp:280,ar:90,sp:52,d:26,xp:100,gd:130}];
const DGS={cave:{fl:3,t:1,lv:1,bs:['slam','sum','chg'],rc:'#ff4a2a'},dg2:{fl:4,t:2,lv:1.8,bs:['slam','nova','rain','sum'],rc:'#8ac8ff'},dg3:{fl:5,t:3,lv:2.6,bs:['rain','chg','heal','nova','sum'],rc:'#c0283c'}};
const MON=[],INS={},WBT={};let MONID=1,bossCyc=-1,tk=0;
const LIST=sc=>sc=='o'?MON:(INS[sc]?INS[sc].mons:null),PL=sc=>[...CS].filter(c=>c.u&&c.s.sc==sc&&c.s.x!=null&&!c.s.am);
const DY=()=>1+(gt()/180|0),dark=()=>Math.max(0,-Math.sin(2*Math.PI*(gt()%180)/180))*.6;
function bio(a,b){if(Math.hypot(a-700,b-500)<780||Math.hypot(a-2150,b-1450)<330)return 0;if(b>2060+Math.sin(a/90)*40)return 5;if(a>2860+Math.sin(b/90)*40)return 4;const u=(a+Math.sin(b/80)*45)/380|0,v=(b+Math.sin(a/80)*45)/380|0;return[0,1,2,3,1,0,2][((u*7+v*13+u*v*5)%7+7)%7]}
const bt=(a,b,d)=>{const t=d<750?0:d<1150?1:d<1650?2:3,k=bio(a,b);return k==2?Math.min(3,t+1):k==3?Math.max(2,t):t};
const inT=(x,y,T,m)=>x>T.x-m&&x<T.x+T.w+m&&y>T.y-m&&y<T.y+T.h+m;
function oT(e,T){const m=14,L=T.x-m,Rr=T.x+T.w+m,Tp=T.y-m,B=T.y+T.h+m;if(e.x>L&&e.x<Rr&&e.y>Tp&&e.y<B){const a=[e.x-L,Rr-e.x,e.y-Tp,B-e.y],i=a.indexOf(Math.min(...a));if(i==0)e.x=L;else if(i==1)e.x=Rr;else if(i==2)e.y=Tp;else e.y=B}}
const base=(e,sc,o)=>Object.assign(e,{id:MONID++,cd:0,sl:0,stun:0,dm:{},sc},o);
const DD=(X,Y)=>Math.min(Math.hypot(X-700,Y-500),Math.hypot(X-2150,Y-1450)*1.3);
// เกราะ: ใกล้เมืองแทบไม่มี ไกลมากหนาพุ่ง (ปรับได้ที่ balance.json > mon.arm)
const ARM=(a,z)=>{const q=BAL.mon.arm||[1.3,.85,2.6,.9,1.5,8];return a*(1+Math.max(0,z-q[0])*q[1]+Math.max(0,z-q[2])**2*q[3])+Math.max(0,z-q[4])*q[5]};
function mspawn(){const P=PL('o');let X,Y,n=0;do{X=40+Math.random()*(WW-80);Y=40+Math.random()*(WH-80);n++}while(n<30&&(TWS.some(T=>inT(X,Y,T,70))||P.some(c=>Math.hypot(c.s.x-X,c.s.y-Y)<250)));
const dd=DD(X,Y),k=bio(X,Y);let tp=ST[bt(X,Y,dd)];
if(k==4)tp=ST[[4,4,5,6][Math.min(3,Math.max(0,((dd-1500)/650+Math.random()*1.2)|0))]]||tp;
else if(k==5)tp=ST[[7,7,8,9][Math.min(3,Math.max(0,((dd-1400)/650+Math.random()*1.2)|0))]]||tp;
const e=Object.assign({x:X,y:Y,hx:X,hy:Y},tp),z=dd/700,dm=1+BAL.mon.day*(DY()-1),m=(1+BAL.mon.hp*z*z)*dm;
e.mh=e.hp*m|0;e.hp=e.mh;e.d=e.d*(1+BAL.mon.dm*z)*dm;e.sp*=Math.min(1.3,1+z*BAL.mon.spd);e.xp=e.xp*m|0;e.gd=e.gd*m|0;e.ar=ARM(e.ar||0,z);MON.push(base(e,'o'))}
function insMake(sc){const[id,lid,f]=sc.split('#'),d=DGS[id],F=+f,ld=by(+lid),pm=ld&&ld.party?ld.party.m.length:1,m0=d.lv*(1+.08*(DY()-1))*(1+F*.2)*(1+.4*(pm-1)),I={mons:[],last:Date.now(),cl:0};
for(let i=0;i<4+F+Math.floor(1.5*(pm-1));i++){const e=Object.assign({x:30+Math.random()*260,y:40+Math.random()*110},d.mon?(ST[d.mon[Math.random()*d.mon.length|0]]||ST[3]):ST[Math.min(3,d.t+(F>1?1:0))]);e.mh=e.hp*m0|0;e.hp=e.mh;e.d*=.6+.4*m0;e.xp=e.xp*m0|0;e.gd=e.gd*m0|0;I.mons.push(base(e,sc,{el:1}))}
if(F==d.fl){const e=Object.assign({x:160,y:50},ST[3]);e.mh=e.hp*(7+d.lv*3)*(1+.1*(DY()-1))*(1+.6*(pm-1))|0;e.hp=e.mh;e.ar=d.ar||110;e.d*=1.3+d.lv*.3;e.xp*=3;e.gd*=3;I.mons.push(base(e,sc,{el:1,guard:1,big:1,gk:id,at:3}))}
INS[sc]=I}
function bai(e,dt,P,I){const d=DGS[e.gk]||(BAL.wb||{})[e.gk],LM=I?I.mons:MON;if(!P.length)return;e.at-=dt;const en=e.hp<e.mh*.5,all=t=>P.forEach(c=>tx(c,t));if(en&&!e.en){e.en=1;e.sp*=1.3;e.d*=1.3;all({t:'msg',m:e.wb?'บอสคลั่ง!':'ผู้พิทักษ์โกรธ!'})}
if(e.cgt>0){e.cgt-=dt;e.x=e.wb?e.x+e.cx*dt:Math.max(8,Math.min(312,e.x+e.cx*dt));e.y=e.wb?e.y+e.cy*dt:Math.max(24,Math.min(212,e.y+e.cy*dt));P.forEach(c=>{if(!e.chit&&Math.hypot(c.s.x-e.x,c.s.y-e.y)<14){e.chit=1;tx(c,{t:'md',id:e.id,d:Math.round(e.d*1.4)})}})}
if(e.at>0)return;e.at=en?2:3.5;const T=P[Math.random()*P.length|0],k=d.bs[Math.random()*d.bs.length|0],dz=(x,y,r,tt,dd,c,sl)=>all({t:'dz',x,y,r,tt,d:dd,c,sl});
if(k=='slam')dz(T.s.x,T.s.y,42,1.1,Math.round(e.d*1.5),'#ff4a2a');
else if(k=='rain')for(let i=0;i<5;i++)dz(T.s.x+(Math.random()-.5)*120,T.s.y+(Math.random()-.5)*90,26,1+i*.15,Math.round(e.d),d.rc);
else if(k=='nova')dz(e.x,e.y,80,1,Math.round(e.d*1.2),'#8ac8ff',1);
else if(k=='chg'){const a=Math.atan2(T.s.y-e.y,T.s.x-e.x);e.cgt=.45;e.cx=Math.cos(a)*260;e.cy=Math.sin(a)*260;e.chit=0}
else if(k=='sum'){if(LM.filter(z=>z.mn).length<6)for(let i=0;i<2;i++){const m=Object.assign({x:e.x+(Math.random()-.5)*60,y:e.wb?e.y+20:Math.min(210,e.y+20)},ST[d.sm!=null?d.sm:Math.max(0,d.t-1)]);m.mh=m.hp*d.lv*1.5|0;m.hp=m.mh;m.d*=1+d.lv*.3;m.xp=m.xp*d.lv|0;{LM.push(base(m,e.sc,e.wb?{mn:1,hx:m.x,hy:m.y}:{mn:1}))}}}
else if(k=='heal')e.hp=Math.min(e.mh,e.hp+e.mh*.03)}
function mstep(m,P,dt,nt,ov,I){m.cd-=dt;m.sl-=dt;if(m.sw>0)m.sw-=dt;if(m.guard)bai(m,dt,P,I);else if(m.wb&&!m.rt)bai(m,dt,P.filter(c=>Math.hypot(c.s.x-m.x,c.s.y-m.y)<380),null);if(m.stun>0){m.stun-=dt;return}
// LEASH: ถูกลากห่างจุดเกิดเกินระยะ -> หยุดโจมตี เดินกลับจุดเดิมและฟื้น HP (ปรับที่ balance.json > mon.leash)
if(ov&&m.hx!=null){const hd=Math.hypot(m.x-m.hx,m.y-m.hy),LC=BAL.mon.leash||{},lim=m.wb?(LC.wb||520):m.boss?(LC.boss||560):(LC.n||300);if(!m.rt&&hd>lim)m.rt=1;if(m.rt){if(hd>8){const s2=m.sp*1.5*dt;m.x+=(m.hx-m.x)/hd*s2;m.y+=(m.hy-m.y)/hd*s2}else m.rt=0;m.hp=Math.min(m.mh,m.hp+m.mh*.2*dt);return}}
let T=null,dm=1e9;const cand=P.map(c=>({x:c.s.x,y:c.s.y,c,v:0}));if(ov)P.forEach(c=>{const v=c.s.vl;if(v&&typeof v.x=='number'&&typeof v.y=='number')cand.push({x:v.x,y:v.y,c,v:1})});
cand.forEach(a=>{const d=Math.hypot(a.x-m.x,a.y-m.y);if(d<dm){dm=d;T=a}});
if(T&&dm<(m.boss||m.guard||m.wb?400:240)&&dm>10){const s=m.sp*(m.sl>0?.5:1)*(m.sw>0?.75:1)*dt;m.x+=(T.x-m.x)/dm*s;m.y+=(T.y-m.y)/dm*s;if(ov){TWS.forEach(T=>oT(m,T))}else{m.x=Math.max(8,Math.min(312,m.x));m.y=Math.max(24,Math.min(212,m.y))}}
if(T&&dm<14&&m.cd<=0){m.cd=1;const d=Math.round(m.d*(nt?1.3:1));tx(T.c,T.v?{t:'vd',d}:{t:'md',id:m.id,d})}}
function mkill(mo){const L=LIST(mo.sc),i=L?L.indexOf(mo):-1;if(i<0)return;L.splice(i,1);if(mo.boss)bossCyc=gt()/180|0;const now=Date.now(),W=new Map(),near=(c,r)=>c.u&&c.s.sc==mo.sc&&Math.hypot(c.s.x-mo.x,c.s.y-mo.y)<r;
CS.forEach(c=>{if(!near(c,450))return;const t=mo.dm[c.id];if(t&&now-t<15000)W.set(c,c===mo.last?1:.6)});
[...W.keys()].forEach(c=>{if(c.party)c.party.m.forEach(o=>{if(!W.has(o)&&near(o,450))W.set(o,.5)})});
W.forEach((p,c)=>{const pr=c.pr;if(!pr)return;const gd=Math.floor(mo.gd*BAL.econ.gold*p*(1+sm(pr,'gb'))),xp=Math.floor(mo.xp*(BAL.xp.mul||1)*p);pr.gd+=gd;addXp(pr,xp);const q=pr.q;if(q&&!q.done){const s=BAL.quests[q.id];if(s&&((s.k=='kill'&&!mo.boss&&(!s.t||s.t==mo.t))||(s.k=='boss'&&mo.boss))&&++q.pr>=(s.need||1))q.done=1}if(c===mo.last&&Math.random()<.25){const i=Math.random()<.5?0:1;if(pr.pot[i]<BAL.econ.potMax)pr.pot[i]++}fin(c);tx(c,{t:'mk',gd,xp,pct:p,mt:mo.t,boss:mo.boss?1:0,k:c===mo.last?1:0})});
CS.forEach(c=>{if(near(c,600))tx(c,{t:'mx',id:mo.id})});if(mo.guard)dgReward(mo);if(mo.wb)wbReward(mo,W)}
setInterval(()=>{const dt=.05,nt=dark()>.3,cy=gt()/180|0,P=PL('o'),n=MON.filter(m=>!m.boss&&!m.wb&&!m.mn).length;tk++;
if(P.length&&n<Math.min(200,70+P.length*14)&&(n<35||Math.random()<.06))mspawn();if(P.length)for(const k in(BAL.wb||{})){if(MON.some(m=>m.wb==k))continue;if((WBT[k]||0)<=gt())wbSpawn(k)}
const bo=MON.find(m=>m.boss);if(nt&&!bo&&bossCyc!=cy&&P.length){const h=900*(1+.1*(DY()-1))|0;MON.push(base({t:'boss',boss:1,x:1250,y:130,hp:h,mh:h,ar:100,sp:48,d:25*(1+.08*(DY()-1)),xp:250,gd:300},'o'))}
if(!nt&&bo)MON.splice(MON.indexOf(bo),1);
MON.forEach(m=>mstep(m,P,dt,nt,1));
const DGRE=new RegExp('^('+Object.keys(DGS).join('|')+')#\\d+#\\d+$'),need=new Set();CS.forEach(c=>{if(c.u&&DGRE.test(c.s.sc||''))need.add(c.s.sc)});need.forEach(sc=>{if(!INS[sc])insMake(sc);INS[sc].last=Date.now()});
for(const sc in INS){const I=INS[sc],P2=PL(sc);if(Date.now()-I.last>10000){delete INS[sc];continue}I.mons.forEach(m=>mstep(m,P2,dt,0,0,I));if(!I.cl&&!I.mons.some(m=>m.el))I.cl=1;if(I.cl&&tk%40==0)P2.forEach(c=>tx(c,{t:'fc'}))}},50);
setInterval(()=>{CS.forEach(c=>{if(!c.u||c.s.x==null||!c.s.sc)return;const L=c.s.sc=='o'?MON.filter(m=>Math.hypot(m.x-c.s.x,m.y-c.s.y)<520):(INS[c.s.sc]?INS[c.s.sc].mons:null);if(!L)return;tx(c,{t:'ms',l:L.map(m=>[m.id,MT.indexOf(m.t),+m.x.toFixed(1),+m.y.toFixed(1),m.hp|0,m.mh|0,(m.stun>0?1:0)|(m.boss?2:0)|(m.big?4:0)|(m.wb?8:0),m.ar|0,m.wb||0])})})},125);
// ===== ข้อมูลบาลานซ์ + โปรไฟล์ผู้เล่นฝั่งเซิร์ฟเวอร์ (ทอง/EXP/ไอเทม/เลเวลตัดสินที่นี่) =====
const BF=path.join(ROOT,'data','balance.json');let BAL={};
function loadBal(){try{const n=JSON.parse(fs.readFileSync(BF,'utf8')),first=!BAL.version;BAL=n;ST.length=0;ST.push(...n.mon.st);for(const k in n.dg)DGS[k]=n.dg[k];if(!first)bc({t:'data',d:BAL});console.log('โหลด balance.json แล้ว')}catch(e){console.log('balance.json ผิดพลาด:',e.message)}}
loadBal();fs.watchFile(BF,{interval:1500},loadBal);
const HEROS=['w','k','h','e','d','n','g','p'],sm=(pr,k)=>pr.it.reduce((a,i)=>a+((((BAL.items[i]||[])[5])||{})[k]||0),0);
const newProf=h=>({hero:HEROS.includes(h)?h:'w',lv:1,xp:0,sp:0,sk:[1,1,1],gd:50,it:[],pot:[3,2],q:null});
function migr(p){if(!p||typeof p!='object')return null;const n=x=>Math.max(0,x|0);return{hero:HEROS.includes(p.hero)?p.hero:'w',lv:Math.min(100,Math.max(1,p.lv|0)),xp:n(p.xp),sp:n(p.sp),sk:(p.sk||[1,1,1]).slice(0,3).map(x=>Math.max(1,x|0)),gd:n(p.gd),it:(p.it||[]).filter(k=>BAL.items[k]).slice(0,6),pot:[Math.min(BAL.econ.potMax,n((p.pot||[])[0])),Math.min(BAL.econ.potMax,n((p.pot||[])[1]))],q:p.q&&BAL.quests[p.q.id]?{id:p.q.id|0,pr:n(p.q.pr),done:p.q.done?1:0,src:p.q.src}:null}}
const addXp=(pr,v)=>{pr.xp+=v;while(pr.xp>=pr.lv*BAL.xp.base){pr.xp-=pr.lv*BAL.xp.base;pr.lv++;pr.sp++}};
const sendP=c=>c.pr&&tx(c,{t:'prof',p:c.pr}),fin=c=>{c.dirty=1;sendP(c)},bad=(c,m)=>tx(c,{t:'er',m});
const saveP=c=>{if(!c.pr)return;const d=rd(c.u);if(d){d.prof=c.pr;wr(c.u,d)}};
setInterval(()=>CS.forEach(c=>{if(c.u&&c.dirty){c.dirty=0;saveP(c)}}),5000);
function dcap(c){const pr=c.pr,h=BAL.hero[pr.hero]||{},A=(12+pr.lv*3+sm(pr,'atk'))*(h.atk||1)*1.25;return A*(1+sm(pr,'ap'))*(1+.15*(Math.max(...pr.sk)-1))*1.6*(1+sm(pr,'ex'))*4*(BAL.cap.slack||1.5)*Math.max(1,...(h.s||[]).map(x=>x.d||1))*(h.cap||1)}
function hitOK(c,d){const t=Date.now(),b=c.hb||(c.hb={t,n:0,d:0});if(t-b.t>1000){b.t=t;b.n=0;b.d=0}b.n++;b.d+=d;return b.n<=BAL.cap.hps&&b.d<=dcap(c)*BAL.cap.budget}
const NPCP={courier:[2115,1376],hermit:[1885,366],cab:[1900,350],t2:[2115,1376],church:[700,296],courier3:[3415,876],courier4:[1815,2526],t3:[3415,876],t4:[1815,2526]};
const near=(c,x,y,r)=>c.s.sc=='o'&&Math.hypot(c.s.x-x,c.s.y-y)<r;
const houseP=src=>{const a=String(src||'').split(',').map(Number);return a.length==2&&a.every(Number.isFinite)?[a[0]+25,a[1]+46]:null};
// ===== ลูท: ทอยเลเจนด์ / ธรรมดา / เล็ก / เงิน+EXP (ปรับที่ balance.json > loot) =====
const TIERK=k=>{const t=BAL.items[k]||[];return t[6]?2:(t[2]|0)>=900?1:0},TN=['ไอเทมเล็ก','ไอเทมธรรมดา','ไอเทมเลเจนด์'];
function lootRoll(pr,pool,lv,boost){const LT=BAL.loot||{},own=k=>pr.it.includes(k),all=Object.keys(BAL.items),pk=a=>a.length?a[Math.random()*a.length|0]:null,
free=t=>all.filter(k=>TIERK(k)==t&&!own(k)&&!BAL.items[k][7]),lg=(pool||[]).filter(k=>BAL.items[k]&&!own(k)),
lc=Math.min(LT.legMax||.22,(LT.leg||.05)+(LT.legPer||.025)*lv)*(boost||1),nm=LT.norm||.22,sm2=LT.small||.26,r=Math.random();let k=null,t=-1;
if(r<lc){k=pk(lg);t=2}else if(r<lc+nm){k=pk(free(1));t=1}else if(r<lc+nm+sm2){k=pk(free(0));t=0}
if(k&&pr.it.length<6){pr.it.push(k);return TN[t]+': '+BAL.items[k][3]+BAL.items[k][0]}
if(k){const v=BAL.items[k][2]*.5|0;pr.gd+=v;return 'กระเป๋าเต็ม แปลงเป็น '+v+' ทอง'}
const gd=(LT.cashGold||250)*lv|0,xp=(LT.cashXp||200)*lv|0;pr.gd+=gd;addXp(pr,xp);return 'เงิน '+gd+' ทอง + EXP '+xp}
function dgReward(mo){const d=DGS[mo.gk],LT=BAL.loot||{};PL(mo.sc).forEach(c=>{const pr=c.pr;if(!pr)return;const m=lootRoll(pr,d.pool,d.lv,1);pr.gd+=(LT.baseGold||150)*d.lv|0;addXp(pr,(LT.baseXp||120)*d.lv|0);fin(c);tx(c,{t:'dw',m:'ชนะผู้พิทักษ์! '+m})})}
// ===== บอสประจำไบโอม (balance.json > wb) เกิดที่รังตลอด ตายแล้วเกิดใหม่ตาม respawn วินาที =====
function wbSpawn(k){const b=BAL.wb[k],dm=1+.1*(DY()-1),h=Math.floor(b.hp*dm);WBT[k]=1e12;MON.push(base({t:'wboss',wb:k,big:1,gk:k,x:b.x,y:b.y,hx:b.x,hy:b.y,hp:h,mh:h,ar:b.ar,sp:b.sp,d:b.d*dm,xp:b.xp,gd:b.gd,at:3},'o'))}
function wbReward(mo,W){const b=(BAL.wb||{})[mo.wb];if(!b)return;WBT[mo.wb]=gt()+(b.respawn||420);for(let i=MON.length-1;i>=0;i--)if(MON[i].mn)MON.splice(i,1);const LT=BAL.loot||{};
W.forEach((p,c)=>{const pr=c.pr;if(!pr)return;const m=lootRoll(pr,b.pool,b.lv,1.5);pr.gd+=Math.floor((LT.baseGold||150)*1.3*b.lv*p);addXp(pr,Math.floor((LT.baseXp||120)*1.3*b.lv*p));fin(c);tx(c,{t:'rew',m:'ล้มบอส '+b.n+'! '+m})});bc({t:'msg',m:'บอส '+b.n+' ถูกปราบแล้ว'})}
function on(c,m){
if(m.t=='ping')return tx(c,{t:'pong',n:m.n});
if(m.t=='reg'||m.t=='login'){const u=String(m.u||'').slice(0,12),d=rd(u);if(!u||u[0]=='_')return tx(c,{t:'err',m:'ชื่อไม่ถูกต้อง'});
if(m.t=='reg'){if(d||String(m.p||'').length<4)return tx(c,{t:'err',m:'ชื่อนี้ถูกใช้แล้ว หรือรหัสสั้นเกินไป'});const s=crypto.randomBytes(16).toString('hex');wr(u,{s,h:hash(m.p,s).toString('hex'),save:null})}
else if(!d||!crypto.timingSafeEqual(hash(m.p||'',d.s),Buffer.from(d.h,'hex')))return tx(c,{t:'err',m:'ชื่อหรือรหัสผ่านไม่ถูกต้อง'});
if([...CS].some(o=>o.u==u))return tx(c,{t:'err',m:'บัญชีนี้ออนไลน์อยู่แล้ว'});
{const dd=rd(u)||{};c.pr=dd.prof||migr(dd.save&&dd.save.p);if(c.pr&&!dd.prof){dd.prof=c.pr;wr(u,dd)}c.u=u;c.id=NID++;tx(c,{t:'data',d:BAL});tx(c,{t:'ok',id:c.id,u,save:dd.save,prof:c.pr,gt:gt()})}bc({t:'msg',m:u+' เข้าสู่เกม'},c);return}
if(!c.u)return;const s=c.s;
switch(m.t){
case'st':if(m.s&&typeof m.s=='object'){c.s=m.s;if(c.pr)Object.assign(c.s,{lv:c.pr.lv,hero:c.pr.hero,it:c.pr.it,gd:c.pr.gd})}break;
case'save':if(m.save&&JSON.stringify(m.save).length<2e5){const d=rd(c.u);if(d){const sp=m.save.p||{};['gd','xp','lv','sp','sk','it','pot','hero','q'].forEach(k=>delete sp[k]);d.save=m.save;if(c.pr)d.prof=c.pr;wr(c.u,d)}}break;
case'die':die(c,m);break;
case'pinv':tx(by(m.to),{t:'pinv',from:c.id,n:c.u});break;
case'pacc':{const l=by(m.from);if(!l||c.party||l===c)break;const P=l.party||(l.party={ld:l.id,m:[l]});if(P.m.length>=4)break;P.m.push(c);c.party=P;pbc(P);break}
case'pleave':pleave(c);break;
case'dg':case'dgx':if(c.party&&c.party.ld==c.id)c.party.m.forEach(o=>o!==c&&tx(o,m.t=='dg'?{t:'dg',id:m.id,f:m.f}:{t:'dgx'}));break;
case'tinv':tx(by(m.to),{t:'tinv',from:c.id,n:c.u});break;
case'tacc':{const o=by(m.from);if(!o||o.tr||c.tr||o===c)break;c.tr={w:o,off:{it:[],gd:0},ok:0};o.tr={w:c,off:{it:[],gd:0},ok:0};tx(c,{t:'tstart',w:o.id,n:o.u});tx(o,{t:'tstart',w:c.id,n:c.u});break}
case'toff':if(c.tr){c.tr.off={it:(m.it||[]).slice(0,6),gd:Math.max(0,+m.gd||0)};c.tr.ok=0;c.tr.w.tr.ok=0;tx(c.tr.w,{t:'toff',it:c.tr.off.it,gd:c.tr.off.gd})}break;
case'tok':if(c.tr){c.tr.ok=1;trd(c)}break;
case'tx':tcancel(c,'ยกเลิกการแลกเปลี่ยน');break;
case'pq':if(c.am)break;qx(c);c.qm=m.m==3?3:1;Q[c.qm].push(c);arena();break;
case'pqx':qx(c);break;
case'fx':if(m.e&&s.sc)CS.forEach(o=>{if(o!==c&&o.u&&o.s.sc==s.sc&&Math.hypot((o.s.x||0)-(s.x||0),(o.s.y||0)-(s.y||0))<700)tx(o,{t:'fx',from:c.id,e:m.e})});break;
case'chat':bc({t:'chat',n:c.u,m:String(m.m||'').slice(0,120)});break;
case'cc':{const mo=(LIST(s.sc)||[]).find(z=>z.id==m.id);if(!mo||Math.hypot(s.x-mo.x,s.y-mo.y)>450)break;mo.stun=Math.max(mo.stun,Math.min(+m.st||0,3));mo.sl=Math.max(mo.sl,Math.min(+m.sl||0,3));mo.sw=Math.max(mo.sw||0,Math.min(+m.sw||0,3));break}
case'hero':if(c.pr)break;c.pr=newProf(m.h);fin(c);break;
case'buy':{const t=BAL.items[m.k],p=c.pr;if(!p||!t)break;if(s.sc!='market')return bad(c,'ต้องอยู่ในร้านตลาด');if(p.it.includes(m.k))return bad(c,'มีแล้ว');if(t[7])return bad(c,'ไอเทมนี้ได้จากดรอปเท่านั้น');if(p.it.length>=6)return bad(c,'ช่องไอเทมเต็ม ไปขายที่กระเป๋าก่อน');if(p.gd<t[2])return bad(c,'เงินไม่พอ');p.gd-=t[2];p.it.push(m.k);fin(c);break}
case'buyp':{const p=c.pr,i=m.i==1?1:0;if(!p)break;if(s.sc!='market')return bad(c,'ต้องอยู่ในร้านตลาด');if(p.pot[i]>=BAL.econ.potMax)return bad(c,'ถือได้สูงสุด '+BAL.econ.potMax+' ชิ้น');if(p.gd<BAL.econ.pot)return bad(c,'เงินไม่พอ');p.gd-=BAL.econ.pot;p.pot[i]++;fin(c);break}
case'sell':{const p=c.pr,i=p?p.it.indexOf(m.k):-1;if(i<0)break;p.gd+=Math.floor(BAL.items[m.k][2]*BAL.econ.sell);p.it.splice(i,1);fin(c);break}
case'usep':{const p=c.pr,i=m.i==1?1:0;if(!p||p.pot[i]<1)break;p.pot[i]--;fin(c);break}
case'inn':{const p=c.pr;if(!p)break;if(s.sc!='inn')return bad(c,'ต้องอยู่ในโรงเตี๊ยม');if(p.gd<BAL.econ.inn)return bad(c,'เงินไม่พอ');p.gd-=BAL.econ.inn;fin(c);tx(c,{t:'ack',a:'inn'});break}
case'train':{const p=c.pr;if(!p)break;if(s.sc!='barracks')return bad(c,'ต้องอยู่ในโรงอัศวิน');if(p.gd<BAL.econ.train)return bad(c,'เงินไม่พอ');p.gd-=BAL.econ.train;addXp(p,40);fin(c);break}
case'swap':{const p=c.pr;if(!p||!HEROS.includes(m.h))break;if(!near(c,NPCP.church[0],NPCP.church[1],150))return bad(c,'ต้องอยู่ใกล้โบสถ์');if(p.gd<BAL.econ.swap)return bad(c,'ต้องใช้ '+BAL.econ.swap+' ทอง');p.gd-=BAL.econ.swap;p.sp+=p.sk.reduce((a,v)=>a+v-1,0);p.sk=[1,1,1];p.hero=m.h;fin(c);tx(c,{t:'ack',a:'swap'});break}
case'sk':{const p=c.pr,i=m.i|0;if(!p||p.sp<1||i<0||i>2)break;p.sp--;p.sk[i]++;fin(c);break}
case'qa':{const p=c.pr,q=BAL.quests[m.id|0];if(!p||!q||p.q)break;if(q.c==3){const h=houseP(m.src);if(!h||!near(c,h[0],h[1],150))return bad(c,'ต้องอยู่ใกล้บ้านชาวบ้านคนนั้น');p.q={id:m.id|0,pr:0,done:0,src:m.src}}else{if(s.sc!='guild')return bad(c,'ต้องรับเควสที่กิลด์');p.q={id:m.id|0,pr:0,done:0}}fin(c);break}
case'qx':if(c.pr&&c.pr.q){c.pr.q=null;fin(c)}break;
case'qd':{const p=c.pr,q=p&&p.q,t=q&&BAL.quests[q.id];if(!q||q.done)break;let ok=0;
if(NPCP[m.w]&&m.w!='cab'&&!/^t\d$/.test(m.w)&&t.k=='dlv'&&t.to==m.w)ok=near(c,NPCP[m.w][0],NPCP[m.w][1],120);
else if(m.w=='esc'&&t.k=='esc'){const v=s.vl,d=NPCP[t.dest];ok=v&&d&&s.sc=='o'&&Math.hypot(v.x-d[0],v.y-d[1])<80}
else if(m.w=='pay'&&t.k=='pay'&&p.pot[0]>=3){const h=houseP(q.src);if(h&&near(c,h[0],h[1],150)){p.pot[0]-=3;ok=1}}
if(ok){q.done=1;fin(c)}else bad(c,'ยังไม่ถึงเงื่อนไขของเควส');break}
case'qc':{const p=c.pr,q=p&&p.q,t=q&&BAL.quests[q.id];if(!q||!q.done)break;if(t.c==3){const h=houseP(q.src);if(!h||!near(c,h[0],h[1],150))return bad(c,'ต้องกลับไปหาชาวบ้านคนนั้น')}else if(s.sc!='guild')return bad(c,'ต้องกลับไปรับรางวัลที่กิลด์');p.gd+=t.gold;addXp(p,t.xp);p.q=null;fin(c);break}
case'hit':{const o=by(m.to);if(!o||!c.pr)break;const safe=x=>TWS.some(T=>inT(x.s.x,x.s.y,T,10)),ok=c.s.sc==o.s.sc&&Math.hypot(c.s.x-o.s.x,c.s.y-o.s.y)<450&&((c.s.am&&o.s.am&&c.s.am!=o.s.am)||(!c.s.am&&!o.s.am&&c.s.pv&&o.s.pv&&c.s.sc=='o'&&!safe(c)&&!safe(o)));if(!ok)break;const d=Math.min(Math.max(0,+m.d||0),dcap(c));if(!hitOK(c,d))break;tx(o,{t:'hit',from:c.id,d});break}
case'mh':{const mo=(LIST(s.sc)||[]).find(z=>z.id==m.id);if(!mo||!c.pr||Math.hypot(s.x-mo.x,s.y-mo.y)>450)break;let cap=dcap(c);if(c.pr.hero=='w'&&(+m.d||0)>cap&&Date.now()-(c.xt||0)>6000){c.xt=Date.now();cap=Math.max(cap,mo.mh*.8)}const d=Math.min(Math.max(0,+m.d||0),cap,mo.mh*.8);if(!hitOK(c,d))break;mo.hp-=d;mo.dm[c.id]=Date.now();mo.last=c;if(mo.hp<=0)mkill(mo);break}
case'adie':adie(c);break}}
setInterval(()=>{const l=[...CS].filter(c=>c.u).map(c=>({id:c.id,n:c.u,lv:c.s.lv||1,hero:c.s.hero||'w',it:c.s.it||[],ping:c.s.pg||0,pv:c.s.pv||0,b:BT[c.u]||0,sc:c.s.sc})),bt=Object.entries(BT).filter(a=>a[1]>0).sort((a,b)=>b[1]-a[1]).slice(0,5);bc({t:'pl',l,bt})},2000);
setInterval(()=>{const L=[...CS].filter(c=>c.u&&c.s.x!=null);L.forEach(c=>tx(c,{t:'ss',gt:gt(),l:L.filter(o=>o!==c).map(o=>{const s=o.s;return[o.id,o.u,s.x,s.y,s.sc,s.hero,s.lv,s.hp,s.mh,s.mp,s.mm,s.pv,s.a,s.am,s.fl||0]})}))},125);
const srv=http.createServer((q,r)=>{let u=q.url.split('?')[0];if(u=='/')u='/index.html';const f=path.join(PUB,path.normalize(u));if(!f.startsWith(PUB)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.writeHead(200);return r.end('WinterMMORPG server online')}r.writeHead(200,{'Content-Type':{'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css'}[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r)});
srv.on('upgrade',(q,sock)=>{const k=q.headers['sec-websocket-key'];if(!k)return sock.destroy();
sock.write('HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: '+crypto.createHash('sha1').update(k+'258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64')+'\r\n\r\n');
const c={sock,s:{},id:0};CS.add(c);let buf=Buffer.alloc(0);
sock.on('data',d=>{buf=Buffer.concat([buf,d]);for(;;){if(buf.length<2)return;let n=buf[1]&127,o=2;if(n==126){if(buf.length<4)return;n=buf.readUInt16BE(2);o=4}else if(n==127){if(buf.length<10)return;n=Number(buf.readBigUInt64BE(2));o=10}const mk=buf[1]&128;if(mk)o+=4;if(n>3e5)return sock.destroy();if(buf.length<o+n)return;const op=buf[0]&15,pl=Buffer.from(buf.slice(o,o+n));if(mk)for(let i=0;i<n;i++)pl[i]^=buf[o-4+(i&3)];buf=buf.slice(o+n);if(op==8)return sock.end();if(op==9)sock.write(Buffer.concat([Buffer.from([0x8a,n]),pl]));if(op==1){try{on(c,JSON.parse(pl.toString()))}catch(e){}}}});
sock.on('close',()=>{CS.delete(c);if(c.u){saveP(c);pleave(c);tcancel(c,'อีกฝ่ายออกจากเกม');adie(c);qx(c);bc({t:'msg',m:c.u+' ออกจากเกม'})}});sock.on('error',()=>{})});
srv.listen(PORT,()=>console.log('WinterMMORPG server: ws://localhost:'+PORT));
