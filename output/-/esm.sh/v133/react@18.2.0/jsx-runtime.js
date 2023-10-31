import"/-/esm.sh/stable/react@18.2.0/es2018/react.mjs";import*as E from"/-/esm.sh/stable/react@18.2.0/es2018/react.mjs";var s=e=>{let r=o=>typeof o.default<"u"?o.default:o,t=o=>Object.assign({},o);switch(e){case"react":return r(E);default:throw new Error('module "'+e+'" not found')}},h=Object.create,c=Object.defineProperty,F=Object.getOwnPropertyDescriptor,R=Object.getOwnPropertyNames,S=Object.getPrototypeOf,k=Object.prototype.hasOwnProperty,D=(e=>typeof s!="undefined"?s:typeof Proxy!="undefined"?new Proxy(e,{get:(r,t)=>(typeof s!="undefined"?s:r)[t]}):e)(function(e){if(typeof s!="undefined")return s.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),O=(e,r)=>()=>(r||e((r={exports:{}}).exports,r),r.exports),N=(e,r)=>{for(var t in r)c(e,t,{get:r[t],enumerable:!0})},i=(e,r,t,o)=>{if(r&&typeof r=="object"||typeof r=="function")for(let f of R(r))!k.call(e,f)&&f!==t&&c(e,f,{get:()=>r[f],enumerable:!(o=F(r,f))||o.enumerable});return e},I=(e,r,t)=>(i(e,r,"default"),t&&i(t,r,"default")),j=(e,r,t)=>(t=e!=null?h(S(e)):{},i(r||!e||!e.__esModule?c(t,"default",{value:e,enumerable:!0}):t,e)),L=O(e=>{"use strict";var r=D("react"),t=Symbol.for("react.element"),o=Symbol.for("react.fragment"),f=Object.prototype.hasOwnProperty,w=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,P={key:!0,ref:!0,__self:!0,__source:!0};function d(u,a,y){var n,p={},l=null,v=null;y!==void 0&&(l=""+y),a.key!==void 0&&(l=""+a.key),a.ref!==void 0&&(v=a.ref);for(n in a)f.call(a,n)&&!P.hasOwnProperty(n)&&(p[n]=a[n]);if(u&&u.defaultProps)for(n in a=u.defaultProps,a)p[n]===void 0&&(p[n]=a[n]);return{$$typeof:t,type:u,key:l,ref:v,props:p,_owner:w.current}}e.Fragment=o,e.jsx=d,e.jsxs=d}),x=O((e,r)=>{"use strict";r.exports=L()}),_={};N(_,{Fragment:()=>T,default:()=>g,jsx:()=>q,jsxs:()=>C});var b=j(x());I(_,j(x()));var{Fragment:T,jsx:q,jsxs:C}=b,{default:m,...$}=b,g=m!==void 0?m:$;export{T as Fragment,g as default,q as jsx,C as jsxs};
/*! Bundled license information:

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
