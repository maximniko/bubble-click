import{d as _}from"./chunk-A2ON4HJS.js";var m=_(g=>{"use strict";(function(){"use strict";var i={not_string:/[^s]/,not_bool:/[^t]/,not_type:/[^T]/,not_primitive:/[^v]/,number:/[diefg]/,numeric_arg:/[bcdiefguxX]/,json:/[j]/,not_json:/[^j]/,text:/^[^\x25]+/,modulo:/^\x25{2}/,placeholder:/^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,key:/^([a-z_][a-z_\d]*)/i,key_access:/^\.([a-z_][a-z_\d]*)/i,index_access:/^\[(\d+)\]/,sign:/^[+-]/};function c(t){return w(x(t),arguments)}function d(t,o){return c.apply(null,[t].concat(o||[]))}function w(t,o){var r=1,u=t.length,e,p="",a,s,n,l,h,b,k,f;for(a=0;a<u;a++)if(typeof t[a]=="string")p+=t[a];else if(typeof t[a]=="object"){if(n=t[a],n.keys)for(e=o[r],s=0;s<n.keys.length;s++){if(e==null)throw new Error(c('[sprintf] Cannot access property "%s" of undefined value "%s"',n.keys[s],n.keys[s-1]));e=e[n.keys[s]]}else n.param_no?e=o[n.param_no]:e=o[r++];if(i.not_type.test(n.type)&&i.not_primitive.test(n.type)&&e instanceof Function&&(e=e()),i.numeric_arg.test(n.type)&&typeof e!="number"&&isNaN(e))throw new TypeError(c("[sprintf] expecting number but found %T",e));switch(i.number.test(n.type)&&(k=e>=0),n.type){case"b":e=parseInt(e,10).toString(2);break;case"c":e=String.fromCharCode(parseInt(e,10));break;case"d":case"i":e=parseInt(e,10);break;case"j":e=JSON.stringify(e,null,n.width?parseInt(n.width):0);break;case"e":e=n.precision?parseFloat(e).toExponential(n.precision):parseFloat(e).toExponential();break;case"f":e=n.precision?parseFloat(e).toFixed(n.precision):parseFloat(e);break;case"g":e=n.precision?String(Number(e.toPrecision(n.precision))):parseFloat(e);break;case"o":e=(parseInt(e,10)>>>0).toString(8);break;case"s":e=String(e),e=n.precision?e.substring(0,n.precision):e;break;case"t":e=String(!!e),e=n.precision?e.substring(0,n.precision):e;break;case"T":e=Object.prototype.toString.call(e).slice(8,-1).toLowerCase(),e=n.precision?e.substring(0,n.precision):e;break;case"u":e=parseInt(e,10)>>>0;break;case"v":e=e.valueOf(),e=n.precision?e.substring(0,n.precision):e;break;case"x":e=(parseInt(e,10)>>>0).toString(16);break;case"X":e=(parseInt(e,10)>>>0).toString(16).toUpperCase();break}i.json.test(n.type)?p+=e:(i.number.test(n.type)&&(!k||n.sign)?(f=k?"+":"-",e=e.toString().replace(i.sign,"")):f="",h=n.pad_char?n.pad_char==="0"?"0":n.pad_char.charAt(1):" ",b=n.width-(f+e).length,l=n.width&&b>0?h.repeat(b):"",p+=n.align?f+e+l:h==="0"?f+l+e:l+f+e)}return p}var y=Object.create(null);function x(t){if(y[t])return y[t];for(var o=t,r,u=[],e=0;o;){if((r=i.text.exec(o))!==null)u.push(r[0]);else if((r=i.modulo.exec(o))!==null)u.push("%");else if((r=i.placeholder.exec(o))!==null){if(r[2]){e|=1;var p=[],a=r[2],s=[];if((s=i.key.exec(a))!==null)for(p.push(s[1]);(a=a.substring(s[0].length))!=="";)if((s=i.key_access.exec(a))!==null)p.push(s[1]);else if((s=i.index_access.exec(a))!==null)p.push(s[1]);else throw new SyntaxError("[sprintf] failed to parse named argument key");else throw new SyntaxError("[sprintf] failed to parse named argument key");r[2]=p}else e|=2;if(e===3)throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");u.push({placeholder:r[0],param_no:r[1],keys:r[2],sign:r[3],pad_char:r[4],align:r[5],width:r[6],precision:r[7],type:r[8]})}else throw new SyntaxError("[sprintf] unexpected placeholder");o=o.substring(r[0].length)}return y[t]=u}typeof g<"u"&&(g.sprintf=c,g.vsprintf=d),typeof window<"u"&&(window.sprintf=c,window.vsprintf=d,typeof define=="function"&&define.amd&&define(function(){return{sprintf:c,vsprintf:d}}))})()});export{m as a};
