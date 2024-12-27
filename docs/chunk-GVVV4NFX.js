import{a as S}from"./chunk-OIFQLSBG.js";import{a as W}from"./chunk-PTPSYE2U.js";import{a as N,e as D,f as A}from"./chunk-N6EJN5TU.js";import"./chunk-JXRJSF23.js";import{a as w}from"./chunk-KEZW3WUK.js";import{h as R,i as F}from"./chunk-PGHGH7VN.js";import{a as k}from"./chunk-4W6JIO4F.js";import{$a as x,Ha as i,Ia as p,Ua as E,Xa as c,Ya as b,_b as V,ac as h,db as t,ea as v,eb as o,fb as r,gc as y,hb as M,ib as O,lb as B,nb as d,oa as l,ob as f,pa as m,pb as j,qb as P,ub as g,xb as H,yb as G}from"./chunk-KV6LOXJG.js";function Q(u,s){if(u&1&&(t(0,"div",17),d(1),o()),u&2){let n,e=O();i(),P(" ",(n=e.localisation.messages.NearestBonus)!==null&&n!==void 0?n:"The nearest bonus"," ",e.toLocalDate(e.depositToDate(e.nearestDeposit),(n=e.twa.getUserLanguageCode())!==null&&n!==void 0?n:"en")," ")}}var I=class u{constructor(s,n,e,a){this.bankService=s;this.depositService=n;this.twa=e;this.localisation=a}depositSubscription;depositSum=0;nearestDeposit;ngOnInit(){this.depositSubscription=this.depositService.depositsSubject.subscribe(s=>{this.depositSum=s.reduce((e,a)=>(e+=a.sum,e),0);let n=Date.now();s.forEach(e=>{let a=D(e).getTime();a<n||(!this.nearestDeposit||D(this.nearestDeposit).getTime()>a)&&(this.nearestDeposit=e)})})}ngOnDestroy(){this.depositSubscription?.unsubscribe()}bankInfo(){this.twa.showPopup({title:this.localisation.messages.PopupBankInfoTitle??"Why do you need a Bank?",message:this.localisation.messages.PopupBankInfoContent??"Keep your coins in the bank! Protect yourself from unexpected expenses!",buttons:[{type:"ok"}]})}depositInfo(){this.twa.showPopup({title:this.localisation.messages.PopupDepositInfoTitle??"Why do you need a Deposit?",message:this.localisation.messages.PopupDepositInfoContent??"Deposit coins and get more profit at the end of the term!",buttons:[{type:"ok"}]})}toLocalDate=N;symbols=S;routeCreator=w;depositToDate=D;static \u0275fac=function(n){return new(n||u)(p(W),p(A),p(y),p(k))};static \u0275cmp=v({type:u,selectors:[["balance-main"]],standalone:!0,features:[g],decls:47,vars:19,consts:[[1,"m-2"],[1,"tg-bg-secondary","p-2","rounded-2"],[1,"in-bank","mb-3"],[1,"h5","color-subtitle","jcb"],[1,"my-auto","mx-0"],[1,"p-2",3,"click"],[1,"bi"],[1,"input-group","input-group-lg","mb-3"],[1,"input-group-text"],["type","text","aria-label","\u0412 \u0431\u0430\u043D\u043A\u0435","disabled","","readonly","",1,"form-control",3,"value"],[1,"row","row-cols-2"],[1,"col"],[1,"vstack","jcc",3,"routerLink"],[1,"m-auto"],[1,"bi",2,"width","2rem","height","2rem"],[1,"deposit"],["type","text","aria-label","\u0411\u0430\u043B\u0430\u043D\u0441 \u0434\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0432","disabled","","readonly","",1,"form-control",3,"value"],[1,"valid-feedback","d-block","color-accent"],[1,"jcc"],[1,"btn","btn-lg","tg-btn","w-100",3,"routerLink"]],template:function(n,e){if(n&1&&(t(0,"div",0)(1,"section",1)(2,"article",2)(3,"h5",3)(4,"span",4),d(5),o(),t(6,"span",5),M("click",function(){return e.bankInfo()}),l(),t(7,"svg",6),r(8,"use"),o()()(),m(),t(9,"div",7)(10,"span",8),l(),t(11,"svg",6),r(12,"use"),o()(),m(),r(13,"input",9),H(14,"async"),o(),t(15,"div",10)(16,"div",11)(17,"a",12)(18,"div",13),l(),t(19,"svg",14),r(20,"use"),o()(),m(),t(21,"div",13),d(22),o()()(),t(23,"div",11)(24,"a",12)(25,"div",13),l(),t(26,"svg",14),r(27,"use"),o()(),m(),t(28,"div",13),d(29),o()()()()(),r(30,"hr"),t(31,"article",15)(32,"h5",3)(33,"span",4),d(34),o(),t(35,"span",5),M("click",function(){return e.depositInfo()}),l(),t(36,"svg",6),r(37,"use"),o()()(),m(),t(38,"div",7)(39,"span",8),l(),t(40,"svg",6),r(41,"use"),o()(),m(),r(42,"input",16),E(43,Q,2,2,"div",17),o(),t(44,"div",18)(45,"a",19),d(46),o()()()()()),n&2){let a,C,_,T,L;i(5),f((a=e.localisation.messages.InBank)!==null&&a!==void 0?a:"In bank"),i(3),c("href","#"+e.symbols.infoCircle,null,"xlink"),i(4),c("href","#"+e.symbols.coin,null,"xlink"),i(),B("value",G(14,17,e.bankService.balanceSubject)),i(4),b("routerLink",e.routeCreator.transfer()),i(3),c("href","#"+e.symbols.arrowUp,null,"xlink"),i(2),f((C=e.localisation.messages.Replenish)!==null&&C!==void 0?C:"Replenish"),i(2),b("routerLink",e.routeCreator.withdraw()),i(3),c("href","#"+e.symbols.arrowDown,null,"xlink"),i(2),f((_=e.localisation.messages.Withdraw)!==null&&_!==void 0?_:"Withdraw"),i(5),f((T=e.localisation.messages.OnDeposit)!==null&&T!==void 0?T:"On deposit"),i(3),c("href","#"+e.symbols.infoCircle,null,"xlink"),i(4),c("href","#"+e.symbols.clockHistory,null,"xlink"),i(),B("value",e.depositSum),i(),x(e.nearestDeposit?43:-1),i(2),b("routerLink",e.routeCreator.deposit()),i(),f((L=e.localisation.messages.Deposits)!==null&&L!==void 0?L:"Deposits")}},dependencies:[h,V,F],styles:[".dropdown-toggle[_ngcontent-%COMP%]:after{content:none}"]})};var U=class u{constructor(s,n,e){this.twa=s;this.router=n;this.localisation=e}ngOnInit(){this.twa.backButtonOnClick(()=>this.goBack())}ngOnDestroy(){this.twa.offBackButton(()=>this.goBack())}goBack(){this.router.navigate([w.main()])}symbols=S;static \u0275fac=function(n){return new(n||u)(p(y),p(R),p(k))};static \u0275cmp=v({type:u,selectors:[["ng-component"]],hostAttrs:[1,"d-flex","flex-column","h-100"],standalone:!0,features:[g],decls:8,vars:2,consts:[[1,"accent-border","accent-border-top","accent-bg-shadow","rounded-5","tg-bg-secondary","h-100"],[1,"hstack","p-3","pb-0","color-accent"],[1,"m-auto","text-center","h5"],[1,"bi"],[1,"overflow-auto",2,"max-height","calc(var(--tg-viewport-stable-height, 200) * 0.7)"]],template:function(n,e){if(n&1&&(t(0,"section",0)(1,"div",1)(2,"span",2),l(),t(3,"svg",3),r(4,"use"),o(),d(5),o()(),m(),t(6,"div",4),r(7,"balance-main"),o()()),n&2){let a;i(4),c("href","#"+e.symbols.currencyExchange,null,"xlink"),i(),j(" ",(a=e.localisation.messages.BalanceManagement)!==null&&a!==void 0?a:"Balance management"," ")}},dependencies:[h,I],encapsulation:2})};export{U as BalanceComponent};
