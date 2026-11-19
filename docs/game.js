const $=i=>document.getElementById(i),cv=$('c'),x=cv.getContext('2d'),mx2=$('mm').getContext('2d'),M=Math,R=M.random,PI=M.PI;
let W,H,S,g=null,me='',K={},jx=0,jy=0,fl=[],pr=[],tm=[],hs=[],ah=0,cx=0,cy=0,sf=[],lastS='';
const WW=4200,WH=3000,TW={x:350,y:220,w:700,h:560},LAIR={x:1250,y:110},DG={x:60,y:780,w:240,h:180},CAB={x:1900,y:350},TW2={x:1950,y:1300,w:400,h:300},T2C={x:2115,y:1376},TW3={x:3250,y:800,w:400,h:300,c:'#d8c48e'},T3C={x:3415,y:876},TW4={x:1650,y:2450,w:400,h:300,c:'#6f8a5a'},T4C={x:1815,y:2526},TWS=[TW,TW2,TW3,TW4],DEST={t2:T2C,t3:T3C,t4:T4C};
const IT={ar:['เกราะหิมะ','+80 HP ลดดาเมจรับ 4%',200,'🛡',0,{hp:80,def:.04}],a2:['เสื้อเกราะเหล็ก','+50 HP ลดดาเมจรับ 8%',350,'🦺',0,{hp:50,def:.08}],a3:['เกราะปีศาจหนาม','+300 HP ลดดาเมจรับ 18%',2800,'👹',0,{hp:300,def:.18,th:.15},'หนามสะท้อน: สะท้อนดาเมจที่ได้รับ 15% กลับไปหาศัตรู'],a4:['โล่น้ำแข็งนิรันดร์','+200 HP ลดดาเมจรับ 28%',3600,'🧊',0,{hp:200,def:.28,rg:3},'น้ำแข็งฟื้นฟู: ฟื้นเลือด 3 ต่อวินาที'],
sw:['ดาบเลือด','+10 โจมตี',250,'⚔',1,{atk:10}],p2:['ขวานปีศาจ','+16 โจมตี',400,'🪓',1,{atk:16}],p3:['มีดปาเงิน','ตีเร็ว +12% คริติคอล +4%',300,'🔪',1,{as:.12,crit:.04}],p5:['ปลายหอกเจาะเกราะ','เจาะเกราะ 25 โจมตี +5',450,'🔱',1,{pen:25,atk:5}],p4:['ดาบล่าปีศาจ','+55 โจมตี เจาะเกราะ 25',3200,'🗡',1,{atk:55,pen:25,ex:.2},'ปลิดชีพ: ดาเมจ +20% ต่อศัตรูที่ HP ต่ำกว่า 30%'],
ri:['แหวนมานา','+50 MP',200,'💍',2,{mp:50}],m4:['สร้อยมานา','ฟื้นมานา +4 ต่อ 5 วิ',350,'📿',2,{mr:4}],m2:['คทาน้ำแข็ง','พลังสกิล +10%',450,'🪄',2,{ap:.1}],m5:['หินทะลวงเวท','เจาะเกราะ 50 พลังสกิล +20%',2400,'💠',2,{pen:50,ap:.2,mr:6},'พลังไหล: ฟื้นมานา +6 ต่อ 5 วิ'],m3:['คัมภีร์โลหิต','พลังสกิล +45% +120 MP คริติคอล +6%',3600,'📕',2,{ap:.45,mp:120,crit:.06,ls:.06},'โลหิตเวท: ดูดเลือดเพิ่ม 6%'],
bo:['รองเท้าขน','เดิน +14',220,'👢',3,{spd:14}],sc:['ผ้าพันคอแดง','ดูดเลือด +10%',300,'🧣',3,{ls:.1}],am:['เครื่องรางน้ำเงิน','ลดคูลดาวน์ 10%',380,'🔮',3,{cd:.1}],x4:['ตุ้มหูหิมะ','เดิน +8 ดูดเลือด +4%',260,'❄',3,{spd:8,ls:.04}],x5:['แหวนนักล่า','คริติคอล +8%',320,'🎯',3,{crit:.08}],x7:['จี้โชคลาภ','ทองจากมอนสเตอร์ +10% คริ +3%',500,'🍀',3,{gb:.1,crit:.03}],x6:['มงกุฎโลหิตกษัตริย์','+30 โจมตี +250 HP ลดคูลดาวน์ 20% คริ +15%',4000,'👑',3,{atk:30,hp:250,cd:.2,crit:.15,gb:.25},'บรรณาการ: ทองจากมอนสเตอร์ +25%']};
const QS=[{c:0,n:'ปราบมอนสเตอร์ 5 ตัว',k:'kill',need:5,gold:120,xp:80},{c:1,n:'ส่งพัสดุไปเมืองเฟรย์ฮอล์ม',k:'dlv',gold:300,xp:120,to:'courier'},{c:0,n:'ล่าปีศาจโลหิต (ออกตอนกลางคืน)',k:'boss',need:1,gold:500,xp:250},{c:2,n:'คุ้มกันชาวบ้านไปกระท่อมป่า',k:'esc',gold:260,xp:150,dest:'cab'},{c:0,n:'ล่าหมาป่า 6 ตัว',k:'kill',t:'wolf',need:6,gold:260,xp:150},{c:0,n:'ล่าผีดิบ 4 ตัว',k:'kill',t:'ghoul',need:4,gold:520,xp:300},{c:1,n:'ส่งจดหมายถึงกระท่อมป่า',k:'dlv',gold:240,xp:100,to:'hermit'},{c:2,n:'คุ้มกันพ่อค้าไปเมืองเฟรย์ฮอล์ม',k:'esc',gold:600,xp:350,dest:'t2'}];
const BD=[['guild','กิลด์',400,260,'#7a4a2a','📜'],['church','โบสถ์',675,250,'#7a7a9a','⛪'],['market','ตลาด',950,260,'#2f7a4a','🛒'],['house','บ้านชาวเมือง',400,420,'#8a6a3a','🏠'],['house','บ้านชาวเมือง',950,420,'#6a5a8a','🏠'],['barracks','โรงอัศวิน',400,600,'#3a4a8a','🛡'],['inn','โรงเตี้ยม',950,600,'#8a3a3a','🛏'],['house','บ้านชาวเมือง',520,690,'#7a6a4a','🏠'],['house','บ้านชาวเมือง',830,690,'#5a7a6a','🏠'],['cave','ถ้ำปีศาจ',1226,150,'#3a2a3a','🕳'],['courier','ผู้ส่งสาร',2090,1330,'#4a6a8a','📮'],['market','ตลาดเฟรย์',1990,1330,'#2f7a4a','🛒'],['inn','โรงเตี้ยมเฟรย์',2250,1330,'#8a3a3a','🛏'],['house','บ้านชาวเมือง',1990,1470,'#7a6a4a','🏠'],['house','บ้านชาวเมือง',2250,1470,'#5a7a6a','🏠'],['hermit','กระท่อมชาวป่า',1860,320,'#5a4a3a','🏚'],['dg2','สุสานน้ำแข็ง',600,1650,'#3a4a6a','⚰'],['dg3','ป้อมโลหิตร้าง',2400,650,'#5a2a32','🏰'],['arena','สนามประลอง PvP',1480,780,'#6a2a2a','⚔'],
['market','ตลาดโอเอซิส',3290,830,'#c9953a','🛒'],['courier3','ผู้ส่งสาร โอเอซิส',3390,830,'#4a6a8a','📮'],['inn','โรงเตี้ยมโอเอซิส',3550,830,'#a0522d','🛏'],['guild','กิลด์สาขาโอเอซิส',3420,970,'#7a4a2a','📜'],['house','บ้านชาวทราย',3290,970,'#b8873a','🏠'],['house','บ้านชาวทราย',3550,970,'#a8773a','🏠'],
['market','ตลาดรากพฤกษ์',1690,2480,'#3a7a3a','🛒'],['courier4','ผู้ส่งสาร รากพฤกษ์',1790,2480,'#4a6a8a','📮'],['inn','โรงเตี้ยมรากพฤกษ์',1950,2480,'#5a7a2a','🛏'],['guild','กิลด์สาขารากพฤกษ์',1820,2620,'#7a4a2a','📜'],['house','บ้านชาวป่า',1690,2620,'#4a6a3a','🏠'],['house','บ้านชาวป่า',1950,2620,'#5a6a3a','🏠'],
['dg4','สุสานฟาโรห์ทราย',3800,450,'#8a6a2a','🔺'],['dg5','วิหารรากโบราณ',3000,2750,'#2a5a3a','🌿'],['dg6','เหมืองน้ำแข็งร้าง',1500,1150,'#3a5a7a','⛏'],['dg7','หอคอยสายฟ้า',2650,1000,'#5a4a8a','⚡']];
const SN=[['Dragger Swings','Platelets Shatter','⚔','🩸'],['Dragger Waves','Scythe Song','🌊','🌀'],['Cross Snap','Bloody Execution','❄','☠']];
const COL={r:'#ff4040',b:'#4aa3ff',y:'#ffe14a',d:'#7a0016',v:'#ff3a5a',w:'#9fdcff'};
const sm=k=>g.p.it.reduce((a,i)=>a+(IT[i][5][k]||0),0),AT=()=>(12+g.p.lv*3+sm('atk'))*(g.p.bf&&g.p.bf.k=='atk'?1.25:1)*hm('atk')*(g.p.db?1+g.p.db.a:1)*(g.p.hero=='g'&&!g.p.fm?.75:1),MH=()=>(100+g.p.lv*20+sm('hp'))*hm('hp'),MM=()=>50+g.p.lv*8+sm('mp'),SP=()=>(70+sm('spd')+(g.p.bf&&g.p.bf.k=='spd'?18:0))*hm('spd')*(g.p.bs?.7:1)*(g.p.slw>0?.6:1)*(g.p.hsp>0?1.22:1)*(g.p.ep>0?1.2:1),LS=()=>((g.p.hero||'w')=='w'?.25:0)+sm('ls'),CD=()=>1-M.min(.4,sm('cd')),DR=()=>M.min(.75,sm('def')+(g.p.kg>0?.3:0)+(g.p.db?g.p.db.r:0)+(g.p.hero=='g'&&g.p.fm&&g.p.kn==1?.2:0)),AP=()=>sm('ap'),MR=()=>sm('mr'),AS=()=>sm('as')+(g.p.hero=='g'?(g.p.fm?0:.4)+(g.p.kas>0?1:0):0)+(g.p.hasb>0?.5:0),CR=()=>.05+sm('crit'),PN=()=>sm('pen')+(g.p.hero=='g'&&g.p.fm?25+M.round(sm('as')*250):0);
const D=(a,b)=>M.hypot(a.x-b.x,a.y-b.y),inC=()=>g.cir&&D(g.p,g.cir)<g.cir.r,dark=()=>M.max(0,-M.sin(2*PI*(g.t%180)/180))*.6;
let NFX=0;const tmo=(t,f)=>{const n=NFX;tm.push([t,()=>{const o=NFX;NFX=n;try{f()}finally{NFX=o}}])},near=r=>{let b=null,d=r;for(const e of g.en)if(!e.dead&&D(g.p,e)<d){d=D(g.p,e);b=e}return b};
function rs(){S=M.max(2,M.round(innerHeight/170));W=(cv.width=innerWidth)/S;H=(cv.height=innerHeight)/S}addEventListener('resize',rs);rs();
for(let i=0;i<40;i++)sf.push({x:R()*500,y:R()*900,s:20+R()*30});
let sd=7;const rn=()=>(sd=(sd*16807)%2147483647)/2147483647,TR=[];for(let i=0;i<6200;i++){const a=rn()*WW,b=rn()*WH,k=bio(a,b);if(rn()<[.35,1,0,.6,.12,1.5][k]&&!TWS.some(T=>a>T.x-30&&a<T.x+T.w+30&&b>T.y-30&&b<T.y+T.h+30))TR.push([a|0,b|0,k])}TR.sort((a,b)=>a[1]-b[1]);
function say(t){const e=$('ts');e.textContent=t;e.hidden=0;clearTimeout(say.h);say.h=setTimeout(()=>e.hidden=1,1800)}
function ov(h,b){hs=b||[];$('ov').innerHTML=h;$('ov').hidden=0}function cl(){$('ov').hidden=1;hs=[]}
function dlg(n,t,o){ov('<div class=bx><b>'+n+'</b><p>'+t+'</p>'+o.map((a,i)=>'<button data-i='+i+'>'+a[0]+'</button>').join('')+'</div>',o.map(a=>a[1]))}
$('ov').onclick=e=>{const i=e.target.dataset.i;if(i!=null&&hs[i])hs[i]()};
function fresh(){return{p:{x:700,y:560,hp:100,mp:50,lv:1,xp:0,gd:50,sp:0,sk:[1,1,1],cd:[0,0,0,0],acd:0,form:0,bt:0,ch:0,s1:0,s1L:1,fast:0,hb:0,n:0,a:0,pot:[3,2],it:[],q:null,dash:null},t:45,en:[],cir:null,sp:0,bk:0}}
function sst(){const e=$('sst');if(e)e.innerHTML=NET.ok?'🟢 เซิร์ฟเวอร์เปิดอยู่ • ปิง '+NET.ping+' ms':NET.try?'⏳ กำลังเชื่อมต่อ...':'🔴 เซิร์ฟเวอร์ยังไม่เปิด'}
function probe(){if(NET.ws&&NET.ws.readyState<2)return sst();NET.try=1;sst();let ws;try{ws=new WebSocket(NET.url)}catch(e){NET.try=0;return sst()}
const to=setTimeout(()=>{try{ws.close()}catch(e){}},2500);ws.onopen=()=>{clearTimeout(to);NET.try=0;NET.ws=ws;NET.ok=1;NET.send({t:'ping',n:performance.now()});sst()};
ws.onmessage=e=>{try{onmsg(JSON.parse(e.data))}catch(er){console.error(er)}};
ws.onclose=ws.onerror=()=>{clearTimeout(to);if(NET.ws===ws||!NET.ws){NET.ok=0;NET.ws=null}NET.try=0;sst();if(g){g=null;$('hud').hidden=1;login('หลุดจากเซิร์ฟเวอร์')}}}
setInterval(()=>{if(!g&&!$('ov').hidden&&$('sv'))probe();if(NET.ok)NET.send({t:'ping',n:performance.now()})},3000);
function login(msg){ov('<div class=bx><h2>❄ WinterMMORPG</h2><p>'+(msg||'ปีศาจ เลือด ฤดูหนาว')+'</p><input id=sv placeholder="ที่อยู่เซิร์ฟเวอร์ เช่น ws://localhost:8080" value="'+NET.url+'"><div id=sst style="margin:4px 0"></div><input id=nm placeholder="ชื่อบัญชี" maxlength=12><input id=pw type=password placeholder="รหัสผ่าน (4 ตัวขึ้นไป)"><button data-i=0>เข้าสู่ระบบ</button><button data-i=1>สมัครสมาชิกใหม่</button></div>',[()=>auth(0),()=>auth(1)]);
$('sv').onchange=()=>{NET.url=$('sv').value.trim();try{localStorage.setItem('wr:srv',NET.url)}catch(e){}try{NET.ws&&NET.ws.close()}catch(e){}NET.ws=null;NET.ok=0;probe()};probe()}
function auth(reg){const n=$('nm').value.trim(),w=$('pw').value;if(!NET.ok)return login('เซิร์ฟเวอร์ยังไม่เปิด');if(!n||n[0]=='_'||w.length<4)return login('ใส่ชื่อและรหัสผ่าน (4 ตัวขึ้นไป)');aud();FS();NET.name=n;NET.send({t:reg?'reg':'login',u:n,p:w})}
function pick(){const hs=Object.keys(HI),pk=hs.map(h=>HI[h].pk);ov('<div class=bx><h3>เลือกตัวละคร</h3>'+hs.map((h,i)=>'<div class=ch><img class=pt src="'+icon(pk[i])+'"><b>'+HI[h].n+'</b><br><small>'+HI[h].short+'</small><br><small>'+HI[h].ps+'</small><button data-i='+i+'>เลือก '+HI[h].n+'</button></div>').join('')+'</div>',hs.map(h=>()=>{NET.send({t:'hero',h});g.p.hero=h;go();g.p.hp=MH();g.p.mp=MM()}))}
function go(){sethero(g.p.hero||'w');cl();$('hud').hidden=0;g.en=[];;g.p.hp=M.min(g.p.hp,MH())||MH()}
function spawn(){let X,Y;do{X=40+R()*(WW-80);Y=40+R()*(WH-80)}while(X>TW.x-70&&X<TW.x+TW.w+70&&Y>TW.y-70&&Y<TW.y+TW.h+70||X>TW2.x-70&&X<TW2.x+TW2.w+70&&Y>TW2.y-70&&Y<TW2.y+TW2.h+70);const dd=M.min(M.hypot(X-700,Y-500),M.hypot(X-2150,Y-1450)*1.3),e=Object.assign({x:X,y:Y,sl:0,stun:0,cd:0,ph:R()*6},ST[bt(X,Y,dd)]),z=dd/700,dm=1+.12*(DY()-1),m=(1+.8*z*z)*dm;e.hp=e.mh=e.mh*m|0;e.d=e.d*(1+.9*z)*dm;e.sp*=M.min(1.3,1+z*.1);e.xp=e.xp*m|0;e.gd=e.gd*m|0;e.ar=(e.ar||0)*(1+z)+z*10;g.en.push(e)}
function gain(v){}
function kill(e){const p=g.p,q=p.q;dfx(e);if(e.guard)dgDone();sfx('x');if(NET.party&&!e.pv)NET.send({t:'share',gd:e.gd*.55|0,xp:e.xp});p.gd+=e.gd*.55*(1+sm('gb'))|0;gain(e.xp);if(e.boss)g.bk=1;if(q&&!q.done){const s=QS[q.id];if((s.k=='kill'&&!e.boss&&(!s.t||s.t==e.t))||(s.k=='boss'&&e.boss)){q.pr++;if(q.pr>=s.need){q.done=1;say(s.c==3?'เควสสำเร็จ! กลับไปหาชาวบ้าน':'เควสสำเร็จ! กลับไปส่งที่กิลด์')}}}if(R()<.25){const k=R()<.5?0:1;if(p.pot[k]<10)p.pot[k]++}if(e.boss||R()<.12){const k=['mr','atk','spd'][R()*3|0];p.bf={k,t:e.boss?40:20};say('บัฟชั่วคราว: '+{mr:'ฟื้นมานาเร็ว',atk:'พลังโจมตี +25%',spd:'ความเร็ว +18'}[k])}}
function hit(e,d,tr,mg,pp){const p=g.p;let cr=0,am=1;if(!tr){am=mg?1:M.max(.1,1-M.max(0,(e.ar||0)*(1-(pp||0))-PN())/120);d*=am;if(e.hp<e.mh*.3)d*=1+sm('ex');if(R()<CR()){cr=1;d*=1.6}}d=M.max(1,M.round(d));if(e.pv){nhit(e,d);e.hp=M.max(1,e.hp-d)}else if(e.sv){NET.send({t:'mh',id:e.mid,d:d|0});e.hp=M.max(1,e.hp-d)}else e.hp-=d;fl.push({x:e.x+(R()-.5)*8,y:e.y-10,s:cr?d+'!':d,c:tr?'#fff':mg?(cr?'#e0b0ff':'#b06cff'):cr?'#ff4a4a':am<.3?'#8899aa':d>AT()*1.5?'#ff9a3c':'#ffd54a',t:.9,z:M.min(2.4,1+d/60+cr*.4)});sfx(cr?'k':'h');hfx(e,d,tr);if(e.km>0)kmh(e);if(am<.3&&R()<.2)fl.push({x:e.x,y:e.y-20,s:'เจาะเกราะไม่เข้า',c:'#8899aa',t:.9});p.hp=M.min(MH(),p.hp+d*(LS()+(p.form||inC()?.1:0)));if(e.hp<=0&&!e.dead){e.dead=1;kill(e)}}
function aoe(X,Y,r,d,ex,mg,pp){let n=0;g.en.forEach(e=>{if(!e.dead&&e!==ex&&M.hypot(e.x-X,e.y-Y)<r){hit(e,d,0,mg,pp);n++}});return n}
function shoot(o){const q=Object.assign({life:1,r:5,hit:[]},o);pr.push(q);if(NFX&&!o.vis)nfx({t:'pj',x:q.x,y:q.y,vx:q.vx,vy:q.vy,k:q.k,c:q.c,life:q.life,r:q.r,pierce:q.pierce?1:0,tr:q.tr?1:0})}
function fx(o,e){const p=g.p,k=o.k;if(k=='r'||k=='d')aoe(e.x,e.y,30,o.d*.5,e);if(k=='d'||k=='y'||k=='w')e.sl=2;if(k=='b'||k=='v'){p.cd[0]=M.max(0,p.cd[0]-.5);p.cd[1]=M.max(0,p.cd[1]-.5)}if(o.up)e.stun=1;if(o.en&&!o.gn){o.gn=1;vg()}if(o.mk)mark(e);if(o.dl)dst(e,o.d);if(o.ks)ksh()}
function atk(){NFX=1;try{return atk0()}finally{NFX=0}}function atk0(){const p=g.p;if(hr()!='w')return HA[hr()]();if(p.acd>0||p.ch>0||p.dash)return;const e=near(220);if(!e)return;const d=D(p,e),A=AT(),B=p.form,C=inC(),sp=p.hb>0?(C?1.4:1.25):1;p.a=M.atan2(e.y-p.y,e.x-p.x);p.n++;const co=M.cos(p.a),si=M.sin(p.a);
if(p.s1>0&&d<130){p.s1=0;p.cd[0]=6*CD();streak(p.x,p.y,e.x-co*14,e.y-si*14,'#ffe14a');ring(e.x,e.y,28,'#ffe14a');p.x=e.x-co*14;p.y=e.y-si*14;e.stun=.75;SK=5;hit(e,A*1.8*p.s1L);p.acd=.5;return}
if(d<44){swing(p.a,B?'#ff3a5a':'#cfe8ff',B&&C?46:30);p.lg=3;const nh=B&&p.hb>0?(C?3:2):1;for(let k=0;k<nh;k++)tmo(k*.08,()=>{if(e.dead&&!(B&&C))return;if(B&&C)aoe(p.x,p.y,48,A*1.2);else hit(e,A*.7)});p.acd=B&&C?1.1:.35}
else{let k=null;if(B){if(p.n%2==0)k=['d','v'][(p.n/2|0)%2]}else if(p.n%3==0)k=['r','b','y'][(p.n/3|0)%3];shoot({x:p.x,y:p.y,vx:co*(B&&!C?150:220),vy:si*(B&&!C?150:220),d:A*1.3*(k=='d'?1.3:1),k,c:COL[k]||'#ddd',life:.9});p.acd=B?.8:.9;p.lg=2}
p.acd/=sp*(1+AS())}
function cast(i,ang){NFX=1;const p=g.p,mp0=p.mp,cd0=p.cd[i],hh=BAL.hero[hr()],h=(hh&&hh.s&&hh.s[i])||{};try{return cast0(i,ang)}finally{NFX=0;const sp=mp0-p.mp;if(sp>0&&h.m&&h.m!=1)p.mp=M.min(MM(),p.mp+sp*(1-h.m));if(h.c&&h.c!=1&&p.cd[i]>M.max(cd0,1.2)&&p.cd[i]<90)p.cd[i]*=h.c}}function cast0(i,ang){const p=g.p;if(hr()!='w')return HC[hr()](i,ang);if(!g||p.ch>0||p.cd[i]>0||p.dash)return;const mc=[8,12,20][i];if(p.mp<mc)return say('มานาไม่พอ');sfx(['c1','c2','c3'][i]);const L=1+.15*(p.sk[i]-1),A=AT()*L*(1+AP())*skd(i),e=near(260),B=p.form,C=inC(),cd=CD();if(ang!=null)p.a=ang;else if(e)p.a=M.atan2(e.y-p.y,e.x-p.x);const co=M.cos(p.a),si=M.sin(p.a);
if(i==0){p.mp-=mc;if(!B){p.s1=3;p.s1L=L;p.cd[0]=99;say('โจมตีปกติครั้งต่อไปจะพุ่งสตั้น');ring(p.x,p.y,22,'#ffe14a')}else{p.hold=1;p.hd=0;p.fast=99;p.cd[0]=99;ring(p.x,p.y,24,'#ff3a5a');puff(p.x,p.y,14,'#ff3a5a',60,.5,1.2,0,1)}}
if(i==1){p.mp-=mc;p.cd[1]=(B?8:7)*cd;if(!B){if(e&&D(p,e)<80){e.stun=.8;puff(e.x,e.y+4,16,'#e9f1f8',70,.5,1.4,160);ring(e.x,e.y,26,'#fff')}ring(p.x+co*14,p.y+si*14,20,'#9fdcff');SK=3;[-9,9].forEach(o=>shoot({x:p.x-si*o,y:p.y+co*o,vx:co*200,vy:si*200,d:A*1.2,k:'w',c:COL.w,life:.8,r:9,pierce:1}))}
else if(C){streak(p.x,p.y,p.x+co*130,p.y+si*130,'#ff3a5a');p.dash={vx:co*650,vy:si*650,t:.2};tmo(.2,()=>{aoe(p.x,p.y,55,A*1.5);spin(p.x,p.y);SK=7})}
else for(let k=0;k<6;k++)tmo(k*.2+.01,()=>{swing(p.a,'#ff3a5a',46);SK=k==5?9:3;const X=p.x+co*35,Y=p.y+si*35;g.en.forEach(z=>{if(!z.dead&&M.hypot(z.x-X,z.y-Y)<40){hit(z,A*(k==5?1.8:.5));z.x+=co*10;z.y+=si*10}})})}
if(i==2){if(!B){p.mp-=mc;p.ch=3;p.cd[2]=99;say('กำลังชาร์จร่างโลหิต...');return}if(!e)return say('ไม่มีเป้าหมาย');p.mp-=mc;p.cd[2]=8*cd;
if(C){const f=e.boss?.2:1,r=g.cir.r;e.stun=1;e.cage=1;tmo(1,()=>{e.cage=0;if(e.dead)return;slam(e);hit(e,e.mh*.75*f,1);if(e.dead){bx(e.x,e.y,r);tmo(5,()=>{aoe(e.x,e.y,r,A*3);boom(e.x,e.y,r)})}})}
else{p.hp=M.max(1,p.hp-MH()*.35);puff(p.x,p.y,24,'#c0283c',90,.7,1.4,200);SK=6;FL=[.25,'255,40,60'];shoot({x:p.x,y:p.y,vx:co*220,vy:si*220,d:e.mh*.16*(e.boss?.3:1),tr:1,c:'#ff1a3a',life:1,r:8})}}}
function heal(){const p=g.p;if(p.cd[3]>0)return;p.hp=M.min(MH(),p.hp+MH()*.35);p.cd[3]=45*CD();healfx('#6f6');fl.push({x:p.x,y:p.y-14,s:'+HP',c:'#6f6',t:.8})}
function use(k){const p=g.p;if(p.pot[k]<1)return say('ของหมด ซื้อได้ที่ตลาด');NET.send({t:'usep',i:k});p.pot[k]--;healfx(k?'#6cf':'#fa6');if(k)p.mp=M.min(MM(),p.mp+40);else p.hp=M.min(MH(),p.hp+60)}
function die(){const p=g.p;if(NET.am){adie();return}ndie();p.inv=4;if(g.sc){g.en=g.sc.sv;g.sc=null}p.hp=MH();p.mp=MM();p.x=700;p.y=560;p.form=0;p.ch=0;Object.assign(p,HTR);g.cir=null;g.dn=0;g.en=g.en.filter(e=>!e.el);sfx('d');say('คุณพ่ายแพ้ ถูกพากลับเมือง')}
function npc(b){return{x:b[2]+25,y:b[3]+46}}
const buy=(m,cat)=>{NET.send(m);NET.rr=()=>NO.shop(cat)};
const NP={
guild(){const p=g.p,q=p.q;if(q&&q.done&&QS[q.id].c!=3){const s=QS[q.id];return dlg('พนักงานกิลด์','ทำได้ดีมาก! รางวัล '+s.gold+' ทอง และ '+s.xp+' EXP',[['รับรางวัล',()=>{NET.send({t:'qc'});cl()}]])}
if(q)return dlg('พนักงานกิลด์','เควสปัจจุบัน: '+QS[q.id].n,[['ยกเลิกเควส',()=>{NET.send({t:'qx'});cl()}],['ปิด',cl]]);
dlg('พนักงานกิลด์','เลือกหมวดงาน',CQ.slice(0,3).map((c,ci)=>[c,()=>dlg('พนักงานกิลด์ — '+c,'เลือกเควส',QS.map((s,i)=>[s,i]).filter(a=>a[0].c==ci).map(a=>[a[0].n+' ('+a[0].gold+'g)',()=>{NET.send({t:'qa',id:a[1]});cl()}]).concat([['← กลับ',()=>NO.guild()],['ปิด',cl]]))]).concat([['ปิด',cl]]))},
market(){const p=g.p;
dlg('พ่อค้า','ยินดีต้อนรับ! คุณมี '+p.gd+' ทอง เลือกหมวดสินค้า',CT.map((c,i)=>[c,()=>NO.shop(i)]).concat([['ปิด',cl]]))},
shop(c){const p=g.p;if(c==4)return dlg('🍞 อาหารและยา • '+p.gd+'g','ขนมปังอุ่นๆ ชามานาร้อนๆ (ถือได้สูงสุด '+BAL.econ.potMax+' ชิ้น)',[['🍞 ขนมปัง ฟื้น 60 HP ('+BAL.econ.pot+'g) มี '+p.pot[0],()=>buy({t:'buyp',i:0},4)],['🍵 ชามานา ฟื้น 40 MP ('+BAL.econ.pot+'g) มี '+p.pot[1],()=>buy({t:'buyp',i:1},4)],['← กลับ',()=>NO.market()]]);
dlg(CT[c]+' • '+p.gd+'g • ช่อง '+p.it.length+'/6','แตะสินค้าเพื่อซื้อ ขายของเก่าได้ที่ปุ่มกระเป๋า',Object.keys(IT).filter(k=>IT[k][4]==c&&!IT[k][7]).map(k=>[IT[k][3]+IT[k][0]+' '+IT[k][1]+' ('+IT[k][2]+'g)'+(p.it.includes(k)?' ✓':''),()=>buy({t:'buy',k},c)]).concat([['← กลับ',()=>NO.market()]]))},
inn(){dlg('เจ้าของโรงเตี้ยม','เช่าห้อง ฟื้น HP/MP ทันที',[['พักฟื้น HP/MP เต็ม ('+BAL.econ.inn+'g)',()=>{NET.send({t:'inn'});cl()}],['ปิด',cl]])},
church(){dlg('มกุฎ (ตัวละครปริศนา)',SW()+'ข้าเปลี่ยนวิญญาณนักรบให้เจ้าได้... เมื่อถึงเวลา',[['🔄 รีเซ็ตสกิล (100g) คืนแต้มสกิลทั้งหมด',()=>swp(hr())]].concat(Object.keys(HI).filter(h=>h!=hr()).map(h=>['เปลี่ยนเป็น '+HI[h].n+' (100g)',()=>swp(h)])).concat([['ปิด',cl]]))}};
function nearNpc(){if(g.sc){for(const b of g.sc.n)if(D(g.p,{x:b[2],y:b[3]})<30)return b;return}for(const b of BD)if(D(g.p,npc(b))<32)return b}
function qtxt(){const q=g.p.q;return q?QS[q.id].n+(q.done?(QS[q.id].c==3?' ✓ กลับไปหาชาวบ้าน':' ✓ กลับไปส่งที่กิลด์'):' '+(q.pr||0)+'/'+(QS[q.id].need||1)):'ไม่มี (รับที่กิลด์)'}
function menu(){const p=g.p;ov('<div class=bx><b>'+HI[hr()].n+' Lv'+p.lv+'</b><p>โจมตี '+AT()+' • HP '+MH()+' • MP '+MM()+' • แต้มสกิล '+p.sp+'</p>'+SN.map((n,i)=>'<div class=r><span>'+(i+1)+'. '+n[0]+' / '+n[1]+' (Lv'+p.sk[i]+')</span><button data-i='+i+'>+</button></div>').join('')+'<p>ไอเทม ('+p.it.length+'/6): '+(p.it.map(k=>IT[k][3]+IT[k][0]).join(' ')||'ยังไม่มี')+'</p><p>เควส: '+qtxt()+'</p><button data-i=6>⚙ ตั้งค่า</button><button data-i=3>บันทึก</button><button data-i=4>ออกจากระบบ</button><button data-i=5>ปิด</button></div>',[0,1,2].map(i=>()=>{if(p.sp>0){NET.send({t:'sk',i});NET.rr=menu}}).concat([()=>{save();say('บันทึกแล้ว')},()=>{save();g=null;NET.ps={};NET.party=null;$('hud').hidden=1;try{NET.ws.close()}catch(e){}login()},cl,cfgp]))}
function upd(dt){const p=g.p;ntick(dt);g.t+=dt;g.sp-=dt;fxu(dt);p.mv=0;if(p.bf){p.bf.t-=dt;if(p.bf.t<=0)p.bf=null}
tm=tm.filter(a=>{a[0]-=dt;if(a[0]<=0){a[1]();return 0}return 1});
for(let i=0;i<4;i++)if(!(i==0&&p.s1>0))p.cd[i]=M.max(0,p.cd[i]-dt);p.acd-=dt;
if(p.s1>0){p.s1-=dt;if(p.s1<=0)p.cd[0]=6*CD()}
if(p.fast>0){p.fast-=dt;if(p.fast<=0&&p.form)p.hb=5}if(p.hb>0)p.hb-=dt;if(p.hold){p.hd+=dt;if(p.hd>=5||!p.form)rel()}
if(p.form){p.bt-=dt;if(p.bt<=0){p.form=0;p.cd[2]=20*CD()}}
if(p.ch>0){p.ch-=dt;if(p.ch<=0){p.form=1;p.bt=30;g.cir={x:p.x,y:p.y,r:170,t:25};p.cd[2]=0;boom(p.x,p.y,170);say('ร่างโลหิต! วงฤดูหนาวสีแดงชาด')}}
if(g.cir){g.cir.t-=dt;if(g.cir.t<=0)g.cir=null}
p.hp=M.min(MH(),p.hp+dt*(1.2+sm('rg')));p.mp=M.min(MM(),p.mp+dt*(.4+MR()/5+(p.bf&&p.bf.k=='mr'?3:0)));
let X=(K[KB.right]||K.arrowright?1:0)-(K[KB.left]||K.arrowleft?1:0)+jx,Y=(K[KB.down]||K.arrowdown?1:0)-(K[KB.up]||K.arrowup?1:0)+jy;const l=M.hypot(X,Y);
if(p.dash){p.x+=p.dash.vx*dt;p.y+=p.dash.vy*dt;p.dash.t-=dt;if(p.dash.t<=0)p.dash=null}
else if(l>.1&&p.ch<=0&&!kblk(p)){p.mv=1;const s=SP()*(p.fast>0?1.4:1)*(inC()?1.15:1);p.x+=X/M.max(l,1)*s*dt;p.y+=Y/M.max(l,1)*s*dt;p.a=M.atan2(Y,X)}
p.x=M.max(8,M.min((g.sc?g.sc.w:WW)-8,p.x));p.y=M.max(g.sc?24:8,M.min((g.sc?g.sc.h:WH)-8,p.y));
if(ah||K[KB.atk])atk();
const nt=dark()>.3,bs=g.en.find(e=>e.boss);if(!nt)g.bk=0;const bq=p.q&&p.q.id==2&&!p.q.done;if(false)g.en.push({t:'boss',boss:1,x:LAIR.x,y:LAIR.y+20,hp:BH(),mh:BH(),ar:100,sp:48,d:25*(1+.08*(DY()-1)),xp:250,gd:300,sl:0,stun:0,cd:0});if(!nt&&bs&&!bq)g.en=g.en.filter(e=>!e.boss);
g.en=g.en.filter(e=>!e.dead);if(false){g.sc.cl=1;if(g.sc.dg.f<g.sc.dg.N){g.sc.n.push(['stairs','บันไดลงชั้นถัดไป',160,28]);say('เคลียร์ชั้นนี้แล้ว! บันไดปรากฏ')}}if(false){g.sp=3;if(g.en.filter(e=>!e.boss&&!e.el).length<44)spawn()}
for(const e of g.en){if(e.sw>0)e.sw-=dt;if(e.tl>0)e.tl-=dt;if(e.km>0)e.km-=dt;if(e.pv)continue;if(e.sv){e.cd-=dt;e.sl-=dt;if(e.stun>0)e.stun-=dt;continue}e.cd-=dt;e.sl-=dt;out(e);if(e.guard)bai(e,dt);if(e.stun>0){e.stun-=dt;continue}const T=g.vl&&D(e,g.vl)<D(e,p)?g.vl:p,d=D(T,e);if(d<(e.boss?400:240)&&d>10){const s=e.sp*(e.sl>0?.5:1)*dt;e.x+=(T.x-e.x)/d*s;e.y+=(T.y-e.y)/d*s}
if(d<12&&e.cd<=0){e.cd=1;const m=e.d*(nt?1.3:1);if(T===p){dmgp(m);if(sm('th')){e.hp-=m*sm('th');if(e.hp<=0&&!e.dead){e.dead=1;kill(e)}}if(p.hp<=0)die()}else T.hp-=m}}
const q=p.q;if(q&&QS[q.id].k=='esc'&&!q.done&&!g.vl)g.vl={x:p.x-10,y:p.y,hp:60};if(!(q&&QS[q.id].k=='esc'))g.vl=null;
if(g.vl&&!g.sc){const v=g.vl,d=D(v,p);if(d>24){v.x+=(p.x-v.x)/d*48*dt;v.y+=(p.y-v.y)/d*48*dt}if(!q.done&&D(v,(DEST[QS[q.id].dest]||CAB))<40&&g.t-(NET.qt||0)>1){NET.qt=g.t;NET.send({t:'qd',w:'esc'})}if(v.hp<=0&&!q.done){NET.send({t:'qx'});p.q=null;g.vl=null;say('ชาวบ้านเสียชีวิต เควสล้มเหลว')}}
if(g.dn&&!g.en.some(e=>e.el)){g.dn=0;const ks=Object.keys(IT).filter(k=>!p.it.includes(k));if(ks.length&&p.it.length<6){const k=ks[R()*ks.length|0];p.it.push(k);say('ล้างถ้ำสำเร็จ! ได้ '+IT[k][0])}else{p.gd+=150;say('ล้างถ้ำสำเร็จ! ได้ 150 ทอง')}tmo(3,()=>{p.x=1251;p.y=205})}
pr=pr.filter(o=>{if(o.bm){o.life-=dt;bmu(o,dt);return o.life>0}if(o.hm&&!o.hm.dead){const a2=M.atan2(o.hm.y-o.y,o.hm.x-o.x),s2=M.hypot(o.vx,o.vy);o.vx=M.cos(a2)*s2;o.vy=M.sin(a2)*s2}o.x+=o.vx*dt;o.y+=o.vy*dt;o.life-=dt;if(o.vis)return o.life>0;for(const e of g.en){if(e.dead||o.hit.includes(e))continue;if(D(o,e)<o.r+7){o.hit.push(e);hit(e,(o.gid?o.d*bsc(e,o):o.d)*(o.rd&&e.tl>0?.6:1),o.tr,o.mg);if(o.rd)e.tl=2.5;fx(o,e);if(!o.pierce){o.life=0;break}}}return o.life>0});
fl=fl.filter(f=>{f.y-=12*dt;return(f.t-=dt)>0});
sf.forEach(s=>{s.y+=s.s*dt;s.x-=6*dt;if(s.y>H)s.y=0;if(s.x<0)s.x=W})}
const rc=(c,a,b,w,h)=>{x.fillStyle=c;const X=M.floor((a-cx)*S),Y=M.floor((b-cy)*S);x.fillRect(X,Y,M.ceil((a-cx+w)*S)-X,M.ceil((b-cy+h)*S)-Y)};
const MAN=["....HHHHHH....","....HHHHHH....","....YYYYYY....","..HHHHHHHHHH..","...KSSSSSSK...","...SSESSESS...","....SSSSSS....","...CCCYYCCC...","..CCCCYYCCCC..",".SCCCCYYCCCCS.",".SCCCCYYCCCCS.","..CCCCYYCCCC..","..CCCCYYCCCC..","..YYYYYYYYYY..","...CCCCCCCC...","....BB..BB....","....BB..BB...."],
IMP=["K........K","RR......RR",".RRRRRRRR.","RRYRRRRYRR","RRRRRRRRRR",".RRKKKKRR.",".RRRRRRRR.","..RRRRRR..","..RR..RR..","..KK..KK.."],
WLF=["............PP..","..PPPPPPPPPPPPP.",".PPPPPPPPPPPPYPP","PPPPPPPPPPPPPPPP",".PPPPPPPPPPPPPP.","..PP..PP..PP.PP.","..KK..KK..KK.KK."],
TRE=["....W....","...GWG...","..GGWGG..","...GGG...","..GGGGG..",".GGGGGGG.","..GGGGG..",".GGGGGGG.","GGGGGGGGG","....T....","....T...."],
BP={Y:'#f5c542',S:'#f2c9a0',K:'#2b1b14',E:'#222',B:'#1a1a2a'},TP={W:'#fff',G:'#1f4d3a',T:'#5a3a22'};
const SC=new WeakMap();
function hx(c){if(c.length==4)c='#'+c[1]+c[1]+c[2]+c[2]+c[3]+c[3];const n=parseInt(c.slice(1,7),16);return[n>>16,n>>8&255,n&255]}
function bake(m,p){const h=m.length,w=m[0].length,E=[],G=(j,i)=>j<0||i<0||j>=h||i>=w?'':p[m[j][i]]||'';
for(let j=0;j<2*h;j++)E[j]=[];
for(let j=0;j<h;j++)for(let i=0;i<w;i++){const P=G(j,i),A=G(j-1,i),B=G(j,i+1),C=G(j,i-1),D=G(j+1,i);let a=P,b=P,c=P,d=P;if(C==A&&C!=D&&A!=B)a=A;if(A==B&&A!=C&&B!=D)b=B;if(D==C&&D!=B&&C!=A)c=C;if(B==D&&B!=A&&D!=C)d=D;E[2*j][2*i]=a;E[2*j][2*i+1]=b;E[2*j+1][2*i]=c;E[2*j+1][2*i+1]=d}
const e=(j,i)=>j<0||i<0||j>=2*h||i>=2*w?'':E[j][i],o=document.createElement('canvas');o.width=2*w+2;o.height=2*h+2;const q=o.getContext('2d');
for(let j=-1;j<=2*h;j++)for(let i=-1;i<=2*w;i++){const c=e(j,i);if(c){let f=1.1-.28*j/(2*h);if(!e(j-1,i)||!e(j,i-1))f+=.14;if(!e(j+1,i)||!e(j,i+1))f-=.14;q.fillStyle='rgb('+hx(c).map(v=>M.min(255,M.max(0,v*f|0))).join()+')'}else if(e(j-1,i)||e(j+1,i)||e(j,i-1)||e(j,i+1))q.fillStyle='rgba(8,12,24,.8)';else continue;q.fillRect(i+1,j+1,1,1)}
return o}
function spr(m,p,X,Y,k,F){let o=SC.get(m);if(!o)SC.set(m,o={});const key=JSON.stringify(p),c=o[key]||(o[key]=bake(m,p)),pk=k*S/2,w=M.round(c.width*pk),h=M.round(c.height*pk),L=M.floor((X-m[0].length*k/2-k/2-cx)*S),T=M.floor((Y-m.length*k-k/2-cy)*S);x.imageSmoothingEnabled=false;if(F){x.save();x.translate(L+w,T);x.scale(-1,1);x.drawImage(c,0,0,w,h);x.restore()}else x.drawImage(c,L,T,w,h)}
const man=(X,Y,C,H,K,B,F,Y2)=>{shd(MAN,X,Y+6,.6);spr(MAN,Object.assign({C,H},BP,K?{K}:null,Y2?{Y:Y2}:null),X,Y+6+(B||0),.6,F)};
function bld(b){const X=b[2],Y=b[3],c=b[4];bsh(X,Y);rc('#d6c7a8',X,Y+8,50,28);rc('#b8a888',X,Y+30,50,6);rc(c,X-3,Y+1,56,9);rc(c,X+4,Y-5,42,7);rc('#fff',X-3,Y+1,56,1.5);rc('#5a3a22',X+20,Y+22,10,14);rc('#8fd0ff',X+5,Y+15,9,8);rc('#8fd0ff',X+36,Y+15,9,8);rc('#fff',X+4,Y+13,11,1.5);rc('#fff',X+35,Y+13,11,1.5);x.font='bold '+6*S+'px sans-serif';x.lineWidth=2;x.strokeStyle='#000';x.fillStyle='#fff';const t=b[5]+b[1],tx=(X-cx-2)*S,ty=(Y-cy-8)*S;x.strokeText(t,tx,ty);x.fillText(t,tx,ty)}
function draw(){const p=g.p;const ww=g.sc?g.sc.w:WW,wh=g.sc?g.sc.h:WH;cx=W>=ww?(ww-W)/2:M.max(0,M.min(ww-W,p.x-W/2));cy=H>=wh?(wh-H)/2:M.max(0,M.min(wh-H,p.y-H/2));if(SK>.15){cx+=(R()-.5)*SK;cy+=(R()-.5)*SK;SK*=.86}else SK=0;
{const ph=(g.t%180)/180,dp=M.min(1,ph*2),el=M.max(.15,M.sin(PI*dp));if(ph<.5){SH.sk=(dp-.5)*3;SH.ln=M.min(1,.4/el);SH.al=.16+.2*el}else{SH.sk=.4;SH.ln=.3;SH.al=.14}}
if(g.sc)dsc();else{for(let i=cx/16|0;i<(cx+W)/16;i++)for(let j=cy/16|0;j<(cy+H)/16;j++){const k=bio(i*16+8,j*16+8),h=(i*7+j*13)%11;rc(BC[k],i*16,j*16,16,16);if(h==0)rc(PC[k],i*16,j*16,16,16);if(k==2&&h%4==1)rc('rgba(255,255,255,.55)',i*16+3,j*16+6,9,1);if(k==3&&h==5)rc('rgba(138,42,58,.4)',i*16+4,j*16+4,3,3);if(k==1&&h==4)rc('rgba(42,90,74,.3)',i*16+5,j*16+5,2,2);if(k==4&&h%3==1)rc('rgba(176,138,64,.35)',i*16+2,j*16+8,11,1);if(k==5&&h%4==2)rc('rgba(20,80,30,.45)',i*16+4,j*16+4,4,3)}
rc('#c7b99a',690,0,20,2000);rc('#c7b99a',0,490,2800,20);rc('#a9b4c2',TW.x,TW.y,TW.w,TW.h);rc('#c3ccd8',540,370,320,260);rc('#6fa7d6',680,480,40,40);rc('#e9f1f8',690,490,20,20);
LP.forEach(a=>{rc('#444',a[0],a[1],1.5,8);rc('#ffd54a',a[0]-1,a[1]-2,3.5,3)});
[TW.y,TW.y+TW.h].forEach(y=>{rc('#6f7f92',TW.x,y,TW.w/2-20,3);rc('#6f7f92',TW.x+TW.w/2+20,y,TW.w/2-20,3)});[TW.x,TW.x+TW.w].forEach(X=>{rc('#6f7f92',X,TW.y,3,TW.h/2-20);rc('#6f7f92',X,TW.y+TW.h/2+20,3,TW.h/2-20)});
rc('#2a2a3a',DG.x,DG.y,DG.w,DG.h);[[0,0,DG.w,3],[0,DG.h-3,DG.w,3],[0,0,3,DG.h],[DG.w-3,0,3,DG.h]].forEach(a=>rc('#777',DG.x+a[0],DG.y+a[1],a[2],a[3]));
rc('#7a4a2a',CAB.x-14,CAB.y-8,28,18);rc('#fff',CAB.x-16,CAB.y-13,32,6);rc('#3a2a1a',CAB.x-3,CAB.y+1,6,9);
twn(TW2);twn(TW3);twn(TW4);arenaDraw();BD.forEach(b=>{bld(b);if(!INT[b[0]])man(b[2]+25,b[3]+46,b[4],'#555',0,M.sin(g.t*2+b[2])*.4)});
TR.forEach(t=>{if(t[0]<cx-20||t[0]>cx+W+20||t[1]<cy-30||t[1]>cy+H+30)return;shd(TRE,t[0],t[1]+5,.9);spr(TRE,TPS[t[2]]||TP,t[0],t[1]+5,.9)})}
if(g.cir)cirfx(g.cir);
g.en.forEach(e=>{if(e.pv||M.abs(e.x-p.x)>W||M.abs(e.y-p.y)>H)return;const b=e.boss||e.big;shd(b?IMP:(e.t=='wolf'||(ET[e.t]&&ET[e.t].w))?WLF:IMP,e.x,b?e.y+12:e.y+5,b?1.5:e.t=='wolf'?.7:ET[e.t].k);
const wh=q=>e.fl>0?{R:'#fff',P:'#fff',K:'#fff',Y:'#fff'}:q,F=e.x>p.x,bo=-M.abs(M.sin(g.t*8+(e.ph||0)))*1.2;if(b)spr(IMP,wh(e.bpal||{R:'#5a0010',K:'#111',Y:'#ffd54a'}),e.x,e.y+12+bo,1.5,F);else if(e.t=='wolf')spr(WLF,wh({P:e.el?'#7a2038':'#5b3a6e',Y:e.el?'#ff4040':'#ffd54a',K:'#222'}),e.x,e.y+5+bo,.7,F);else{const z=ET[e.t];spr(z.w?WLF:IMP,wh(z.p),e.x,e.y+5+bo,z.k,F)}
const w=b?22:12,by=e.y-(b?8:9);if(e.stun>0)rc('#ff0',e.x-3,by-3,6,2);if(e.cage)cage(e);if(e.mk)for(let i=0;i<e.mk;i++)rc('#ff2a4a',e.x-5+i*4,by-4,3,2);rc('#300',e.x-w/2,by,w,2);rc('#e33',e.x-w/2,by,w*e.hp/e.mh,2)});
if(g.vl&&!g.sc){const v=g.vl;man(v.x,v.y,'#c9a227','#6b4a2a');rc('#300',v.x-6,v.y-10,12,2);rc('#6f6',v.x-6,v.y-10,12*M.max(0,v.hp)/60,2)}
pr.forEach(prj);
if(AIM&&AIM.on){x.strokeStyle='rgba(255,255,255,.7)';x.lineWidth=S;x.setLineDash([S*3,S*2]);x.beginPath();x.moveTo((p.x-cx)*S,(p.y-cy)*S);x.lineTo((p.x+M.cos(AIM.a)*90-cx)*S,(p.y+M.sin(AIM.a)*90-cy)*S);x.stroke();x.setLineDash([])}if(p.ch>0)rc('#c0283c88',p.x-14,p.y-14,28,28);
const hc=hcol(p),px=p.x+M.cos(p.a)*(p.lg||0),py=p.y+M.sin(p.a)*(p.lg||0),bb=p.mv?-M.abs(M.sin(g.t*14))*1.3:M.sin(g.t*3)*.3,fl2=M.cos(p.a)<0;if(p.hero&&p.hero!='w')hman(px,py,p.hero=='g'&&p.fm?'gd':p.hero,bb,fl2);else man(px,py,hc[0],hc[1],hc[2],bb,fl2,hc[3]);ndraw();tag(p.x,p.y,NET.name+' Lv'+p.lv,p.hp,MH(),p.mp,MM(),'#ffd54a');
zdraw();hdraw();dzdraw();guide();drawfx();fl.forEach(f=>{const z=(f.z||1)*(1+M.max(0,f.t-.7)*2.5);x.font='bold '+7*S*z+'px sans-serif';x.lineWidth=S;x.strokeStyle='#000';x.fillStyle=f.c;x.strokeText(f.s,(f.x-cx-6)*S,(f.y-cy)*S);x.fillText(f.s,(f.x-cx-6)*S,(f.y-cy)*S)});
lit();x.fillStyle='#fff';if(!g.sc&&bio(g.p.x,g.p.y)<4)sf.forEach(s=>x.fillRect((s.x%W)*S|0,s.y*S|0,S>>1,S>>1));if(FL){x.fillStyle='rgba('+FL[1]+','+FL[0]+')';x.fillRect(0,0,cv.width,cv.height);FL[0]-=.025;if(FL[0]<=0)FL=null}}

NP.barracks=()=>{const p=g.p;dlg('อัศวินเฝ้าโรง','นี่คือโรงอัศวิน ท่านฮาสทอสออกลาดตระเวนอยู่ จะกลับมาร่วมทีมเร็วๆ นี้ (Coming soon)',[['ฝึกกับหุ่นไม้ 40g (+40 EXP)',()=>{NET.send({t:'train'});cl()}],['ปิด',cl]])};
NP.cave=()=>dlg('ผู้เฝ้าถ้ำ','ถ้ำปีศาจเต็มไปด้วยหมาป่าโลหิต ผู้ที่ล้างถ้ำได้จะได้ไอเทม',[['เข้าดันเจี้ยน',()=>{cl();enter()}],['ปิด',cl]]);
function enter(){const p=g.p;p.x=DG.x+DG.w/2;p.y=DG.y+DG.h-30;g.dn=1;for(let i=0;i<5;i++)g.en.push({t:'wolf',el:1,x:DG.x+30+i*45,y:DG.y+40+(i%2)*30,hp:160,mh:160,ar:40,sp:60,d:16,xp:60,gd:60,sl:0,stun:0,cd:0});say('เข้าสู่ถ้ำปีศาจ!')}
function FS(t){try{if(!document.fullscreenElement)document.documentElement.requestFullscreen().then(()=>screen.orientation.lock('landscape')).catch(()=>{});else if(t)document.exitFullscreen()}catch(e){}}$('fs').onclick=()=>FS(1);

function rel(){const p=g&&g.p;if(!p||!p.hold)return;p.hold=0;p.fast=0;if(p.hd>=2){p.hb=5;say('ตีเร็วขึ้น 5 วินาที')}p.cd[0]=10*CD()}
const NO=Object.assign({},NP),TK={guild:['พนักงานกิลด์','ฤดูหนาวนี้ปีศาจออกมาเยอะ กิลด์ขาดมือนักล่า','เมื่อก่อนวงฤดูหนาวสีแดงชาดเป็นแค่ตำนาน จนมีลูกครึ่งปีศาจผมสั้นโผล่มา','เควสทุกอย่างจ่ายตรง ทองกับ EXP ไม่หายไปไหน'],market:['พ่อค้า','ขนมปังอุ่นๆ ชามานาร้อนๆ! หิมะตกหนักของขายดี','ผ้าพันคอแดงนั่นน่ะ ใส่แล้วเลือดไหลกลับเข้าตัวว่ากันอย่างนั้น','ไปส่งพัสดุก็อย่าลืมแวะมาหาข้านะ'],inn:['เจ้าของโรงเตี้ยม','คืนนี้ลมแรง ได้ยินเสียงร้องจากถ้ำทางเหนือ','ห้องอุ่นๆ ราคา 30 ทอง นอนแล้วเลือดลมกลับมาเต็ม','บอสโลหิตออกมาแต่ตอนกลางคืนเท่านั้นนะ'],church:['มกุฎ','ศาสนจักรเก็บวิญญาณนักรบไว้หลายดวง...','ฮาสทอสกับเอเลียนาจะตื่นขึ้นเมื่อถึงเวลา','เจ้าเองก็มีเลือดปีศาจอยู่ ข้ามองออก'],barracks:['อัศวินเฝ้าโรง','อัศวินทุกคนผ่านหุ่นไม้พวกนี้มาแล้วทั้งนั้น','ท่านฮาสทอสชอบลาดตระเวนตอนหิมะตก','ถ้าเจ้าฝึกหนักพอ ข้าอาจแนะนำเจ้าให้ท่านรู้จัก'],cave:['ผู้เฝ้าถ้ำ','ข้าเฝ้าถ้ำนี้มาสิบปี ยังไม่เคยเห็นใครล้างได้หมด','หมาป่าในนั้นแข็งกว่าที่ข้างนอกมาก','ใครล้างถ้ำได้ จะได้ของดีกลับไปเสมอ']};
function talk(k,t,i){dlg(t[0],t[1+i],[['ทำธุระ',NO[k]],['คุยต่อ',()=>talk(k,t,(i+1)%(t.length-1))],['ลาก่อน',cl]])}
Object.keys(TK).forEach(k=>{NP[k]=()=>{const t=TK[k],c=g.tk=g.tk||{};c[k]=k in c?(c[k]+1)%(t.length-1):0;talk(k,t,c[k])}});
const ST=[{t:'imp',hp:40,mh:40,ar:0,sp:40,d:7,xp:15,gd:14},{t:'wolf',hp:90,mh:90,ar:8,sp:55,d:12,xp:32,gd:32},{t:'ghoul',hp:170,mh:170,ar:22,sp:45,d:18,xp:60,gd:70},{t:'wraith',hp:280,mh:280,ar:45,sp:52,d:26,xp:100,gd:130},
{t:'scorp',hp:150,mh:150,ar:20,sp:62,d:17,xp:48,gd:52},{t:'mummy',hp:260,mh:260,ar:42,sp:40,d:25,xp:82,gd:95},{t:'djinn',hp:340,mh:340,ar:70,sp:56,d:33,xp:130,gd:160},
{t:'spider',hp:190,mh:190,ar:18,sp:66,d:22,xp:68,gd:75},{t:'ape',hp:340,mh:340,ar:48,sp:48,d:30,xp:110,gd:130},{t:'drake',hp:480,mh:480,ar:75,sp:58,d:40,xp:190,gd:240}],ET={imp:{p:{R:'#b3202f',K:'#600',Y:'#ffd54a'},k:.7},ghoul:{p:{R:'#4a7a4a',K:'#1a2a1a',Y:'#ff6040'},k:.9},wraith:{p:{R:'#7ab8e8',K:'#203a5a',Y:'#fff'},k:1.1},
scorp:{p:{P:'#c08a2a',Y:'#ff4040',K:'#3a2410'},k:.7,w:1},mummy:{p:{R:'#d8cfa8',K:'#4a3a20',Y:'#7affc8'},k:.95},djinn:{p:{R:'#5a8ae0',K:'#101a4a',Y:'#ffe14a'},k:1.15},
spider:{p:{P:'#3a3a4a',Y:'#7aff3a',K:'#111'},k:.7,w:1},ape:{p:{R:'#4a6a2a',K:'#1a2a10',Y:'#ffd54a'},k:1.05},drake:{p:{R:'#1f7a4a',K:'#08241a',Y:'#ff9a2a'},k:1.2},wboss:{p:{R:'#5a0010',K:'#111',Y:'#ffd54a'},k:1.5}};
function out(e){TWS.forEach(T=>oT(e,T))}
function oT(e,TW){const m=14,L=TW.x-m,Rr=TW.x+TW.w+m,T=TW.y-m,B=TW.y+TW.h+m;if(e.x>L&&e.x<Rr&&e.y>T&&e.y<B){const a=[e.x-L,Rr-e.x,e.y-T,B-e.y],i=a.indexOf(M.min(...a));if(i==0)e.x=L;else if(i==1)e.x=Rr;else if(i==2)e.y=T;else e.y=B}}
const SH={sk:0,ln:.4,al:.2},BC=['#e9f1f8','#dde9e6','#cde4f3','#f1dfe3','#e6d29c','#35603a'],PC=['#d8e5f0','#c9ddd8','#b9d6ec','#e6c8ce','#dcc27c','#2c5230'],BN=['ทุ่งหิมะ','ป่าสนหนา','ทะเลสาบน้ำแข็ง','ป่าหิมะโลหิต','ทะเลทรายเพลิง','ป่าดงดิบลึก'],TPS=[TP,{W:'#fff',G:'#143a2e',T:'#4a3220'},TP,{W:'#e8c0c8',G:'#5a1a2a',T:'#2a1a1a'},{W:'#e8e0a0',G:'#6a9a3a',T:'#6a5a2a'},{W:'#9affb0',G:'#0f5a2a',T:'#3a2a14'}],lm=document.createElement('canvas'),lx=lm.getContext('2d');
function bio(a,b){if(M.hypot(a-700,b-500)<780||M.hypot(a-2150,b-1450)<330)return 0;
if(b>2060+M.sin(a/90)*40)return 5;      // ป่าดงดิบลึก (ทิศใต้)
if(a>2860+M.sin(b/90)*40)return 4;      // ทะเลทราย (ทิศตะวันออก)
const u=(a+M.sin(b/80)*45)/380|0,v=(b+M.sin(a/80)*45)/380|0;return[0,1,2,3,1,0,2][((u*7+v*13+u*v*5)%7+7)%7]}
const bt=(a,b,d)=>{const t=d<750?0:d<1150?1:d<1650?2:3,k=bio(a,b);return k==2?M.min(3,t+1):k==3?M.max(2,t):t};
function shd(m,X,Y,k){const h=m.length,w=m[0].length,f=v=>M.floor(v*S);x.fillStyle='rgba(10,20,40,'+SH.al+')';for(let j=0;j<h;j++){const r=h-j,ya=Y-r*k*SH.ln-cy,y0=f(ya),y1=f(ya+k*SH.ln);for(let i=0;i<w;i++)if(m[j][i]!='.'){const xa=X+(i-w/2)*k+r*k*SH.sk-cx;x.fillRect(f(xa),y0,f(xa+k)-f(xa),y1-y0)}}}
function bsh(X,Y){const h=38,f=(a,b)=>[(a-cx)*S,(b-cy)*S],a=f(X,Y+36),b=f(X+50,Y+36),c=f(X+50+h*SH.sk,Y+36-h*SH.ln),d=f(X+h*SH.sk,Y+36-h*SH.ln);x.fillStyle='rgba(10,20,40,'+SH.al+')';x.beginPath();x.moveTo(a[0],a[1]);x.lineTo(b[0],b[1]);x.lineTo(c[0],c[1]);x.lineTo(d[0],d[1]);x.fill()}
function lit(){const p=g.p,d=dark(),ph=(g.t%180)/180,dp=M.min(1,ph*2),tn=ph<.5?.14*(1-M.sin(PI*dp)):0,cw=cv.width,ch=cv.height;
if(tn>.01&&!g.sc){x.fillStyle='rgba(255,150,70,'+tn+')';x.fillRect(0,0,cw,ch)}
if(d>.02&&!g.sc){const w=cw>>1,h=ch>>1;if(lm.width!=w||lm.height!=h){lm.width=w;lm.height=h}
const Ls=[[p.x,p.y,p.form?90:75,.9,p.form?'255,60,70':'255,200,120']];
BD.forEach(b=>Ls.push([b[2]+9,b[3]+19,22,.8,'255,200,110'],[b[2]+40,b[3]+19,22,.8,'255,200,110']));
LP.forEach(a=>Ls.push([a[0],a[1],46+M.sin(g.t*9+a[0])*3+R()*2,.9,'255,210,120']));
pr.forEach(o=>Ls.push([o.x,o.y,22,.8,o.c=='#ddd'||o.k=='w'||o.k=='b'?'160,210,255':'255,60,70']));
g.en.forEach(e=>{if(e.boss||e.wb)Ls.push([e.x,e.y,50,.7,'255,60,60'])});
if(g.cir)Ls.push([g.cir.x,g.cir.y,g.cir.r,.5,'255,40,60']);
lx.globalCompositeOperation='source-over';lx.clearRect(0,0,w,h);lx.fillStyle='rgba(6,10,40,'+M.min(.85,d*1.4)+')';lx.fillRect(0,0,w,h);lx.globalCompositeOperation='destination-out';
Ls.forEach(L=>{const sx=(L[0]-cx)*S/2,sy=(L[1]-cy)*S/2,r=L[2]*S/2;if(sx<-r||sy<-r||sx>w+r||sy>h+r)return;const g2=lx.createRadialGradient(sx,sy,0,sx,sy,r);g2.addColorStop(0,'rgba(0,0,0,'+L[3]+')');g2.addColorStop(1,'rgba(0,0,0,0)');lx.fillStyle=g2;lx.fillRect(sx-r,sy-r,r*2,r*2)});
x.imageSmoothingEnabled=true;x.drawImage(lm,0,0,cw,ch);x.globalCompositeOperation='lighter';
Ls.forEach(L=>{const sx=(L[0]-cx)*S,sy=(L[1]-cy)*S,r=L[2]*S;if(sx<-r||sy<-r||sx>cw+r||sy>ch+r)return;const g2=x.createRadialGradient(sx,sy,0,sx,sy,r);g2.addColorStop(0,'rgba('+L[4]+','+.3*d/.6+')');g2.addColorStop(1,'rgba('+L[4]+',0)');x.fillStyle=g2;x.fillRect(sx-r,sy-r,r*2,r*2)});x.globalCompositeOperation='source-over'}
const v=x.createRadialGradient(cw/2,ch/2,ch*.45,cw/2,ch/2,cw*.65);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(5,10,30,.35)');x.fillStyle=v;x.fillRect(0,0,cw,ch)}
const LP=[[580,400],[820,400],[580,600],[820,600],[640,300],[760,300],[640,700],[760,700],[480,500],[920,500]];
const ACT=[['up','เดินขึ้น'],['down','เดินลง'],['left','เดินซ้าย'],['right','เดินขวา'],['atk','โจมตี'],['s1','สกิล 1'],['s2','สกิล 2'],['s3','สกิล 3'],['heal','ฮีล'],['q0','ขนมปัง'],['q1','ชามานา'],['use','คุย/โต้ตอบ'],['menu','เมนู'],['bag','กระเป๋า']];
const KB={up:'w',down:'s',left:'a',right:'d',atk:' ',s1:'1',s2:'2',s3:'3',heal:'h',q0:'q',q1:'e',use:'f',menu:'m',bag:'b'},CF={m:.5,s:.7,on:1,bs:1,js:1};let capK=null,AC=null,mg,sg,nxt=0,bar=0,lsT=0,AIM=null;
try{const c=JSON.parse(localStorage.getItem('wr:cfg'));if(c){Object.assign(KB,c.kb);Object.assign(CF,c.cf)}}catch(e){}
const savecfg=()=>{try{localStorage.setItem('wr:cfg',JSON.stringify({kb:KB,cf:CF}))}catch(e){}};
function save(){if(!g||!NET.ok)return;NET.send({t:'save',save:{p:g.sc?Object.assign({},g.p,{x:g.sc.ex.x,y:g.sc.ex.y}):g.p,t:g.t}})}
addEventListener('pagehide',save);document.addEventListener('visibilitychange',()=>document.hidden&&save());
addEventListener('pointerdown',()=>{aud();AC&&AC.resume()});
const vols=()=>{if(AC){mg.gain.value=CF.on?CF.m*.25:0;sg.gain.value=CF.s*.5}};
function aud(){if(AC)return;try{AC=new(window.AudioContext||window.webkitAudioContext)();mg=AC.createGain();sg=AC.createGain();mg.connect(AC.destination);sg.connect(AC.destination);vols();nxt=AC.currentTime+.1;setInterval(mus,200)}catch(e){}}
function tone(f,t,d,ty,v,dest){const o=AC.createOscillator(),a=AC.createGain();o.type=ty;o.frequency.value=f;a.gain.setValueAtTime(0,t);a.gain.linearRampToValueAtTime(v,t+.02);a.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(a);a.connect(dest);o.start(t);o.stop(t+d+.05)}
const NT=[57,60,64,60,55,59,62,59,53,57,60,57,52,56,59,64],mf=n=>440*2**((n-69)/12);
function mus(){if(!AC||!CF.on||!g)return;while(nxt<AC.currentTime+.6){const i=bar%16,sp=dark()>.3?.7:1;tone(mf(NT[i]),nxt,.5,'triangle',.5,mg);if(i%4==0){tone(mf(NT[i]-24),nxt,1.8,'sine',.6,mg);tone(mf(NT[i]-12),nxt,1.8,'sine',.25,mg)}nxt+=.42/sp;bar++}}
function nz(t,d,v,f0,f1){const n=AC.sampleRate*d|0,b=AC.createBuffer(1,n,AC.sampleRate),a=b.getChannelData(0);for(let i=0;i<n;i++)a[i]=(R()*2-1)*(1-i/n);const s=AC.createBufferSource(),f=AC.createBiquadFilter(),g2=AC.createGain();s.buffer=b;f.type='bandpass';f.frequency.setValueAtTime(f0,t);f.frequency.exponentialRampToValueAtTime(f1,t+d);g2.gain.value=v;s.connect(f);f.connect(g2);g2.connect(sg);s.start(t)}
function sw(f0,f1,t,d,ty,v){const o=AC.createOscillator(),a=AC.createGain();o.type=ty;o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+d);a.gain.setValueAtTime(v,t);a.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(a);a.connect(sg);o.start(t);o.stop(t+d+.05)}
function sfx(k){if(!AC||AC.state!='running')return;const t=AC.currentTime;if(t-lsT<.04&&k!='l')return;lsT=t;
({h:()=>{nz(t,.08,.6,1800,300);sw(200,80,t,.08,'square',.3)},k:()=>{nz(t,.1,.7,4000,800);sw(900,1800,t,.15,'triangle',.4);sw(1200,2400,t+.06,.15,'sine',.3)},w:()=>nz(t,.18,.5,500,3000),c1:()=>{sw(300,1200,t,.18,'sawtooth',.3);nz(t,.15,.4,800,4000)},c2:()=>{sw(500,900,t,.3,'triangle',.4);sw(700,1400,t+.05,.3,'sine',.3)},c3:()=>{sw(120,40,t,.5,'sawtooth',.5);sw(200,800,t,.5,'triangle',.3)},g:()=>[523,659,784,1047].forEach((f,i)=>sw(f,f,t+i*.07,.25,'sine',.3)),x:()=>{sw(1319,1319,t,.08,'square',.2);sw(1760,1760,t+.07,.2,'square',.2)},b:()=>{sw(90,30,t,.8,'sawtooth',.6);nz(t,.6,.8,2000,100)},u:()=>{sw(300,100,t,.25,'sawtooth',.4);nz(t,.1,.4,600,200)},l:()=>[523,659,784,1047,1319].forEach((f,i)=>sw(f,f,t+i*.09,.35,'triangle',.4)),d:()=>sw(300,50,t,.9,'sawtooth',.5)})[k]?.()}
function cfgp(){const h=[()=>{CF.on=!CF.on;savecfg();vols();cfgp()}];ACT.forEach((a,i)=>h[i+1]=()=>{capK=i;cfgp()});h[20]=sv2;h[22]=imgp;h[21]=menu;
ov('<div class=bx><b>⚙ ตั้งค่า</b><div class=r><span>🎵 เพลง</span><input id=vm type=range min=0 max=1 step=.05 value='+CF.m+' style="width:110px;margin:0"><button data-i=0 style="width:60px">'+(CF.on?'เปิด':'ปิด')+'</button></div><div class=r><span>🔊 เอฟเฟกต์</span><input id=vs type=range min=0 max=1 step=.05 value='+CF.s+' style="width:110px;margin:0"></div><div class=r><span>📱 ขนาดปุ่มสกิล</span><input id=vb type=range min=.6 max=1.6 step=.05 value='+CF.bs+' style="width:110px;margin:0"></div><div class=r><span>🕹 ขนาดจอยสติ๊ก</span><input id=vj type=range min=.6 max=1.6 step=.05 value='+CF.js+' style="width:110px;margin:0"></div><p>ปุ่มลัด (คลิกเพื่อเปลี่ยน แล้วกดปุ่มใหม่)</p>'+ACT.map((a,i)=>'<div class=r><span>'+a[1]+'</span><button data-i='+(i+1)+' style="width:90px">'+(capK==i?'กดปุ่ม...':KB[a[0]]==' '?'Space':KB[a[0]].toUpperCase())+'</button></div>').join('')+'<button data-i=22>🖼 รูปสกิล/ตัวละคร</button><button data-i=20>ส่งออก/นำเข้าเซฟ</button><button data-i=21>กลับ</button></div>',h);
$('vm').oninput=e=>{CF.m=+e.target.value;savecfg();vols()};$('vs').oninput=e=>{CF.s=+e.target.value;savecfg();vols()};$('vb').oninput=e=>{CF.bs=+e.target.value;savecfg();ui()};$('vj').oninput=e=>{CF.js=+e.target.value;savecfg();ui()}}
function sv2(){ov('<div class=bx><b>ส่งออก/นำเข้าเซฟ</b><p>กด "แสดงเซฟ" แล้วคัดลอกไว้สำรอง หรือวางเซฟเดิมแล้วกดนำเข้า</p><textarea id=ex style="width:100%;height:110px;background:#0b1220;color:#e8eefc"></textarea><button data-i=0>แสดงเซฟปัจจุบัน</button><button data-i=1>นำเข้า</button><button data-i=2>กลับ</button></div>',[()=>{$('ex').value=JSON.stringify({p:g.p,t:g.t})},()=>{try{const d=JSON.parse($('ex').value);if(!d.p)throw 0;g.p=Object.assign(fresh().p,d.p,{ch:0,s1:0,dash:null,form:0,hold:0,cd:[0,0,0,0]});g.t=d.t||g.t;save();say('นำเข้าแล้ว')}catch(e){say('ข้อมูลไม่ถูกต้อง')}},cfgp])}
const BMAP=document.createElement('canvas');BMAP.width=210;BMAP.height=150;{const q=BMAP.getContext('2d'),C=['#dfeaf5','#4f8a6e','#7cc4f0','#c45a6a','#e0c47a','#2f6a3a'];for(let i=0;i<210;i++)for(let j=0;j<150;j++){q.fillStyle=C[bio(i*20+10,j*20+10)];q.fillRect(i,j,1,1)}q.fillStyle='#c9a96a';TWS.forEach(T=>q.fillRect(T.x/20,T.y/20,T.w/20,T.h/20));q.fillStyle='#222';q.fillRect(1250/20-1,150/20-1,3,3);q.fillRect(DG.x/20,DG.y/20,DG.w/20,DG.h/20);q.fillStyle='#fff';q.fillRect(CAB.x/20-1,CAB.y/20-1,2,2)}
function bigmap(){if(!g)return;ov('<div class=bx style="max-width:620px"><b>แผนที่</b><canvas id=bm width=560 height=400 style="width:100%;image-rendering:pixelated"></canvas><p><span style="color:#dfeaf5">■</span> ทุ่งหิมะ <span style="color:#4f8a6e">■</span> ป่าสน <span style="color:#7cc4f0">■</span> ทะเลสาบน้ำแข็ง <span style="color:#c45a6a">■</span> ป่าโลหิต <span style="color:#e0c47a">■</span> ทะเลทราย <span style="color:#2f6a3a">■</span> ป่าดงดิบ <span style="color:#c9a96a">■</span> เมือง ⬛ ถ้ำ/ดันเจี้ยน ⬜ กระท่อม</p><button data-i=0>ปิด</button></div>',[cl]);const q=$('bm').getContext('2d'),k=560/WW;q.imageSmoothingEnabled=false;q.drawImage(BMAP,0,0,560,400);q.fillStyle='#c0283c';g.en.forEach(e=>{if(e.boss||e.wb)q.fillRect(e.x*k-3,e.y*k-3,6,6)});q.fillStyle='#fff';q.strokeStyle='#000';q.beginPath();q.arc(g.p.x*k,g.p.y*k,5,0,7);q.fill();q.stroke()}
$('mm').onclick=bigmap;$('bagb').onclick=bag;

const CT=['🛡 เกราะ','⚔ ของกายภาพ','✨ ของเวท','💍 ไอเทมเสริม','🍞 อาหารและยา'];
const SD=[['อัปเกรดการโจมตีปกติครั้งถัดไปภายใน 3 วิ ถ้ามีเป้าหมายในระยะ จะพุ่งเข้าฟัน สตั้น 0.75 วิ ดาเมจ 180% คูลดาวน์เริ่มนับหลังโจมตีหรือหมดเวลา','กดค้างเพื่อวิ่งเร็วสูงสุด 5 วิ (คูลดาวน์เริ่มนับตอนปล่อย) ถ้ากดค้างถึง 2 วิขึ้นไป พอปล่อยจะตีระยะใกล้ไวขึ้น 5 วิ ในวงฤดูหนาว +40% นับ 3 hit ต่อการตี นอกวง +25% นับ 2 hit'],
['ถ้าศัตรูอยู่ใกล้จะฟันยกให้ลอย 0.8 วิ แล้วปล่อยคลื่นดาบ 2 ลูกวิ่งขนานกันเป็นเส้นตรง ทะลุศัตรูและชะลอความเร็ว ลากปุ่มเพื่อเลือกทิศได้','ในวงฤดูหนาว พุ่งไปข้างหน้าเป็นเส้นตรงแล้วควงเคียวเป็น AoE รอบตัว นอกวงจะฟันเคียวไปข้างหน้า 6 ครั้งพร้อมผลักศัตรู ครั้งสุดท้ายแรงที่สุด'],
['ชาร์จ 3 วิ (ขยับไม่ได้) แล้วเปลี่ยนเป็นร่างโลหิต 30 วิ พร้อมสร้างวงฤดูหนาวสีแดงชาดรัศมีกว้าง 25 วิ ในวงจะดูดเลือด ดาเมจ และความเร็วเพิ่มขึ้น คูลดาวน์ 20 วิ เริ่มนับเมื่อหมดร่าง','ในวง: ขังเป้าหมาย 1 วิ แล้วสร้างความเสียหายจริง 75% ของ HP สูงสุด (บอสโดนแค่ 20%) ถ้าตายจะระเบิด AoE ขนาดเท่าวงหลัง 5 วิ นอกวง: ยิงกระสุนเลือดใหญ่ เสีย HP ตัวเอง 35% แลกกับความเสียหายจริง 16% ของ HP สูงสุดเป้าหมาย']],
PS='ดูดเลือด 25% ทุกการโจมตี (+10% ในร่างโลหิตหรือในวง) • โจมตีใกล้ตีไวดาเมจต่ำ โจมตีไกลปามีดแรงกว่า ครั้งที่ 3 เคลือบมนต์วนสี แดง=ระเบิดรอบเป้าหมาย 50% น้ำเงิน=ลดคูลดาวน์สกิล 1-2 ลง 0.5 วิ เหลือง=ชะลอศัตรู • ร่างโลหิตยิงกระสุนเลือด ทุกนัดที่ 2 เคลือบ แดงเข้ม=ดาเมจ+ชะลอ+ระเบิด แดงสด=ลดคูลดาวน์ 0.5 วิ';
const SDH=()=>'<p>Passive: '+PS+'</p>'+SD.map((d,i)=>'<p><b>'+(i+1)+'. '+SN[i][0]+' / '+SN[i][1]+'</b><br><small>ร่างปกติ: '+d[0]+'<br>ร่างโลหิต: '+d[1]+'</small></p>').join('');
function ui(){const s=document.documentElement.style;s.setProperty('--bs',CF.bs);s.setProperty('--js',CF.js)}ui();
function guest(){aud();FS();gst=1;me='~guest';pass='';let s=null;try{s=JSON.parse(localStorage.getItem('wr:~guest'))}catch(e){}g=fresh();if(s&&s.p){Object.assign(g.p,s.p,{ch:0,s1:0,dash:null,form:0,bt:0,fast:0,hb:0,hold:0,cd:[0,0,0,0]});g.t=s.t;go()}else pick();say('Guest: เซฟอยู่เฉพาะเครื่องนี้')}
const PT=[],FX=[];let SK=0,HS=0,FL=null;
function pt(o){if(PT.length>900)return;const q=Object.assign({vx:0,vy:0,g:0,l:.6,s:1.2,c:'#fff',k:0},o);q.m=q.l;PT.push(q)}
function puff(X,Y,n,c,sp,l,s,gv,add){for(let i=0;i<n;i++){const a=R()*2*PI,v=sp*(.3+R()*.7);pt({x:X,y:Y,vx:M.cos(a)*v,vy:M.sin(a)*v,l:l*(.6+R()*.8),s:s*(.6+R()*.8),c,g:gv||0,k:add?1:0})}}
const ring=(X,Y,r,c)=>{if(NFX)nfx({t:'rg',x:X,y:Y,r,c});return FX.push({t:'r',x:X,y:Y,r,c,l:.45,m:.45})},swing=(a,c,r)=>{sfx('w');if(NFX)nfx({t:'sw',x:g.p.x,y:g.p.y,a,c,r});FX.push({t:'s',x:g.p.x,y:g.p.y,a,c,r,l:.2,m:.2})},bx=(X,Y,r)=>FX.push({t:'c',x:X,y:Y,r,l:5,m:5});
function streak(x1,y1,x2,y2,c){if(NFX)nfx({t:'sk',a:[x1,y1,x2,y2],c});for(let i=0;i<16;i++){const t=i/15;pt({x:x1+(x2-x1)*t,y:y1+(y2-y1)*t,vx:(R()-.5)*14,vy:(R()-.5)*14,l:.35+R()*.2,s:1.6,c,k:1})}}
function boom(X,Y,r){sfx('b');ring(X,Y,r,'#ff2a4a');ring(X,Y,r*.6,'#fff');puff(X,Y,60,'#ff3a4a',140,.8,1.8,0,1);SK=11;FL=[.45,'255,60,70'];HS=.07}
function spin(X,Y){ring(X,Y,55,'#ff3a5a');for(let i=0;i<18;i++){const a=i/18*2*PI;pt({x:X,y:Y,vx:M.cos(a)*120,vy:M.sin(a)*120,l:.4,s:2,c:'#ff5a6a',k:1})}}
function slam(e){ring(e.x,e.y,50,'#fff');ring(e.x,e.y,80,'#ff2a4a');puff(e.x,e.y,40,'#ff2a4a',160,.6,1.8,0,1);SK=14;FL=[.6,'255,255,255'];HS=.12}
function hfx(e,d,tr){const p=g.p,a=M.atan2(e.y-p.y,e.x-p.x),big=tr||d>AT()*1.5;puff(e.x,e.y-3,5+M.min(10,d/8|0),'#c0283c',70,.45,1.2,260);puff(e.x,e.y-3,4,'#fff',120,.2,1,0,1);e.fl=.1;if(!tr){e.x+=M.cos(a)*2.5;e.y+=M.sin(a)*2.5}if(big){SK=M.max(SK,4);HS=M.max(HS,.04)}else SK=M.max(SK,1)}
function dfx(e){const b=e.boss;puff(e.x,e.y,b?70:18,'#c0283c',b?150:80,.7,b?2:1.3,200);puff(e.x,e.y,b?20:6,'#fff',100,.25,1.2,0,1);for(let i=0;i<(b?14:5);i++)pt({x:e.x+(R()-.5)*8,y:e.y,vx:(R()-.5)*16,vy:-26-R()*34,l:1.1,s:1.8,c:'#9fdcff',k:1});ring(e.x,e.y,b?70:26,b?'#ff3a5a':'#c0283c');if(b){SK=16;FL=[.5,'255,255,255'];HS=.15}else SK=M.max(SK,2.5)}
function healfx(c){const p=g.p;sfx('g');ring(p.x,p.y,24,c);for(let i=0;i<16;i++)pt({x:p.x+(R()-.5)*16,y:p.y+(R()-.5)*8,vx:(R()-.5)*8,vy:-30-R()*30,l:.9,s:1.6,c,k:1})}
function lvfx(){const p=g.p;ring(p.x,p.y,40,'#ffd54a');ring(p.x,p.y,70,'#fff');puff(p.x,p.y,40,'#ffd54a',120,1,1.6,-60,1);SK=6;FL=[.35,'255,220,100']}
function hurtfx(){const p=g.p;sfx('u');puff(p.x,p.y-2,8,'#c0283c',80,.4,1.2,240);SK=M.max(SK,3);if(!FL||FL[0]<.1)FL=[.15,'255,40,40']}
function trail(o){pt({x:o.x-o.vx*.02,y:o.y-o.vy*.02,vx:(R()-.5)*14,vy:(R()-.5)*14,l:.3,s:o.k=='w'?1.8:1.1,c:o.c||'#fff',k:1})}
function fxu(dt){const p=g.p;hxu(dt);
for(let i=PT.length-1;i>=0;i--){const q=PT[i];q.x+=q.vx*dt;q.y+=q.vy*dt;q.vy+=q.g*dt;if((q.l-=dt)<=0)PT.splice(i,1)}
for(let i=FX.length-1;i>=0;i--)if((FX[i].l-=dt)<=0)FX.splice(i,1);
g.en.forEach(e=>{if(e.fl>0)e.fl-=dt});
if(p.mv&&R()<dt*14)pt({x:p.x+(R()-.5)*4,y:p.y+6,vx:(R()-.5)*10,vy:-6-R()*8,l:.4,s:1.3});
if(p.s1>0&&R()<dt*40)pt({x:p.x+(R()-.5)*10,y:p.y+(R()-.5)*12,vy:-30,l:.5,s:1.1,c:'#ffe14a',k:1});
if(p.hold&&R()<dt*60)pt({x:p.x+(R()-.5)*6,y:p.y+4,vx:-M.cos(p.a)*40,vy:-M.sin(p.a)*40,l:.35,s:1.6,c:'#ff3a5a',k:1});
if(p.form&&R()<dt*50)pt({x:p.x+(R()-.5)*8,y:p.y+4,vx:(R()-.5)*8,vy:-24-R()*20,l:.6,s:1.4,c:R()<.5?'#ff3a5a':'#8a0018',k:1});
if(p.ch>0){const a=R()*2*PI,r=30;pt({x:p.x+M.cos(a)*r,y:p.y+M.sin(a)*r*.6,vx:-M.cos(a)*r*2.2+M.sin(a)*40,vy:-M.sin(a)*r*1.3-6,l:.45,s:1.5,c:'#ff2a4a',k:1});if(R()<dt*8)ring(p.x,p.y,34,'#ff2a4a')}
if(g.cir&&R()<dt*90){const a=R()*2*PI,r=g.cir.r*M.sqrt(R());pt({x:g.cir.x+M.cos(a)*r,y:g.cir.y+M.sin(a)*r,vy:-14-R()*12,vx:(R()-.5)*6,l:1.2,s:1.2,c:R()<.5?'#ff5a6a':'#fff',k:1})}
pr.forEach(o=>{if(R()<dt*60)trail(o)});
if(!g.sc&&R()<dt*50){const X=cx+R()*W,Y=cy+R()*H,k=bio(X,Y);if(k==1&&dark()>.3)pt({x:X,y:Y,vx:(R()-.5)*10,vy:(R()-.5)*8,l:2.5,s:1.3,c:'#d6ff6a',k:1});else if(k==2)pt({x:X,y:Y,l:.9,s:1.4,k:1});else if(k==3)pt({x:X,y:Y+8,vx:(R()-.5)*8,vy:-18-R()*14,l:2,s:1.2,c:'#ff6a3a',k:1})}
if(!g.sc&&D({x:700,y:500},p)<W&&R()<dt*40)pt({x:700+(R()-.5)*8,y:488,vx:(R()-.5)*30,vy:-40-R()*20,g:120,l:.7,s:1,c:'#8fd0ff',k:1});
const B=g.en.find(e=>e.boss);if(B&&R()<dt*40)pt({x:B.x+(R()-.5)*16,y:B.y+6,vx:(R()-.5)*10,vy:-26-R()*16,l:.9,s:1.8,c:'#ff2a2a',k:1});
if(p.lg>0)p.lg=M.max(0,p.lg-dt*20)}
function drawfx(){const f=v=>M.floor(v*S);for(const ps of[0,1]){x.globalCompositeOperation=ps?'lighter':'source-over';PT.forEach(q=>{if((q.k?1:0)!=ps)return;const a=q.l/q.m,s=q.s*(q.k?a*.5+.6:1);x.globalAlpha=M.min(1,a*1.6);x.fillStyle=q.c;x.fillRect(f(q.x-cx-s/2),f(q.y-cy-s/2),M.max(1,f(s)),M.max(1,f(s)))})}x.globalAlpha=1;x.globalCompositeOperation='source-over';
FX.forEach(e=>{const t=1-e.l/e.m,X=(e.x-cx)*S,Y=(e.y-cy)*S;x.globalAlpha=1-t;if(e.t=='r'){x.strokeStyle=e.c;x.lineWidth=S*(2.5-2*t);x.beginPath();x.ellipse(X,Y,e.r*t*S,e.r*t*S*.6,0,0,7);x.stroke()}else if(e.t=='s'){x.strokeStyle=e.c;x.lineWidth=S*(5*(1-t)+1);x.lineCap='round';x.beginPath();x.arc(X,Y,e.r*S*(.7+.5*t),e.a-1.2+t*.6,e.a+1.2*(t+.4));x.stroke();x.lineCap='butt'}else{x.globalAlpha=.8;x.strokeStyle='#ff2a4a';x.lineWidth=S*1.5;x.beginPath();x.arc(X,Y,e.r*S*(1-t),0,7);x.stroke();x.beginPath();x.arc(X,Y,e.r*S*(1-t)*.4,0,7);x.stroke()}});x.globalAlpha=1}
function prj(o){if(o.bm)return bmd(o);const X=(o.x-cx)*S,Y=(o.y-cy)*S,a=M.atan2(o.vy,o.vx),r=o.r*S*(o.k=='w'?2.2:o.tr?3:1.8),gr=x.createRadialGradient(X,Y,0,X,Y,r);x.globalCompositeOperation='lighter';gr.addColorStop(0,o.c||'#fff');gr.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=gr;x.beginPath();x.arc(X,Y,r,0,7);x.fill();x.globalCompositeOperation='source-over';
if(o.k=='w'){x.strokeStyle='#e8f6ff';x.lineWidth=S*2.5;x.lineCap='round';x.beginPath();x.arc(X-M.cos(a)*5*S,Y-M.sin(a)*5*S,15*S,a-.9,a+.9);x.stroke();x.lineCap='butt'}else{x.save();x.translate(X,Y);x.rotate(g.t*20);x.fillStyle=o.c||'#ddd';const s=o.r*S*.7;x.fillRect(-s,-s/2,s*2,s);x.fillRect(-s/2,-s,s,s*2);x.restore()}}
function cirfx(c){const X=(c.x-cx)*S,Y=(c.y-cy)*S,r=c.r*S,pl=.5+.5*M.sin(g.t*3),gr=x.createRadialGradient(X,Y,r*.2,X,Y,r);gr.addColorStop(0,'rgba(192,40,60,.06)');gr.addColorStop(1,'rgba(192,40,60,'+(.22+.1*pl)+')');x.fillStyle=gr;x.beginPath();x.arc(X,Y,r,0,2*PI);x.fill();x.strokeStyle='#ff2a4a';x.lineWidth=S*1.5;x.setLineDash([S*8,S*5]);x.lineDashOffset=-g.t*S*20;x.stroke();x.setLineDash([]);x.strokeStyle='rgba(255,90,110,.45)';x.lineWidth=S;x.beginPath();x.arc(X,Y,r*.72,0,2*PI);x.stroke();if(c.t<3){x.globalAlpha=.4+.4*M.sin(g.t*20);x.stroke();x.globalAlpha=1}}
function cage(e){x.strokeStyle='#ff2a4a';x.lineWidth=S;for(let i=0;i<6;i++){const q=g.t*3+i*PI/3,bx=(e.x+M.cos(q)*13-cx)*S,by=(e.y+M.sin(q)*6-16-cy)*S;x.beginPath();x.moveTo(bx,by);x.lineTo(bx,by+22*S);x.stroke()}x.beginPath();x.ellipse((e.x-cx)*S,(e.y-5-cy)*S,13*S,6*S,0,0,7);x.stroke()}
const IS=[['atk','โจมตีปกติ'],['s1n','สกิล 1 ร่างปกติ'],['s1b','สกิล 1 ร่างโลหิต'],['s2n','สกิล 2 ร่างปกติ'],['s2b','สกิล 2 ร่างโลหิต'],['s3n','สกิล 3 ร่างปกติ'],['s3b','สกิล 3 ร่างโลหิต'],['face','Winter (เลือก/เปลี่ยนตัวละคร)'],['hastos','Hastos'],['eliana','Eliana']],GEN={},IMG={};
function gen(k){const c=document.createElement('canvas');c.width=c.height=64;const q=c.getContext('2d'),bl=k.endsWith('b'),P=k=='atk'?['#ffd54a','#5a3a0a']:/^[khedngp](\d|atk)/.test(k)?(k=='g1b'||k=='g2b'?['#b0182e','#1a0206']:{k:['#9aa4bd','#2a3044'],h:['#4cd06a','#0f3a1c'],e:['#ff6a7a','#4a0a14'],d:['#a07af0','#2a1a5a'],n:['#3affff','#0a3a4a'],g:['#f0e0a0','#5a4a10'],p:['#7aff9a','#0a3a1a']}[k[0]]):bl?['#ff4a62','#3a0610']:['#3a8aff','#0f2a5a'],gr=q.createRadialGradient(32,26,4,32,32,44);gr.addColorStop(0,P[0]);gr.addColorStop(1,P[1]);q.fillStyle=gr;q.fillRect(0,0,64,64);
const st=(a,c,w)=>{q.strokeStyle=c;q.lineWidth=w;q.lineCap='round';q.beginPath();a.forEach(p=>{q.moveTo(p[0],p[1]);q.lineTo(p[2],p[3])});q.stroke()};
if(['face','knight','hastos','eliana','decibus','enigma','kamnan','hepta'].includes(k)){q.imageSmoothingEnabled=false;const PL={face:{C:'#2a5db0',H:'#2a5db0'},knight:{C:'#7d8599',H:'#4a5268'},hastos:{C:'#2f7a45',H:'#e8e8d0',K:'#3fbf5a'},eliana:{C:'#f2f2f2',H:'#f2f2f2',K:'#f5f5f5',Y:'#c0283c'}},hk={knight:'k',hastos:'h',eliana:'e',decibus:'d',enigma:'n',kamnan:'g',hepta:'p'}[k],b=hk?bake(SPR[hk],PALS[hk]):bake(MAN,Object.assign({},BP,PL[k]));q.fillStyle='#16264a';q.fillRect(0,0,64,64);q.drawImage(b,0,0,b.width,b.height*.72,2,6,60,53);return c.toDataURL()}
q.fillStyle='#fff';q.strokeStyle='#fff';
({k1:()=>{q.beginPath();q.moveTo(32,8);q.lineTo(52,18);q.lineTo(48,42);q.lineTo(32,56);q.lineTo(16,42);q.lineTo(12,18);q.closePath();q.fill()},k2:()=>{q.lineWidth=5;q.beginPath();q.arc(32,34,18,0,7);q.stroke();st([[32,34,32,8],[32,34,10,52],[32,34,54,52]],'#fff',4)},k3:()=>{q.lineWidth=6;q.lineCap='round';q.beginPath();q.arc(22,32,26,-1,1);q.stroke();st([[34,50,50,14]],'#fff',5)},katk:()=>{st([[14,52,50,14]],'#fff',6);st([[10,42,24,54]],'#cfd8ff',5)},h1:()=>{[8,24].forEach(u=>{q.lineWidth=5;q.lineCap='round';q.beginPath();q.arc(u,32,28,-.8,.8);q.stroke()})},h2:()=>{q.beginPath();q.moveTo(32,8);q.lineTo(52,18);q.lineTo(48,42);q.lineTo(32,56);q.lineTo(16,42);q.lineTo(12,18);q.closePath();q.fill();st([[32,14,32,50],[20,24,44,24],[20,36,44,36]],'#1c5a2a',3)},h3:()=>{for(let i=0;i<5;i++){q.beginPath();q.moveTo(8+i*11,54);q.lineTo(13+i*11,18+(i%2)*10);q.lineTo(18+i*11,54);q.fill()}},hatk:()=>{st([[14,52,50,14]],'#fff',6);st([[8,36,22,52]],'#c8ffc8',5)},e1:()=>{st([[32,54,12,14],[32,54,32,8],[32,54,52,14]],'#fff',5)},e2:()=>{q.lineWidth=5;q.beginPath();q.arc(30,28,14,.5,4.5);q.stroke();st([[40,38,54,56]],'#fff',5)},e3:()=>{st([[16,10,30,54],[28,8,42,52],[40,6,54,50]],'#fff',5)},eatk:()=>{st([[20,10,36,54],[34,8,50,50]],'#fff',5)},atk:()=>{st([[14,50,50,14]],'#fff',6);st([[14,14,50,50]],'#e0f0ff',5)},s1n:()=>{st([[10,32,48,32],[38,22,50,32],[38,42,50,32]],'#fff',5);st([[10,20,26,20],[10,44,26,44]],'#bfe0ff',3)},s1b:()=>{q.beginPath();q.moveTo(34,8);q.quadraticCurveTo(56,38,34,54);q.quadraticCurveTo(12,38,34,8);q.fill();st([[6,24,18,24],[6,40,18,40]],'#ffb0b8',3)},s2n:()=>{[16,30].forEach(u=>{q.lineWidth=5;q.lineCap='round';q.beginPath();q.arc(u,32,24,-1,1);q.stroke()})},s2b:()=>{q.lineWidth=7;q.lineCap='round';q.beginPath();q.arc(34,36,20,3.7,5.8);q.stroke();st([[14,54,40,26]],'#ffb0b8',4)},s3n:()=>{q.lineWidth=4;q.beginPath();q.arc(32,32,22,0,7);q.stroke();st([[20,20,44,44],[44,20,20,44]],'#fff',5)},s3b:()=>{q.lineWidth=3;q.beginPath();q.arc(32,32,16,0,7);q.stroke();st([[32,6,32,20],[32,44,32,58],[6,32,20,32],[44,32,58,32]],'#fff',4);q.beginPath();q.arc(32,32,4,0,7);q.fill()}})[k]?.();(HIC[k]||0)&&HIC[k](q,st);
return c.toDataURL()}
const icon=k=>IMG[k]||GEN[k]||(GEN[k]=gen(k));
function setIcon(b,k){if(b.dataset.ic!=k){b.dataset.ic=k;b.textContent='';b.style.backgroundImage='url('+icon(k)+')';b.style.backgroundSize='cover';b.style.backgroundPosition='center'}}
const rfi=()=>['b0','b1','b2','bA'].forEach(id=>{$(id).dataset.ic=''});
function prb(k){if(IMG[k])return;const im=new Image();im.onload=()=>{IMG[k]=im.src;rfi()};im.src='img/'+k+'.png'}
IS.forEach(a=>{let d=null;try{d=localStorage.getItem('wr:img:'+a[0])}catch(e){}if(d)IMG[a[0]]=d;else prb(a[0])});
function upl(k){const f=document.createElement('input');f.type='file';f.accept='image/*';f.onchange=()=>{const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const c=document.createElement('canvas');c.width=c.height=128;const q=c.getContext('2d'),s=M.max(128/im.width,128/im.height);q.drawImage(im,(128-im.width*s)/2,(128-im.height*s)/2,im.width*s,im.height*s);const d=c.toDataURL('image/png');try{localStorage.setItem('wr:img:'+k,d)}catch(e){say('รูปใหญ่เกินที่เก็บได้');return}IMG[k]=d;rfi();imgp()};im.src=r.result};r.readAsDataURL(f.files[0])};f.click()}
function imgp(){const h=[];IS.forEach((a,i)=>{h[i]=()=>upl(a[0]);h[i+20]=()=>{try{localStorage.removeItem('wr:img:'+a[0])}catch(e){}delete IMG[a[0]];prb(a[0]);rfi();imgp()}});h[40]=cfgp;
ov('<div class=bx><b>🖼 รูปสกิล/ตัวละคร</b><p><small>อัปโหลดรูป (สี่เหลี่ยมจัตุรัสสวยสุด) ระบบครอบและย่อเป็น 128px เก็บในเบราว์เซอร์นี้ หรือวางไฟล์ไว้ในโฟลเดอร์ img/ ตามชื่อไฟล์ที่แสดง</small></p>'+IS.map((a,i)=>'<div class=r><img class=th src="'+icon(a[0])+'"><span>'+a[1]+'<br><small>'+a[0]+'.png</small></span><button data-i='+i+' style="width:70px">อัปโหลด</button><button data-i='+(i+20)+' style="width:50px">รีเซ็ต</button></div>').join('')+'<button data-i=40>กลับ</button></div>',h)}
const SW=()=>'<div style="display:flex;gap:6px;margin-bottom:6px">'+Object.keys(HI).map(h=>[HI[h].pk,HI[h].n]).map(a=>'<div style="text-align:center;font-size:11px"><img class=pt style="float:none;margin:0" src="'+icon(a[0])+'"><br>'+a[1]+'</div>').join('')+'</div>';
const DY=()=>1+(g.t/180|0),BH=()=>900*(1+.1*(DY()-1)),CQ=['⚔ ล่ามอนสเตอร์','📦 ส่งของ','🛡 คุ้มกัน','🏠 งานชาวบ้าน'];
QS.push({c:3,n:'กำจัดอิมป์ที่รบกวนไร่ 4 ตัว',k:'kill',t:'imp',need:4,gold:180,xp:60},{c:3,n:'ล่าหมาป่าที่ขโมยแกะ 3 ตัว',k:'kill',t:'wolf',need:3,gold:300,xp:110},{c:3,n:'เอาขนมปังไปให้ 3 ชิ้น',k:'pay',gold:220,xp:60});
const HQ=()=>QS.map((s,i)=>[s,i]).filter(a=>a[0].c==3);
NP.house=b=>{const p=g.p,q=p.q,src=b[2]+','+b[3],RG=x=>x[2]>2800?4:x[3]>2060?5:0,rg=RG(b),H=BD.filter(x=>x[0]=='house'&&RG(x)==rg),L=HQ().filter(a=>(a[0].rg||0)==rg),my=L[H.indexOf(b)%L.length];
if(q&&QS[q.id].c==3&&q.src==src){const s=QS[q.id];if(s.k=='pay'&&!q.done&&p.pot[0]>=3&&g.t-(NET.qt||0)>1){NET.qt=g.t;NET.send({t:'qd',w:'pay'})}if(q.done)return dlg('ชาวเมือง','ขอบคุณมาก! รางวัลเล็กน้อย '+s.gold+' ทอง',[['รับรางวัล',()=>{NET.send({t:'qc'});cl()}]]);return dlg('ชาวเมือง','เควส: '+s.n,[['ยกเลิก',()=>{NET.send({t:'qx'});cl()}],['ปิด',cl]])}
if(q)return dlg('ชาวเมือง','ฤดูหนาวปีนี้ลำบากนัก... ขอให้เดินทางปลอดภัย',[['ปิด',cl]]);
dlg('ชาวเมือง','ช่วยข้าหน่อยได้ไหม? '+my[0].n,[['รับงาน ('+my[0].gold+'g)',()=>{NET.send({t:'qa',id:my[1],src});cl()}],['ไว้ก่อน',cl]])};
const dlv=(to,nm,tx)=>()=>{const q=g.p.q;if(q&&QS[q.id].to==to&&!q.done)NET.send({t:'qd',w:to});dlg(nm,tx,[['ลาก่อน',cl]])};
NP.courier=dlv('courier','ผู้ส่งสาร เฟรย์ฮอล์ม','ขอบคุณที่เดินทางไกลมาถึงนี่! ถนนระหว่างเมืองอันตรายขึ้นทุกวัน');NP.hermit=dlv('hermit','ชาวป่า','กระท่อมอยู่ไกลแบบนี้ จดหมายเป็นสิ่งเดียวที่ข้าหวังรอ');
function twn(T){rc('#a9b4c2',T.x,T.y,T.w,T.h);[T.y,T.y+T.h].forEach(y=>{rc('#6f7f92',T.x,y,T.w/2-20,3);rc('#6f7f92',T.x+T.w/2+20,y,T.w/2-20,3)});[T.x,T.x+T.w].forEach(X=>{rc('#6f7f92',X,T.y,3,T.h/2-20);rc('#6f7f92',X,T.y+T.h/2+20,3,T.h/2-20)});rc('#c7b99a',T.x+T.w/2-10,T.y,20,T.h);rc('#c7b99a',T.x,T.y+T.h/2-10,T.w,20)}
function tgt(){const p=g.p,q=p.q;if(!q){if(p.bty){const r=Object.values(NET.ps).find(z=>z.n==p.bty);return r&&r.sc==sk()?{x:r.x,y:r.y}:null}return null}const s=QS[q.id],np=k=>{const b=BD.find(b=>b[0]==k);return b?npc(b):null},hs=()=>{const b=BD.find(b=>b[0]=='house'&&b[2]+','+b[3]==q.src);return b?npc(b):null};
if(q.done)return s.c==3?hs():np('guild');if(s.k=='dlv')return np(s.to);if(s.k=='esc')return (DEST[s.dest]||CAB);if(s.k=='boss')return g.en.find(e=>e.boss)||LAIR;if(s.k=='pay')return p.pot[0]>=3?hs():np('market');
let b=null,d=1e9;g.en.forEach(e=>{if(!e.dead&&(!s.t||s.t==e.t)&&D(p,e)<d){d=D(p,e);b=e}});return b}
function guide(){const t=tgt();if(!t||g.sc)return;const dx=t.x-cx-W/2,dy=t.y-cy-H/2,hw=W/2-14,hh=H/2-14,i=M.abs(dx)<hw&&M.abs(dy)<hh,k=i?1:M.min(hw/M.abs(dx||1e-3),hh/M.abs(dy||1e-3)),X=(W/2+dx*k)*S,Y=(H/2+dy*k)*S-(i?(18+M.sin(g.t*6)*2)*S:0),a=i?PI/2:M.atan2(dy,dx),d=M.hypot(t.x-g.p.x,t.y-g.p.y)|0;
x.save();x.translate(X,Y);x.rotate(a);x.fillStyle='#ffd54a';x.strokeStyle='#000';x.lineWidth=2;x.beginPath();x.moveTo(8*S,0);x.lineTo(-5*S,-6*S);x.lineTo(-2*S,0);x.lineTo(-5*S,6*S);x.closePath();x.fill();x.stroke();x.restore();x.font='bold '+6*S+'px sans-serif';x.fillStyle='#ffd54a';x.strokeText(d+'m',X-8*S,Y+13*S);x.fillText(d+'m',X-8*S,Y+13*S)}
function bag(){const p=g.p,h=[],pc=v=>v*100|0;p.it.forEach((k,i)=>h[i]=()=>iinf(i));h[6]=()=>{use(0);NET.rr=bag};h[7]=()=>{use(1);NET.rr=bag};h[8]=cl;[0,1,2].forEach(i=>h[10+i]=()=>skinfo(i,0));
ov('<div class=bx><b>🎒 กระเป๋า • '+p.gd+' ทอง • Lv'+p.lv+' (แต้มสกิล '+p.sp+')</b><p>'+(p.it.length?'แตะไอเทมเพื่อดูข้อมูล/ขาย':'ยังไม่มีไอเทม ซื้อได้ที่ตลาด')+'</p>'+p.it.map((k,i)=>'<button data-i='+i+'>'+IT[k][3]+IT[k][0]+' <small>'+IT[k][1]+'</small></button>').join('')+'<div class=r><span>🍞 ขนมปัง x'+p.pot[0]+'</span><button data-i=6>ใช้</button></div><div class=r><span>🍵 ชามานา x'+p.pot[1]+'</span><button data-i=7>ใช้</button></div>'
+'<p><b>สเตตัส</b><br>โจมตี '+AT()+' • HP '+M.round(p.hp)+'/'+MH()+' • MP '+M.round(p.mp)+'/'+MM()+'<br>คริติคอล '+pc(CR())+'% (x1.6) • เจาะเกราะ '+PN()+' • ดูดเลือด '+pc(LS())+'%<br>ลดคูลดาวน์ '+pc(1-CD())+'% • ลดดาเมจรับ '+pc(DR())+'% • พลังสกิล +'+pc(AP())+'% • ตีเร็ว +'+pc(AS())+'%<br>เดิน '+pc(SP()/70)+'% • ฟื้นมานา '+(2+MR())+' ต่อ 5 วิ</p><p><b>Passive:</b> <small>'+HI[hr()].ps+'</small></p><b>สกิล (แตะเพื่อดูรายละเอียด)</b>'+SN.map((n,i)=>'<button data-i='+(10+i)+'>'+n[2]+(i+1)+'. '+n[0]+' / '+n[1]+' • Lv'+p.sk[i]+'</button>').join('')+'<button data-i=8>ปิด</button></div>',h)}
function iinf(i){const p=g.p,k=p.it[i];if(!k)return bag();const t=IT[k],v=t[2]/2|0;ov('<div class=bx><b>'+t[3]+t[0]+'</b><p>'+t[1]+'</p>'+(t[6]?'<p>✨ Passive: '+t[6]+'</p>':'')+'<p><small>ราคาซื้อ '+t[2]+'g</small></p><button data-i=0>ขาย '+v+' ทอง</button><button data-i=1>← กลับ</button></div>',[()=>{NET.send({t:'sell',k});NET.rr=bag},bag])}
function skinfo(i,f){const p=g.p,MC=HI[hr()].mc,CC=HI[hr()].cc,lv=p.sk[i];ov('<div class=bx><b>'+SN[i][2+f]+' '+SN[i][f]+' • Lv'+lv+'</b>'+(HI[hr()].nf?'':'<p><button data-i=0 style="width:48%;display:inline-block">'+(HI[hr()].fl||['ร่างปกติ','ร่างโลหิต'])[0]+(f?'':' ✓')+'</button> <button data-i=1 style="width:48%;display:inline-block">'+(HI[hr()].fl||['ร่างปกติ','ร่างโลหิต'])[1]+(f?' ✓':'')+'</button></p>')+'<p>'+SD[i][f]+'</p><p><small>ดาเมจ +'+15*(lv-1)+'% • มานา '+MC[i]+' • คูลดาวน์ '+(CC[i][f]*CD()).toFixed(1)+' วิ</small></p>'+(p.sp>0?'<button data-i=2>⬆ อัปสกิล (แต้ม '+p.sp+')</button>':'')+'<button data-i=3>← กลับ</button></div>',[()=>skinfo(i,0),()=>skinfo(i,1),()=>{NET.send({t:'sk',i});NET.rr=()=>skinfo(i,f)},bag])}
function aimBind(id,i){const b=$(id),xc=$('xc'),over=e=>{const r=xc.getBoundingClientRect();return e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom};
b.onpointerdown=e=>{e.preventDefault();b.setPointerCapture(e.pointerId);const r=b.getBoundingClientRect();AIM={i,cx:r.left+r.width/2,cy:r.top+r.height/2,a:0,on:0};if(i==0&&g&&g.p.form&&g.p.cd[0]<=0&&g.p.mp>=8){cast(0);AIM.hb=1}if(g&&g.p.hero=='g'&&i<2&&!g.p.kn&&g.p.cd[i]<=0&&g.p.mp>=HI.g.mc[i]){cast(i);AIM.hb=2}};
b.onpointermove=e=>{if(!AIM||AIM.i!=i||AIM.hb)return;const dx=e.clientX-AIM.cx,dy=e.clientY-AIM.cy;if(M.hypot(dx,dy)>28){AIM.on=1;AIM.a=M.atan2(dy,dx);xc.hidden=0;xc.classList.toggle('hot',over(e))}};
b.onpointerup=e=>{if(!AIM||AIM.i!=i)return;const a=AIM,c=a.on&&over(e);AIM=null;xc.hidden=1;xc.classList.remove('hot');if(a.hb){a.hb==2?hrel(i):rel();return}if(c){say('ยกเลิกสกิล');return}if(g)cast(i,a.on?a.a:undefined)};
b.onpointercancel=()=>{if(AIM&&AIM.hb)AIM.hb==2?hrel(i):rel();AIM=null;xc.hidden=1}}
const ZN=[],hr=()=>g.p.hero||'w',vg=()=>{const p=g.p;if(p.hero=='h')p.ve=M.min(4,(p.ve||0)+1)};
const HI={w:{n:'Winter',sn:SN.map(a=>a.slice()),sd:SD.map(a=>a.slice()),ps:PS,mc:[8,12,20],cc:[[6,10],[7,8],[20,8]],atk:'atk',short:'ลูกครึ่งปีศาจ สองร่าง ดูดเลือด'},
e:{n:'Eliana',nf:1,short:'Blood Punisher สายเวท กรงเล็บโลหิต',ps:'Blood Contract: สกิลที่โดนศัตรูติด Blood Mark (สูงสุด 3 ชั้น) ครบ 3 ชั้นเกิด Blood Rupture ดาเมจเวทเพิ่ม และ Ultimate ทำดาเมจเพิ่มใส่ศัตรูที่มีครบ 3 ชั้น (ดาเมจเวทไม่โดนลดจากเกราะ)',mc:[12,12,25],cc:[[8,8],[12,12],[25,25]],atk:'eatk',ic:'e',
sn:[['Crimson Execution','Crimson Execution','🗡','🗡'],['Bloodstep Grapple','Bloodstep Grapple','🪝','🪝'],['Blood Punishment','Blood Punishment','⚖','⚖']],
sd:[['สร้างใบมีดโลหิต 3 เล่มพุ่งไปในทิศที่กำหนด ทะลุศัตรู ดาเมจเวทและติด Blood Mark กดซ้ำภายใน 3 วิเพื่อเรียกใบมีดกลับมาหา Eliana ทำดาเมจระหว่างทางอีกครั้ง'],['ปล่อยสายโลหิตไปในทิศที่เลือก (ไกล 150) ถ้าเกี่ยวโดนต้นไม้จะดึงตัวไปที่นั่น ใช้ข้ามสิ่งกีดขวางได้ ถ้าโดนศัตรูจะทำดาเมจเวทและดึงตัวเข้าหา ไม่ใช่การวาร์ป คูลดาวน์สูง'],['เข้าสถานะ Untargetable 0.8 วิ พุ่งไปด้านหลังศัตรูที่เลือก แล้วโจมตีเวทเป็นรูปกรวยด้านหน้า ศัตรูที่มี Blood Mark ครบ 3 ชั้นได้ดาเมจเพิ่ม 60% (ใช้มาร์กหมด) ถ้า HP ศัตรูต่ำกว่า 30% ดาเมจเพิ่มอีก 50% ไม่ใช่สกิลสังหารทันที']].map(a=>[a[0],a[0]])}};
function sethero(h){const d=HI[h]||HI.w;SN.splice(0,3,...d.sn);SD.splice(0,3,...d.sd)}
const hcol=p=>({w:p.form?['#7a1020','#7a1020','#ff3a5a']:['#2a5db0','#2a5db0',0],k:['#7d8599','#4a5268',0],h:['#2f7a45','#e8e8d0','#3fbf5a'],e:['#f2f2f2','#f2f2f2','#f5f5f5','#c0283c']})[p.hero||'w'];
function dmgp(m){const p=g.p;if(p.inv>0)return;if(p.fz){p.fz.acc+=m*(1-DR());return}let d=m*(1-DR());if(p.sh&&p.sh.hp>0){const a=M.min(d,p.sh.hp);p.sh.hp-=a;d-=a;if(p.sh.hp<=0)p.sh=null}if(p.bs&&p.bs.hp>0){const a=M.min(d,p.bs.hp);p.bs.hp-=a;d-=a;if(p.bs.hp<=0)bburst()}p.hp-=d;hurtfx()}
function bburst(){const p=g.p,b=p.bs,r=b.E?110:75;p.bs=null;aoe(p.x,p.y,r,AT()*1.2);g.en.forEach(e=>{const a=M.atan2(e.y-p.y,e.x-p.x);if(!e.dead&&D(p,e)<r){e.x+=M.cos(a)*22;e.y+=M.sin(a)*22}});ring(p.x,p.y,r,'#5aff7a');puff(p.x,p.y,24,'#7aff7a',120,.6,1.6,0,1);SK=7;sfx('b')}
function mark(e){e.mk=M.min(3,(e.mk||0)+1);e.mkT=6;if(e.mk==3&&!e.rp){e.rp=1;ring(e.x,e.y,28,'#ff2a4a');puff(e.x,e.y,14,'#ff2a4a',90,.5,1.4,0,1);hit(e,AT()*1.2*(1+AP()),0,1)}}
function hxu(dt){const p=g.p;dzu(dt);hxn(dt);if(p.kg>0){p.kg-=dt;if(R()<dt*30)pt({x:p.x+(R()-.5)*14,y:p.y+(R()-.5)*14,vy:-14,l:.5,s:1.4,c:'#cfd8ff',k:1})}if(p.kw>0){p.kw-=dt;if(R()<dt*30)pt({x:p.x+(R()-.5)*12,y:p.y,vy:-18,l:.4,s:1.4,c:'#9fdcff',k:1})}if(p.inv>0)p.inv-=dt;
if(p.bs){p.bs.t-=dt;if(R()<dt*40)pt({x:p.x+(R()-.5)*16,y:p.y+(R()-.5)*14,vy:-10,l:.5,s:1.6,c:'#5aff7a',k:1});if(p.bs&&p.bs.t<=0)bburst()}
if(p.rc){p.rc.t-=dt;if(p.rc.t<=0){p.rc=null;p.cd[0]=M.max(p.cd[0],8*CD())}}
for(let i=ZN.length-1;i>=0;i--){const z=ZN[i];z.t-=dt;z.k-=dt;if(!z.vis)g.en.forEach(e=>{if(e.dead||M.hypot(e.x-z.x,e.y-z.y)>z.r)return;e.sl=.3;if(!z.h.includes(e)){z.h.push(e);e.stun=1.5;hit(e,z.A*1.5);if(!z.g){z.g=1;vg()}}else if(z.k<=0)hit(e,z.A*.3)});if(z.k<=0)z.k=.5;if(z.t<=0)ZN.splice(i,1)}
g.en.forEach(e=>{if(e.mkT>0&&(e.mkT-=dt)<=0){e.mk=0;e.rp=0}})}
function zdraw(){ZN.forEach(z=>{const X=(z.x-cx)*S,Y=(z.y-cy)*S,r=z.r*S;x.fillStyle='rgba(40,120,50,.25)';x.beginPath();x.ellipse(X,Y,r,r*.7,0,0,7);x.fill();x.strokeStyle='#5aff7a';x.lineWidth=S*1.5;x.stroke();x.strokeStyle='#2a8a3a';x.lineWidth=S*2;for(let i=0;i<12;i++){const a=i/12*2*PI+g.t,u=r*.85,h=(5+M.sin(g.t*5+i)*3)*S;x.beginPath();x.moveTo(X+M.cos(a)*u,Y+M.sin(a)*u*.7);x.lineTo(X+M.cos(a)*u,Y+M.sin(a)*u*.7-h);x.stroke()}})}
function hpre(i,ang){const p=g.p,e=near(260),mc=HI[hr()].mc[i];if(p.cd[i]>0||p.dash)return null;if(!(hr()=='e'&&i==0&&p.rc)&&p.mp<mc){say('มานาไม่พอ');return null}if(ang!=null)p.a=ang;else if(e)p.a=M.atan2(e.y-p.y,e.x-p.x);return{p,e,co:M.cos(p.a),si:M.sin(p.a),A:AT()*(1+.15*(p.sk[i]-1))*(1+AP())*skd(i),mc}}
const HC={
e(i,ang){const c=hpre(i,ang);if(!c)return;const{p,e,co,si,A}=c;
if(i==0){const gid=p.gid=(p.gid||0)+1,bl=(a,X,Y)=>shoot({x:X,y:Y,vx:M.cos(a)*210,vy:M.sin(a)*210,d:A,mg:1,gid,c:'#ff2a4a',life:.6,r:8,pierce:1,mk:1});
if(p.rc){const r=p.rc,a=M.atan2(p.y-r.y,p.x-r.x);for(let k=-1;k<=1;k++)bl(a+k*.2,r.x,r.y);p.rc=null;p.cd[0]=8*CD();sfx('c1');return}
p.mp-=c.mc;sfx('c1');for(let k=-1;k<=1;k++)bl(p.a+k*.2,p.x,p.y);p.rc={t:3,x:p.x+co*120,y:p.y+si*120};ring(p.x,p.y,26,'#ff2a4a');say('กดซ้ำเพื่อเรียกใบมีดกลับ')}
if(i==1){p.mp-=c.mc;sfx('c2');let hx=null,en=null;for(let st=8;st<=150&&!hx;st+=6){const X=p.x+co*st,Y=p.y+si*st;en=g.en.find(z=>!z.dead&&M.hypot(z.x-X,z.y-Y)<11);if(en){hx={x:en.x,y:en.y};break}const t=TR.find(t=>M.abs(t[0]-X)<5&&M.abs(t[1]-Y)<7);if(t)hx={x:t[0],y:t[1]}}
if(hx){streak(p.x,p.y,hx.x,hx.y,'#ff2a4a');const d=M.hypot(hx.x-p.x,hx.y-p.y)-14,a2=M.atan2(hx.y-p.y,hx.x-p.x);if(d>4)p.dash={vx:M.cos(a2)*500,vy:M.sin(a2)*500,t:d/500};if(en){hit(en,A*1.1,0,1);mark(en);en.stun=.6}p.cd[1]=.75}else{streak(p.x,p.y,p.x+co*150,p.y+si*150,'#ff2a4a');p.cd[1]=12*CD()}}
if(i==2){if(!e)return say('ไม่มีเป้าหมาย');p.mp-=c.mc;p.cd[2]=25*CD();sfx('b');const a=M.atan2(e.y-p.y,e.x-p.x);streak(p.x,p.y,e.x+M.cos(a)*22,e.y+M.sin(a)*22,'#ff2a4a');p.x=e.x+M.cos(a)*22;p.y=e.y+M.sin(a)*22;p.a=a+PI;p.inv=.8;const cn=p.a;
g.en.forEach(z=>{if(z.dead)return;const dx=z.x-p.x,dy=z.y-p.y,q=M.atan2(dy,dx);if(M.hypot(dx,dy)<75&&M.abs(M.atan2(M.sin(q-cn),M.cos(q-cn)))<1.05){let d=A*2.2;if(z.mk>=3){d*=1.6;z.mk=0;z.rp=0}if(z.hp<z.mh*.3)d*=1.5;hit(z,d,0,1)}});swing(cn,'#ff2a4a',60);swing(cn+.4,'#fff',50);ring(p.x,p.y,70,'#ff2a4a');SK=10;FL=[.3,'255,40,60'];HS=.06}}};
const HA={
e(){const p=g.p;if(p.acd>0||p.dash)return;const e=near(230);if(!e)return;p.a=M.atan2(e.y-p.y,e.x-p.x);shoot({x:p.x,y:p.y,vx:M.cos(p.a)*230,vy:M.sin(p.a)*230,d:AT()*.9,mg:1,c:'#ff6a7a',life:.9});p.acd=.6;p.lg=2}};
IS.push(['knight','Heavy Knight']);prb('knight');
const swp=h=>{NET.send({t:'swap',h});cl()};
const INT={guild:{w:260,h:170,c:'#8a6a44',n:[['guild','พนักงานกิลด์',130,68],['exit','ประตู',130,156]]},market:{w:260,h:170,c:'#7a8a54',n:[['market','พ่อค้า',130,68],['exit','ประตู',130,156]]},inn:{w:260,h:170,c:'#8a5a4a',n:[['inn','เจ้าของโรงเตี้ยม',130,66],['exit','ประตู',130,156]]},barracks:{w:300,h:190,c:'#6a7284',n:[['barracks','อัศวินเฝ้าโรง',150,72],['exit','ประตู',150,176]]}};
// ar = เกราะบอสผู้พิทักษ์, mon = ชนิดมอนสเตอร์ในดัน (ดัชนี ST), bs/rc = สกิลบอส/สี, bp = สีบอส, sm = ชนิดลูกสมุน
const DGS={cave:{n:'ถ้ำปีศาจ',fl:3,t:1,lv:1,c:'#2a2a3a',pool:['a3','p4','m5'],ar:30},dg2:{n:'สุสานน้ำแข็ง',fl:4,t:2,lv:1.8,c:'#1e2a3c',pool:['a4','m3','m5'],ar:60},dg3:{n:'ป้อมโลหิตร้าง',fl:5,t:3,lv:2.6,c:'#3a1a22',pool:['x6','m3','a4','p4'],ar:85},
dg6:{n:'เหมืองน้ำแข็งร้าง',fl:3,t:1,lv:1.4,c:'#223646',pool:['p4','a4'],ar:40,mon:[1,2],bs:['slam','nova','sum'],rc:'#9fe0ff',bp:{R:'#3a6a8a',K:'#102030',Y:'#e0f6ff'}},
dg7:{n:'หอคอยสายฟ้า',fl:5,t:2,lv:3,c:'#2a2a4a',pool:['m11','x14','m5','x10'],ar:90,mon:[2,3],bs:['rain','nova','chg','sum'],rc:'#ffe14a',sm:2,bp:{R:'#3a2a7a',K:'#10102a',Y:'#ffe14a'}},
dg4:{n:'สุสานฟาโรห์ทราย',fl:5,t:3,lv:3.6,c:'#4a3a1a',pool:['a10','p11','x14','a7'],ar:110,mon:[4,5,6],bs:['slam','rain','sum','chg','heal'],rc:'#e8c85a',sm:5,bp:{R:'#6a4a10',K:'#2a1a05',Y:'#ffe08a'}},
dg5:{n:'วิหารรากโบราณ',fl:6,t:3,lv:4.4,c:'#16301c',pool:['a12','p13','m12','p8'],ar:125,mon:[7,8,9],bs:['rain','heal','chg','nova','sum'],rc:'#5aff7a',sm:8,bp:{R:'#1f5a2a',K:'#0a1a0e',Y:'#c8ff6a'}}};
function act(b){if(!g.sc&&INT[b[0]])return enter2(b);NP[b[0]](b)}
function enter2(b){const p=g.p,d=INT[b[0]],o=npc(b);g.sc={k:b[0],name:b[1],w:d.w,h:d.h,c:d.c,n:d.n.map(a=>a.slice()),ex:{x:o.x,y:o.y+12},sv:g.en};g.en=[];pr=[];ZN.length=0;g.cir=null;p.x=d.w/2;p.y=d.h-36;say('เข้า '+b[1])}
function leave(f){const s=g.sc,p=g.p;if(!f&&s.dg&&NET.party&&NET.party.ld==NET.id)NET.send({t:'dgx'});g.en=s.sv;g.sc=null;pr=[];ZN.length=0;p.x=s.ex.x;p.y=s.ex.y;say('ออกจากอาคาร')}
NP.exit=()=>leave();NP.stairs=()=>{if(NET.party&&NET.party.ld!=NET.id)return say('รอหัวหน้าปาร์ตี้ลงบันได');dgGo(g.sc.dg.id,g.sc.dg.f+1)};
const dgm=id=>()=>{const d=DGS[id];if(NET.party&&NET.party.ld!=NET.id)return say('เฉพาะหัวหน้าปาร์ตี้เท่านั้นที่เข้าดันเจี้ยน');dlg('ผู้เฝ้า '+d.n,d.n+' มี '+d.fl+' ชั้น เคลียร์มอนสเตอร์ทุกตัวเพื่อลงชั้นถัดไป ชั้นสุดท้ายมีผู้พิทักษ์ ถ้าชนะมีโอกาสได้ไอเทม (เล็ก/ธรรมดา/เลเจนด์) หรือเงินและ EXP ถ้าออกกลางทางต้องเริ่มชั้น 1 ใหม่',[['เข้าดันเจี้ยน',()=>{cl();dgGo(id,1)}],['ปิด',cl]])};
NP.cave=dgm('cave');NP.dg2=dgm('dg2');NP.dg3=dgm('dg3');
function dgGo(id,f,fol){if(!fol&&NET.party&&NET.party.ld==NET.id)NET.send({t:'dg',id,f});const d=DGS[id],p=g.p,b=BD.find(b=>b[0]==id),o=g.sc?g.sc.ex:{x:npc(b).x,y:npc(b).y+12},sv=g.sc?g.sc.sv:g.en,m=d.lv*(1+.08*(DY()-1))*(1+f*.2);
g.sc={k:id,name:d.n+' ชั้น '+f+'/'+d.fl,w:320,h:220,c:d.c,n:[['exit','ทางออก',160,208]],ex:o,sv,dg:{id,f,N:d.fl},cl:0};g.en=[];pr=[];ZN.length=0;g.cir=null;
p.x=160;p.y=190;say(g.sc.name)}
function dgDone(){const s=g.sc;if(s&&s.dg)s.cl=1}
function dsc(){const s=g.sc,dg=s.dg;rc('#120e16',-60,-60,s.w+120,s.h+120);rc(s.c,0,0,s.w,s.h);for(let j=0;j<s.h;j+=16)rc('rgba(0,0,0,.12)',0,j,s.w,1);for(let i=0;i<s.w;i+=32)rc('rgba(0,0,0,.08)',i,0,1,s.h);
rc('#3a2e26',0,0,s.w,18);rc('#1c1612',0,16,s.w,3);rc('#3a2e26',-6,0,6,s.h);rc('#3a2e26',s.w,0,6,s.h);rc('#3a2e26',-6,s.h,s.w+12,6);
({guild:()=>{rc('#5a3a1e',70,44,120,14);rc('#c9b27a',20,26,40,26);rc('#fff',24,30,14,8);rc('#fff',42,34,14,8)},market:()=>{rc('#5a3a1e',40,44,180,12);[0,1,2,3].forEach(i=>rc(['#c0392b','#e0b030','#3a8a3a','#3a6ac0'][i],50+i*44,36,12,8))},inn:()=>{[30,200].forEach(X=>{rc('#d8d0c0',X,70,46,22);rc('#a03030',X,82,46,10)});rc('#5a3a1e',100,44,60,12)},barracks:()=>{[30,100,170,240].forEach(X=>{rc('#555',X,28,6,26);rc('#9aa4bd',X-6,28,18,3)});rc('#8a6a3a',60,110,16,26);rc('#8a6a3a',220,110,16,26)}})[s.k]?.();
if(dg)[40,s.w-40,s.w/2].forEach((X,i)=>{rc('#6a4a1a',X,20,3,10);rc(i%2?'#ffb030':'#ff7a20',X-1,14,5,6+M.sin(g.t*9+X))});
s.n.forEach(b=>{if(b[0]=='exit'){rc('#5a3a22',b[2]-10,b[3]-6,20,14);rc('#ffd54a',b[2]-8,b[3]-4,16,2)}else if(b[0]=='stairs'){rc('#222',b[2]-12,b[3]-8,24,16);rc('#ffd54a',b[2]-10,b[3]-6,20,3)}else man(b[2],b[3],'#a06030','#444',0,M.sin(g.t*2+b[2])*.4);
x.font='bold '+6*S+'px sans-serif';x.lineWidth=2;x.strokeStyle='#000';x.fillStyle='#fff';const tx=(b[2]-cx-14)*S,ty=(b[3]-cy-14)*S;x.strokeText(b[1],tx,ty);x.fillText(b[1],tx,ty)})}
{const q=BMAP.getContext('2d');q.fillStyle='#222';BD.filter(b=>DGS[b[0]]&&b[0]!='cave').forEach(b=>q.fillRect(b[2]/20-1,b[3]/20-1,3,3))}
const SPR={k:["......PP........",".....PPPP.......","....HHHHHH......","...HHHHHHHH.....","...HhVVVVhH.....","...HhHHHHhH.....","....hhHHhh......","..aAAAAAAAAa...W",".aAAGAAAAGAAa..W",".aAAAAGGAAAAa..W",".SAAAAGGAAAAS..W","..AAAaGGaAAA...W","...AAAGGAAAA.GGG","...AAAAAAAAA..L.","...GGGGGGGGGG.L.","...AAA....AAA...","...AAA....AAA...","...aaa....aaa...","..BBBB....BBBB..","..BBBB....BBBB.."],
h:["......KKKK......",".....KKKKKK.....","....KKkKKkKK....","...KKKGGGGKKK...","..SKSSSSSSKS....","...KSESSSSESK...","...KKSSSSSSKK...","..KKCCCCCCCCKK..",".KKCCCCGGCCCCKKW",".KKCAAAAAAAACKKW",".SKCAAAGGAAACKSW","..KCAAAGGAAACK.W","..VCCCCCCCCCCV.G","..VAAAAAAAAAAV.L","..VAAAAAAAAAAV..","...CCC....CCC...","...AAA....AAA...","...AAA....AAA...","..BBBB....BBBB..","..BBBB....BBBB.."],
e:[".....KKKKKK.....","....KKKKKKKK....","...KKkKKKKkKK...","...KKSSSSSSKK...","..KKSESSSSESKK..","..KKSSSSSSSSKK..","..KKKSSRRSSKKK..","..KKKKAAAAKKKK..","..KKRAAAAAARKK..",".cKKAAARRAAAKKc.",".cSKAAARRAAAKSc.","..KKAAAAAAAAKK..","..KKRRRRRRRRKK..","...AAAAAAAAAA...","..AAAAAAAAAAAA..",".AAAAARAARAAAAA.",".AARRRRRRRRRRAA.","...SS......SS...","...BB......BB...","..BBB......BBB.."]},
PALS={k:{H:'#aab4c8',h:'#5c667c',V:'#1a1e2c',P:'#c0283c',A:'#c7cfdf',a:'#6b7488',G:'#e0b030',S:'#f2c9a0',B:'#2b2f3c',W:'#e8f0ff',L:'#6a4a2a'},h:{K:'#3fbf5a',k:'#2a8a40',G:'#e0b030',S:'#f2c9a0',E:'#1a3a20',C:'#2f7a45',A:'#e4f2dc',V:'#1f5530',W:'#e8f0ff',L:'#6a4a2a',B:'#4a3220'},e:{K:'#f5f5f5',k:'#c8ccd8',S:'#f2c9a0',E:'#c0283c',R:'#c0283c',A:'#f2f2f2',c:'#ff2a4a',B:'#5a1a2a'}};
function hman(X,Y,h,B,F){shd(SPR[h],X,Y+6,.6);spr(SPR[h],PALS[h],X,Y+6+(B||0),.6,F)}
Object.assign(IT,{a5:['เกราะหนังหมาป่า','+120 HP ลดดาเมจรับ 5%',320,'🐺',0,{hp:120,def:.05}],a6:['ชุดคลุมนักล่า','+60 HP เดิน +8',280,'🧥',0,{hp:60,spd:8}],a7:['เกราะอัศวินทอง','+350 HP ลดดาเมจรับ 20%',3000,'🏅',0,{hp:350,def:.2,th:.1},'หนามทอง: สะท้อนดาเมจที่ได้รับ 10%'],
p6:['ดาบสั้นนักฆ่า','คริติคอล +10% โจมตี +6',520,'🗡',1,{crit:.1,atk:6}],p7:['ค้อนยักษ์','+22 โจมตี',650,'🔨',1,{atk:22}],p8:['ธนูล่าเทพ','+40 โจมตี คริติคอล +12% ตีเร็ว +15%',3400,'🏹',1,{atk:40,crit:.12,as:.15,ex:.15},'ล่าเหยื่อ: ดาเมจ +15% ต่อศัตรูที่ HP ต่ำกว่า 30%'],
m6:['ผลึกมานา','+80 MP ฟื้นมานา +2 ต่อ 5 วิ',500,'💎',2,{mp:80,mr:2}],m7:['จี้ธาตุน้ำแข็ง','พลังสกิล +15% +40 MP',700,'🔹',2,{ap:.15,mp:40}],m8:['คทาเทพโลหิต','พลังสกิล +50% เจาะเกราะ 30 ลดคูลดาวน์ 10%',3800,'🔮',2,{ap:.5,pen:30,cd:.1,ls:.05},'โลหิตเวท: ดูดเลือด +5%'],
x8:['กำไลกล้าหาญ','+6 โจมตี +40 HP',480,'💪',3,{atk:6,hp:40}],x9:['ผ้าคลุมเงา','เดิน +10 ลดดาเมจรับ 5%',600,'🌑',3,{spd:10,def:.05}],x10:['แหวนมังกร','คริติคอล +18% ตีเร็ว +15%',3500,'🐉',3,{crit:.18,as:.15,ex:.1},'เขี้ยวมังกร: ดาเมจ +10% ต่อศัตรูที่ HP ต่ำกว่า 30%']});
QS.forEach(q=>q.gold=q.gold*.8|0);
const DZ=[];DGS.cave.bs=['slam','sum','chg'];DGS.cave.rc='#ff4a2a';DGS.dg2.bs=['slam','nova','rain','sum'];DGS.dg2.rc='#8ac8ff';DGS.dg3.bs=['rain','chg','heal','nova','sum'];DGS.dg3.rc='#c0283c';
function bsc(e,o){const n=e.bh&&e.bh.id==o.gid?e.bh.n:0;e.bh={id:o.gid,n:n+1};return n?.5:1}
function dzu(dt){const p=g.p;if(g.sc?!g.sc.dg:!g.en.some(e=>e.wb&&!e.dead))DZ.length=0;if(p.slw>0)p.slw-=dt;for(let i=DZ.length-1;i>=0;i--){const z=DZ[i];if((z.t-=dt)>0)continue;DZ.splice(i,1);ring(z.x,z.y,z.r,z.c);puff(z.x,z.y,16,z.c,90,.5,1.5,0,1);SK=M.max(SK,4);sfx('u');if(D(p,z)<z.r){dmgp(z.d);if(z.sl)p.slw=2}}}
function dzdraw(){DZ.forEach(z=>{const X=(z.x-cx)*S,Y=(z.y-cy)*S,r=z.r*S;x.globalAlpha=.2+.25*M.sin(g.t*14);x.fillStyle=z.c;x.beginPath();x.ellipse(X,Y,r,r*.7,0,0,7);x.fill();x.globalAlpha=1;x.strokeStyle=z.c;x.lineWidth=S;x.stroke()})}
function bai(e,dt){const p=g.p,d=DGS[e.gk];e.at=(e.at==null?3:e.at)-dt;const en=e.hp<e.mh*.5;if(en&&!e.en){e.en=1;e.sp*=1.3;e.d*=1.3;say('ผู้พิทักษ์โกรธ!');SK=10;FL=[.4,'255,40,40'];ring(e.x,e.y,90,'#ff2a2a')}
if(e.cgt>0){e.cgt-=dt;e.x+=e.cx*dt;e.y+=e.cy*dt;if(D(e,p)<14&&!e.chit){e.chit=1;dmgp(e.d*1.4)}}
if(e.at>0)return;e.at=en?2:3.5;const ks=d.bs,k=ks[R()*ks.length|0];
if(k=='slam')DZ.push({x:p.x,y:p.y,r:42,t:1.1,d:e.d*1.5,c:'#ff4a2a'});
else if(k=='rain')for(let i=0;i<5;i++)DZ.push({x:p.x+(R()-.5)*120,y:p.y+(R()-.5)*90,r:26,t:1+i*.15,d:e.d,c:d.rc});
else if(k=='nova')DZ.push({x:e.x,y:e.y,r:80,t:1,d:e.d*1.2,c:'#8ac8ff',sl:1});
else if(k=='chg'){const a=M.atan2(p.y-e.y,p.x-e.x);e.cgt=.45;e.cx=M.cos(a)*260;e.cy=M.sin(a)*260;e.chit=0;ring(e.x,e.y,30,'#ffd54a')}
else if(k=='sum'){if(g.en.filter(z=>z.mn).length<6)for(let i=0;i<2;i++){const m=Object.assign({x:e.x+(R()-.5)*60,y:e.y+20,sl:0,stun:0,cd:0,ph:R()*6,mn:1},ST[M.max(0,d.t-1)]);m.hp=m.mh=m.mh*d.lv*1.5|0;m.d*=1+d.lv*.3;m.xp=m.xp*d.lv|0;g.en.push(m);puff(m.x,m.y,10,'#ff3a5a',60,.5,1.4,0,1)}}
else if(k=='heal'){e.hp=M.min(e.mh,e.hp+e.mh*.03);puff(e.x,e.y,16,'#5aff7a',70,.6,1.5,0,1)}}
const NET={ms:[],kd:{},ws:null,ok:0,try:0,id:0,ping:0,ps:{},pl:[],bt:[],by:{},party:null,tr:null,am:null,aq:0,gt:null,gt0:0,name:'',tk:0,url:(()=>{try{return localStorage.getItem('wr:srv')}catch(e){}})()||'ws://localhost:8080'};
const ARN={x:1500,y:900,w:320,h:240};NET.send=o=>{if(NET.ws&&NET.ws.readyState==1)NET.ws.send(JSON.stringify(o))};
const sk=()=>g.sc?(g.sc.dg?g.sc.k+'#'+(NET.party?NET.party.ld:NET.id)+'#'+g.sc.dg.f:g.sc.k):'o',pids=()=>NET.party?NET.party.m.map(a=>a.id):[];
const inSafe=(X,Y,sc)=>sc!='o'||TWS.some(T=>X>T.x-10&&X<T.x+T.w+10&&Y>T.y-10&&Y<T.y+T.h+10);
function canpv(r){const p=g.p;if(r.sc!=sk()||r.hp<=0)return 0;if(NET.am)return NET.am.dead?0:(r.am&&r.am!=NET.am.team+1?1:0);if(r.am||pids().includes(r.id))return 0;return p.pvp&&r.pv&&!inSafe(p.x,p.y,sk())&&!inSafe(r.x,r.y,r.sc)?1:0}
function pvsync(){const ids={};Object.values(NET.ps).forEach(r=>{if(!canpv(r))return;ids[r.id]=1;let e=g.en.find(z=>z.pv==r.id);if(!e){e={pv:r.id,t:'pvp',x:r.dx,y:r.dy,hp:1,mh:1,sp:0,d:0,xp:0,gd:0,sl:0,stun:0,cd:0,ph:0,ar:0};g.en.push(e)}e.x=r.dx;e.y=r.dy;e.hp=r.hp;e.mh=r.mh});g.en=g.en.filter(e=>!e.pv||ids[e.pv])}
const nhit=(e,d)=>NET.send({t:'hit',to:e.pv,d:d|0});
function rhit(m){const p=g.p,r=NET.ps[m.from];if(!r||!canpv(r)||p.inv>0)return;NET.by[m.from]=g.t;dmgp(m.d*(BAL.pvp.dmg||.45));if(p.hp<=0)die()}
function ndie(){const p=g.p,b=Object.keys(NET.by).filter(k=>g.t-NET.by[k]<12).map(Number);NET.send({t:'die',by:b,lost:p.gd*.2|0,am:0});NET.by={}}
function adie(){const p=g.p;NET.send({t:'adie'});NET.am.dead=1;p.hp=MH();p.x=ARN.x-30;p.y=ARN.y+ARN.h/2;p.inv=999;say('คุณแพ้รอบนี้ รอผลแมตช์')}
function ntick(dt){const p=g.p;if(NET.gt!=null)g.t=NET.gt+(performance.now()-NET.gt0)/1000;if(p.pvt>0){p.pvt-=dt;if(p.pvt<=0){p.pvp=0;say('ปิด PvP แล้ว')}}
Object.values(NET.ps).forEach(r=>{r.dx+=(r.x-r.dx)*.25;r.dy+=(r.y-r.dy)*.25});pvsync();msync();
if((NET.tk-=dt)<=0&&NET.ok){NET.tk=.125;NET.send({t:'st',s:{x:+p.x.toFixed(1),y:+p.y.toFixed(1),sc:sk(),hero:hr(),lv:p.lv,hp:p.hp|0,mh:MH()|0,mp:p.mp|0,mm:MM()|0,pv:p.pvp?1:0,a:+p.a.toFixed(2),am:NET.am&&!NET.am.dead?NET.am.team+1:0,gd:p.gd,it:p.it,pg:NET.ping,vl:(g.vl&&!g.sc?{x:+g.vl.x.toFixed(1),y:+g.vl.y.toFixed(1)}:null),fl:(p.kg>0||p.fz?1:0)|(p.kw>0?2:0)|(p.bs?4:0)|(p.s1>0||p.db?8:0)|(p.form||p.fm?16:0)|(p.ch>0?32:0)|(p.hold?64:0)}})}}
function tag(X,Y,n,hp,mh,mp,mm,col){const px=(X-cx)*S,py=(Y-24-cy)*S,w=20*S,h=2.4*S;x.font='bold '+5.5*S+'px sans-serif';x.textAlign='center';x.lineWidth=2;x.strokeStyle='#000';x.fillStyle=col||'#fff';x.strokeText(n,px,py-3*S);x.fillText(n,px,py-3*S);x.textAlign='left';x.fillStyle='#000a';x.fillRect(px-w/2-1,py-1,w+2,h*2+2);x.fillStyle='#c0283c';x.fillRect(px-w/2,py,w*M.max(0,M.min(1,hp/mh)),h);x.fillStyle='#4aa3ff';x.fillRect(px-w/2,py+h,w*M.max(0,M.min(1,mp/mm)),h*.8)}
function ndraw(){const k=sk();Object.values(NET.ps).forEach(r=>{if(r.sc!=k)return;const bb=M.abs(r.x-r.dx)>.5?-M.abs(M.sin(g.t*14))*1.3:M.sin(g.t*3)*.3,F=M.cos(r.a)<0;if(r.hero&&r.hero!='w')hman(r.dx,r.dy,r.hero=='g'&&(r.fl&16)?'gd':r.hero,bb,F);else{const c=hcol({hero:'w',form:(r.fl&16)?1:0});man(r.dx,r.dy,c[0],c[1],c[2],bb,F,c[3])}raura(r);tag(r.dx,r.dy,r.n+' Lv'+r.lv,r.hp,r.mh,r.mp,r.mm,pids().includes(r.id)?'#7aff7a':r.pv?'#ff7a7a':'#fff')})}
function arenaDraw(){rc('#4a2a2a',ARN.x,ARN.y,ARN.w,ARN.h);[[0,0,ARN.w,3],[0,ARN.h-3,ARN.w,3],[0,0,3,ARN.h],[ARN.w-3,0,3,ARN.h]].forEach(a=>rc('#c0283c',ARN.x+a[0],ARN.y+a[1],a[2],a[3]));rc('#6a3a3a',ARN.x+ARN.w/2-1,ARN.y,2,ARN.h)}
function nhud(){const p=g.p;$('pg').textContent='ปิง '+NET.ping+' ms'+(p.pvp?' ⚔PvP'+(p.pvt>0?'('+M.ceil(p.pvt)+')':''):'')+(NET.am?' 🏟':'');$('pvb').style.borderColor=p.pvp?'#c0283c':'#3a4a6a';const s=NET.party?NET.party.m.map(a=>{const r=a.id==NET.id?{hp:p.hp,mh:MH()}:NET.ps[a.id];return a.n+(a.id==NET.party.ld?'★':'')+' '+(r?M.round(100*r.hp/r.mh)+'%':'--')}).join('\n'):'';if($('pty').textContent!=s)$('pty').textContent=s}
$('pvb').onclick=()=>{const p=g.p;if(!p.pvp){p.pvp=1;p.pvt=0;say('เปิด PvP นอกเมือง: ผู้เล่นที่เปิด PvP โจมตีกันได้')}else if(inSafe(p.x,p.y,sk()))p.pvp=0;else{p.pvt=10;say('ปิด PvP ใน 10 วินาที')}};
function plist(){const h=[],L=NET.pl.filter(a=>a.id!=NET.id);h[0]=()=>{NET.send({t:'pleave'});plist()};h[1]=cl;
L.forEach((a,i)=>{h[10+i]=()=>pinfo(a);h[100+i]=()=>{NET.send({t:'pinv',to:a.id});say('ส่งคำเชิญแล้ว')};h[200+i]=()=>{NET.send({t:'tinv',to:a.id});say('ส่งคำขอแลกเปลี่ยนแล้ว')}});
ov('<div class=bx><b>🌐 ผู้เล่นในเซิร์ฟเวอร์ ('+NET.pl.length+') • ปิงคุณ '+NET.ping+' ms</b>'+(NET.party?'<p>ปาร์ตี้: '+NET.party.m.map(a=>a.n).join(', ')+'</p><button data-i=0>ออกจากปาร์ตี้</button>':'')+L.map((a,i)=>'<div class=r><span>'+a.n+' Lv'+a.lv+' '+(HI[a.hero]||HI.w).n+'<br><small>ปิง '+a.ping+' ms'+(a.pv?' • ⚔PvP':'')+(a.b?' • 💰ค่าหัว '+a.b:'')+' • '+a.it.map(k=>IT[k]?IT[k][3]:'').join('')+'</small></span><button data-i='+(10+i)+' style="width:40px">ℹ</button><button data-i='+(100+i)+' style="width:40px">👥</button><button data-i='+(200+i)+' style="width:40px">🔁</button></div>').join('')+'<button data-i=1>ปิด</button></div>',h)}
function pinfo(a){ov('<div class=bx><b>'+a.n+' • Lv'+a.lv+' • '+(HI[a.hero]||HI.w).n+'</b><p>ปิง '+a.ping+' ms • '+(a.pv?'เปิด PvP':'ปิด PvP')+' • ค่าหัว '+(a.b||0)+'</p><p>ไอเทม:<br>'+(a.it.map(k=>IT[k]?IT[k][3]+IT[k][0]+' <small>'+IT[k][1]+'</small>':k).join('<br>')||'ไม่มี')+'</p><button data-i=0>← กลับ</button></div>',[plist])}
$('plb').onclick=plist;
function tradeui(){const t=NET.tr,p=g.p,h=[];if(!t)return;const sy=()=>{t.ok=0;NET.send({t:'toff',it:t.my.it,gd:t.my.gd});tradeui()};
p.it.forEach((k,i)=>h[i]=()=>{const j=t.my.it.indexOf(k);j<0?t.my.it.push(k):t.my.it.splice(j,1);sy()});
[[10,-1000],[11,-100],[12,100],[13,1000]].forEach(a=>h[a[0]]=()=>{t.my.gd=M.max(0,M.min(p.gd,t.my.gd+a[1]));sy()});h[20]=()=>{t.ok=1;NET.send({t:'tok'});tradeui()};h[21]=()=>NET.send({t:'tx'});
ov('<div class=bx><b>🔁 แลกเปลี่ยนกับ '+t.n+'</b><p>ไอเทมของคุณ (แตะเพื่อเลือก)</p>'+(p.it.map((k,i)=>'<button data-i='+i+'>'+(t.my.it.includes(k)?'✅ ':'')+IT[k][3]+IT[k][0]+'</button>').join('')||'<small>ไม่มีไอเทม</small>')+'<div class=r><button data-i=10 style="width:44px">-1k</button><button data-i=11 style="width:44px">-100</button><span style="text-align:center">ทอง '+t.my.gd+'/'+p.gd+'</span><button data-i=12 style="width:44px">+100</button><button data-i=13 style="width:44px">+1k</button></div><p>อีกฝ่ายเสนอ: '+(t.th.it.map(k=>IT[k]?IT[k][3]+IT[k][0]:k).join(', ')||'ไม่มีไอเทม')+' + '+t.th.gd+' ทอง</p><button data-i=20>'+(t.ok?'⏳ รออีกฝ่ายยืนยัน':'✔ ยืนยัน')+'</button><button data-i=21>ยกเลิก</button></div>',h)}
function onmsg(m){const p=g&&g.p;switch(m.t){
case'pong':NET.ping=M.round(performance.now()-m.n);sst();break;
case'err':login(m.m);break;
case'ok':NET.id=m.id;NET.gt=m.gt;NET.gt0=performance.now();me=NET.name;{const s=m.save;g=fresh();if(m.prof){Object.assign(g.p,(s&&s.p)||{},{ch:0,s1:0,dash:null,form:0,bt:0,fast:0,hb:0,hold:0,cd:[0,0,0,0],bs:null,rc:null,kg:0,kw:0,inv:3,pvt:0},HTR);applyProf(m.prof);g.t=m.gt;go()}else pick()}break;
case'ss':NET.gt=m.gt;NET.gt0=performance.now();{const seen={};m.l.forEach(a=>{const r=NET.ps[a[0]]||(NET.ps[a[0]]={dx:a[2],dy:a[3]});Object.assign(r,{id:a[0],n:a[1],x:a[2],y:a[3],sc:a[4],hero:a[5],lv:a[6],hp:a[7],mh:a[8],mp:a[9],mm:a[10],pv:a[11],a:a[12],am:a[13],fl:a[14]||0});seen[a[0]]=1});for(const k in NET.ps)if(!seen[k])delete NET.ps[k]}break;
case'pl':NET.pl=m.l;NET.bt=m.bt;break;case'fx':if(g)rfx(m);break;case'ms':NET.ms=m.l;break;
case'md':if(g&&!g.sc){dmgp(m.d);const th=sm('th');if(th)NET.send({t:'mh',id:m.id,d:m.d*th|0});if(p.hp<=0)die()}break;
case'mx':{NET.kd[m.id]=1;if(Object.keys(NET.kd).length>300)NET.kd={};const e=g&&g.en.find(z=>z.mid==m.id);if(e){dfx(e);e.dead=1}}break;
case'mk':if(g)mkrew(m);break;
case'prof':if(g)applyProf(m.p);break;case'er':if(g){NET.rr=null;say(m.m)}break;case'data':applyData(m.d);break;
case'ack':if(g&&m.a=='inn'){g.p.hp=MH();g.p.mp=MM();say('พักฟื้น HP/MP เต็ม')}if(g&&m.a=='swap')say('เปลี่ยนตัวละครแล้ว คืนแต้มสกิลให้อัปใหม่');break;
case'vd':if(g&&g.vl)g.vl.hp-=m.d;break;case'dw':if(g&&g.sc&&g.sc.dg){dgDone();say(m.m)}break;
case'fc':if(g&&g.sc&&g.sc.dg&&!g.sc.cl){g.sc.cl=1;if(g.sc.dg.f<g.sc.dg.N){g.sc.n.push(['stairs','บันไดลงชั้นถัดไป',160,28]);say('เคลียร์ชั้นนี้แล้ว! บันไดปรากฏ')}}break;
case'dz':if(g&&(!g.sc||g.sc.dg))DZ.push({x:m.x,y:m.y,r:m.r,t:m.tt,d:m.d,c:m.c,sl:m.sl});break;case'chat':NET.chat.push([m.n,m.m]);if(NET.chat.length>50)NET.chat.shift();if(g)say(m.n+': '+m.m);break;case'msg':if(g)say(m.m);break;case'hit':if(g)rhit(m);break;
case'rew':if(g)say(m.m);break;
case'pinv':if(g)dlg('เชิญเข้าปาร์ตี้',m.n+' เชิญคุณเข้าปาร์ตี้',[['รับ',()=>{NET.send({t:'pacc',from:m.from});cl()}],['ปฏิเสธ',cl]]);break;
case'party':NET.party=m.ld?{ld:m.ld,m:m.m}:null;break;
case'dg':if(g)dgGo(m.id,m.f,1);break;case'dgx':if(g&&g.sc&&g.sc.dg)leave(1);break;
case'tinv':if(g)dlg('คำขอแลกเปลี่ยน',m.n+' ขอแลกเปลี่ยนกับคุณ',[['รับ',()=>{NET.send({t:'tacc',from:m.from});cl()}],['ปฏิเสธ',cl]]);break;
case'tstart':NET.tr={w:m.w,n:m.n,my:{it:[],gd:0},th:{it:[],gd:0},ok:0};tradeui();break;
case'toff':if(NET.tr){NET.tr.th={it:m.it,gd:m.gd};NET.tr.ok=0;tradeui()}break;
case'tdone':if(NET.tr&&g){NET.tr=null;cl();say('แลกเปลี่ยนสำเร็จ')}break;
case'tx':if(NET.tr){NET.tr=null;if(g){cl();say(m.m||'ยกเลิกการแลกเปลี่ยน')}}break;
case'am':if(g){NET.am={team:m.team,dead:0};NET.aq=0;if(g.sc)leave(1);p.x=m.sp.x;p.y=m.sp.y;p.hp=MH();p.mp=MM();p.inv=3;p.cd=[0,0,0,0];say('แมตช์เริ่ม! คุณอยู่ทีม'+(m.team?'น้ำเงิน':'แดง'))}break;
case'aend':if(g){const w=m.win==NET.am.team;NET.am=null;p.inv=0;p.hp=MH();p.x=ARN.x+ARN.w/2;p.y=ARN.y-30;say(w?'ทีมคุณชนะ!':'ทีมคุณแพ้')}break}}
const nfx=o=>NET.send({t:'fx',e:o}),MTN=['imp','wolf','ghoul','wraith','boss','scorp','mummy','djinn','spider','ape','drake','wboss'];
function msync(){if(g.sc&&!g.sc.dg)return;const ids={};NET.ms.forEach(a=>{if(NET.kd[a[0]])return;ids[a[0]]=1;let e=g.en.find(z=>z.mid==a[0]);if(!e){e={sv:1,mid:a[0],t:MTN[a[1]],x:a[2],y:a[3],hp:a[4],mh:a[5],sp:0,d:0,xp:0,gd:0,sl:0,stun:0,cd:0,ph:a[0]%7,ar:0,boss:a[1]==4?1:0,big:(a[6]&4)?1:0,ps:0,pl:0,pw:0};if(a[6]&8){e.wb=a[8];e.bpal=BBP[a[8]]}else if(e.big&&g.sc&&g.sc.dg)e.bpal=(DGS[g.sc.k]||{}).bp;g.en.push(e)}
if(e.stun>e.ps+.05||e.sl>e.pl+.05||(e.sw||0)>e.pw+.05)NET.send({t:'cc',id:e.mid,st:e.stun,sl:e.sl,sw:e.sw||0});e.pw=e.sw||0;e.hp=a[4];e.mh=a[5];e.ar=a[7];if(a[6]&1&&e.stun<.3)e.stun=.3;e.x+=(a[2]-e.x)*.4;e.y+=(a[3]-e.y)*.4;e.ps=e.stun;e.pl=e.sl});g.en=g.en.filter(e=>!e.sv||ids[e.mid])}
function mkrew(m){const p=g.p;sfx('x');if(m.k){if(m.boss||R()<.12){const k=['mr','atk','spd'][R()*3|0];p.bf={k,t:m.boss?40:20};say('บัฟชั่วคราว: '+{mr:'ฟื้นมานาเร็ว',atk:'พลังโจมตี +25%',spd:'ความเร็ว +18'}[k])}}else say('ช่วยฆ่า/แชร์รางวัล '+(m.pct*100|0)+'%: +'+m.gd+'g +'+m.xp+'xp')}
function rfx(m){const r=NET.ps[m.from],e=m.e;if(!r||r.sc!=sk())return;if(e.t=='pj')pr.push({x:e.x,y:e.y,vx:e.vx,vy:e.vy,k:e.k,c:e.c,life:e.life,r:e.r,pierce:e.pierce,tr:e.tr,d:0,vis:1,hit:[]});else if(e.t=='sw')FX.push({t:'s',x:e.x,y:e.y,a:e.a,c:e.c,r:e.r,l:.2,m:.2});else if(e.t=='rg')FX.push({t:'r',x:e.x,y:e.y,r:e.r,c:e.c,l:.45,m:.45});else if(e.t=='sk')streak(e.a[0],e.a[1],e.a[2],e.a[3],e.c);else if(e.t=='zn')ZN.push({x:e.x,y:e.y,r:e.r,t:3.5,k:99,A:0,h:[],vis:1})}
function raura(r){const f=r.fl||0,P=(c,o)=>pt(Object.assign({x:r.dx+(R()-.5)*14,y:r.dy+(R()-.5)*14,vy:-14,l:.5,s:1.4,c,k:1},o));if(f&1&&R()<.5)P('#cfd8ff');if(f&2&&R()<.4)P('#9fdcff');if(f&4&&R()<.5)P('#5aff7a');if(f&8&&R()<.5)P('#ffe14a');if(f&16&&R()<.4)P(R()<.5?'#ff3a5a':'#8a0018',{vy:-24});if(f&64&&R()<.5)P('#ff3a5a',{vx:-20});if(f&32){const a=R()*6.28;P('#ff2a4a',{x:r.dx+M.cos(a)*28,y:r.dy+M.sin(a)*17,vx:-M.cos(a)*50,vy:-M.sin(a)*30,l:.45})}}
NET.chat=[];function chatui(){const h=[()=>{const v=$('cm').value.trim();if(v)NET.send({t:'chat',m:v});chatui()},cl];ov('<div class=bx><b>💬 แชท</b><div style="max-height:150px;overflow:auto;font-size:12px;text-align:left">'+NET.chat.slice(-15).map(a=>'<div><b>'+a[0]+':</b> '+String(a[1]).replace(/</g,'&lt;')+'</div>').join('')+'</div><input id=cm maxlength=120 placeholder="พิมพ์ข้อความ..."><button data-i=0>ส่ง</button><button data-i=1>ปิด</button></div>',h)}
$('chb').onclick=chatui;
INT.guild.n.splice(1,0,['bounty','ผู้ประกาศค่าหัว',50,70]);
NP.bounty=()=>{const p=g.p,t=NET.bt||[];dlg('ผู้ประกาศค่าหัว',t.length?'ค่าหัวสูงสุด:<br>'+t.map((a,i)=>(i+1)+'. '+a[0]+' — '+a[1]+' ทอง').join('<br>')+'<br><small>ปราบผู้เล่นที่มีค่าหัวด้วย PvP นอกเมืองเพื่อรับเงินรางวัล</small>':'ยังไม่มีค่าหัวในเซิร์ฟเวอร์',[t.length?['รับภารกิจล่า '+t[0][0],()=>{p.bty=t[0][0];cl();say('ตามล่า '+t[0][0]+' (ลูกศรเหลืองชี้ตำแหน่ง)')}]:['—',cl],['ยกเลิกภารกิจ',()=>{p.bty=null;cl()}],['ปิด',cl]])};
NP.arena=()=>{const q=NET.aq;dlg('สนามประลอง PvP','ดวล 1v1 หรือ 3v3 (3v3 ผู้เล่นไม่ครบได้ แต่เล่นคนเดียวไม่ได้ ต้องมีอย่างน้อย 2 คน) ไม่เสียเงินและไม่เสียค่าหัว'+(q?'<br>กำลังรอคิว '+q+'v'+q+'...':''),[q?['ออกจากคิว',()=>{NET.send({t:'pqx'});NET.aq=0;cl()}]:['⚔ เข้าคิว 1v1',()=>{NET.send({t:'pq',m:1});NET.aq=1;cl();say('เข้าคิว 1v1')}],q?['—',cl]:['⚔ เข้าคิว 3v3',()=>{NET.send({t:'pq',m:3});NET.aq=3;cl();say('เข้าคิว 3v3 (รอผู้เล่นอื่นสูงสุด 10 วิ)')}],['ปิด',cl]])};
let BAL={hero:{w:{},k:{hp:1.6,spd:.9},h:{},e:{},d:{},n:{},g:{},p:{}},xp:{base:60,mul:1},econ:{gold:.55,inn:30,train:40,swap:100,pot:30,potMax:10,sell:.5,death:.2},pvp:{dmg:.45}};
const hm=k=>{const h=BAL.hero[(g&&g.p.hero)||'w'];return h&&h[k]||1},skd=i=>{const h=BAL.hero[hr()],s=h&&h.s&&h.s[i];return s&&s.d||1};
function applyData(d){BAL=d;for(const k in IT)delete IT[k];Object.assign(IT,d.items);QS.length=0;QS.push(...d.quests)}
function applyProf(pr){const p=g.p;if(!pr)return;const up=pr.lv>p.lv,qd=pr.q&&pr.q.done&&!(p.q&&p.q.done&&p.q.id==pr.q.id);['lv','xp','sp','sk','gd','it','pot','q'].forEach(k=>p[k]=pr[k]);
if(p.hero!=pr.hero){p.hero=pr.hero;p.form=0;p.bt=0;p.ch=0;p.s1=0;p.hold=0;p.kg=0;p.kw=0;p.bs=null;p.rc=null;p.ve=0;Object.assign(p,HTR);p.cd=[0,0,0,0];g.cir=null;ZN.length=0;sethero(p.hero);rfi()}
if(up){p.hp=MH();p.mp=MM();sfx('l');lvfx();say('เลเวลอัพ! Lv'+p.lv+' (+1 แต้มสกิล)')}if(qd)say('เควสสำเร็จ! กลับไปรับรางวัล');p.hp=M.min(p.hp,MH());
if(NET.rr&&!$('ov').hidden){const f=NET.rr;NET.rr=null;f()}else NET.rr=null}
function hud(){const p=g.p;nhud();setIcon($('bA'),HI[hr()].atk);$('lv').textContent=p.lv;$('gd').textContent=p.gd;$('tm').textContent='วัน '+DY()+' '+(dark()>.3?'🌙 กลางคืน':'☀ กลางวัน')+' • '+BN[bio(p.x,p.y)]+(p.bf?' ✨'+M.ceil(p.bf.t)+'s':'')+hudx(p)+(g.sc?' 📍'+g.sc.name:'');$('hp').style.width=100*p.hp/MH()+'%';$('mp').style.width=100*p.mp/MM()+'%';$('xp').style.width=100*p.xp/(p.lv*60)+'%';
[0,1,2].forEach(i=>{const b=$('b'+i),f=(p.hero=='g'?p.fm:p.form)?1:0;setIcon(b,HI[hr()].ic?HI[hr()].ic+(i+1)+(HI[hr()].fm&&f&&i<2?'b':''):'s'+(i+1)+(f?'b':'n'));b.title=SN[i][f];const c=p.cd[i];if(c>0&&!(i==0&&p.s1>0))b.dataset.c=c>=99?'':M.ceil(c);else delete b.dataset.c});
if(p.cd[3]>0)$('bh').dataset.c=M.ceil(p.cd[3]);else delete $('bh').dataset.c;
const s=p.pot+'|'+p.it+'|'+(p.q?p.q.id+':'+p.q.pr+p.q.done:'');if(s!=lastS){lastS=s;$('q0').textContent='🍞'+p.pot[0];$('q1').textContent='🍵'+p.pot[1];let h='';for(let i=0;i<6;i++)h+='<i>'+(p.it[i]?IT[p.it[i]][3]:'')+'</i>';$('slots').innerHTML=h;$('qt').textContent='เควส: '+qtxt()}
{const nb=nearNpc();$('bi').hidden=!nb||!$('ov').hidden;if(nb)$('bi').textContent=(INT[nb[0]]||DGS[nb[0]])&&!g.sc?'🚪 เข้า':nb[0]=='exit'?'🚪 ออก':nb[0]=='stairs'?'⬇ ลงบันได':'💬 คุย'}
const m=mx2,k=120/WW;m.clearRect(0,0,120,84);m.drawImage(BMAP,0,0,120,84);m.fillStyle='#c0283c';if(!g.sc)g.en.forEach(e=>m.fillRect(e.x*k-1,e.y*k-1,e.boss||e.wb?4:2,e.boss||e.wb?4:2));const pp=g.sc?g.sc.ex:p;m.fillStyle='#4aa3ff';m.fillRect(pp.x*k-2,pp.y*k-2,4,4);const tg=tgt();if(tg){m.fillStyle='#ffd54a';m.fillRect(tg.x*k-2,tg.y*k-2,4,4)}}
let last=0;function loop(t){requestAnimationFrame(loop);const dt=M.min(.05,(t-last)/1000||0);last=t;if(!g||$('hud').hidden)return;if($('ov').hidden){if(HS>0)HS-=dt;else upd(dt)}draw();hud()}
const B_=(id,f)=>{$(id).onpointerdown=e=>{e.preventDefault();f()}};
aimBind('b0',0);aimBind('b1',1);aimBind('b2',2);B_('bh',heal);B_('q0',()=>use(0));B_('q1',()=>use(1));B_('menu',menu);$('bi').onclick=()=>{const b=nearNpc();if(b)act(b)};
$('bA').onpointerdown=e=>{e.preventDefault();ah=1};$('bA').onpointerup=$('bA').onpointerleave=()=>ah=0;
const J=$('joy'),kn=$('knob');let jid=null;function mv(e){const q=J.getBoundingClientRect(),sc=q.width/130,dx=e.clientX-q.left-q.width/2,dy=e.clientY-q.top-q.height/2,l=M.min(M.hypot(dx,dy),45*sc),a=M.atan2(dy,dx);jx=M.cos(a)*l/(45*sc);jy=M.sin(a)*l/(45*sc);kn.style.transform='translate('+M.cos(a)*l/sc+'px,'+M.sin(a)*l/sc+'px)'}
J.onpointerdown=e=>{jid=e.pointerId;J.setPointerCapture(jid);mv(e)};J.onpointermove=e=>{if(e.pointerId==jid)mv(e)};J.onpointerup=J.onpointercancel=()=>{jid=null;jx=jy=0;kn.style.transform=''};
addEventListener('keydown',e=>{if(e.target.tagName=='INPUT'||e.target.tagName=='TEXTAREA')return;const k=e.key.toLowerCase();if(capK!=null){e.preventDefault();KB[ACT[capK][0]]=k;capK=null;savecfg();cfgp();return}K[k]=1;if(!g||!$('ov').hidden)return;const a=Object.keys(KB).find(n=>KB[n]==k);({s1:()=>cast(0),s2:()=>cast(1),s3:()=>cast(2),heal,q0:()=>use(0),q1:()=>use(1),menu,bag,use:()=>{const b=nearNpc();if(b)act(b)}})[a]?.()});
addEventListener('keyup',e=>{K[e.key.toLowerCase()]=0;if(g){const k2=e.key.toLowerCase();if(k2==KB.s1){rel();hrel(0)}else if(k2==KB.s2)hrel(1)}});
/* =====================================================================
   WinterRPG v1.6 — ส่วนที่เพิ่มใหม่ (อ่านง่าย ไม่ย่อ)
   1) ระบบทั่วไป  2) ลูท/บอสโลก  3) ฮีโร่: Hastos, Heavy Knight
   4) ฮีโร่ใหม่: Decibus, Enigma-03, กำนันกู, Hepta  5) สไปรต์/ไอคอน
   ===================================================================== */

/* ---------- 1) ระบบทั่วไป ---------- */
// ค่าสถานะชั่วคราวของฮีโร่ (รีเซ็ตตอนโหลดเซฟ / เปลี่ยนตัว / ตาย)
const HTR={ve:0,vt:0,hs1:0,hsp:0,db:null,ca:0,fz:null,sh:null,ec:0,em:0,ep:0,fm:0,kn:0,kh:0,kp:0,kas:0,ksa:0,od:0,odt:0,ci:0,cit:0,hasb:0};
// ศัตรูระดับ "ฮีโร่" (ใช้แทน enemy hero ในโหมด PvE): บอส, ตัวใหญ่, ผีดิบขึ้นไป
const ISH=e=>!!(e.pv||e.boss||e.big||e.wb||e.guard||ST.findIndex(s=>s.t==e.t)>=2);
// กำนันกูชาร์จสกิลแล้วเดินไม่ได้
const kblk=p=>p.hero=='g'&&((p.kn==1&&p.fm)||(p.kn==2&&!p.fm));

// ฟันเป็นกรวยด้านหน้า คืนจำนวนศัตรูที่โดน
function cone(a,r,half,d,mg,pp){let n=0;const p=g.p;g.en.forEach(z=>{if(z.dead)return;const dx=z.x-p.x,dy=z.y-p.y;if(M.hypot(dx,dy)>=r)return;const q=M.atan2(dy,dx);if(M.abs(M.atan2(M.sin(q-a),M.cos(q-a)))<half){hit(z,d,0,mg,pp);n++}});return n}

function hudx(p){const h=p.hero;return(h=='h'?' ✝'+(p.ve||0)+'/4':'')+(h=='d'?' ⚡'+(p.ec||0)+'/5':'')+(h=='n'?' ⚙'+(p.em?'Burst':'MG')+(g.cal&&g.cal.n?' ◎'+g.cal.n:''):'')+(h=='g'?(p.fm?' 🌑มืด':' ☀แสง'):'')+(h=='p'?' 👊'+(p.ci||0)+(p.od?' ⚡Lv'+p.od:''):'')+(p.fz?' 🛡'+M.ceil(p.fz.t):'')+(p.db?' ✨'+M.ceil(p.db.t):'')+(p.ep>0?' 🎯'+M.ceil(p.ep):'')}

/* ---------- 2) (MMO) ลูท/บอสโลกคำนวณที่เซิร์ฟเวอร์ — ฝั่งเกมมีแค่สีบอสสำหรับวาด ---------- */
const BBP={pharaoh:{R:'#8a6a10',K:'#2a1a05',Y:'#fff0a0'},titan:{R:'#1f6a2a',K:'#07140a',Y:'#d6ff5a'}};
// ผู้ส่งสารเมืองใหม่
NP.courier3=dlv('courier3','ผู้ส่งสาร โอเอซิสซันเดอร์','เดินทางข้ามทะเลทรายมาไกลเลย! น้ำกับพัสดุมีค่าพอ ๆ กันที่นี่');
NP.courier4=dlv('courier4','ผู้ส่งสาร รากพฤกษ์','ขอบคุณที่ฝ่าป่าลึกมาถึงที่นี่ ระวังแมงมุมกับราชันย์รากพิษด้วยนะ');
NP.dg4=dgm('dg4');NP.dg5=dgm('dg5');NP.dg6=dgm('dg6');NP.dg7=dgm('dg7');

/* ---------- 3) Hastos — The Sacred Guardian (Holy Knight) ---------- */
const P2=a=>a.map(t=>[t,t]);
HI.h={n:'Hastos',nf:1,pk:'hastos',short:'The Sacred Guardian • Holy Knight แทงค์/ไฟเตอร์',
  ps:'Sacred Resolve: ใช้สกิลโจมตีโดนศัตรูได้ 1 Stack (สูงสุด 4 อยู่ชั่วคราว) เสริม Holy Cleave และ Divine Blessing',
  mc:[12,16,28],cc:[[7,7],[10,10],[40,40]],atk:'hatk',ic:'h',
  sn:[['Holy Cleave','Holy Cleave','⚔','⚔'],['Sacred Return','Sacred Return','🪃','🪃'],['Divine Blessing','Divine Blessing','✨','✨']],
  sd:P2(['ฟันไปข้างหน้า 2 จังหวะ แล้วอัปเกรดการโจมตีปกติครั้งถัดไป (ภายใน 4.5 วิ) เป็น Holy Strike พุ่งเข้าหาเป้าหมาย ได้โบนัสเจาะเกราะตาม Stack: 25% / 50% / 75% / 100%',
    'ขว้างอาวุธไปข้างหน้า เมื่อโดนศัตรูอาวุธจะย้อนกลับ ฟื้นฟู HP เล็กน้อย เพิ่มความเร็วเคลื่อนที่ และลดความเร็วศัตรูเล็กน้อย',
    'ห่อหุ้มร่างด้วยพลังศักดิ์สิทธิ์ 8 วิ พลังโจมตี +20–50% และลดความเสียหาย 20–75% ตามจำนวน Stack ถ้าครบ 4 Stack ฟื้นฟู HP 250 แล้วใช้ Stack ทั้งหมด'])};
function sr(){const p=g.p;if(p.hero!='h')return;p.ve=M.min(4,(p.ve||0)+1);p.vt=8;puff(p.x,p.y-6,6,'#ffe9a0',50,.4,1.2,0,1)}
HC.h=function(i,ang){const c=hpre(i,ang);if(!c)return;const{p,co,si,A}=c;p.mp-=c.mc;sfx(['c1','c2','c3'][i]);
  if(i==0){p.cd[0]=7*CD();p.hs1=4.5;let got=0;
    const sl=k=>{const q=g.p;swing(q.a,'#ffe9a0',54+k*6);SK=4;const n=cone(q.a,62,1,A*(k?1:.85));if(n&&!got){got=1;sr()}};
    sl(0);tmo(.26,()=>sl(1));say('Holy Strike พร้อม! โจมตีปกติเพื่อพุ่งเข้าฟัน')}
  if(i==1){p.cd[1]=10*CD();ring(p.x+co*14,p.y+si*14,20,'#ffe9a0');shoot({x:p.x,y:p.y,vx:co*260,vy:si*260,d:A*1.3,bm:1,rng:170,tr0:0,r:9,life:3})}
  if(i==2){const n=p.ve||0,a=.2+.075*n,r=.2+.1375*n;p.cd[2]=40*CD();p.db={t:8,a,r};ring(p.x,p.y,40,'#ffe9a0');ring(p.x,p.y,70,'#fff');puff(p.x,p.y,30,'#ffe9a0',100,.7,1.6,0,1);SK=6;
    if(n>=4){p.hp=M.min(MH(),p.hp+250);fl.push({x:p.x,y:p.y-12,s:'+250',c:'#7aff7a',t:1});p.ve=0;p.vt=0;say('Divine Blessing สมบูรณ์! ฟื้นฟู 250 HP')}
    else say('Divine Blessing: โจมตี +'+(a*100|0)+'% ลดดาเมจ '+(r*100|0)+'%')}};
HA.h=function(){const p=g.p;if(p.acd>0||p.dash)return;const e=near(p.hs1>0?130:50);if(!e)return;p.a=M.atan2(e.y-p.y,e.x-p.x);const A=AT(),co=M.cos(p.a),si=M.sin(p.a),d=D(p,e),pp=(p.ve||0)*.25;
  if(p.hs1>0){p.hs1=0;p.acd=.8;streak(p.x,p.y,e.x-co*20,e.y-si*20,'#ffe9a0');
    const t=d>40?M.max(.06,(d-24)/520):0;if(t>0)p.dash={vx:co*520,vy:si*520,t};
    tmo(t,()=>{if(e.dead)return;swing(g.p.a,'#fff',58);ring(e.x,e.y,32,'#ffe9a0');SK=6;hit(e,A*1.8,0,0,pp)});return}
  swing(p.a,'#ffe9a0',34);p.lg=3;hit(e,A);p.acd=.5/(1+AS())};

// Sacred Return: อาวุธบูมเมอแรง (กระสุนชนิด bm) ออกไปจนสุดระยะหรือโดนศัตรู แล้วย้อนกลับมาหาผู้เล่น
function bmt(o){o.ret=1;o.hit=[]}
function bmu(o,dt){const p=g.p;
  if(!o.ret){o.x+=o.vx*dt;o.y+=o.vy*dt;o.tr0+=M.hypot(o.vx,o.vy)*dt;if(o.tr0>=o.rng)bmt(o)}
  else{const a=M.atan2(p.y-o.y,p.x-o.x);o.vx=M.cos(a)*340;o.vy=M.sin(a)*340;o.x+=o.vx*dt;o.y+=o.vy*dt;if(D(o,p)<12){o.life=0;return}}
  for(const e of g.en){if(e.dead||o.hit.includes(e))continue;if(D(o,e)<o.r+7){o.hit.push(e);
    if(!o.ret){hit(e,o.d);sr();p.hp=M.min(MH(),p.hp+MH()*.04);p.hsp=3;e.sw=2.5;ring(e.x,e.y,20,'#ffe9a0');bmt(o)}else hit(e,o.d*.7)}}}
function bmd(o){const X=(o.x-cx)*S,Y=(o.y-cy)*S;x.save();x.translate(X,Y);x.rotate(g.t*18);x.fillStyle='#ffe9a0';x.fillRect(-7*S,-1.5*S,14*S,3*S);x.fillStyle='#fff';x.fillRect(-1.5*S,-7*S,3*S,14*S);x.restore();
  x.globalCompositeOperation='lighter';const gr=x.createRadialGradient(X,Y,0,X,Y,14*S);gr.addColorStop(0,'rgba(255,233,160,.6)');gr.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=gr;x.beginPath();x.arc(X,Y,14*S,0,7);x.fill();x.globalCompositeOperation='source-over'}

/* ---------- Heavy Knight — The Immovable Fortress ---------- */
HI.k={n:'Heavy Knight',nf:1,pk:'knight',short:'The Immovable Fortress • ยิ่งเลือดเยอะยิ่งแรง',
  ps:'Execution Force: ตีปกติสร้างดาเมจเวทเพิ่ม 20–50% (ตามเลเวล) ของ HP ที่ศัตรูเสียไป มีเพดานต่อครั้ง • HP +60% เดินช้า 10%',
  mc:[10,14,28],cc:[[12,12],[9,9],[45,45]],atk:'katk',ic:'k',
  sn:[['Crushing Advance','Crushing Advance','💥','💥'],['Dreadful Presence','Dreadful Presence','👁','👁'],['Unbreakable Fortress','Unbreakable Fortress','🏰','🏰']],
  sd:P2(['เสริมพลังโจมตีปกติครั้งถัดไป (ภายใน 5 วิ) พุ่งเข้าหาศัตรู ดาเมจเวทเพิ่ม = 35% ของ Max HP ตัวเอง (มีคูลดาวน์ 12 วิ กันเก็บบัฟไว้ใช้ต่อเนื่อง)',
    'ปลดปล่อยออร่าเวทรอบตัว ดาเมจเวท AoE = 20% ของ Max HP ตัวเอง โดนศัตรูทุกตัวในรัศมี',
    'ป้องกันสมบูรณ์ ไม่รับดาเมจ 5 วิ (เพิ่มตามเลเวลสกิล สูงสุด 10 วิ) เมื่อหมดเวลาสะท้อน 50% ของดาเมจที่สะสมเป็น AoE กายภาพ และตัวเองรับอีก 50%'])};
HA.k=function(){const p=g.p;if(p.acd>0||p.dash)return;const e=near(p.ca>0?130:46);if(!e)return;p.a=M.atan2(e.y-p.y,e.x-p.x);const A=AT(),co=M.cos(p.a),si=M.sin(p.a),d=D(p,e);
  // Passive: ดาเมจเวท 20–50% ของ HP ที่ศัตรูเสียไป เพดาน 40% ของ Max HP ตัวเอง
  const pas=()=>{if(e.dead)return;const pc=M.min(.5,.2+(g.p.lv-1)*.01),b=M.min((e.mh-e.hp)*pc,MH()*.4);if(b>=1)hit(e,b,0,1)};
  if(p.ca>0){const L=1+.1*(p.sk[0]-1);p.ca=0;p.acd=.9;streak(p.x,p.y,e.x-co*18,e.y-si*18,'#cfd8ff');
    const t=d>40?M.max(.05,(d-20)/540):0;if(t>0)p.dash={vx:co*540,vy:si*540,t};
    tmo(t,()=>{if(e.dead)return;swing(g.p.a,'#fff',56);ring(e.x,e.y,36,'#cfd8ff');SK=8;hit(e,A*1.2);hit(e,MH()*.35*L,0,1);pas()});return}
  swing(p.a,'#cfd8ff',34);p.lg=3;hit(e,A*1.1);pas();p.acd=.6/(1+AS())};
HC.k=function(i,ang){const c=hpre(i,ang);if(!c)return;const{p}=c;p.mp-=c.mc;sfx(['c1','c2','c3'][i]);
  if(i==0){p.ca=5;p.cd[0]=12*CD();ring(p.x,p.y,30,'#cfd8ff');puff(p.x,p.y,16,'#cfd8ff',60,.6,1.4,0,1);say('Crushing Advance! โจมตีปกติครั้งถัดไปจะพุ่งเข้าฟัน')}
  if(i==1){const L=1+.1*(p.sk[1]-1);p.cd[1]=9*CD();ring(p.x,p.y,72,'#b06cff');ring(p.x,p.y,44,'#fff');puff(p.x,p.y,34,'#b06cff',120,.6,1.6,0,1);SK=8;aoe(p.x,p.y,72,MH()*.2*L,null,1)}
  if(i==2){const dur=M.min(10,5+(p.sk[2]-1)*1.25);p.cd[2]=45*CD();p.fz={t:dur,acc:0};ring(p.x,p.y,50,'#fff');puff(p.x,p.y,30,'#e9f1f8',110,.7,1.6,0,1);SK=6;say('Unbreakable Fortress '+dur.toFixed(1)+' วิ')}};
// จบสถานะอมตะ: สะท้อน 50% เป็น AoE กายภาพ อีก 50% ตัวเองรับ (ไม่ตาย เหลือ 1 HP ขั้นต่ำ)
function fzEnd(){const p=g.p,f=p.fz;p.fz=null;if(!f||f.acc<1)return;const half=f.acc*.5;boom(p.x,p.y,90);aoe(p.x,p.y,90,half);p.hp=M.max(1,p.hp-half);hurtfx();say('ปลดปล่อย! สะท้อน '+(half|0)+' • รับกลับ '+(half|0))}

/* ---------- 4) ฮีโร่ใหม่ ---------- */
/* ===== Decibus — Thunder Sovereign ===== */
HI.d={n:'Decibus',nf:1,pk:'decibus',short:'Thunder Sovereign • จักรพรรดิสายฟ้า เวทระยะกลาง',
  ps:'Electrical Conduction: สกิลโดนศัตรูได้ Electro Charge (สูงสุด 5) ครบ 5 สกิลถัดไปปล่อยสายฟ้าลูกโซ่ไปศัตรูใกล้เคียง แล้วรีเซ็ต',
  mc:[10,14,28],cc:[[6,6],[9,9],[32,32]],atk:'datk',ic:'d',
  sn:[['Thunder Lance','Thunder Lance','🔱','🔱'],['Volt Rush','Volt Rush','⚡','⚡'],['Sovereign Judgment','Sovereign Judgment','🌩','🌩']],
  sd:P2(['ยิงหอกสายฟ้าเป็นเส้นตรง ทะลุศัตรูได้ ดาเมจเวท โดนศัตรูตัวแกร่ง/บอสได้ Charge เพิ่ม ถ้าโดนตัวเดิมซ้ำในเวลาสั้นดาเมจลดลง',
    'กลายเป็นกระแสไฟฟ้าพุ่งไปตามทิศ ดาเมจเวทระหว่างทาง ผ่านตัวศัตรูได้ ถ้าโดนศัตรูตัวแกร่ง/บอสได้โล่เล็กน้อยและลดคูลดาวน์ Skill 1 ลง 2 วิ',
    '(สกิลเสนอ — เอกสารยังไม่ได้กำหนด) เรียกสายฟ้าฟาด 6 ครั้งลงพื้นที่เป้าหมาย ดาเมจเวท+สตั้นสั้น ๆ นับเป็นสกิลโจมตีเพิ่ม Charge'])};
// ได้ Charge จากสกิลที่โดน (ตัวแกร่งได้เพิ่ม) ครบ 5 แล้วฟาดซ้ำจะเกิดสายฟ้าลูกโซ่
function dst(e,d){const p=g.p;if(p.hero!='d')return;if((p.ec||0)>=5){p.ec=0;chain(e,d*.8)}else p.ec=M.min(5,(p.ec||0)+1+(ISH(e)?1:0));ring(e.x,e.y,16,'#ffe14a')}
function chain(e,d){let cur=e;const seen=[e];ring(e.x,e.y,34,'#fff');for(let j=0;j<4;j++){let nx=null,bd=120;g.en.forEach(z=>{if(!z.dead&&!seen.includes(z)){const dd=D(cur,z);if(dd<bd){bd=dd;nx=z}}});if(!nx)break;streak(cur.x,cur.y,nx.x,nx.y,'#ffe14a');hit(nx,d*(1-.1*j),0,1);seen.push(nx);cur=nx}SK=6;say('สายฟ้าลูกโซ่!')}
HA.d=function(){const p=g.p;if(p.acd>0||p.dash)return;const e=near(190);if(!e)return;p.a=M.atan2(e.y-p.y,e.x-p.x);shoot({x:p.x,y:p.y,vx:M.cos(p.a)*250,vy:M.sin(p.a)*250,d:AT()*.95,mg:1,k:'z',c:'#ffe14a',life:.8,r:6});p.acd=.6/(1+AS());p.lg=2};
HC.d=function(i,ang){const c=hpre(i,ang);if(!c)return;const{p,e,co,si,A}=c;p.mp-=c.mc;sfx(['c1','c2','c3'][i]);
  if(i==0){p.cd[0]=6*CD();ring(p.x+co*12,p.y+si*12,20,'#ffe14a');SK=3;shoot({x:p.x,y:p.y,vx:co*340,vy:si*340,d:A*1.5,mg:1,k:'z',c:'#fff7a0',life:.55,r:7,pierce:1,dl:1,rd:1})}
  if(i==1){p.cd[1]=9*CD();const hl=[];streak(p.x,p.y,p.x+co*130,p.y+si*130,'#ffe14a');p.dash={vx:co*620,vy:si*620,t:.21};p.inv=.25;
    for(let k=0;k<6;k++)tmo(k*.04,()=>{g.en.forEach(z=>{if(z.dead||hl.includes(z)||D(z,g.p)>26)return;hl.push(z);hit(z,A*1.2,0,1);dst(z,A*1.2);if(ISH(z)){g.p.sh={hp:40+A*.8,t:4};g.p.cd[0]=M.max(0,g.p.cd[0]-2)}})})}
  if(i==2){p.cd[2]=32*CD();const X=e?e.x:p.x+co*110,Y=e?e.y:p.y+si*110;ring(X,Y,72,'#ffe14a');
    for(let k=0;k<6;k++)tmo(.5+k*.18,()=>{const x2=X+(R()-.5)*100,y2=Y+(R()-.5)*100;ring(x2,y2,30,'#fff');puff(x2,y2,14,'#ffe14a',110,.4,1.4,0,1);SK=5;g.en.forEach(z=>{if(z.dead||M.hypot(z.x-x2,z.y-y2)>34)return;hit(z,A*1.1,0,1);z.stun=M.max(z.stun||0,.35);dst(z,A*1.1)})})}};

/* ===== Enigma-03 — หุ่นยนต์รูปร่างมนุษย์ ===== */
HI.n={n:'Enigma-03',nf:1,pk:'enigma',short:'หุ่นยนต์รูปร่างมนุษย์ ปืน 2 โหมด',
  ps:'Combat Calibration: ยิงเป้าเดิมต่อเนื่องสะสมความแม่นยำ ครบ 5 นัดนัดถัดไปแรงขึ้น และ Burst Mode แรงกว่าเดิม',
  mc:[6,12,24],cc:[[1.5,1.5],[10,10],[35,35]],atk:'natk',ic:'n',
  sn:[['Mode Shift','Mode Shift','🔄','🔄'],['Tactical Lock','Tactical Lock','🎯','🎯'],['Enigma Protocol','Enigma Protocol','⚙','⚙']],
  sd:P2(['สลับ Machine Gun (ยิงเร็ว ล็อกเป้าตามอัตโนมัติ) กับ Burst (ระยะไกลขึ้น ดาเมจสูง ยิงช้า)',
    'ล็อกเป้าหมายในระยะ 6 วิ กระสุนติดตามเป้าที่ล็อกแม่นยำขึ้น ถ้าใช้ใน Burst Mode ดาเมจต่อเป้าที่ล็อก +35%',
    'ระบบประมวลผลการต่อสู้ 8 วิ ระยะโจมตีและความเร็วเดินเพิ่มขึ้น เสริมโหมดปืนที่ใช้อยู่ (Burst ทะลุศัตรูและแรงขึ้น, MG ยิงถี่ขึ้น)'])};
HA.n=function(){const p=g.p;if(p.acd>0||p.dash)return;const B=p.em==1,P=p.ep>0,rg=B?(P?310:260):(P?210:170),lk=g.lk&&!g.lk.dead&&D(p,g.lk)<rg+40?g.lk:null,e=lk||near(rg);if(!e)return;
  p.a=M.atan2(e.y-p.y,e.x-p.x);g.cal=g.cal||{e:null,n:0};if(g.cal.e!==e){g.cal.e=e;g.cal.n=0}g.cal.n++;
  let m=B?1.9:.55;if(P&&B)m*=1.25;if(lk&&B)m*=1.35;if(g.cal.n>=5){g.cal.n=0;m*=B?1.9:1.6;ring(e.x,e.y,20,'#3affff')}
  const v=B?330:300;shoot({x:p.x,y:p.y,vx:M.cos(p.a)*v,vy:M.sin(p.a)*v,d:AT()*m,k:'z',c:B?'#ff9a3a':'#9fdcff',life:B?.9:.6,r:B?7:4,pierce:B&&P?1:0,hm:(!B||lk)?e:null});
  p.acd=(B?.95:(P?.15:.2))/(1+AS());p.lg=2};
HC.n=function(i,ang){const c=hpre(i,ang);if(!c)return;const{p}=c;
  if(i==1){const t=near(330);if(!t)return say('ไม่มีเป้าหมายในระยะ');p.mp-=c.mc;sfx('c2');g.lk=t;g.lkT=6;p.cd[1]=10*CD();ring(t.x,t.y,22,'#3affff');say('Tactical Lock!');return}
  p.mp-=c.mc;sfx(['c1','c2','c3'][i]);
  if(i==0){p.em=p.em?0:1;p.cd[0]=1.5*CD();p.acd=.25;ring(p.x,p.y,26,p.em?'#ff9a3a':'#9fdcff');say(p.em?'Burst Mode: ระยะไกล ดาเมจสูง ยิงช้า':'Machine Gun Mode: ยิงเร็ว ล็อกเป้าอัตโนมัติ')}
  if(i==2){p.ep=8;p.cd[2]=35*CD();ring(p.x,p.y,40,'#3affff');puff(p.x,p.y,24,'#3affff',100,.6,1.5,0,1);SK=4;say('Enigma Protocol! ระยะ/ความเร็วเพิ่ม 8 วิ')}};

/* ===== กำนันกู — The Duality (ร่างแสง / ร่างมืด) ===== */
HI.g={n:'กำนันกู',fm:1,fl:['ร่างแสง','ร่างมืด'],pk:'kamnan',short:'The Duality • สลับร่างแสง/ร่างมืด',
  ps:'Duality Mastery — แสง: พลังโจมตีกลายเป็นความเร็วตี ตีปกติลดคูลดาวน์ S1 0.5 วิ • มืด: ความเร็วตีกลายเป็นเจาะเกราะ หลังใช้สกิลได้โจมตีพิเศษระยะไกล 1 ครั้ง (ลดคูลดาวน์ S1/S2 อย่างละ 1 วิ)',
  mc:[10,16,18],cc:[[10,11],[11,12],[3,3]],atk:'gatk',ic:'g',
  sn:[['Accelerated Strike','Shadow Break','⚡','🌑'],['Radiant Tempest','Abyssal Rupture','🌟','🌌'],['Yin & Yang','Yin & Yang','☯','☯']],
  sd:[['(แสง) กดค้างชาร์จ 2 วิ ได้บัฟความเร็วโจมตี +100% นาน 6 วิ (ปล่อยก่อนครบ = ยกเลิก)','(มืด) กดค้างชาร์จสูงสุด 5 วิ ระหว่างชาร์จเดินไม่ได้ ลดดาเมจรับ 20% ปล่อยแล้วพุ่งไปข้างหน้า ระยะตามเวลาชาร์จ'],
    ['(แสง) กดค้างปล่อยคลื่นแสงต่อเนื่อง 5 ครั้งพร้อมเคลื่อนที่ ปล่อยปุ่มระหว่างทาง = ยกเลิก ครั้งที่ 5 เป็นคลื่นใหญ่และติด Mark ตีศัตรูที่ติด Mark ฟื้น HP 5–10%','(มืด) กดค้างชาร์จสูงสุด 5 วิ ปล่อยคลื่นมืดออกไปข้างหน้า 3 ทิศ ระยะไกลตามเวลาชาร์จ ดาเมจแรง'],
    ['สลับร่างแสง/ร่างมืด เปลี่ยน Passive และรูปแบบ S1/S2 ทุกครั้งที่อัปเลเวลสกิลนี้ได้เจาะเกราะ +1%','สลับร่างแสง/ร่างมืด เปลี่ยน Passive และรูปแบบ S1/S2 ทุกครั้งที่อัปเลเวลสกิลนี้ได้เจาะเกราะ +1%']]};
const gh=(e,d,mg)=>hit(e,d,0,mg,(g.p.sk[2]-1)*.01);          // โจมตีของกำนันกู (เจาะเกราะ % จากเลเวล S3)
function kmh(e){const p=g.p;if(p.hero!='g')return;e.km=0;const pc=M.min(.1,.05+.01*(p.sk[1]-1)),h=MH()*pc;p.hp=M.min(MH(),p.hp+h);fl.push({x:p.x,y:p.y-12,s:'+'+(h|0),c:'#7aff7a',t:.9})}
function ksh(){const p=g.p;p.cd[0]=M.max(0,p.cd[0]-1);p.cd[1]=M.max(0,p.cd[1]-1)}
function ksp(e){const p=g.p,a=M.atan2(e.y-p.y,e.x-p.x);shoot({x:p.x,y:p.y,vx:M.cos(a)*320,vy:M.sin(a)*320,d:AT()*1.3,k:'z',c:'#ff2a4a',life:.75,r:8,pierce:1,ks:1});ring(p.x,p.y,16,'#a0102a')}
function ksk(){const p=g.p;if(!p.fm)return;const e=near(240);if(e){p.a=M.atan2(e.y-p.y,e.x-p.x);ksp(e)}else p.ksa=1}
HA.g=function(){const p=g.p;if(p.acd>0||p.dash||p.kn)return;const dk=!!p.fm;
  if(dk&&p.ksa>0){const t=near(240);if(t){p.ksa=0;p.a=M.atan2(t.y-p.y,t.x-p.x);ksp(t);p.acd=.5;return}}
  const e=near(46);if(!e)return;p.a=M.atan2(e.y-p.y,e.x-p.x);swing(p.a,dk?'#a0102a':'#fff7c0',32);p.lg=3;gh(e,AT()*(dk?1.2:.9));
  if(!dk&&p.cd[0]<90)p.cd[0]=M.max(0,p.cd[0]-.5);
  p.acd=(dk?.75:.5)/(1+AS())};
HC.g=function(i,ang){const p=g.p;if(p.kn)return;const c=hpre(i,ang);if(!c)return;p.mp-=c.mc;sfx(['c1','c2','c3'][i]);const col=p.fm?'#a0102a':'#fff7c0';
  if(i==2){p.fm=p.fm?0:1;p.cd[2]=3*CD();const c2=p.fm?'#a0102a':'#fff7c0';ring(p.x,p.y,44,c2);puff(p.x,p.y,30,c2,110,.6,1.6,0,1);SK=4;say(p.fm?'เปลี่ยนเป็นร่างมืด':'เปลี่ยนเป็นร่างแสง');return}
  p.kn=i+1;p.kh=0;p.kp=0;p.cd[i]=99;ring(p.x,p.y,22,col);puff(p.x,p.y,12,col,50,.5,1.2,0,1)};
// ปล่อยปุ่มสกิลที่กดค้าง (เรียกจากปุ่มหน้าจอ/คีย์บอร์ด)
function hrel(i){const o=NFX;NFX=1;try{hrel0(i)}finally{NFX=o}}
function hrel0(i){const p=g&&g.p;if(!p||p.hero!='g'||p.kn!=i+1)return;const dk=!!p.fm,t=p.kh,L=M.min(1,t/5),A=AT()*(1+.15*(p.sk[i]-1))*(1+AP()),e=near(320);if(e)p.a=M.atan2(e.y-p.y,e.x-p.x);const co=M.cos(p.a),si=M.sin(p.a);p.kn=0;
  if(i==0){
    if(!dk){if(t>=2){p.kas=6;p.cd[0]=10*CD();ring(p.x,p.y,40,'#fff7c0');puff(p.x,p.y,24,'#fff7c0',90,.5,1.4,0,1);say('Accelerated Strike! ความเร็วโจมตี +100%')}else{p.cd[0]=1.5;say('ชาร์จไม่ครบ 2 วิ')}}
    else{const dist=60+L*220,sp=720,hl=[];p.cd[0]=11*CD();streak(p.x,p.y,p.x+co*dist,p.y+si*dist,'#a0102a');p.dash={vx:co*sp,vy:si*sp,t:dist/sp};
      for(let k=0;k<=M.ceil(dist/sp/.04);k++)tmo(k*.04,()=>{g.en.forEach(z=>{if(z.dead||hl.includes(z)||D(z,g.p)>26)return;hl.push(z);gh(z,A*(1.4+.4*L))})});ksk()}}
  if(i==1){
    if(!dk){p.cd[1]=3*CD();say('ยกเลิก Radiant Tempest')}
    else{p.cd[1]=12*CD();ring(p.x,p.y,30,'#a0102a');[p.a-.5,p.a,p.a+.5].forEach(a=>shoot({x:p.x,y:p.y,vx:M.cos(a)*300,vy:M.sin(a)*300,d:A*(2+1.2*L),k:'z',c:'#a0102a',life:(70+L*190)/300,r:11,pierce:1}));ksk()}}}
// คลื่นแสง Radiant Tempest ครั้งที่ n (5 ครั้ง ครั้งที่ 5 ใหญ่และติด Mark)
function kpulse(n){const o=NFX;NFX=1;try{kpulse0(n)}finally{NFX=o}}
function kpulse0(n){const p=g.p,A=AT()*(1+.15*(p.sk[1]-1))*(1+AP()),e=near(260);if(e)p.a=M.atan2(e.y-p.y,e.x-p.x);const co=M.cos(p.a),si=M.sin(p.a);p.x+=co*14;p.y+=si*14;
  const big=n==5,x2=p.x+co*28,y2=p.y+si*28;swing(p.a,'#fff7c0',big?70:44);ring(x2,y2,big?70:40,'#fff7c0');if(big)SK=5;
  g.en.forEach(z=>{if(z.dead)return;if(M.hypot(z.x-x2,z.y-y2)<(big?72:42)){gh(z,A*(big?1.6:.55));if(big)z.km=6}})}
function kch(dt){const p=g.p;if(p.hero!='g'||!p.kn)return;p.kh+=dt;
  if(p.kn==1&&p.fm&&p.kh>=5)return hrel(0);
  if(p.kn==1&&!p.fm&&p.kh>=2)return hrel(0);
  if(p.kn==2&&p.fm&&p.kh>=5)return hrel(1);
  if(p.kn==2&&!p.fm){while(p.kp<5&&p.kh>=p.kp*.3+.01){p.kp++;kpulse(p.kp)}if(p.kp>=5){p.kn=0;p.cd[1]=11*CD()}}}

/* ===== Hepta — The Iron Fist ===== */
HI.p={n:'Hepta',nf:1,pk:'hepta',short:'The Iron Fist • นักสู้หมัดแขนกล แคร์รี่ใกล้',
  ps:'Combat Instinct: ตีหมัดปกติสะสมพลังต่อสู้ (สูงสุด 10) เพิ่มดาเมจหมัดพิเศษ ถ้าไม่โจมตีสักพักพลังจะค่อย ๆ ลดลง',
  mc:[10,12,22],cc:[[0.8,0.8],[9,9],[24,24]],atk:'patk',ic:'p',
  sn:[['Overdrive Punch','Overdrive Punch','👊','👊'],['Breakthrough','Breakthrough','💨','💨'],['Final Impact','Final Impact','💥','💥']],
  sd:P2(['ชาร์จพลังเข้าแขนกลทีละระดับ (กดซ้ำได้สูงสุด Lv3) โจมตีปกติครั้งถัดไปกลายเป็นหมัดพิเศษ ปล่อยพลังที่สะสมทั้งหมด Lv3 แรงมาก',
    'พุ่งเข้าหาศัตรูใกล้ ปล่อยหมัดกระแทก ดาเมจกายภาพ ถ้าโดนศัตรูตัวแกร่ง/บอสได้ความเร็วโจมตีเพิ่มชั่วคราว',
    'รวมพลังที่แขนกลแล้วปล่อยหมัดหนักใส่ศัตรูตรงหน้า ดาเมจเพิ่มตามระดับ Overdrive ที่สะสม ถ้า Lv3 เต็มปล่อยหมัดพลังเต็มกำลังพร้อมแรงกระแทกวงเล็กรอบเป้าหมาย'])};
HA.p=function(){const p=g.p;if(p.acd>0||p.dash)return;const e=near(44);if(!e)return;p.a=M.atan2(e.y-p.y,e.x-p.x);const A=AT();p.cit=0;
  if(p.od>0){const lv=p.od,ci=p.ci||0;let m=(1.7+lv)*(1+ci*.04);if(ci>=10){m*=1.25;p.ci=0}p.od=0;p.odt=0;p.cd[0]=M.max(p.cd[0],7*CD());
    swing(p.a,'#7aff9a',64);ring(e.x,e.y,36,'#7aff9a');SK=5+lv*2;hit(e,A*m);if(lv>=3){aoe(e.x,e.y,54,A*1.2,e);boom(e.x,e.y,54)}p.acd=.8;return}
  swing(p.a,'#cfe8d0',30);p.lg=3;hit(e,A*.9);p.ci=M.min(10,(p.ci||0)+1);p.acd=.42/(1+AS())};
HC.p=function(i,ang){const c=hpre(i,ang);if(!c)return;const{p,co,si,A}=c;
  if(i==0){if((p.od||0)>=3)return say('ชาร์จเต็มแล้ว (Lv3) โจมตีปกติเพื่อปล่อยหมัด');p.mp-=c.mc;sfx('c1');p.od=(p.od||0)+1;p.odt=8;p.cit=0;p.cd[0]=p.od>=3?.6:.8;ring(p.x,p.y,20+p.od*8,'#7aff9a');puff(p.x,p.y,14,'#7aff9a',60,.5,1.3,0,1);say('Overdrive Lv'+p.od+(p.od>=3?' (สูงสุด!)':'')+' โจมตีปกติเพื่อปล่อยหมัดพิเศษ');return}
  if(i==1){p.mp-=c.mc;sfx('c2');p.cd[1]=9*CD();p.cit=0;const t=near(170);
    if(t){const a=M.atan2(t.y-p.y,t.x-p.x),d=M.max(0,D(p,t)-22),tt=M.max(.06,d/620);p.a=a;streak(p.x,p.y,t.x,t.y,'#7aff9a');if(d>4)p.dash={vx:M.cos(a)*620,vy:M.sin(a)*620,t:tt};
      tmo(tt,()=>{if(t.dead)return;swing(a,'#7aff9a',60);ring(t.x,t.y,36,'#7aff9a');SK=7;hit(t,A*1.6);t.x+=M.cos(a)*14;t.y+=M.sin(a)*14;if(ISH(t))g.p.hasb=4})}
    else{streak(p.x,p.y,p.x+co*90,p.y+si*90,'#7aff9a');p.dash={vx:co*620,vy:si*620,t:.15}}return}
  if(i==2){const t=near(95);if(!t)return say('ไม่มีเป้าหมายในระยะหมัด');p.mp-=c.mc;sfx('b');p.cd[2]=24*CD();const lv=p.od||0,ci=p.ci||0;p.od=0;p.odt=0;p.ci=0;p.cit=0;
    p.a=M.atan2(t.y-p.y,t.x-p.x);swing(p.a,'#fff',70);boom(t.x,t.y,lv>=3?64:44);SK=10;FL=[.25,'120,255,150'];HS=.05;
    hit(t,A*(3.2+1.4*lv)*(1+ci*.04)*(lv>=3?1.5:1));if(lv>=3)aoe(t.x,t.y,60,A*1.5,t)}};

/* ---------- ตัวจับเวลา/เอฟเฟกต์ของฮีโร่ทุกตัว (เรียกจาก hxu ทุกเฟรม) ---------- */
function hxn(dt){const p=g.p;
  if(p.vt>0){p.vt-=dt;if(p.vt<=0)p.ve=0}
  if(p.hs1>0)p.hs1-=dt;if(p.hsp>0)p.hsp-=dt;if(p.ca>0)p.ca-=dt;if(p.ep>0)p.ep-=dt;if(p.kas>0)p.kas-=dt;if(p.hasb>0)p.hasb-=dt;
  if(p.db){p.db.t-=dt;if(R()<dt*40)pt({x:p.x+(R()-.5)*14,y:p.y+(R()-.5)*14,vy:-14,l:.5,s:1.4,c:'#ffe9a0',k:1});if(p.db.t<=0)p.db=null}
  if(p.fz){p.fz.t-=dt;if(R()<dt*50)pt({x:p.x+(R()-.5)*16,y:p.y+(R()-.5)*14,vy:-12,l:.5,s:1.5,c:'#cfd8ff',k:1});if(p.fz.t<=0)fzEnd()}
  if(p.sh){p.sh.t-=dt;if(p.sh.t<=0)p.sh=null}
  if(g.lkT>0){g.lkT-=dt;if(g.lkT<=0||(g.lk&&g.lk.dead)){g.lk=null;g.lkT=0}}
  if(p.odt>0){p.odt-=dt;if(p.odt<=0){p.od=0;p.cd[0]=M.max(p.cd[0],4*CD())}}
  if(p.hero=='p'&&p.ci>0){p.cit=(p.cit||0)+dt;if(p.cit>3){p.cit=2.2;p.ci--}}
  kch(dt)}
// วาดเพิ่ม: เป้าที่ล็อก (Enigma) และวงโล่ Fortress
function hdraw(){const p=g.p;
  if(g.lk&&!g.lk.dead){const e=g.lk,X=(e.x-cx)*S,Y=(e.y-cy)*S,r=(14+M.sin(g.t*8)*2)*S;x.strokeStyle='#3affff';x.lineWidth=S;x.beginPath();x.arc(X,Y,r,0,7);x.moveTo(X-r*1.5,Y);x.lineTo(X-r*.5,Y);x.moveTo(X+r*.5,Y);x.lineTo(X+r*1.5,Y);x.moveTo(X,Y-r*1.5);x.lineTo(X,Y-r*.5);x.moveTo(X,Y+r*.5);x.lineTo(X,Y+r*1.5);x.stroke()}
  if(p.fz){const X=(p.x-cx)*S,Y=(p.y-cy)*S;x.strokeStyle='rgba(255,255,255,'+(.5+.3*M.sin(g.t*10))+')';x.lineWidth=S*1.5;x.beginPath();x.arc(X,Y,18*S,0,7);x.stroke()}
  if(p.sh){const X=(p.x-cx)*S,Y=(p.y-cy)*S;x.strokeStyle='#ffe14a';x.lineWidth=S;x.beginPath();x.arc(X,Y,15*S,0,7);x.stroke()}}

// ลำดับฮีโร่ใน HI (ตัวเลือกตอนเริ่มเกม/โบสถ์)
HI.w.pk='face';HI.e.pk='eliana';
{const o={};['w','k','h','e','d','n','g','p'].forEach(k=>o[k]=HI[k]);Object.keys(HI).forEach(k=>delete HI[k]);Object.assign(HI,o)}

/* ---------- 5) สไปรต์ตัวละครใหม่ + ไอคอนสกิล ---------- */
{const T=SPR.h,noW=r=>r.slice(0,15)+'.';
  SPR.d=T.slice();                       // ถือหอกสายฟ้า
  SPR.n=T.slice();                       // ถือปืน
  SPR.g=T.map(noW);SPR.gd=SPR.g;         // มือเปล่า (แสง/มืด ใช้พาเลตต่างกัน)
  SPR.p=T.map((r,i)=>{r=noW(r);return i<7?r:r.split('').map((ch,j)=>ch=='K'?(j<8?'C':'M'):ch).join('')})}  // แขนขวาเป็นแขนกล (M)
Object.assign(PALS,{
  d:{K:'#ffe14a',k:'#c9a020',G:'#ffe14a',S:'#f2c9a0',E:'#2a2a6a',C:'#4a2a8a',A:'#7a5ad0',V:'#2a1a5a',W:'#bff0ff',L:'#6a4a2a',B:'#2a1a4a'},
  n:{K:'#8a96a8',k:'#5a6678',G:'#3affff',S:'#c0ccd8',E:'#3affff',C:'#4a5668',A:'#9aa8ba',V:'#2a323e',W:'#2b2f3c',L:'#1a1a22',B:'#2a323e'},
  g:{K:'#1a1a1a',k:'#3a3a3a',G:'#e0b030',S:'#f2c9a0',E:'#222',C:'#e9e4d0',A:'#ffffff',V:'#e0b030',W:'#fff',L:'#6a4a2a',B:'#4a3a20'},
  gd:{K:'#1a1a1a',k:'#3a3a3a',G:'#c0283c',S:'#f2c9a0',E:'#c0283c',C:'#181818',A:'#2a2a2a',V:'#c0283c',W:'#fff',L:'#6a4a2a',B:'#0e0e0e'},
  p:{K:'#2a2a2a',k:'#4a4a4a',G:'#e0b030',S:'#f2c9a0',E:'#1a3a20',C:'#2f8a45',A:'#3fae5a',V:'#1f5530',W:'#fff',L:'#6a4a2a',B:'#2b2b2b',M:'#9aa4b0'}});
// ไอคอนสกิลที่วาดด้วยโค้ด (ใช้เมื่อไม่มีรูป PNG) — q = canvas 64x64, st = ฟังก์ชันขีดเส้น
const HIC={
  datk:q=>{q.beginPath();q.moveTo(34,6);q.lineTo(18,34);q.lineTo(30,34);q.lineTo(24,58);q.lineTo(46,26);q.lineTo(33,26);q.closePath();q.fill()},
  d1:(q,st)=>{st([[8,56,52,12]],'#fff',5);st([[44,10,58,8],[48,22,60,16]],'#ffe14a',3)},
  d2:(q,st)=>{st([[8,40,48,40],[38,30,50,40],[38,50,50,40]],'#fff',5);st([[8,28,28,28],[8,52,28,52]],'#ffe14a',3)},
  d3:(q,st)=>{q.lineWidth=4;q.beginPath();q.arc(32,32,22,0,7);q.stroke();q.beginPath();q.moveTo(36,12);q.lineTo(22,34);q.lineTo(32,34);q.lineTo(28,54);q.lineTo(44,28);q.lineTo(34,28);q.closePath();q.fill()},
  natk:(q,st)=>{st([[12,40,52,24]],'#fff',6);st([[22,44,30,54]],'#cfe8ff',5)},
  n1:(q,st)=>{st([[12,24,52,24],[42,14,52,24],[42,34,52,24],[52,42,12,42],[22,32,12,42],[22,52,12,42]],'#fff',4)},
  n2:(q,st)=>{q.lineWidth=4;q.beginPath();q.arc(32,32,16,0,7);q.stroke();st([[32,6,32,22],[32,42,32,58],[6,32,22,32],[42,32,58,32]],'#fff',4)},
  n3:(q,st)=>{q.lineWidth=5;q.beginPath();q.arc(32,32,14,0,7);q.stroke();for(let i=0;i<8;i++){const a=i*PI/4;st([[32+M.cos(a)*18,32+M.sin(a)*18,32+M.cos(a)*26,32+M.sin(a)*26]],'#fff',5)}},
  gatk:(q,st)=>{st([[16,50,48,14]],'#fff',6);st([[12,40,26,54]],'#ffd0d0',5)},
  g1:(q,st)=>{q.beginPath();q.moveTo(34,6);q.lineTo(18,34);q.lineTo(30,34);q.lineTo(24,58);q.lineTo(46,26);q.lineTo(33,26);q.closePath();q.fill()},
  g1b:(q,st)=>{q.lineWidth=6;q.beginPath();q.arc(32,32,18,.5,5.5);q.stroke();st([[10,32,26,32]],'#fff',5)},
  g2:(q,st)=>{[14,28,42].forEach(u=>{q.lineWidth=4;q.beginPath();q.arc(u,32,16,-1,1);q.stroke()})},
  g2b:(q,st)=>{st([[32,54,32,8],[32,54,10,16],[32,54,54,16]],'#fff',5)},
  g3:(q,st)=>{q.lineWidth=4;q.beginPath();q.arc(32,32,22,0,7);q.stroke();q.beginPath();q.arc(32,32,22,-PI/2,PI/2);q.fill();q.fillStyle='#000';q.beginPath();q.arc(32,43,5,0,7);q.fill();q.fillStyle='#fff';q.beginPath();q.arc(32,21,5,0,7);q.fill()},
  patk:(q,st)=>{q.fillRect(16,22,26,22);st([[42,26,52,26],[42,40,52,40]],'#fff',5)},
  p1:(q,st)=>{[0,1,2].forEach(i=>q.fillRect(10+i*16,44-i*12,12,14+i*12))},
  p2:(q,st)=>{st([[8,40,48,40],[38,30,50,40],[38,50,50,40]],'#fff',5);q.fillRect(44,30,12,20)},
  p3:(q,st)=>{q.fillRect(20,24,24,20);for(let i=0;i<8;i++){const a=i*PI/4;st([[32+M.cos(a)*18,34+M.sin(a)*18,32+M.cos(a)*28,34+M.sin(a)*28]],'#fff',4)}}};
IS.push(['decibus','Decibus'],['enigma','Enigma-03'],['kamnan','กำนันกู'],['hepta','Hepta']);['decibus','enigma','kamnan','hepta'].forEach(prb);
setInterval(()=>{if(g)save()},10000);login();requestAnimationFrame(loop);