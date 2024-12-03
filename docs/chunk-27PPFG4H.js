import{a as j,b as A}from"./chunk-N7HK5Z4O.js";import"./chunk-6ZXCQ3OH.js";import{e as g,f as k,h as C,m as x,n as F,o as I}from"./chunk-E2IWSKEU.js";import{a as N}from"./chunk-XTOZ2LYE.js";import{a as M}from"./chunk-HO7BWNB2.js";import{h as B}from"./chunk-XWLB5PLH.js";import{Ga as o,Ha as r,Pa as p,Wb as S,Xa as n,Yb as w,cb as a,cc as y,db as s,ea as u,eb as d,ic as D,mb as h,ob as l,rb as f,ub as v,vb as b}from"./chunk-TSVTTREY.js";var O=class c extends j{constructor(e,t,i,m,R){super();this.formBuilder=e;this.router=t;this.twa=i;this.bankService=m;this.coinsService=R;this.goBack=this.goBack.bind(this),this.withdraw=this.withdraw.bind(this),this.maxSum=this.bankService.balance,this.form=this.formBuilder.group({})}form;formSubscription;balanceSubscription;maxSum;ngOnInit(){this.formSubscription=this.form.statusChanges.subscribe(e=>this.twa.mainButtonIsActive(e=="VALID")),this.balanceSubscription=this.bankService.balanceSubject.subscribe({next:e=>this.onNextBalance(e),error:()=>this.goBack()}),this.twa.backButtonOnClick(this.goBack),this.twa.setMainButton({text:"\u0412\u044B\u0432\u0435\u0441\u0442\u0438",is_active:!0,is_visible:!0},this.withdraw)}ngOnDestroy(){this.formSubscription?.unsubscribe(),this.balanceSubscription?.unsubscribe(),this.twa.offBackButton(this.goBack),this.twa.offMainButton(this.withdraw)}withdraw(){this.bankService.loadBalance()}onNextBalance(e){if(e!==this.maxSum){this.goBack();return}if(this.form.invalid)return;let t=this.form.value;if(t.sum>e){this.twa.showAlert("\u041E\u0448\u0438\u0431\u043A\u0430 \u0431\u0430\u043B\u0430\u043D\u0441\u0430");return}if(!t.sum||isNaN(t.sum))return;let i=this.coinsService.balance;try{this.coinsService.saveBalance(i+t.sum),this.bankService.saveBalance(e-t.sum),this.form.reset()}catch(m){this.twa.showAlert(m.message),this.coinsService.saveBalance(i),this.bankService.saveBalance(e)}}goBack(){this.router.navigate([M.balance()])}static \u0275fac=function(t){return new(t||c)(r(x),r(B),r(y),r(N),r(D))};static \u0275cmp=u({type:c,selectors:[["ng-component"]],hostAttrs:[1,"d-flex","flex-column","h-100"],standalone:!0,features:[p,f],decls:9,vars:6,consts:[[1,"accent-border","accent-border-top","accent-bg-shadow","rounded-5","tg-bg-secondary"],[1,"hstack","p-3","pb-0","color-accent"],[1,"m-auto","text-center","h5"],[1,"d-flex","flex-column","h-100","mb-5"],[1,"mx-2","my-4"],[3,"formGroup"],[3,"parentForm","max"]],template:function(t,i){t&1&&(a(0,"section",0)(1,"div",1)(2,"span",2),h(3),v(4,"async"),s()(),a(5,"div",3)(6,"div",4)(7,"form",5),d(8,"sum-input",6),s()()()()),t&2&&(o(3),l("\u0412\u044B\u0432\u0435\u0441\u0442\u0438 (\u043C\u0430\u043A\u0441: ",b(4,4,i.bankService.balanceSubject),")"),o(4),n("formGroup",i.form),o(),n("parentForm",i.form)("max",i.maxSum))},dependencies:[w,S,F,k,g,A,I,C],encapsulation:2})};export{O as WithdrawComponent};
