import{a as N,b as j}from"./chunk-XXWLC2KS.js";import{e as k,f as x,h as C,m as F,n as w,o as I}from"./chunk-3M66XRBB.js";import"./chunk-NKNBL4SW.js";import{a as D}from"./chunk-4SREVP2I.js";import{a as T}from"./chunk-EQH2HHIG.js";import{a as A}from"./chunk-JBKHYHBY.js";import{h as g}from"./chunk-GJYJS3HN.js";import"./chunk-3GRX4NBC.js";import{Ha as n,Ia as o,Qa as p,Ya as s,_b as S,ac as B,db as a,ea as u,eb as c,fb as f,ic as y,nb as l,rb as d,ub as h,xb as v,yb as b}from"./chunk-A2ON4HJS.js";var M=class m extends N{constructor(e,t,i,r,G){super();this.formBuilder=e;this.router=t;this.twa=i;this.bankService=r;this.coinsService=G;this.transfer=this.transfer.bind(this),this.goBack=this.goBack.bind(this),this.maxSum=this.coinsService.balance,this.form=this.formBuilder.group({})}form;formSubscription;coinsSubscription;maxSum;ngOnInit(){this.formSubscription=this.form.statusChanges.subscribe(e=>this.twa.mainButtonIsActive(e=="VALID")),this.coinsSubscription=this.coinsService.balanceSubject.subscribe({next:e=>this.onNextBalance(e),error:()=>this.goBack()}),this.twa.backButtonOnClick(this.goBack),this.twa.setMainButton({text:this.localisation.messages.Transfer??"Transfer",is_active:!0,is_visible:!0},this.transfer)}ngOnDestroy(){this.formSubscription?.unsubscribe(),this.coinsSubscription?.unsubscribe(),this.twa.offBackButton(this.goBack),this.twa.offMainButton(this.transfer)}onNextBalance(e){if(e!==this.maxSum){this.goBack();return}if(this.form.invalid)return;let t=this.form.value;if(t.sum>e){this.twa.showAlert(this.localisation.messages.AlertBalanceError??"Balance error!");return}if(!t.sum||isNaN(t.sum))return;let i=this.bankService.balance;try{this.bankService.saveBalance(i+t.sum),this.coinsService.saveBalance(e-t.sum),this.form.reset()}catch(r){this.twa.showAlert(r.message),this.bankService.saveBalance(i),this.coinsService.saveBalance(e)}}transfer(){this.coinsService.loadBalance()}goBack(){this.router.navigate([A.balance()])}static \u0275fac=function(t){return new(t||m)(o(F),o(g),o(y),o(D),o(T))};static \u0275cmp=u({type:m,selectors:[["ng-component"]],hostAttrs:[1,"d-flex","flex-column","h-100"],standalone:!0,features:[p,h],decls:9,vars:8,consts:[[1,"accent-border","accent-border-top","accent-bg-shadow","rounded-5","tg-bg-secondary"],[1,"hstack","p-3","pb-0","color-accent"],[1,"m-auto","text-center","h5"],[1,"d-flex","flex-column","h-100","mb-5"],[1,"mx-2","my-4"],[3,"formGroup"],[3,"parentForm","max"]],template:function(t,i){if(t&1&&(a(0,"section",0)(1,"div",1)(2,"span",2),l(3),v(4,"async"),c()(),a(5,"div",3)(6,"div",4)(7,"form",5),f(8,"sum-input",6),c()()()()),t&2){let r;n(3),d("",(r=i.localisation.messages.Transfer)!==null&&r!==void 0?r:"Transfer"," (",(r=i.localisation.messages.max)!==null&&r!==void 0?r:"max.",": ",b(4,6,i.coinsService.balanceSubject),")"),n(4),s("formGroup",i.form),n(),s("parentForm",i.form)("max",i.maxSum)}},dependencies:[B,S,w,x,k,j,I,C],encapsulation:2})};export{M as TransferComponent};