import{Y as c,ba as u,gc as n,ic as b,m as i,mc as s,oc as l}from"./chunk-A2ON4HJS.js";var a=[...Array(10).keys()].map(t=>{let r=t+1;return{level:r,perClick:t+2,coins:{now:r*1e5*r}}});var p=class t{constructor(r,e){this.cloudStorage=r;this.twa=e;this.loadTurbos()}perClickSubject=new i(1);turbosSubject=new i([]);_perClick=1;_turbos=[];get perClick(){return this._perClick}set perClick(r){this._perClick=r,this.perClickSubject.next(r)}get turbos(){return this._turbos}set turbos(r){this._turbos=r,this.turbosSubject.next(r)}loadTurbos(){this.cloudStorage.getItem(s).subscribe({next:r=>{if(r){let e=this.valueToTurbos(r);this.turbos=e,this.perClick=this.takePerClick(e)}},error:r=>{if(r)throw new Error(r)},complete:()=>{console.log("per click loaded")}})}saveTurbos(r){r.length&&this.cloudStorage.setItem(s,this.turbosToValue(r)).subscribe({next:e=>{this.turbos=r,this.perClick=this.takePerClick(r)},error:e=>{e&&this.twa.showAlert(e.toString())},complete:()=>{console.log("Per Click saved")}})}takePerClick(r){return r.sort((e,o)=>e.level<o.level?1:-1)[0].perClick}turbosToValue(r){return JSON.stringify(r.map(e=>[e.level]))}valueToTurbos(r){let e=n(r);if(!e)return[];let o=a;return e.map(T=>o.find(m=>m.level==T[0]))}static \u0275fac=function(e){return new(e||t)(u(l),u(b))};static \u0275prov=c({token:t,factory:t.\u0275fac,providedIn:"root"})};export{a,p as b};
