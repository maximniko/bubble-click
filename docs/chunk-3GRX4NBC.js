import{Y as n,ba as s,f as a,hc as r,ic as i}from"./chunk-A2ON4HJS.js";var p=class t{constructor(o){this.twa=o}messages={};load(){return a(this,null,function*(){let o=this.twa.getUserLanguageCode()??"en",e;try{e=yield(yield fetch(r(`assets/messages/${o}.json`))).json()}catch{e=yield(yield fetch(r("assets/messages/en.json"))).json()}return this.messages=e,!0})}static \u0275fac=function(e){return new(e||t)(s(i))};static \u0275prov=n({token:t,factory:t.\u0275fac,providedIn:"root"})};export{p as a};