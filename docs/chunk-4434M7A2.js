import{a as $,b as M}from"./chunk-SYSNPTI3.js";import{a as j}from"./chunk-OIFQLSBG.js";import"./chunk-JIHTAVX4.js";import{Ga as s,Ha as l,Ta as T,Tb as F,Wa as m,Xa as p,Yb as D,_a as C,ab as _,bb as y,cb as r,cc as A,db as n,ea as f,eb as d,fb as w,gb as E,hb as a,ic as O,ma as S,mb as c,na as g,nb as B,oa as b,ob as h,pa as x,pb as k,rb as I,sb as v}from"./chunk-TSVTTREY.js";var G=(i,e)=>e.level,L=i=>({"bg-success-subtle":i}),P=i=>({disabled:i});function H(i,e){i&1&&(r(0,"span",12),c(1,"\u041F\u043E\u043B\u0443\u0447\u0435\u043D\u043E"),n())}function R(i,e){if(i&1){let t=w();r(0,"button",14),E("click",function(){S(t);let u=a().$implicit,V=a();return g(V.confirmByCoin(u))}),c(1,"\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C"),n()}if(i&2){let t=a().$implicit,o=a();p("ngClass",v(1,P,!o.canBuy(t)))}}function U(i,e){if(i&1&&(k(0),r(1,"li",6)(2,"div",7)(3,"h3",8),c(4),n(),r(5,"div")(6,"span",9),c(7),n(),c(8," \u0437\u0430 \u043A\u043B\u0438\u043A"),n()(),r(9,"div",10)(10,"div",11),b(),r(11,"svg",3),d(12,"use"),n(),c(13),n(),T(14,H,2,0,"span",12)(15,R,2,3,"button",13),n()()),i&2){let t=e.$implicit,o=a(),u=o.bought(t);s(),p("ngClass",v(6,L,u)),s(3),h("\u0423\u0440\u043E\u0432\u0435\u043D\u044C ",t.level,""),s(3),B(t.perClick),s(5),m("href","#"+o.symbols.coin,null,"xlink"),s(),h(" ",t.coins.now," "),s(),C(u?14:15)}}var N=class i{constructor(e,t,o){this.twa=e;this.coinsService=t;this.turboService=o}coinsSubscription;turboSubscription;maxSum=0;boughtTurbo=[];turbo;ngOnInit(){this.coinsSubscription=this.coinsService.balanceSubject.subscribe({next:e=>{this.maxSum=e,this.onNextBalance(e)},error:e=>this.twa.showAlert(e.message)}),this.turboSubscription=this.turboService.turbosSubject.subscribe(e=>this.boughtTurbo=e)}ngOnDestroy(){this.coinsSubscription?.unsubscribe(),this.turboSubscription?.unsubscribe()}bought(e){return!!this.boughtTurbo.find(t=>t.level==e.level)}canBuy(e){return(this.boughtTurbo.sort((t,o)=>t.level>o.level?-1:1)[0]?.level??0)+1==e.level&&this.maxSum>e.coins.now}confirmByCoin(e){this.twa.showPopup({title:"\u041A\u0443\u043F\u0438\u0442\u044C \u0442\u0443\u0440\u0431\u043E?",message:`\u041A\u0443\u043F\u0438\u0442\u044C \u0442\u0443\u0440\u0431\u043E ${e.level} \u0443\u0440\u043E\u0432\u043D\u044F \u0437\u0430 ${e.level}?`,buttons:[{id:"yes",type:"default",text:"\u041A\u0443\u043F\u0438\u0442\u044C"},{type:"cancel"}]},t=>{t==="yes"&&this.byCoin(e)})}byCoin(e){this.canBuy(e)&&(this.turbo=e,this.coinsService.loadBalance())}onNextBalance(e){let t=this.turbo?.coins.now;if(!this.turbo||!t)return;if(e<t){this.twa.showAlert("\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u043C\u043E\u043D\u0435\u0442.");return}let o=Array.from(this.boughtTurbo);o.push(this.turbo),this.turbo=void 0;try{this.coinsService.saveBalance(e-t),this.turboService.saveTurbos(o)}catch(u){this.twa.showAlert(u.message),this.coinsService.saveBalance(e),this.turboService.saveTurbos(this.boughtTurbo)}}symbols=j;turbos=$;static \u0275fac=function(t){return new(t||i)(l(A),l(O),l(M))};static \u0275cmp=f({type:i,selectors:[["ng-component"]],hostAttrs:[1,"d-flex","flex-column","h-100"],standalone:!0,features:[I],decls:10,vars:1,consts:[[1,"accent-border","accent-border-top","accent-bg-shadow","rounded-5","tg-bg-secondary","h-100"],[1,"hstack","p-3","color-accent"],[1,"m-auto","text-center","h5"],[1,"bi"],[1,"overflow-auto",2,"max-height","calc(var(--tg-viewport-stable-height, 200) * 0.7)"],[1,"list-group","m-2","my-3","tg-bg-secondary"],[1,"list-group-item","vstack",3,"ngClass"],[1,"jcb"],[1,"h3"],[1,"color-accent","h3"],[1,"jcb","gap-2","text-center"],[1,"color-accent","my-2","h4"],[1,"btn","btn-success","disabled"],[1,"btn","tg-btn",3,"ngClass"],[1,"btn","tg-btn",3,"click","ngClass"]],template:function(t,o){t&1&&(r(0,"section",0)(1,"div",1)(2,"span",2),b(),r(3,"svg",3),d(4,"use"),n(),c(5," \u0422\u0443\u0440\u0431\u043E "),n()(),x(),r(6,"div",4)(7,"ul",5),_(8,U,16,8,"li",6,G),n()()()),t&2&&(s(4),m("href","#"+o.symbols.rocketTakeoff,null,"xlink"),s(4),y(o.turbos))},dependencies:[D,F],encapsulation:2})};export{N as TurboComponent};