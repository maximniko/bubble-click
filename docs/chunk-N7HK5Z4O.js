import{a as Q}from"./chunk-6ZXCQ3OH.js";import{a as A,b as k,c as G,d as X,g as $,h as J,i as U,m as H,o as K}from"./chunk-E2IWSKEU.js";import{Ga as b,Ha as j,Pa as M,Ta as T,Tb as R,Ub as z,Xa as S,Yb as L,ca as N,cb as y,d as ee,db as x,e as te,ea as v,eb as D,hb as O,mb as _,ob as q,qb as P,rb as V,tb as B}from"./chunk-TSVTTREY.js";var W=ee(F=>{"use strict";(function(){"use strict";var n={not_string:/[^s]/,not_bool:/[^t]/,not_type:/[^T]/,not_primitive:/[^v]/,number:/[diefg]/,numeric_arg:/[bcdiefguxX]/,json:/[j]/,not_json:/[^j]/,text:/^[^\x25]+/,modulo:/^\x25{2}/,placeholder:/^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,key:/^([a-z_][a-z_\d]*)/i,key_access:/^\.([a-z_][a-z_\d]*)/i,index_access:/^\[(\d+)\]/,sign:/^[+-]/};function i(a){return o(Z(a),arguments)}function r(a,u){return i.apply(null,[a].concat(u||[]))}function o(a,u){var s=1,f=a.length,e,m="",l,p,t,g,C,I,E,h;for(l=0;l<f;l++)if(typeof a[l]=="string")m+=a[l];else if(typeof a[l]=="object"){if(t=a[l],t.keys)for(e=u[s],p=0;p<t.keys.length;p++){if(e==null)throw new Error(i('[sprintf] Cannot access property "%s" of undefined value "%s"',t.keys[p],t.keys[p-1]));e=e[t.keys[p]]}else t.param_no?e=u[t.param_no]:e=u[s++];if(n.not_type.test(t.type)&&n.not_primitive.test(t.type)&&e instanceof Function&&(e=e()),n.numeric_arg.test(t.type)&&typeof e!="number"&&isNaN(e))throw new TypeError(i("[sprintf] expecting number but found %T",e));switch(n.number.test(t.type)&&(E=e>=0),t.type){case"b":e=parseInt(e,10).toString(2);break;case"c":e=String.fromCharCode(parseInt(e,10));break;case"d":case"i":e=parseInt(e,10);break;case"j":e=JSON.stringify(e,null,t.width?parseInt(t.width):0);break;case"e":e=t.precision?parseFloat(e).toExponential(t.precision):parseFloat(e).toExponential();break;case"f":e=t.precision?parseFloat(e).toFixed(t.precision):parseFloat(e);break;case"g":e=t.precision?String(Number(e.toPrecision(t.precision))):parseFloat(e);break;case"o":e=(parseInt(e,10)>>>0).toString(8);break;case"s":e=String(e),e=t.precision?e.substring(0,t.precision):e;break;case"t":e=String(!!e),e=t.precision?e.substring(0,t.precision):e;break;case"T":e=Object.prototype.toString.call(e).slice(8,-1).toLowerCase(),e=t.precision?e.substring(0,t.precision):e;break;case"u":e=parseInt(e,10)>>>0;break;case"v":e=e.valueOf(),e=t.precision?e.substring(0,t.precision):e;break;case"x":e=(parseInt(e,10)>>>0).toString(16);break;case"X":e=(parseInt(e,10)>>>0).toString(16).toUpperCase();break}n.json.test(t.type)?m+=e:(n.number.test(t.type)&&(!E||t.sign)?(h=E?"+":"-",e=e.toString().replace(n.sign,"")):h="",C=t.pad_char?t.pad_char==="0"?"0":t.pad_char.charAt(1):" ",I=t.width-(h+e).length,g=t.width&&I>0?C.repeat(I):"",m+=t.align?h+e+g:C==="0"?h+g+e:g+h+e)}return m}var d=Object.create(null);function Z(a){if(d[a])return d[a];for(var u=a,s,f=[],e=0;u;){if((s=n.text.exec(u))!==null)f.push(s[0]);else if((s=n.modulo.exec(u))!==null)f.push("%");else if((s=n.placeholder.exec(u))!==null){if(s[2]){e|=1;var m=[],l=s[2],p=[];if((p=n.key.exec(l))!==null)for(m.push(p[1]);(l=l.substring(p[0].length))!=="";)if((p=n.key_access.exec(l))!==null)m.push(p[1]);else if((p=n.index_access.exec(l))!==null)m.push(p[1]);else throw new SyntaxError("[sprintf] failed to parse named argument key");else throw new SyntaxError("[sprintf] failed to parse named argument key");s[2]=m}else e|=2;if(e===3)throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");f.push({placeholder:s[0],param_no:s[1],keys:s[2],sign:s[3],pad_char:s[4],align:s[5],width:s[6],precision:s[7],type:s[8]})}else throw new SyntaxError("[sprintf] unexpected placeholder");u=u.substring(s[0].length)}return d[a]=f}typeof F<"u"&&(F.sprintf=i,F.vsprintf=r),typeof window<"u"&&(window.sprintf=i,window.vsprintf=r,typeof define=="function"&&define.amd&&define(function(){return{sprintf:i,vsprintf:r}}))})()});var c=te(W());var w=class n{localisation=N(Q);isInvalid(i){return i?.invalid&&(i?.dirty||i?.touched)}errors(i){return i?.errors}validationErrors(i,r){if(!i)return null;let o=[];return i?.required&&o.push((0,c.sprintf)(this.localisation.t.requiredErr??"%s is required.",r)),i?.minlength&&o.push((0,c.sprintf)(this.localisation.t.minlengthErr??"Minimum length of %s is %s.",r,i?.minlength.requiredLength)),i?.maxlength&&o.push((0,c.sprintf)(this.localisation.t.maxlengthErr??"Maximum length of %s is %s.",r,i?.maxlength.requiredLength)),i?.min&&o.push((0,c.sprintf)(this.localisation.t.minErr??"Minimum of %s is %s.",r,i?.min.min)),i?.max&&o.push((0,c.sprintf)(this.localisation.t.maxErr??"Maximum of %s is %s.",r,i?.max.max)),i?.email&&o.push((0,c.sprintf)(this.localisation.t.emailErr??"%s must be an email address.",r)),i?.pattern&&o.push((0,c.sprintf)(this.localisation.t.patternErr??"%s is not valid.",r)),i?.invalidPhone&&o.push((0,c.sprintf)(this.localisation.t.invalidPhoneErr??"%s is invalid phone.",r)),i?.invalidType&&o.push((0,c.sprintf)(this.localisation.t.invalidTypeErr??"%s is invalid type.",r)),o.join(`
`)}static \u0275fac=function(r){return new(r||n)};static \u0275cmp=v({type:n,selectors:[["ng-component"]],decls:0,vars:0,template:function(r,o){},encapsulation:2})};var re=(n,i)=>({"is-invalid":n,"is-valid":i});function se(n,i){if(n&1&&(y(0,"div",4),_(1),x()),n&2){let r=O();b(),q(" ",r.validationErrors(r.sumErrors,"Coins")," ")}}var Y=class n extends w{constructor(r){super();this.formBuilder=r}parentForm;max;ngOnInit(){this.parentForm.addControl("sum",this.formBuilder.control("",[k.required,k.min(1),k.max(this.max)]))}get sum(){return this.parentForm.get("sum")}get sumErrors(){return this.errors(this.sum)}get isInvalidSum(){return this.isInvalid(this.sum)}static \u0275fac=function(o){return new(o||n)(j(H))};static \u0275cmp=v({type:n,selectors:[["sum-input"]],inputs:{parentForm:"parentForm",max:"max"},standalone:!0,features:[P([],[{provide:G,useExisting:J}]),M,V],decls:5,vars:5,consts:[[1,"form-floating","mb-3"],["type","number","placeholder","Coins","id","form-sum","formControlName","sum",1,"form-control",3,"ngClass"],["for","form-sum"],["class","invalid-feedback",4,"ngIf"],[1,"invalid-feedback"]],template:function(o,d){o&1&&(y(0,"div",0),D(1,"input",1),y(2,"label",2),_(3,"Coins"),x(),T(4,se,2,1,"div",3),x()),o&2&&(b(),S("ngClass",B(2,re,d.isInvalidSum,d.parentForm.valid)),b(3),S("ngIf",d.isInvalidSum))},dependencies:[L,R,z,K,A,$,X,U],encapsulation:2})};export{w as a,Y as b};
