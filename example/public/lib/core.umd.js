(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.SuperDoc = factory(global.Vue));
})(this, (function (Vue) { 'use strict';

  /******************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */

  function __rest(s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
              if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                  t[p[i]] = s[p[i]];
          }
      return t;
  }

  function __awaiter(thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  }

  typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
      var e = new Error(message);
      return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };

  class Dom {
      static get(id) {
          return document.getElementById(id);
      }
      static querySelector(selector) {
          return document.querySelector(selector);
      }
      static getAttr(el, attr) {
          return el.getAttribute(attr);
      }
      // 在某元素的父元素的开头添加一个或者多个元素
      static prepend(parent, elements) {
          if (Array.isArray(elements)) {
              elements = elements.reverse();
              elements.forEach((el) => parent.prepend(el));
          }
          else {
              parent.prepend(elements);
          }
      }
      static make(tagName, classNames = null, attributes = {}) {
          const el = document.createElement(tagName);
          if (Array.isArray(classNames)) {
              el.classList.add(...classNames);
          }
          else if (classNames) {
              el.classList.add(classNames);
          }
          for (const attrName in attributes) {
              if (Object.prototype.hasOwnProperty.call(attributes, attrName)) {
                  // el[attrName] = attributes[attrName];
                  el.setAttribute(attrName, attributes[attrName]);
              }
          }
          return el;
      }
      static makeNS(namespaceURI, qualifiedName, classNames = null, attributes = {}) {
          const el = document.createElementNS(namespaceURI, qualifiedName);
          if (Array.isArray(classNames)) {
              el.classList.add(...classNames);
          }
          else if (classNames) {
              el.classList.add(classNames);
          }
          for (const attrName in attributes) {
              if (Object.prototype.hasOwnProperty.call(attributes, attrName)) {
                  // el[attrName] = attributes[attrName];
                  el.setAttribute(attrName, attributes[attrName]);
              }
          }
          return el;
      }
  }
  const keyCodes = {
      BACKSPACE: 8,
      TAB: 9,
      ENTER: 13,
      SHIFT: 16,
      CTRL: 17,
      ALT: 18,
      ESC: 27,
      SPACE: 32,
      LEFT: 37,
      UP: 38,
      DOWN: 40,
      RIGHT: 39,
      DELETE: 46,
      META: 91,
      A: 65,
      C: 67,
      X: 88,
      V: 86,
      S: 83
  };
  function getElementCoordinates(rect) {
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;
      const docX = rect.left + scrollX;
      const docY = rect.top + scrollY;
      return {
          left: docX,
          top: docY,
          right: docX + rect.width,
          bottom: docY + rect.height,
          rect,
      };
  }
  function isCursorAtFirstOrLastLine(element) {
      if (element.childNodes.length === 0)
          return { isFirstLine: true, isLastLine: true };
      const selection = window.getSelection();
      if (selection.rangeCount === 0)
          return { isFirstLine: false, isLastLine: false };
      const range = selection.getRangeAt(0);
      const rangeRect = range.getBoundingClientRect();
      const elemRect = element.getBoundingClientRect();
      const isFirstLine = rangeRect.top <= elemRect.top + rangeRect.height;
      const isLastLine = rangeRect.bottom >= elemRect.bottom - rangeRect.height;
      return { isFirstLine, isLastLine };
  }

  class Module {
      set state(Editor) {
          this.Editor = Editor;
      }
      constructor({ config }) {
          this.nodes = {};
          this.config = config;
      }
  }

  function typeOf(object) {
      return Object.prototype.toString.call(object).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }
  function isObject(a) {
      return typeOf(a) === 'object';
  }
  function isFunction(fn) {
      return typeOf(fn) === 'function' || typeOf(fn) === 'asyncfunction';
  }
  function isArray(v) {
      return Array.isArray(v);
  }
  function isEmpty(object) {
      if (!object) {
          return true;
      }
      return Object.keys(object).length === 0 && object.constructor === Object;
  }
  function generateBlockId() {
      const tempUrl = URL.createObjectURL(new Blob());
      const uuid = tempUrl.toString();
      URL.revokeObjectURL(tempUrl); // 释放这个url
      return uuid.substring(uuid.lastIndexOf("/") + 1);
  }
  function isString(v) {
      return typeOf(v) === 'string';
  }
  const isDOM = (v) => v instanceof HTMLElement;
  const deepClone = function (object) {
      try {
          const clone = JSON.parse(JSON.stringify(object));
          return clone;
      }
      catch (error) {
          console.error('深度克隆只支持object和array类型');
      }
  };
  const deepCloneRefreshId = function (object, refreshKey, hash = new WeakMap()) {
      // 如果是基本类型或者 null，直接返回
      if (object === null || typeof object !== 'object') {
          return object;
      }
      // 如果已经拷贝过了该对象，直接返回它的拷贝
      if (hash.has(object)) {
          return hash.get(object);
      }
      // 根据对象的类型，创建一个新的目标对象
      let newObject = Array.isArray(object) ? [] : {};
      // 将原始对象和对应的拷贝对象存入哈希表中
      hash.set(object, newObject);
      // 遍历原始对象的属性
      for (let key in object) {
          // 确保属性来自于对象本身而不是原型链
          if (object.hasOwnProperty(key)) {
              // 如果属性是对象，则递归调用深拷贝函数
              newObject[key] = deepCloneRefreshId(object[key], refreshKey, hash);
              if (refreshKey.includes(key)) {
                  newObject[key] = generateBlockId();
              }
          }
      }
      return newObject;
  };

  function e$1(e,t){return function(){return e.apply(t,arguments)}}const{toString:t$1}=Object.prototype,{getPrototypeOf:n$1}=Object,r$1=(o$1=Object.create(null),e=>{const n=t$1.call(e);return o$1[n]||(o$1[n]=n.slice(8,-1).toLowerCase())});var o$1;const s$1=e=>(e=e.toLowerCase(),t=>r$1(t)===e),i$1=e=>t=>typeof t===e,{isArray:a$1}=Array,c$1=i$1("undefined");const u$1=s$1("ArrayBuffer");const l$1=i$1("string"),f$1=i$1("function"),d$1=i$1("number"),p$1=e=>null!==e&&"object"==typeof e,h$1=e=>{if("object"!==r$1(e))return !1;const t=n$1(e);return !(null!==t&&t!==Object.prototype&&null!==Object.getPrototypeOf(t)||Symbol.toStringTag in e||Symbol.iterator in e)},m$1=s$1("Date"),y$1=s$1("File"),g$1=s$1("Blob"),b$1=s$1("FileList"),E$1=s$1("URLSearchParams");function w$1(e,t,{allOwnKeys:n=!1}={}){if(null==e)return;let r,o;if("object"!=typeof e&&(e=[e]),a$1(e))for(r=0,o=e.length;r<o;r++)t.call(null,e[r],r,e);else {const o=n?Object.getOwnPropertyNames(e):Object.keys(e),s=o.length;let i;for(r=0;r<s;r++)i=o[r],t.call(null,e[i],i,e);}}function O$1(e,t){t=t.toLowerCase();const n=Object.keys(e);let r,o=n.length;for(;o-- >0;)if(r=n[o],t===r.toLowerCase())return r;return null}const S$1="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:global,R$1=e=>!c$1(e)&&e!==S$1;const A$1=(T$1="undefined"!=typeof Uint8Array&&n$1(Uint8Array),e=>T$1&&e instanceof T$1);var T$1;const C$1=s$1("HTMLFormElement"),N$1=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),j$1=s$1("RegExp"),v$1=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};w$1(n,((n,o)=>{let s;!1!==(s=t(n,o,e))&&(r[o]=s||n);})),Object.defineProperties(e,r);},x$1="abcdefghijklmnopqrstuvwxyz",P$1={DIGIT:"0123456789",ALPHA:x$1,ALPHA_DIGIT:x$1+x$1.toUpperCase()+"0123456789"};const U$1=s$1("AsyncFunction"),F$1={isArray:a$1,isArrayBuffer:u$1,isBuffer:function(e){return null!==e&&!c$1(e)&&null!==e.constructor&&!c$1(e.constructor)&&f$1(e.constructor.isBuffer)&&e.constructor.isBuffer(e)},isFormData:e=>{let t;return e&&("function"==typeof FormData&&e instanceof FormData||f$1(e.append)&&("formdata"===(t=r$1(e))||"object"===t&&f$1(e.toString)&&"[object FormData]"===e.toString()))},isArrayBufferView:function(e){let t;return t="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&u$1(e.buffer),t},isString:l$1,isNumber:d$1,isBoolean:e=>!0===e||!1===e,isObject:p$1,isPlainObject:h$1,isUndefined:c$1,isDate:m$1,isFile:y$1,isBlob:g$1,isRegExp:j$1,isFunction:f$1,isStream:e=>p$1(e)&&f$1(e.pipe),isURLSearchParams:E$1,isTypedArray:A$1,isFileList:b$1,forEach:w$1,merge:function e(){const{caseless:t}=R$1(this)&&this||{},n={},r=(r,o)=>{const s=t&&O$1(n,o)||o;h$1(n[s])&&h$1(r)?n[s]=e(n[s],r):h$1(r)?n[s]=e({},r):a$1(r)?n[s]=r.slice():n[s]=r;};for(let e=0,t=arguments.length;e<t;e++)arguments[e]&&w$1(arguments[e],r);return n},extend:(t,n,r,{allOwnKeys:o}={})=>(w$1(n,((n,o)=>{r&&f$1(n)?t[o]=e$1(n,r):t[o]=n;}),{allOwnKeys:o}),t),trim:e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,""),stripBOM:e=>(65279===e.charCodeAt(0)&&(e=e.slice(1)),e),inherits:(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n);},toFlatObject:(e,t,r,o)=>{let s,i,a;const c={};if(t=t||{},null==e)return t;do{for(s=Object.getOwnPropertyNames(e),i=s.length;i-- >0;)a=s[i],o&&!o(a,e,t)||c[a]||(t[a]=e[a],c[a]=!0);e=!1!==r&&n$1(e);}while(e&&(!r||r(e,t))&&e!==Object.prototype);return t},kindOf:r$1,kindOfTest:s$1,endsWith:(e,t,n)=>{e=String(e),(void 0===n||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return -1!==r&&r===n},toArray:e=>{if(!e)return null;if(a$1(e))return e;let t=e.length;if(!d$1(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},forEachEntry:(e,t)=>{const n=(e&&e[Symbol.iterator]).call(e);let r;for(;(r=n.next())&&!r.done;){const n=r.value;t.call(e,n[0],n[1]);}},matchAll:(e,t)=>{let n;const r=[];for(;null!==(n=e.exec(t));)r.push(n);return r},isHTMLForm:C$1,hasOwnProperty:N$1,hasOwnProp:N$1,reduceDescriptors:v$1,freezeMethods:e=>{v$1(e,((t,n)=>{if(f$1(e)&&-1!==["arguments","caller","callee"].indexOf(n))return !1;const r=e[n];f$1(r)&&(t.enumerable=!1,"writable"in t?t.writable=!1:t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")}));}));},toObjectSet:(e,t)=>{const n={},r=e=>{e.forEach((e=>{n[e]=!0;}));};return a$1(e)?r(e):r(String(e).split(t)),n},toCamelCase:e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,(function(e,t,n){return t.toUpperCase()+n})),noop:()=>{},toFiniteNumber:(e,t)=>(e=+e,Number.isFinite(e)?e:t),findKey:O$1,global:S$1,isContextDefined:R$1,ALPHABET:P$1,generateString:(e=16,t=P$1.ALPHA_DIGIT)=>{let n="";const{length:r}=t;for(;e--;)n+=t[Math.random()*r|0];return n},isSpecCompliantForm:function(e){return !!(e&&f$1(e.append)&&"FormData"===e[Symbol.toStringTag]&&e[Symbol.iterator])},toJSONObject:e=>{const t=new Array(10),n=(e,r)=>{if(p$1(e)){if(t.indexOf(e)>=0)return;if(!("toJSON"in e)){t[r]=e;const o=a$1(e)?[]:{};return w$1(e,((e,t)=>{const s=n(e,r+1);!c$1(s)&&(o[t]=s);})),t[r]=void 0,o}}return e};return n(e,0)},isAsyncFn:U$1,isThenable:e=>e&&(p$1(e)||f$1(e))&&f$1(e.then)&&f$1(e.catch)};function _$1(e,t,n,r,o){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=(new Error).stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),o&&(this.response=o);}F$1.inherits(_$1,Error,{toJSON:function(){return {message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:F$1.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const B$1=_$1.prototype,D$1={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach((e=>{D$1[e]={value:e};})),Object.defineProperties(_$1,D$1),Object.defineProperty(B$1,"isAxiosError",{value:!0}),_$1.from=(e,t,n,r,o,s)=>{const i=Object.create(B$1);return F$1.toFlatObject(e,i,(function(e){return e!==Error.prototype}),(e=>"isAxiosError"!==e)),_$1.call(i,e.message,t,n,r,o),i.cause=e,i.name=e.name,s&&Object.assign(i,s),i};function L$1(e){return F$1.isPlainObject(e)||F$1.isArray(e)}function k$1(e){return F$1.endsWith(e,"[]")?e.slice(0,-2):e}function q$1(e,t,n){return e?e.concat(t).map((function(e,t){return e=k$1(e),!n&&t?"["+e+"]":e})).join(n?".":""):t}const I$1=F$1.toFlatObject(F$1,{},null,(function(e){return /^is[A-Z]/.test(e)}));function z$1(e,t,n){if(!F$1.isObject(e))throw new TypeError("target must be an object");t=t||new FormData;const r=(n=F$1.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,(function(e,t){return !F$1.isUndefined(t[e])}))).metaTokens,o=n.visitor||u,s=n.dots,i=n.indexes,a=(n.Blob||"undefined"!=typeof Blob&&Blob)&&F$1.isSpecCompliantForm(t);if(!F$1.isFunction(o))throw new TypeError("visitor must be a function");function c(e){if(null===e)return "";if(F$1.isDate(e))return e.toISOString();if(!a&&F$1.isBlob(e))throw new _$1("Blob is not supported. Use a Buffer instead.");return F$1.isArrayBuffer(e)||F$1.isTypedArray(e)?a&&"function"==typeof Blob?new Blob([e]):Buffer.from(e):e}function u(e,n,o){let a=e;if(e&&!o&&"object"==typeof e)if(F$1.endsWith(n,"{}"))n=r?n:n.slice(0,-2),e=JSON.stringify(e);else if(F$1.isArray(e)&&function(e){return F$1.isArray(e)&&!e.some(L$1)}(e)||(F$1.isFileList(e)||F$1.endsWith(n,"[]"))&&(a=F$1.toArray(e)))return n=k$1(n),a.forEach((function(e,r){!F$1.isUndefined(e)&&null!==e&&t.append(!0===i?q$1([n],r,s):null===i?n:n+"[]",c(e));})),!1;return !!L$1(e)||(t.append(q$1(o,n,s),c(e)),!1)}const l=[],f=Object.assign(I$1,{defaultVisitor:u,convertValue:c,isVisitable:L$1});if(!F$1.isObject(e))throw new TypeError("data must be an object");return function e(n,r){if(!F$1.isUndefined(n)){if(-1!==l.indexOf(n))throw Error("Circular reference detected in "+r.join("."));l.push(n),F$1.forEach(n,(function(n,s){!0===(!(F$1.isUndefined(n)||null===n)&&o.call(t,n,F$1.isString(s)?s.trim():s,r,f))&&e(n,r?r.concat(s):[s]);})),l.pop();}}(e),t}function M$1(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,(function(e){return t[e]}))}function H$1(e,t){this._pairs=[],e&&z$1(e,this,t);}const J$1=H$1.prototype;function V$1(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function W$1(e,t,n){if(!t)return e;const r=n&&n.encode||V$1,o=n&&n.serialize;let s;if(s=o?o(t,n):F$1.isURLSearchParams(t)?t.toString():new H$1(t,n).toString(r),s){const t=e.indexOf("#");-1!==t&&(e=e.slice(0,t)),e+=(-1===e.indexOf("?")?"?":"&")+s;}return e}J$1.append=function(e,t){this._pairs.push([e,t]);},J$1.toString=function(e){const t=e?function(t){return e.call(this,t,M$1)}:M$1;return this._pairs.map((function(e){return t(e[0])+"="+t(e[1])}),"").join("&")};const K$1=class{constructor(){this.handlers=[];}use(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!n&&n.synchronous,runWhen:n?n.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null);}clear(){this.handlers&&(this.handlers=[]);}forEach(e){F$1.forEach(this.handlers,(function(t){null!==t&&e(t);}));}},$$1={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},G$1={isBrowser:!0,classes:{URLSearchParams:"undefined"!=typeof URLSearchParams?URLSearchParams:H$1,FormData:"undefined"!=typeof FormData?FormData:null,Blob:"undefined"!=typeof Blob?Blob:null},isStandardBrowserEnv:(()=>{let e;return ("undefined"==typeof navigator||"ReactNative"!==(e=navigator.product)&&"NativeScript"!==e&&"NS"!==e)&&("undefined"!=typeof window&&"undefined"!=typeof document)})(),isStandardBrowserWebWorkerEnv:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope&&"function"==typeof self.importScripts,protocols:["http","https","file","blob","url","data"]};function X$1(e){function t(e,n,r,o){let s=e[o++];const i=Number.isFinite(+s),a=o>=e.length;if(s=!s&&F$1.isArray(r)?r.length:s,a)return F$1.hasOwnProp(r,s)?r[s]=[r[s],n]:r[s]=n,!i;r[s]&&F$1.isObject(r[s])||(r[s]=[]);return t(e,n,r[s],o)&&F$1.isArray(r[s])&&(r[s]=function(e){const t={},n=Object.keys(e);let r;const o=n.length;let s;for(r=0;r<o;r++)s=n[r],t[s]=e[s];return t}(r[s])),!i}if(F$1.isFormData(e)&&F$1.isFunction(e.entries)){const n={};return F$1.forEachEntry(e,((e,r)=>{t(function(e){return F$1.matchAll(/\w+|\[(\w*)]/g,e).map((e=>"[]"===e[0]?"":e[1]||e[0]))}(e),r,n,0);})),n}return null}const Q$1={transitional:$$1,adapter:["xhr","http"],transformRequest:[function(e,t){const n=t.getContentType()||"",r=n.indexOf("application/json")>-1,o=F$1.isObject(e);o&&F$1.isHTMLForm(e)&&(e=new FormData(e));if(F$1.isFormData(e))return r&&r?JSON.stringify(X$1(e)):e;if(F$1.isArrayBuffer(e)||F$1.isBuffer(e)||F$1.isStream(e)||F$1.isFile(e)||F$1.isBlob(e))return e;if(F$1.isArrayBufferView(e))return e.buffer;if(F$1.isURLSearchParams(e))return t.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let s;if(o){if(n.indexOf("application/x-www-form-urlencoded")>-1)return function(e,t){return z$1(e,new G$1.classes.URLSearchParams,Object.assign({visitor:function(e,t,n,r){return G$1.isNode&&F$1.isBuffer(e)?(this.append(t,e.toString("base64")),!1):r.defaultVisitor.apply(this,arguments)}},t))}(e,this.formSerializer).toString();if((s=F$1.isFileList(e))||n.indexOf("multipart/form-data")>-1){const t=this.env&&this.env.FormData;return z$1(s?{"files[]":e}:e,t&&new t,this.formSerializer)}}return o||r?(t.setContentType("application/json",!1),function(e,t,n){if(F$1.isString(e))try{return (t||JSON.parse)(e),F$1.trim(e)}catch(e){if("SyntaxError"!==e.name)throw e}return (n||JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){const t=this.transitional||Q$1.transitional,n=t&&t.forcedJSONParsing,r="json"===this.responseType;if(e&&F$1.isString(e)&&(n&&!this.responseType||r)){const n=!(t&&t.silentJSONParsing)&&r;try{return JSON.parse(e)}catch(e){if(n){if("SyntaxError"===e.name)throw _$1.from(e,_$1.ERR_BAD_RESPONSE,this,null,this.response);throw e}}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:G$1.classes.FormData,Blob:G$1.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};F$1.forEach(["delete","get","head","post","put","patch"],(e=>{Q$1.headers[e]={};}));const Z$1=Q$1,Y$1=F$1.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),ee$1=Symbol("internals");function te$1(e){return e&&String(e).trim().toLowerCase()}function ne$1(e){return !1===e||null==e?e:F$1.isArray(e)?e.map(ne$1):String(e)}function re$1(e,t,n,r,o){return F$1.isFunction(r)?r.call(this,t,n):(o&&(t=n),F$1.isString(t)?F$1.isString(r)?-1!==t.indexOf(r):F$1.isRegExp(r)?r.test(t):void 0:void 0)}class oe$1{constructor(e){e&&this.set(e);}set(e,t,n){const r=this;function o(e,t,n){const o=te$1(t);if(!o)throw new Error("header name must be a non-empty string");const s=F$1.findKey(r,o);(!s||void 0===r[s]||!0===n||void 0===n&&!1!==r[s])&&(r[s||t]=ne$1(e));}const s=(e,t)=>F$1.forEach(e,((e,n)=>o(e,n,t)));return F$1.isPlainObject(e)||e instanceof this.constructor?s(e,t):F$1.isString(e)&&(e=e.trim())&&!/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim())?s((e=>{const t={};let n,r,o;return e&&e.split("\n").forEach((function(e){o=e.indexOf(":"),n=e.substring(0,o).trim().toLowerCase(),r=e.substring(o+1).trim(),!n||t[n]&&Y$1[n]||("set-cookie"===n?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r);})),t})(e),t):null!=e&&o(t,e,n),this}get(e,t){if(e=te$1(e)){const n=F$1.findKey(this,e);if(n){const e=this[n];if(!t)return e;if(!0===t)return function(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}(e);if(F$1.isFunction(t))return t.call(this,e,n);if(F$1.isRegExp(t))return t.exec(e);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,t){if(e=te$1(e)){const n=F$1.findKey(this,e);return !(!n||void 0===this[n]||t&&!re$1(0,this[n],n,t))}return !1}delete(e,t){const n=this;let r=!1;function o(e){if(e=te$1(e)){const o=F$1.findKey(n,e);!o||t&&!re$1(0,n[o],o,t)||(delete n[o],r=!0);}}return F$1.isArray(e)?e.forEach(o):o(e),r}clear(e){const t=Object.keys(this);let n=t.length,r=!1;for(;n--;){const o=t[n];e&&!re$1(0,this[o],o,e,!0)||(delete this[o],r=!0);}return r}normalize(e){const t=this,n={};return F$1.forEach(this,((r,o)=>{const s=F$1.findKey(n,o);if(s)return t[s]=ne$1(r),void delete t[o];const i=e?function(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,((e,t,n)=>t.toUpperCase()+n))}(o):String(o).trim();i!==o&&delete t[o],t[i]=ne$1(r),n[i]=!0;})),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const t=Object.create(null);return F$1.forEach(this,((n,r)=>{null!=n&&!1!==n&&(t[r]=e&&F$1.isArray(n)?n.join(", "):n);})),t}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map((([e,t])=>e+": "+t)).join("\n")}get[Symbol.toStringTag](){return "AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...t){const n=new this(e);return t.forEach((e=>n.set(e))),n}static accessor(e){const t=(this[ee$1]=this[ee$1]={accessors:{}}).accessors,n=this.prototype;function r(e){const r=te$1(e);t[r]||(!function(e,t){const n=F$1.toCamelCase(" "+t);["get","set","has"].forEach((r=>{Object.defineProperty(e,r+n,{value:function(e,n,o){return this[r].call(this,t,e,n,o)},configurable:!0});}));}(n,e),t[r]=!0);}return F$1.isArray(e)?e.forEach(r):r(e),this}}oe$1.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]),F$1.reduceDescriptors(oe$1.prototype,(({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return {get:()=>e,set(e){this[n]=e;}}})),F$1.freezeMethods(oe$1);const se$1=oe$1;function ie$1(e,t){const n=this||Z$1,r=t||n,o=se$1.from(r.headers);let s=r.data;return F$1.forEach(e,(function(e){s=e.call(n,s,o.normalize(),t?t.status:void 0);})),o.normalize(),s}function ae$1(e){return !(!e||!e.__CANCEL__)}function ce$1(e,t,n){_$1.call(this,null==e?"canceled":e,_$1.ERR_CANCELED,t,n),this.name="CanceledError";}F$1.inherits(ce$1,_$1,{__CANCEL__:!0});const ue$1=G$1.isStandardBrowserEnv?{write:function(e,t,n,r,o,s){const i=[];i.push(e+"="+encodeURIComponent(t)),F$1.isNumber(n)&&i.push("expires="+new Date(n).toGMTString()),F$1.isString(r)&&i.push("path="+r),F$1.isString(o)&&i.push("domain="+o),!0===s&&i.push("secure"),document.cookie=i.join("; ");},read:function(e){const t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5);}}:{write:function(){},read:function(){return null},remove:function(){}};function le$1(e,t){return e&&!/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)?function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}(e,t):t}const fe$1=G$1.isStandardBrowserEnv?function(){const e=/(msie|trident)/i.test(navigator.userAgent),t=document.createElement("a");let n;function r(n){let r=n;return e&&(t.setAttribute("href",r),r=t.href),t.setAttribute("href",r),{href:t.href,protocol:t.protocol?t.protocol.replace(/:$/,""):"",host:t.host,search:t.search?t.search.replace(/^\?/,""):"",hash:t.hash?t.hash.replace(/^#/,""):"",hostname:t.hostname,port:t.port,pathname:"/"===t.pathname.charAt(0)?t.pathname:"/"+t.pathname}}return n=r(window.location.href),function(e){const t=F$1.isString(e)?r(e):e;return t.protocol===n.protocol&&t.host===n.host}}():function(){return !0};function de$1(e,t){let n=0;const r=function(e,t){e=e||10;const n=new Array(e),r=new Array(e);let o,s=0,i=0;return t=void 0!==t?t:1e3,function(a){const c=Date.now(),u=r[i];o||(o=c),n[s]=a,r[s]=c;let l=i,f=0;for(;l!==s;)f+=n[l++],l%=e;if(s=(s+1)%e,s===i&&(i=(i+1)%e),c-o<t)return;const d=u&&c-u;return d?Math.round(1e3*f/d):void 0}}(50,250);return o=>{const s=o.loaded,i=o.lengthComputable?o.total:void 0,a=s-n,c=r(a);n=s;const u={loaded:s,total:i,progress:i?s/i:void 0,bytes:a,rate:c||void 0,estimated:c&&i&&s<=i?(i-s)/c:void 0,event:o};u[t?"download":"upload"]=!0,e(u);}}const pe$1={http:null,xhr:"undefined"!=typeof XMLHttpRequest&&function(e){return new Promise((function(t,n){let r=e.data;const o=se$1.from(e.headers).normalize(),s=e.responseType;let i,a;function c(){e.cancelToken&&e.cancelToken.unsubscribe(i),e.signal&&e.signal.removeEventListener("abort",i);}F$1.isFormData(r)&&(G$1.isStandardBrowserEnv||G$1.isStandardBrowserWebWorkerEnv?o.setContentType(!1):o.getContentType(/^\s*multipart\/form-data/)?F$1.isString(a=o.getContentType())&&o.setContentType(a.replace(/^\s*(multipart\/form-data);+/,"$1")):o.setContentType("multipart/form-data"));let u=new XMLHttpRequest;if(e.auth){const t=e.auth.username||"",n=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";o.set("Authorization","Basic "+btoa(t+":"+n));}const l=le$1(e.baseURL,e.url);function f(){if(!u)return;const r=se$1.from("getAllResponseHeaders"in u&&u.getAllResponseHeaders());!function(e,t,n){const r=n.config.validateStatus;n.status&&r&&!r(n.status)?t(new _$1("Request failed with status code "+n.status,[_$1.ERR_BAD_REQUEST,_$1.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n)):e(n);}((function(e){t(e),c();}),(function(e){n(e),c();}),{data:s&&"text"!==s&&"json"!==s?u.response:u.responseText,status:u.status,statusText:u.statusText,headers:r,config:e,request:u}),u=null;}if(u.open(e.method.toUpperCase(),W$1(l,e.params,e.paramsSerializer),!0),u.timeout=e.timeout,"onloadend"in u?u.onloadend=f:u.onreadystatechange=function(){u&&4===u.readyState&&(0!==u.status||u.responseURL&&0===u.responseURL.indexOf("file:"))&&setTimeout(f);},u.onabort=function(){u&&(n(new _$1("Request aborted",_$1.ECONNABORTED,e,u)),u=null);},u.onerror=function(){n(new _$1("Network Error",_$1.ERR_NETWORK,e,u)),u=null;},u.ontimeout=function(){let t=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded";const r=e.transitional||$$1;e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(new _$1(t,r.clarifyTimeoutError?_$1.ETIMEDOUT:_$1.ECONNABORTED,e,u)),u=null;},G$1.isStandardBrowserEnv){const t=(e.withCredentials||fe$1(l))&&e.xsrfCookieName&&ue$1.read(e.xsrfCookieName);t&&o.set(e.xsrfHeaderName,t);}void 0===r&&o.setContentType(null),"setRequestHeader"in u&&F$1.forEach(o.toJSON(),(function(e,t){u.setRequestHeader(t,e);})),F$1.isUndefined(e.withCredentials)||(u.withCredentials=!!e.withCredentials),s&&"json"!==s&&(u.responseType=e.responseType),"function"==typeof e.onDownloadProgress&&u.addEventListener("progress",de$1(e.onDownloadProgress,!0)),"function"==typeof e.onUploadProgress&&u.upload&&u.upload.addEventListener("progress",de$1(e.onUploadProgress)),(e.cancelToken||e.signal)&&(i=t=>{u&&(n(!t||t.type?new ce$1(null,e,u):t),u.abort(),u=null);},e.cancelToken&&e.cancelToken.subscribe(i),e.signal&&(e.signal.aborted?i():e.signal.addEventListener("abort",i)));const d=function(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}(l);d&&-1===G$1.protocols.indexOf(d)?n(new _$1("Unsupported protocol "+d+":",_$1.ERR_BAD_REQUEST,e)):u.send(r||null);}))}};F$1.forEach(pe$1,((e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t});}catch(e){}Object.defineProperty(e,"adapterName",{value:t});}}));const he$1=e=>`- ${e}`,me$1=e=>F$1.isFunction(e)||null===e||!1===e,ye$1=e=>{e=F$1.isArray(e)?e:[e];const{length:t}=e;let n,r;const o={};for(let s=0;s<t;s++){let t;if(n=e[s],r=n,!me$1(n)&&(r=pe$1[(t=String(n)).toLowerCase()],void 0===r))throw new _$1(`Unknown adapter '${t}'`);if(r)break;o[t||"#"+s]=r;}if(!r){const e=Object.entries(o).map((([e,t])=>`adapter ${e} `+(!1===t?"is not supported by the environment":"is not available in the build")));throw new _$1("There is no suitable adapter to dispatch the request "+(t?e.length>1?"since :\n"+e.map(he$1).join("\n"):" "+he$1(e[0]):"as no adapter specified"),"ERR_NOT_SUPPORT")}return r};function ge$1(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new ce$1(null,e)}function be$1(e){ge$1(e),e.headers=se$1.from(e.headers),e.data=ie$1.call(e,e.transformRequest),-1!==["post","put","patch"].indexOf(e.method)&&e.headers.setContentType("application/x-www-form-urlencoded",!1);return ye$1(e.adapter||Z$1.adapter)(e).then((function(t){return ge$1(e),t.data=ie$1.call(e,e.transformResponse,t),t.headers=se$1.from(t.headers),t}),(function(t){return ae$1(t)||(ge$1(e),t&&t.response&&(t.response.data=ie$1.call(e,e.transformResponse,t.response),t.response.headers=se$1.from(t.response.headers))),Promise.reject(t)}))}const Ee$1=e=>e instanceof se$1?e.toJSON():e;function we$1(e,t){t=t||{};const n={};function r(e,t,n){return F$1.isPlainObject(e)&&F$1.isPlainObject(t)?F$1.merge.call({caseless:n},e,t):F$1.isPlainObject(t)?F$1.merge({},t):F$1.isArray(t)?t.slice():t}function o(e,t,n){return F$1.isUndefined(t)?F$1.isUndefined(e)?void 0:r(void 0,e,n):r(e,t,n)}function s(e,t){if(!F$1.isUndefined(t))return r(void 0,t)}function i(e,t){return F$1.isUndefined(t)?F$1.isUndefined(e)?void 0:r(void 0,e):r(void 0,t)}function a(n,o,s){return s in t?r(n,o):s in e?r(void 0,n):void 0}const c={url:s,method:s,data:s,baseURL:i,transformRequest:i,transformResponse:i,paramsSerializer:i,timeout:i,timeoutMessage:i,withCredentials:i,adapter:i,responseType:i,xsrfCookieName:i,xsrfHeaderName:i,onUploadProgress:i,onDownloadProgress:i,decompress:i,maxContentLength:i,maxBodyLength:i,beforeRedirect:i,transport:i,httpAgent:i,httpsAgent:i,cancelToken:i,socketPath:i,responseEncoding:i,validateStatus:a,headers:(e,t)=>o(Ee$1(e),Ee$1(t),!0)};return F$1.forEach(Object.keys(Object.assign({},e,t)),(function(r){const s=c[r]||o,i=s(e[r],t[r],r);F$1.isUndefined(i)&&s!==a||(n[r]=i);})),n}const Oe$1={};["object","boolean","number","function","string","symbol"].forEach(((e,t)=>{Oe$1[e]=function(n){return typeof n===e||"a"+(t<1?"n ":" ")+e};}));const Se$1={};Oe$1.transitional=function(e,t,n){function r(e,t){return "[Axios v1.5.1] Transitional option '"+e+"'"+t+(n?". "+n:"")}return (n,o,s)=>{if(!1===e)throw new _$1(r(o," has been removed"+(t?" in "+t:"")),_$1.ERR_DEPRECATED);return t&&!Se$1[o]&&(Se$1[o]=!0,console.warn(r(o," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(n,o,s)}};const Re$1={assertOptions:function(e,t,n){if("object"!=typeof e)throw new _$1("options must be an object",_$1.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let o=r.length;for(;o-- >0;){const s=r[o],i=t[s];if(i){const t=e[s],n=void 0===t||i(t,s,e);if(!0!==n)throw new _$1("option "+s+" must be "+n,_$1.ERR_BAD_OPTION_VALUE)}else if(!0!==n)throw new _$1("Unknown option "+s,_$1.ERR_BAD_OPTION)}},validators:Oe$1},Ae$1=Re$1.validators;class Te$1{constructor(e){this.defaults=e,this.interceptors={request:new K$1,response:new K$1};}request(e,t){"string"==typeof e?(t=t||{}).url=e:t=e||{},t=we$1(this.defaults,t);const{transitional:n,paramsSerializer:r,headers:o}=t;void 0!==n&&Re$1.assertOptions(n,{silentJSONParsing:Ae$1.transitional(Ae$1.boolean),forcedJSONParsing:Ae$1.transitional(Ae$1.boolean),clarifyTimeoutError:Ae$1.transitional(Ae$1.boolean)},!1),null!=r&&(F$1.isFunction(r)?t.paramsSerializer={serialize:r}:Re$1.assertOptions(r,{encode:Ae$1.function,serialize:Ae$1.function},!0)),t.method=(t.method||this.defaults.method||"get").toLowerCase();let s=o&&F$1.merge(o.common,o[t.method]);o&&F$1.forEach(["delete","get","head","post","put","patch","common"],(e=>{delete o[e];})),t.headers=se$1.concat(s,o);const i=[];let a=!0;this.interceptors.request.forEach((function(e){"function"==typeof e.runWhen&&!1===e.runWhen(t)||(a=a&&e.synchronous,i.unshift(e.fulfilled,e.rejected));}));const c=[];let u;this.interceptors.response.forEach((function(e){c.push(e.fulfilled,e.rejected);}));let l,f=0;if(!a){const e=[be$1.bind(this),void 0];for(e.unshift.apply(e,i),e.push.apply(e,c),l=e.length,u=Promise.resolve(t);f<l;)u=u.then(e[f++],e[f++]);return u}l=i.length;let d=t;for(f=0;f<l;){const e=i[f++],t=i[f++];try{d=e(d);}catch(e){t.call(this,e);break}}try{u=be$1.call(this,d);}catch(e){return Promise.reject(e)}for(f=0,l=c.length;f<l;)u=u.then(c[f++],c[f++]);return u}getUri(e){return W$1(le$1((e=we$1(this.defaults,e)).baseURL,e.url),e.params,e.paramsSerializer)}}F$1.forEach(["delete","get","head","options"],(function(e){Te$1.prototype[e]=function(t,n){return this.request(we$1(n||{},{method:e,url:t,data:(n||{}).data}))};})),F$1.forEach(["post","put","patch"],(function(e){function t(t){return function(n,r,o){return this.request(we$1(o||{},{method:e,headers:t?{"Content-Type":"multipart/form-data"}:{},url:n,data:r}))}}Te$1.prototype[e]=t(),Te$1.prototype[e+"Form"]=t(!0);}));const Ce$1=Te$1;class Ne$1{constructor(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");let t;this.promise=new Promise((function(e){t=e;}));const n=this;this.promise.then((e=>{if(!n._listeners)return;let t=n._listeners.length;for(;t-- >0;)n._listeners[t](e);n._listeners=null;})),this.promise.then=e=>{let t;const r=new Promise((e=>{n.subscribe(e),t=e;})).then(e);return r.cancel=function(){n.unsubscribe(t);},r},e((function(e,r,o){n.reason||(n.reason=new ce$1(e,r,o),t(n.reason));}));}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e];}unsubscribe(e){if(!this._listeners)return;const t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1);}static source(){let e;return {token:new Ne$1((function(t){e=t;})),cancel:e}}}const je$1=Ne$1;const ve$1={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(ve$1).forEach((([e,t])=>{ve$1[t]=e;}));const xe$1=ve$1;const Pe$1=function t(n){const r=new Ce$1(n),o=e$1(Ce$1.prototype.request,r);return F$1.extend(o,Ce$1.prototype,r,{allOwnKeys:!0}),F$1.extend(o,r,null,{allOwnKeys:!0}),o.create=function(e){return t(we$1(n,e))},o}(Z$1);Pe$1.Axios=Ce$1,Pe$1.CanceledError=ce$1,Pe$1.CancelToken=je$1,Pe$1.isCancel=ae$1,Pe$1.VERSION="1.5.1",Pe$1.toFormData=z$1,Pe$1.AxiosError=_$1,Pe$1.Cancel=Pe$1.CanceledError,Pe$1.all=function(e){return Promise.all(e)},Pe$1.spread=function(e){return function(t){return e.apply(null,t)}},Pe$1.isAxiosError=function(e){return F$1.isObject(e)&&!0===e.isAxiosError},Pe$1.mergeConfig=we$1,Pe$1.AxiosHeaders=se$1,Pe$1.formToJSON=e=>X$1(F$1.isHTMLForm(e)?new FormData(e):e),Pe$1.getAdapter=ye$1,Pe$1.HttpStatusCode=xe$1,Pe$1.default=Pe$1;const Ue=Pe$1;

  class BlockBase {
      constructor(_a) {
          var { config } = _a, other = __rest(_a, ["config"]);
          this._config = null;
          // native ｜ vue ｜ react
          this.platform = "native";
          // 子类生产的dom进行最后的包装
          this._pack = function (_dom) {
              let dom = _dom;
              if (this.platform === "native" && dom instanceof HTMLElement) {
                  dom.setAttribute("contentEditable", "true");
                  dom.setAttribute("block-id", this._blockId);
                  dom.setAttribute("native", "true");
                  return [dom, () => { }];
              }
              else if (this.platform.toLowerCase() === "vue") {
                  // 设置原型
                  this._injectionForVue();
                  dom = document.createElement("div");
                  const _that = this;
                  return [dom, function () {
                          new Vue({
                              el: dom,
                              components: {
                                  comp: _dom,
                              },
                              render: (h) => {
                                  return h("comp", {
                                      attrs: {
                                          "block-id": _that._blockId,
                                      },
                                      props: {
                                          '$superConfig': {
                                              blockData: _that._config,
                                              blockId: _that._blockId,
                                          }
                                      },
                                  });
                              },
                          });
                      }];
              }
          };
          this._blockId = other["block-id"];
          this._contentEditable = other["contentEditable"];
          this._config = config;
      }
      _render() {
          if (!this["render"]) {
              return console.error(`${this._blockId}没有实现render方法`);
          }
          return this._pack(this["render"]());
      }
      _injectionForVue() {
          Vue.prototype['$blocks'] = () => this._config.Editor.UI.Editor.BlockManager.blocks;
          Vue.prototype['$replaceCurrentBlock'] = (...args) => this._config.Editor.API.replaceCurrentBlock(...args);
          Vue.prototype['$superDocUpdateBlockData'] = (...args) => this._config.Editor.API.superDocUpdateBlockData(...args);
          Vue.prototype['$superDocListen'] = (...args) => this._config.Editor.API.superDocListen(...args);
      }
      // 解析数据
      compileData(blockInstance, text) {
          return [];
      }
  }

  class ToolLayoutBase {
      constructor(config, ...other) {
          this._config = null;
          this._type = null;
          this._icon = null;
          this._Editor = null;
          this._config = config;
      }
  }

  class ToolPluginBase {
      constructor(config, ...other) {
          this._type = null;
          this._icon = null;
          this._config = null;
          this.blockData = null;
          this._config = config;
      }
      _click() {
          return;
      }
      _getBlockData() {
          if (!this.blockData)
              return console.error(`${this._type}没有设置默认数据`);
          return this.blockData;
      }
      // 循环追加样式属性  TODO待优化成过滤调一些dom
      loopAddStyle(node, style, attr) {
          try {
              if (node && node.childNodes.length !== 0) {
                  node.childNodes.forEach((element) => {
                      if (element.textContent == "") {
                          element.remove();
                      }
                      else {
                          element.style && (element.style = '');
                          if (element instanceof HTMLElement) {
                              Object.keys(style).forEach(key => {
                                  element.style.setProperty(key, style[key]);
                              });
                              Object.keys(attr).forEach((key) => {
                                  element.setAttribute(key, attr[key]);
                              });
                              this.loopAddStyle(element, style, attr);
                          }
                      }
                  });
              }
          }
          catch (e) {
              console.error('循环添加属性错误', e, node);
          }
      }
  }

  /**
   * 对外暴露的api
   */
  class API extends Module {
      prepare() { }
      batchInsertBlock(blockDatas = []) {
          this.Editor.BlockManager.batchInsertBlock(blockDatas);
      }
      replaceCurrentBlock(blockDatas, id) {
          return this.Editor.BlockManager.replaceCurrentBlock(blockDatas, id);
      }
      /**
       * 更新blocks json 的方法
       */
      superDocUpdateBlockData(id, blockData) {
          const { data } = this.Editor.BlockManager.blocks.find((item) => item.id === id);
          const keys = Object.keys(blockData);
          keys.forEach((key) => {
              data[key] = blockData[key];
          });
          return true;
      }
      /**
       * 监听blockData变化回调函数
       */
      superDocListen(target, callback) {
          const listeners = this.Editor.BlockManager.listeners.get(target);
          if (!listeners)
              this.Editor.BlockManager.listeners.set(target, new Set());
          this.Editor.BlockManager.listeners.get(target).add(callback);
      }
      /**
       *  返回光标位置
       */
      getCursorPosition() {
          // return
      }
  }
  /**
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   * 对外暴露使用的方法
   */
  const showCommand = (isCurrentBlockPos = false) => {
      getModules().UI.command.visible = true;
      // 增加当前行替换内容判断
      getModules().UI.isCurrentBlockPos = isCurrentBlockPos;
  };
  const addListener = (type, callback) => {
      if (type === "add") {
          getModules().Event.addListeners.add(callback);
      }
      else if (type === "delete") {
          getModules().Event.deleteListeners.add(callback);
      }
      else if (type === "update") {
          getModules().Event.updateListeners.add(callback);
      }
  };
  const getBlockData = (id) => {
      if (!id)
          return {};
      return getModules().BlockManager.blocks.find((block) => block.id === id);
  };
  const generateParagraphData = () => {
      return {
          id: generateBlockId(),
          type: "Paragraph",
          data: {
              text: "",
              translate: ''
          },
          class: "Paragraph",
      };
  };
  const generateHeadData = (level) => {
      return {
          id: generateBlockId(),
          type: "Head",
          data: {
              text: "",
              level,
              translate: ''
          },
          class: "Head",
      };
  };
  const generateListData = (type) => {
      if (type === 'ul') {
          return {
              id: generateBlockId(),
              type: "ListDoc",
              data: {
                  type: 'ul',
                  list: []
              },
              class: "ListDoc",
          };
      }
      if (type === 'ol') {
          return {
              id: generateBlockId(),
              type: "ListDoc",
              data: {
                  type: 'ol',
                  list: []
              },
              class: "ListDoc",
          };
      }
  };
  const generateTodoData = () => {
      return {
          id: generateBlockId(),
          type: "TodoList",
          data: {
              list: []
          },
          class: "TodoList",
      };
  };
  const generateImageData = ({ desc, url }) => {
      return {
          id: generateBlockId(),
          type: 'ImageDoc',
          data: {
              desc,
              url
          },
          class: 'ImageDoc',
      };
  };
  function insertAfter(originElement, newElement) {
      var parent = originElement.parentNode;
      if (parent.lastChild == originElement) {
          // 如果最后的节点是目标元素，则直接添加。因为默认是最后
          parent.appendChild(newElement);
      }
      else {
          //如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面
          parent.insertBefore(newElement, originElement.nextSibling);
      }
  }
  function syncDom(targetDom, newDom) {
      if (targetDom.innerHTML === newDom.innerHTML)
          return;
      const newNodes = Array.from(newDom.childNodes);
      newNodes.forEach((nNode, index) => {
          const nodes = Array.from(targetDom.childNodes);
          const oNode = nodes[index];
          if (!oNode) {
              let i = index - 1;
              while (!nodes[i] && i >= 0) {
                  i -= 1;
              }
              if (i === -1) {
                  targetDom.appendChild(nNode);
              }
              else {
                  insertAfter(nodes[i], nNode);
              }
          }
          else if (nNode.nodeType === oNode.nodeType) {
              if (nNode.nodeType === 3 && nNode.textContent !== oNode.textContent) {
                  oNode.textContent = nNode.textContent;
              }
              else if (nNode.nodeName !== oNode.nodeName) {
                  insertAfter(oNode, nNode);
              }
              else if (nNode.nodeName === oNode.nodeName) {
                  syncDom(oNode, nNode);
              }
              else {
                  throw '有问题：' + nNode.nodeName + '---' + oNode.nodeName;
              }
          }
          else if (nNode) {
              oNode.replaceWith(nNode);
          }
      });
      const nodes = Array.from(targetDom.childNodes);
      nodes.slice(newNodes.length).forEach(el => el.remove());
  }
  function markdownSyntaxTransform(content, id) {
      if (/`([^`]+)`\s/.test(content)) {
          content = content.replace(/`([^`]+)`\s/g, '&nbsp;<code class="super-doc-code">$1</code>&nbsp;');
      }
      if (/`([^`]+)`&nbsp;/.test(content)) {
          content = content.replace(/`([^`]+)`&nbsp;/g, '&nbsp;<code class="super-doc-code">$1</code>&nbsp;');
      }
      if (content.indexOf('# ') === 0) {
          const headData = generateHeadData('h1');
          content = content.replace('# ', '');
          headData.data = {
              text: content,
              level: 'h1',
              translate: ''
          };
          getModules().BlockManager.replaceBlockForBlockId(headData, id);
      }
      else if (content.indexOf('## ') === 0) {
          const headData = generateHeadData('h2');
          content = content.replace('## ', '');
          console.log('更新后的content', content);
          headData.data = {
              text: content,
              level: 'h2',
              translate: ''
          };
          getModules().BlockManager.replaceBlockForBlockId(headData, id);
      }
      else if (content.indexOf('### ') === 0) {
          const headData = generateHeadData('h3');
          content = content.replace('### ', '');
          headData.data = {
              text: content,
              level: 'h3',
              translate: ''
          };
          getModules().BlockManager.replaceBlockForBlockId(headData, id);
      }
      else if (content.indexOf('#### ') === 0) {
          const headData = generateHeadData('h4');
          content = content.replace('#### ', '');
          headData.data = {
              text: content,
              level: 'h4',
              translate: ''
          };
          getModules().BlockManager.replaceBlockForBlockId(headData, id);
      }
      else if (content.indexOf('##### ') === 0) {
          const headData = generateHeadData('h5');
          content = content.replace('##### ', '');
          headData.data = {
              text: content,
              level: 'h5',
              translate: ''
          };
          getModules().BlockManager.replaceBlockForBlockId(headData, id);
      }
      else if (content.indexOf('- ') === 0) {
          let blockData = generateListData('ul');
          content = content.replace('- ', '');
          blockData.data.list[0] = { text: content ? content : '', id: generateBlockId() };
          getModules().BlockManager.replaceBlockForBlockId(blockData, id);
      }
      else if (content.indexOf('+ ') === 0) {
          let blockData = generateListData('ol');
          content = content.replace('+ ', '');
          blockData.data.list[0] = { text: content ? content : '', id: generateBlockId() };
          getModules().BlockManager.replaceBlockForBlockId(blockData, id);
      }
      else if (IMAGE_MD_REGEX.test(content)) {
          const blockData = generateImageData(getMDImage(content));
          if (blockData.data.url)
              getModules().BlockManager.replaceBlockForBlockId(blockData, id);
      }
      return content;
  }
  function findBlockDataForId(id) {
      return getModules().BlockManager.findBlockConfigForId(id).data;
  }
  function generateId() {
      return generateBlockId();
  }
  /**
   * 解析html字符串转换成blockData
   * @param htmlString
   * @returns blockData[]
   */
  function complieHTMLToBlockData(htmlString) {
      let manager = this.BlockManager;
      console.log(`【superDoc】:解析html字符串转换成blockData`, htmlString);
      let body = document.createElement('body');
      body.innerHTML = htmlString;
      let blockData = [];
      loopComplieNode(body, blockData);
      function loopComplieNode(container, blockData) {
          container.childNodes.forEach((child) => {
              if (child.nodeName == "DIV") {
                  loopComplieNode(child, blockData);
              }
              else {
                  let toolPlugin = manager.getToolByNodeName(child.nodeName);
                  toolPlugin && (toolPlugin === null || toolPlugin === void 0 ? void 0 : toolPlugin.complieHTMLToBlockData(child, blockData));
                  if (!toolPlugin) {
                      console.log('【superDoc】:解析节点失败，暂无该节点解析器', child);
                  }
              }
          });
      }
      // 释放节点
      body.remove();
      return blockData;
  }
  function deComplieBlockDataToHTML(blockData) {
      try {
          let htmlString = blockData.map((block) => {
              if (block.type == "Head") {
                  return `<${block.data.level}>${block.data.text}</${block.data.level}>`;
              }
              else if (block.type == "ListDoc") {
                  return `<${block.data.type}>${block.data.list.map(item => { return `<li>${item.text}</li>`; }).join('\r\n')}</${block.data.type}>`;
              }
              else if (block.type == "Paragraph") {
                  return `<p>${block.data.text}</p>`;
              }
              else if (block.type == "ImageDoc") {
                  return `<div class="">\r\n <img alt="${block.data.desc}" src="${block.data.url}" />\r\n </div>`;
              }
              else {
                  console.log(`【superDoc】:${block.type}无识别该类型的解析`);
                  return '空';
              }
          }).join('\r\n');
          return `<html>\r\n<body>\r\n${htmlString}</body>\r\n</html>`;
      }
      catch (e) {
          console.error(`【superDoc_error】: 反解析为html失败${e}`);
      }
  }
  /**
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   */

  const compileParagraph = (str) => {
      const textArr = str.split('\n');
      const blocks = textArr.map(text => {
          const paragraphData = generateParagraphData();
          paragraphData.data.text = text;
          return paragraphData;
      });
      return blocks;
  };
  const compileHead = (str, level) => {
      const textArr = str.split('\n');
      const blocks = textArr.map(text => {
          const headData = generateHeadData(level);
          headData.data.text = text;
          return headData;
      });
      return blocks;
  };
  const compileListData = (list, type) => {
      const listData = generateListData(type);
      list.forEach((item) => {
          !item.id && (item.id = generateBlockId());
          listData.data.list.push(item);
      });
      return listData;
  };
  const compileImageData = ({ desc, url }) => {
      let imageData = generateImageData({ desc, url });
      return imageData;
  };
  const compileTodoData = (list) => {
      const toDoData = generateTodoData();
      list.forEach((item) => {
          !item.id && (item.id = generateBlockId());
          toDoData.data.list.push(item);
      });
      return toDoData;
  };

  const BlockType = {
      LIST_DOC: "ListDoc",
      HEAD: "Head",
      PARAGRAPH: "Paragraph",
      IMAGE: "Image",
  };
  const cursorPositionType = {
      CURSOR_POSITION_START: 0,
      CURSOR_POSITION_MIDDLE: 1,
      CURSOR_POSITION_END: 2,
  };
  /**
   * 获取blockId
   */
  const getBlockIdForElement = (el) => {
      let id = el.getAttribute("block-id");
      let element = null;
      if (!id) {
          const subElement = el.querySelector("[block-id]");
          id = subElement.getAttribute("block-id");
          if (!id) {
              throw new Error(`${el}非文档元素`);
          }
          element = subElement;
      }
      else {
          element = el;
      }
      return [id, element];
  };
  const getParagraphElements = () => {
      return Array.from(document.querySelectorAll("#superdoc-paragraph"));
  };

  const IMAGE_MD_REGEX = /!\[(.*?)\]\((.*?)\)( |&nbsp;)/;
  const getMDImage = function (str) {
      const matches = str.match(IMAGE_MD_REGEX);
      if (matches) {
          return {
              desc: matches[1],
              url: matches[2]
          };
      }
      else {
          return {
              desc: undefined,
              url: undefined
          };
      }
  };

  const setModules = (moduleInstances) => {
      window['__SUPERDOC__'] = moduleInstances;
  };
  const getModules = () => {
      return window['__SUPERDOC__'];
  };

  var SNAPSHOOT_TYPE;
  (function (SNAPSHOOT_TYPE) {
      SNAPSHOOT_TYPE["UPDATE"] = "update";
      SNAPSHOOT_TYPE["DELETE"] = "delete";
      SNAPSHOOT_TYPE["ADD"] = "add";
  })(SNAPSHOOT_TYPE || (SNAPSHOOT_TYPE = {}));

  // 数组的删除操作
  function isArrayDelete(obj, key) {
      return Array.isArray(obj) && key === 'length';
  }

  class TimeMachine {
      constructor(target, option) {
          this.queue = [];
          this.proxys = [];
          this.proxyMap = new Map();
          this.target = null;
          this.option = null;
          this.get = (parentPath) => {
              return (target, key) => {
                  // 是否被代理
                  if (key === "IS_PROXY") {
                      return true;
                  }
                  // 返回代理元对象parentKey
                  if (key === "PROXY_TARGET") {
                      return target;
                  }
                  if (key === "OBJECT_PATH") {
                      return parentPath;
                  }
                  // 重构splice
                  if (key === "splice" && typeof target[key] === "function") {
                      return this._splice;
                  }
                  const value = target[key];
                  if (target.hasOwnProperty(key) && (isObject(value) || isArray(value))) {
                      const path = isObject(target) ? `.${key}` : `[${key}]`;
                      return this.createProxy(value, `${parentPath}${path}`);
                  }
                  else if (typeof target[key] === "function" &&
                      ["pop", "push", "shift", "unshift", "reverse", "sort"].includes(key)) {
                      const _that = this;
                      return function (...args) {
                          // 在拦截过程中直接模拟原地操作
                          const pTarget = _that.proxyMap.get(target);
                          switch (key) {
                              case "pop":
                                  return pTarget.splice(target.length - 1, 1)[0];
                              case "push":
                                  pTarget.splice(target.length, 0, ...args);
                                  return target.length;
                              case "shift":
                                  return pTarget.splice(0, 1)[0];
                              case "unshift":
                                  pTarget.splice(0, 0, ...args);
                                  return target.length;
                              case "reverse":
                                  pTarget.splice(0, target.length, ...target.slice().reverse());
                                  return target;
                              case "sort":
                                  pTarget.splice(0, target.length, ...target.slice().sort(...args));
                                  return target;
                          }
                      };
                  }
                  else {
                      return value;
                  }
              };
          };
          this.set = (target, key, value) => {
              var _a, _b, _c, _d, _e, _f;
              const IS_PROXY = value === null || value === void 0 ? void 0 : value.IS_PROXY;
              // TODO: 排除数组的默认方法和已经代理过的方法
              if (IS_PROXY) {
                  //   value = value.PROXY_TARGET;
                  target[key] = value;
                  return true;
              }
              const old = target[key];
              const HANDLER_TYPE = target.hasOwnProperty(key) === false
                  ? "add"
                  : old !== value
                      ? "update"
                      : null;
              if (HANDLER_TYPE === "add") {
                  // 新增
                  const snapshootAdd = {
                      type: SNAPSHOOT_TYPE.ADD,
                      new: value,
                  };
                  this.queue.push(snapshootAdd);
              }
              else if (HANDLER_TYPE === "update") {
                  // 更新
                  const snapshootUpdate = {
                      type: SNAPSHOOT_TYPE.UPDATE,
                      old: old,
                      new: value,
                  };
                  this.queue.push(snapshootUpdate);
              }
              else if (isArrayDelete(target, key)) {
                  // 数组的删除
                  const snapshootDelete = {
                      type: SNAPSHOOT_TYPE.DELETE,
                      old: target.slice(key),
                  };
                  this.queue.push(snapshootDelete);
              }
              target[key] = value;
              if (!IS_PROXY) {
                  if (HANDLER_TYPE === SNAPSHOOT_TYPE.UPDATE) {
                      (_c = (_b = (_a = this.option) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b[HANDLER_TYPE]) === null || _c === void 0 ? void 0 : _c.call(_b, this.getState(target), key, this.getState(target)[key]);
                  }
                  else {
                      (_f = (_e = (_d = this.option) === null || _d === void 0 ? void 0 : _d.events) === null || _e === void 0 ? void 0 : _e[HANDLER_TYPE]) === null || _f === void 0 ? void 0 : _f.call(_e, this.getState(target)[key]);
                  }
              }
              return true;
          };
          // 重构数组的splice
          // 增删查改都在这里记录
          this._splice = function (start, deleteCount, ...items) {
              const callbackQueue = [];
              // 数组的删除
              if (deleteCount > 0) {
                  /**
                   * @description start + deleteCount === this.length
                   * @description start 及后面的全删
                   */
                  if (start + deleteCount === this.length) {
                      const snapshootDelete = {
                          type: SNAPSHOOT_TYPE.DELETE,
                          old: this.PROXY_TARGET.slice(start),
                      };
                      window["TimeMachine"].queue.push(snapshootDelete);
                      callbackQueue.push(snapshootDelete);
                  }
                  else {
                      const snapshootDelete = {
                          type: SNAPSHOOT_TYPE.DELETE,
                          old: this.PROXY_TARGET.slice(start, start + deleteCount),
                      };
                      window["TimeMachine"].queue.push(snapshootDelete);
                      callbackQueue.push(snapshootDelete);
                  }
              }
              // 新增
              if (items) {
                  // 新增
                  const snapshootAdd = {
                      type: SNAPSHOOT_TYPE.ADD,
                      new: items,
                  };
                  window["TimeMachine"].queue.push(snapshootAdd);
                  callbackQueue.push(snapshootAdd);
              }
              // const result = Array.prototype.splice.call(
              //   this.PROXY_TARGET,
              //   start,
              //   deleteCount,
              //   ...items
              // );
              /**
               * 避免使用Array.prototype.splice.call
               * 因为会导致vue无法进行依赖收集
              */
              const result = this.PROXY_TARGET.splice(start, deleteCount, ...items);
              // 新增的需要proxy代理一下
              for (let i = 0; i < this.length; i++)
                  this[i];
              callbackQueue.forEach((item) => {
                  var _a, _b, _c, _d, _e, _f;
                  if (item.type === SNAPSHOOT_TYPE.DELETE) {
                      const proxys = item.old.map((item) => window["TimeMachine"].proxyMap.get(item));
                      (_c = (_b = (_a = window["TimeMachine"].option) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.delete) === null || _c === void 0 ? void 0 : _c.call(_b, proxys);
                  }
                  else if (item.type === SNAPSHOOT_TYPE.ADD) {
                      const proxys = item.new.map((item) => window["TimeMachine"].proxyMap.get(item));
                      (_f = (_e = (_d = window["TimeMachine"].option) === null || _d === void 0 ? void 0 : _d.events) === null || _e === void 0 ? void 0 : _e.add) === null || _f === void 0 ? void 0 : _f.call(_e, proxys);
                  }
              });
              return result;
          };
          if (!isObject(target) && !isArray(target)) {
              console.error("参数必须为数组或者对象");
              return;
          }
          this.option = option;
          this.target = this.createProxy(target, '');
          window["TimeMachine"] = this;
      }
      createProxy(target, parentPath) {
          let proxy = this.findProxy(target);
          if (!proxy) {
              proxy = new Proxy(target, {
                  get: this.get(parentPath),
                  set: this.set,
              });
          }
          this.proxyMap.set(target, proxy);
          return proxy;
      }
      findProxy(target) {
          if (!this.proxyMap.has(target)) {
              return null;
          }
          else {
              return this.proxyMap.get(target);
          }
      }
      getState(target) {
          if (!this.proxyMap.has(target)) {
              console.error(`${target.toString()}：不在队列中！`);
              return;
          }
          else {
              return this.proxyMap.get(target);
          }
      }
  }

  class Block {
      get CURRENT_CHECKOUT_COUNT() {
          return this._CURRENT_CHECKOUT_COUNT;
      }
      set CURRENT_CHECKOUT_COUNT(count) {
          if (count === this.CHECKOUT_BLOCK_NUMBER) {
              this.checkAll = true;
              this._CURRENT_CHECKOUT_COUNT = count;
              this.BlockManager.cursor.removeAllRanges();
          }
          else if (count === this.CHECKOUT_ALL_NUMBER) {
              this.BlockManager.checkAllStatus(true);
              this._CURRENT_CHECKOUT_COUNT = count;
              this.BlockManager.cursor.removeAllRanges();
          }
          else if (count === 0) {
              this.checkAll = false;
              this._CURRENT_CHECKOUT_COUNT = 0;
          }
          else {
              this._CURRENT_CHECKOUT_COUNT = count;
          }
      }
      get isEditable() {
          return this._isEditable;
      }
      set isEditable(value) {
          this.element.contentEditable = !!value + "";
          this._isEditable = value;
      }
      get Editor() {
          return this._Editor;
      }
      set Editor(editor) {
          this._Editor = editor;
      }
      get currentElement() {
          return this.element.querySelector("[block-id]");
      }
      get xPosition() {
          return this.element.querySelector(`.${this.Editor.UI.CSS.content}`).offsetLeft;
      }
      get yPosition() {
          return this.element.querySelector(`.${this.Editor.UI.CSS.content}`).offsetTop;
      }
      set checkAll(status) {
          if (!status) {
              this.currentElement.classList.remove(this.Editor.UI.CSS.selectedStatus);
              this._CURRENT_CHECKOUT_COUNT = 0;
          }
          else {
              this.currentElement.classList.add(this.Editor.UI.CSS.selectedStatus);
              this._CURRENT_CHECKOUT_COUNT = 2;
          }
      }
      constructor({ index, id = generateBlockId(), type, data, Editor, class: _class, BlockManager: BlockManager }) {
          this.CHECKOUT_ALL_NUMBER = 3;
          this.CHECKOUT_BLOCK_NUMBER = 2;
          this._CURRENT_CHECKOUT_COUNT = 0;
          this.isBindEvent = false;
          this.mountedCallback = null;
          this._isEditable = false;
          this.index = index;
          this.id = id;
          this.type = type;
          this.data = data;
          this.Editor = Editor;
          this.class = _class;
          this.BlockManager = BlockManager;
          this.block2html();
          if (!this.BlockManager['config'].isReadOnly) {
              this.bindEvent();
          }
      }
      block2html() {
          const [element, callback, instance] = this.Editor.Renderer.block2html(this);
          this.element = element;
          this.mountedCallback = callback;
          this.instance = instance;
      }
      /**
       * 事件绑定
      */
      bindEvent() {
          this.Editor.Event.mouseEvent([this]);
          this.Editor.Event.bindKeydownEvent([this], this.Editor.Event);
          this.Editor.Event.globalClickListenerList.push(() => {
              if (this.CURRENT_CHECKOUT_COUNT === this.CHECKOUT_ALL_NUMBER) {
                  this.BlockManager.checkAllStatus(false);
              }
              else {
                  this.checkAll = false;
              }
          });
      }
      /**
       * 返回原始的数据
       * @returns {OutputBlockData}
       */
      getBlockData() {
          return {
              id: this.id,
              class: this.class,
              type: this.type,
              data: this.data
          };
      }
  }

  /**
   * 记录光标记录的最后block
   */
  class Cursor {
      constructor() {
          this.CURSOR_POSITION_START = 0;
          this.CURSOR_POSITION_MIDDLE = 1;
          this.CURSOR_POSITION_END = 2;
          this.cursorPosition = 0;
      }
      get block() {
          return this._block;
      }
      set block(block) {
          this.updateCursorPosition(block);
          this._block = block;
      }
      updateCursorPosition(block) {
          // TODO menu有问题 临时filter处理
          const elementList = Array.from(block.currentElement.childNodes).filter((el) => el.textContent.length !== 0);
          const { anchorOffset, anchorNode } = window.getSelection();
          if (anchorNode === elementList[0] && anchorOffset === 0) {
              this.cursorPosition = this.CURSOR_POSITION_START;
          }
          else if (anchorNode === elementList[elementList.length - 1] &&
              elementList[elementList.length - 1].textContent.length === anchorOffset) {
              this.cursorPosition = this.CURSOR_POSITION_END;
          }
          else {
              this.cursorPosition = this.CURSOR_POSITION_MIDDLE;
          }
          // 上述方法是记录在block内光标的位置。
      }
      removeAllRanges() {
          window.getSelection().removeAllRanges();
      }
  }

  const findBlockInstanceForId = function (blockId) {
      let pre = null;
      let target = null;
      let next = null;
      this.blockInstances.some((block, index, _t) => {
          if (block.id === blockId) {
              pre = { state: index === 0 ? null : _t[index - 1], index: index - 1 };
              target = { state: block, index: index };
              next = {
                  state: index === this.blockInstances.length - 1 ? null : _t[index + 1],
                  index: index + 1,
              };
          }
      });
      return {
          pre,
          target,
          next,
      };
  };
  const replaceBlockForBlockId = function (block, blockId = this.currentBlockId) {
      const { target: oldBlock } = this.findBlockInstanceForId(blockId);
      /**
       * 保留数据
      */
      try {
          if (block.type === BlockType.PARAGRAPH || block.type === BlockType.HEAD) {
              block.data.text = !!block.data.text ? block.data.text : oldBlock.state.data.text;
          }
          else if (block.type === BlockType.LIST_DOC) {
              if ((oldBlock.state.type === BlockType.PARAGRAPH || oldBlock.type === BlockType.HEAD) && oldBlock.state.data.text) {
                  block.data.list[0].text = oldBlock.state.data.text;
              }
          }
      }
      catch (error) {
          console.error(error);
      }
      this.blocks.splice(oldBlock.index, 1, Object.assign(Object.assign({}, block), { id: generateBlockId() }));
  };
  const insertBlockForBlockId = function (blockData = generateParagraphData(), blockId = this.currentBlockId, direction = cursorPositionType.CURSOR_POSITION_END) {
      blockData.id = blockData.id ? blockData.id : generateBlockId();
      this.blocks.some(({ id }, index, _target) => {
          if (id === blockId) {
              let i = index;
              if (direction === cursorPositionType.CURSOR_POSITION_END) {
                  i = index + 1;
              }
              else if (direction === cursorPositionType.CURSOR_POSITION_MIDDLE) {
                  i = index + 1;
              }
              else if (direction === cursorPositionType.CURSOR_POSITION_START) {
                  i = index;
              }
              _target.splice(i, 0, blockData);
              return true;
          }
      });
      return blockData.id;
  };
  const batchInsertBlock = function (blockDatas = []) {
      blockDatas.forEach(blockData => {
          insertBlockForBlockId(blockData);
      });
  };
  const replaceCurrentBlock = function (blockDatas, id) {
      blockDatas.forEach(block => block.class = block.class);
      const currentBlockIndex = this.blocks.findIndex(block => block.id === (id ? id : this.currentBlockId));
      this.blocks.splice(currentBlockIndex, 1, ...blockDatas);
  };
  const updateBlockData = function (id, data) {
      if (!id || !data)
          return;
      const blockData = this.blocks.find(block => block.id === id);
      blockData.data = data;
  };

  class BlockManager extends Module {
      constructor() {
          super(...arguments);
          // 事件存储
          this.listeners = new WeakMap();
          // WeakMap
          this.blockInstanceMap = new WeakMap();
          this.toolInstances = {
              toolbar: {
                  plugins: [],
                  layout: [],
              },
              inline: [],
          };
          this._currentHoverBlockId = null;
          this._currentBlockId = "";
          this.currentCopyBlockId = "";
          this.currentCopyBlockInfo = { id: "",
              status: 0,
              content: "",
              block: null,
              data: [],
              type: "text",
              selectionContent: []
          };
          this.currentSelectionBlockInfo = { id: "", // foucsId
              status: 0,
              content: "", // 文本内容string
              block: null, // 当前focus的实例block
              data: [], // 选择的内容
              type: "text", // 文本类型
              selectionContent: []
          };
          this.replaceBlockForBlockId = replaceBlockForBlockId;
          this.findBlockInstanceForId = findBlockInstanceForId;
          this.insertBlockForBlockId = insertBlockForBlockId;
          this.batchInsertBlock = batchInsertBlock;
          this.replaceCurrentBlock = replaceCurrentBlock;
          this.updateBlockData = updateBlockData;
      }
      // TODO 后续改成proxy代理
      get blockInstances() {
          const blocks = [];
          this.blocks.forEach((block) => {
              if (this.blockInstanceMap.has(block)) {
                  blocks.push(this.blockInstanceMap.get(block));
              }
          });
          return blocks;
      }
      get currentHoverBlockId() {
          if (!this._currentHoverBlockId) {
              return this.blockInstances[0].id;
          }
          else {
              return this._currentHoverBlockId;
          }
      }
      set currentHoverBlockId(blockId) {
          this._currentHoverBlockId = blockId;
      }
      get currentBlockId() {
          if (!this._currentBlockId) {
              return this.blockInstances[0].id;
          }
          else {
              return this._currentBlockId;
          }
      }
      set currentBlockId(value) {
          if (value === this._currentBlockId)
              return;
          this._currentBlockId = value;
          this.Editor.UI.toolbarFollowFocusBlock();
          this.Editor.UI.command.visible = false;
          this.Editor.UI.layout.visible = false;
          // TODO 这里待优化 回车新增block获取焦点和上下箭头获取焦点逻辑冲突了
          if (document.activeElement !== Dom.querySelector(`[block-id="${this._currentBlockId}"]`)) {
              const blockElement = Dom.querySelector(`[block-id="${this._currentBlockId}"]`);
              const paragraphEl = blockElement.querySelector('#superdoc-paragraph');
              if (paragraphEl) {
                  try {
                      const selection = window.getSelection();
                      const range = selection.getRangeAt(0);
                      const { left: x } = getElementCoordinates(range.getBoundingClientRect());
                      this.Editor.Event.keyDownInstance.setCursorForX(paragraphEl, x === 0 ? 1000 : x);
                  }
                  catch (error) {
                      this.Editor.Event.keyDownInstance.setCursorForX(paragraphEl, 0);
                  }
              }
          }
      }
      get curentFocusBlock() {
          return this.blockInstances.find((block) => block.id === this.currentBlockId);
      }
      get currentHoverBlock() {
          const block = this.blockInstances.find((block) => block.id === this.currentHoverBlockId);
          if (!block) {
              debugger;
          }
          return block;
      }
      get blocks() {
          return this.config.data.blocks;
      }
      // 被复制的block
      get currentCopyBlock() {
          if (this.currentCopyBlockInfo.status == this.curentFocusBlock.CHECKOUT_ALL_NUMBER) {
              return this.blockInstances;
          }
          const block = this.blockInstances.find((block) => block.id === this.currentCopyBlockInfo.id);
          if (!block) {
              console.error('获取当前复制的信息状态，block 不存在');
              debugger;
          }
          return [block];
      }
      prepare() {
          this.cursor = new Cursor();
          this.proxyBlocks();
          this.instanceBlocks();
          this.loadTools();
          this.Editor.UI.makeMounted();
          this.Editor.Renderer.reredner();
          if (!this.config.isReadOnly)
              this.bindEvent();
      }
      proxyBlocks() {
          this.config.data.blocks = new TimeMachine(this.config.data.blocks, {
              events: {
                  add: (blocks) => {
                      try {
                          const blockInstances = [];
                          blocks.forEach((block) => {
                              const blockInstance = new Block(Object.assign(Object.assign({}, block), { Editor: this.Editor, BlockManager: this }));
                              this.blockInstanceMap.set(block, blockInstance);
                              blockInstances.push(blockInstance);
                          });
                          this.Editor.Renderer.reredner();
                          blockInstances.forEach((item) => {
                              this.syncRendered(item);
                              this.changeCurrentBlockId(item.id);
                          });
                          this.Editor.Event.addListeners.forEach(callback => callback(blocks, this.blocks));
                      }
                      catch (error) {
                          console.log('添加不是block类型数据', error, blocks);
                      }
                  },
                  update: (proxy, key, value) => {
                      console.log('访问路径：', proxy.OBJECT_PATH);
                      const blockIndex = Number(proxy.OBJECT_PATH.split('.')[0].replace('[', '').replace(']', ''));
                      const block = this.blocks[blockIndex];
                      this.Editor.Renderer.reredner();
                      const target = this.blocks.find(_block => {
                          return _block === block;
                      });
                      this.Editor.Event.updateListeners.forEach(callback => callback(target, this.blocks));
                  },
                  delete: (blocks) => {
                      var _a, _b;
                      console.log('删除内容....');
                      try {
                          const { id } = blocks[0];
                          // TODO 这里需要优化 不能从页面获取上一个block-id
                          const preId = (_b = (_a = document
                              .querySelector(`[block-id="${id}"]`)
                              .parentNode.parentNode["previousElementSibling"]) === null || _a === void 0 ? void 0 : _a.querySelector("[block-id]")) === null || _b === void 0 ? void 0 : _b.getAttribute("block-id");
                          this.currentHoverBlockId = preId || id;
                          this.currentBlockId = preId || id;
                          this.Editor.Renderer.reredner();
                          this.Editor.Event.deleteListeners.forEach(callback => callback(blocks, this.blocks));
                      }
                      catch (error) {
                          console.log('删除不是block类型数据', blocks);
                      }
                  },
              },
          }).target;
      }
      instanceBlocks() {
          this.blocks.forEach((block, index) => {
              try {
                  this.blockInstanceMap.set(block, new Block({
                      index,
                      id: block.id,
                      type: block.type,
                      data: block.data,
                      Editor: this.Editor,
                      class: block.class,
                      BlockManager: this,
                  }));
              }
              catch (error) {
                  console.error(error);
              }
          });
      }
      syncRendered(blockInstance) {
          if (this.config.isReadOnly)
              return;
          // 绑定事件
          this.bindEvent([blockInstance]);
      }
      changeCurrentBlockId(id) {
          this.currentBlockId = id;
          this.currentHoverBlockId = id;
      }
      bindEvent(blocks = this.blockInstances) {
          const _blocks = blocks.filter((block) => !block.isBindEvent);
          if (!_blocks.length)
              return console.warn("不可重复绑定事件");
          this.Editor.Event.mouseEvent(_blocks);
      }
      findBlockConfigForId(blockId) {
          return this.blocks.find((block) => block.id === blockId);
      }
      addToolbarPlugin(plugin) {
          const isExist = this.toolInstances.toolbar.plugins.find((p) => p === plugin);
          if (!isExist)
              return;
          this.toolInstances.toolbar.plugins.push(plugin);
      }
      getToolByType(type) {
          return this.toolInstances.toolbar.plugins.find(item => item.type == type);
      }
      getToolByNodeName(nodeName) {
          return this.toolInstances.toolbar.plugins.find(item => { var _a; return (_a = item.nodeName) === null || _a === void 0 ? void 0 : _a.includes(nodeName); });
      }
      loadTools() {
          const { toolbar } = this.config.tools;
          const { plugins, layout } = toolbar;
          plugins.forEach((Plugin) => {
              const plugin = new Plugin();
              this.toolInstances.toolbar.plugins.push(plugin);
          });
          layout === null || layout === void 0 ? void 0 : layout.forEach((Plugin) => {
              const layout = new Plugin({ Editor: this.Editor });
              this.toolInstances.toolbar.layout.push(layout);
          });
      }
      removeBlock(blockId) {
          // 同步config blocks
          this.blocks.some((block, index, target) => {
              if (block.id === blockId) {
                  if (index !== 0) {
                      target.splice(index, 1);
                      return true;
                  }
                  else {
                      target.splice(index, 1, generateParagraphData());
                  }
              }
          });
      }
      move(blockId, type) {
          const { pre, target, next } = this.findBlockInstanceForId(blockId);
          if (type === "UP") {
              // 同步config blocks
              if (!pre || !pre.state)
                  return;
              this.config.data.blocks.splice(pre.index, 2, ...[
                  this.config.data.blocks[target.index],
                  this.config.data.blocks[pre.index],
              ]);
              // 同步block instances
              this.blockInstances.splice(pre.index, 2, ...[this.blockInstances[target.index], this.blockInstances[pre.index]]);
          }
          else if (type === "DOWN") {
              // 同步config blocks
              if (!next || !next.state)
                  return;
              this.config.data.blocks.splice(target.index, 2, ...[
                  this.config.data.blocks[next.index],
                  this.config.data.blocks[target.index],
              ]);
              // 同步block instances
              this.blockInstances.splice(target.index, 2, ...[this.blockInstances[next.index], this.blockInstances[target.index]]);
          }
          this.Editor.Renderer.reredner();
          this.Editor.UI.layout.visible = false;
      }
      moveUp(blockId) {
          this.move(blockId, "UP");
      }
      moveDown(blockId) {
          this.move(blockId, "DOWN");
      }
      /**
       * 让block处于全选状态
       * TODO：待优化 不应使用findBlockInstanceForId方法
      */
      checkAllStatus(status) {
          this.blockInstances.forEach((blockInstance) => {
              blockInstance.checkAll = status;
          });
      }
      clearSelectionBlockInfo() {
          this.currentSelectionBlockInfo = {
              id: "", // foucsId
              status: 0,
              content: "", // 文本内容HTML
              block: null, // 当前focus的实例block
              data: [], // 选择的内容
              type: "text", // 文本类型
              selectionContent: []
          };
      }
      setSelectionBlockInfo(selectionData) {
          const { id, // foucsId
          status, content, // 文本内容HTML
          block, // 当前focus的实例block
          data, // 选择的block内容
          type, // 文本类型
          selectionContent } = selectionData;
          this.currentSelectionBlockInfo = {
              id, // foucsId
              status,
              content, // 文本内容string
              block, // 当前focus的实例block
              data, // 选择的内容
              type, // 文本类型
              selectionContent, // 选中的文本数组
          };
      }
      setCurrentBlockInfo(key, object) {
          const { id, // foucsId
          status, content, // 文本内容string
          block, // 当前focus的实例block
          data, // 选择的内容
          type, // 文本类型
          selectionContent } = object;
          this[key] = {
              id, // foucsId
              status,
              content, // 文本内容string
              block, // 当前focus的实例block
              data, // 选择的内容
              type, // 文本类型
              selectionContent
          };
      }
  }

  class CommandList {
      set visible(v) {
          var _a;
          if (!!v) {
              (_a = this.UI["Editor"].BlockManager.currentHoverBlock) === null || _a === void 0 ? void 0 : _a.element.clientHeight;
              this.element.style.left = "60px";
              const commandElHeight = this.element.getBoundingClientRect()["height"];
              this.element.style.top =
                  (window.innerHeight - this.UI["Editor"].Event.viewPortY) < commandElHeight
                      ? `-${commandElHeight - (window.innerHeight - this.UI["Editor"].Event.viewPortY)}px`
                      : "30px";
              this.element.classList.remove(this.UI.CSS.commonHidden);
              this.element.classList.add(this.UI.CSS.commonShow);
          }
          else {
              this.element.classList.remove(this.UI.CSS.commonShow);
              this.element.classList.add(this.UI.CSS.commonHidden);
          }
          this._visible = v;
      }
      get visible() {
          return this._visible;
      }
      constructor(UI) {
          this._visible = false;
          this.x = 0;
          this.y = 0;
          this.element = null;
          this.UI = UI;
          this.element = UI.makePopover().appendChild(UI.makePopoverPluginItem().element).element;
      }
  }

  class LayoutList {
      set visible(v) {
          var _a;
          if (!!v) {
              console.log(this.element);
              (_a = this.UI['Editor'].BlockManager.currentHoverBlock) === null || _a === void 0 ? void 0 : _a.element.clientHeight;
              this.element.style.left = '60px';
              const commandElHeight = this.element.getBoundingClientRect()["height"];
              this.element.style.top =
                  window.innerHeight - this.UI["Editor"].Event.viewPortY < commandElHeight
                      ? `-${commandElHeight - (window.innerHeight - this.UI["Editor"].Event.viewPortY)}px`
                      : "30px";
              this.element.classList.add(this.UI.CSS.commonShow);
          }
          else {
              this.element.classList.remove(this.UI.CSS.commonShow);
          }
          this._visible = v;
      }
      get visible() { return this._visible; }
      constructor(UI) {
          this._visible = false;
          this.x = 0;
          this.y = 0;
          this.element = null;
          this.UI = UI;
          this.element = UI.makePopover().appendChild(UI.makePopoverLayoutItem().element).element;
      }
  }

  class Menu$1 {
      set visible(v) {
          // TODO: 这里可以抽
          try {
              if (!this.element)
                  return;
              const selection = window.getSelection();
              if (selection.type === 'None')
                  return;
              const rangeBound = selection.getRangeAt(0).getBoundingClientRect();
              const coord = getElementCoordinates(rangeBound);
              if (!!v) {
                  this.element.style.left = `${coord.left + coord.rect.width / 4}px`;
                  this.element.style.top = `${coord.top - this.ELEMENT_HEIGHT_TOP < this.ELEMENT_HEIGHT_TOP
                  ? coord.top + this.ELEMENT_HEIGHT_BUTTOM
                  : coord.top - this.ELEMENT_HEIGHT_TOP}px`;
                  this.element.classList.remove(this.UI.CSS.commonHidden);
                  this.element.classList.add(this.UI.CSS.commonShow);
              }
              else {
                  this.element.classList.remove(this.UI.CSS.commonShow);
                  this.element.classList.add(this.UI.CSS.commonHidden);
              }
              this._visible = v;
          }
          catch (error) {
              console.error(error);
          }
      }
      get visible() {
          return this._visible;
      }
      constructor(UI) {
          this._visible = false;
          this.element = null;
          this.ELEMENT_HEIGHT_TOP = 50;
          this.ELEMENT_HEIGHT_BUTTOM = 16;
          this.menuNodes = {};
          this.menuElMap = new WeakMap();
          this.UI = UI;
          const { menu } = this.UI["config"].tools;
          if (menu.length == 0)
              return;
          this.createMenuWarpper();
      }
      createMenuWarpper() {
          const container = Dom.make("div", [
              this.UI.CSS.superDocMenu,
              this.UI.CSS.commonHidden,
          ]);
          // ,{
          //   contenteditable:true
          // }
          const { menu } = this.UI["config"].tools;
          menu.forEach((Menu) => {
              const menuInstanceMap = this.UI["Editor"].Menu.menuInstanceMap;
              const menuInstance = menuInstanceMap.get(Menu);
              let itemContainer = Dom.make("div", [
                  this.UI.CSS.superDocMenuItemContainer,
              ]);
              this.menuElMap.set(Menu, itemContainer);
              itemContainer.appendChild(menuInstance.getIcon());
              container.appendChild(itemContainer);
          });
          this.UI.nodes.redactor.appendChild(container);
          this.element = container;
      }
  }

  class Ui extends Module {
      get CSS() {
          return {
              commonShow: "super-doc-common-show",
              commonHidden: "super-doc-common-hidden",
              wrapper: "super-doc-block",
              content: "ce-block__content",
              editorWrapper: "super-doc-editor",
              editorWrapperNarrow: "super-doc-editor--narrow",
              editorZone: "super-doc-editor__redactor",
              editorZoneHidden: "super-doc-editor__redactor--hidden",
              editorEmpty: "super-doc-editor--empty",
              editorRtlFix: "super-doc-editor--rtl",
              superDocToolbarWrapper: "super-doc-toolbar",
              superDocToolbarOpen: "super-doc-toolbar--open",
              superDocToolbarPlus: "super-doc-toolbar--plus",
              superDocToolbarPopover: "super-doc-toolbar--popover",
              superDocToolbarItem: "super-doc-toolbar--item",
              superDocMenu: "super-doc-menu",
              superDocMenuItemContainer: "super-doc-menu-item-container",
              boldMenu: "super-doc-menu--bold",
              italicMenu: "super-doc-menu--italic",
              highlightMenu: "super-doc-menu--highlightMenu",
              selectedStatus: "super-doc-block-selected"
          };
      }
      constructor({ config: EditorConfig }) {
          super({ config: EditorConfig });
          this.isCurrentBlockPos = false;
      }
      prepare() {
          return __awaiter(this, void 0, void 0, function* () {
              this.makeInitContainer();
              // this.makeToolbarContainer()
              // this.makeCommandList();
              // this.makeLayoutList();
              // this.makeMenuList();
              // this.makeLoadStyles();
          });
      }
      makeMounted() {
          // this.makeLoadStyles();
          this.makeCommandList();
          this.makeLayoutList();
          this.makeMenuList();
          this.makeToolbar();
      }
      makeCommandList() {
          this.command = new CommandList(this);
      }
      makeLayoutList() {
          this.layout = new LayoutList(this);
      }
      makeMenuList() {
          this.menu = new Menu$1(this);
      }
      makeInitContainer() {
          this.nodes.holder =
              typeof this.config.holder === "string"
                  ? Dom.querySelector(this.config.holder)
                  : this.config.holder;
          this.nodes.wrapper = Dom.make("div", [this.CSS.editorWrapper, ...[]]);
          this.nodes.redactor = Dom.make("div", this.CSS.editorZone, ...[]);
          // contenteditable: true
          this.nodes.redactor.style.paddingBottom = this.config.minHeight + "px";
          this.nodes.wrapper.appendChild(this.nodes.redactor);
          this.nodes.holder.appendChild(this.nodes.wrapper);
          this.nodes.pluginContainer = this.makePluginContainer();
          this.nodes.layoutContainer = this.makeLayoutContainer();
          this.nodes.pluginContainer.element.addEventListener("click", () => {
              this.layout.visible = false;
              this.command.visible = true;
              this.isCurrentBlockPos = false;
          });
          this.nodes.layoutContainer.element.addEventListener("click", () => {
              this.command.visible = false;
              this.layout.visible = true;
              this.isCurrentBlockPos = false;
          });
          // this.Editor.Event.addShowCommandListEvent(
          //   this.nodes.pluginContainer.element
          // );
          // this.Editor.Event.addShowLayoutToolListEvent(
          //   this.nodes.layoutContainer.element
          // );
          // this.nodes.pluginContainer.element.addEventListener()
      }
      /**
       * 渲染插件和布局工具栏
       */
      makeToolbar() {
          const toolbarWrapper = this.makeToolbarContainer()
              .appendChild(this.nodes.pluginContainer.appendChild(this.command.element).element)
              .appendChild(this.nodes.layoutContainer.appendChild(this.layout.element).element);
          this.nodes.toolbarWrapper = toolbarWrapper.element;
          this.nodes.wrapper.appendChild(this.nodes.toolbarWrapper);
      }
      // private makeLoadStyles(): void {
      //   let blob = new Blob([styles as any], { type: "text/css" });
      //   const cssLink = $.make("link", null, {
      //     rel: "stylesheet",
      //     type: "text/css",
      //     href: URL.createObjectURL(blob),
      //   });
      //   document.head.appendChild(cssLink);
      // }
      generateBlockContainerDiv() {
          const wrapperDiv = Dom.make("div", [this.CSS.wrapper], ...[]);
          const contentDiv = Dom.make("div", [this.CSS.content], ...[]);
          wrapperDiv.appendChild(contentDiv);
          return wrapperDiv;
      }
      makeToolbarContainer() {
          const div = Dom.make("div", [this.CSS.superDocToolbarWrapper], ...[]);
          const handler = {
              element: div,
              appendChild: (el) => {
                  div.appendChild(el);
                  return handler;
              },
          };
          return handler;
      }
      makePluginContainer() {
          const plus = Dom.make("div", [this.CSS.superDocToolbarPlus], ...[]);
          const svg = Dom.makeNS("http://www.w3.org/2000/svg", "svg", [], {
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              fill: "none",
              viewBox: "0 0 24 24",
          });
          const path = Dom.makeNS("http://www.w3.org/2000/svg", "path", [], {
              stroke: "currentColor",
              "stroke-linecap": "round",
              "stroke-width": "2",
              d: "M12 7V12M12 17V12M17 12H12M12 12H7",
          });
          svg.appendChild(path);
          plus.appendChild(svg);
          const handler = {
              element: plus,
              appendChild: (el) => {
                  plus.appendChild(el);
                  return handler;
              },
          };
          return handler;
      }
      makeLayoutContainer() {
          const plus = Dom.make("div", [this.CSS.superDocToolbarPlus], ...[]);
          const svg = Dom.makeNS("http://www.w3.org/2000/svg", "svg", [], {
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              fill: "none",
              viewBox: "0 0 24 24",
          });
          const pathD = [
              "M9.40999 7.29999H9.4",
              "M14.6 7.29999H14.59",
              "M9.30999 12H9.3",
              "M14.6 12H14.59",
              "M9.40999 16.7H9.4",
              "M14.6 16.7H14.59",
          ];
          for (let i = 0; i < pathD.length; i++) {
              const path = Dom.makeNS("http://www.w3.org/2000/svg", "path", [], {
                  stroke: "currentColor",
                  "stroke-linecap": "round",
                  "stroke-width": "2.6",
                  d: pathD[i],
              });
              svg.appendChild(path);
          }
          plus.appendChild(svg);
          const handler = {
              element: plus,
              appendChild: (el) => {
                  plus.appendChild(el);
                  return handler;
              },
          };
          return handler;
      }
      makePopover() {
          // TODO: 后续改成动态构建工具栏popover
          const popover = Dom.make("div", ...[this.CSS.superDocToolbarPopover], ...[]);
          const handler = {
              element: popover,
              appendChild: (el) => {
                  if (Array.isArray(el)) {
                      el.forEach((e) => popover.appendChild(e));
                  }
                  else {
                      popover.appendChild(el);
                  }
                  return handler;
              },
          };
          return handler;
      }
      makePopoverPluginItem() {
          const elements = [];
          this.Editor.BlockManager.toolInstances.toolbar.plugins.forEach((plugin) => {
              const popoverItem = Dom.make("div", ...[this.CSS.superDocToolbarItem], ...[]);
              popoverItem.textContent = plugin.text;
              popoverItem.addEventListener("click", () => {
                  if (plugin.type === 'custom') {
                      plugin.main(getModules());
                  }
                  else if (this.isCurrentBlockPos) { // 暂时实现 TODO:优化
                      let currentBlockId = this.Editor.BlockManager.currentHoverBlockId;
                      let currentBlockData = JSON.parse(JSON.stringify(plugin.blockData));
                      currentBlockData.id = currentBlockId;
                      this.Editor.BlockManager.replaceCurrentBlock([currentBlockData], currentBlockId);
                  }
                  else {
                      this.Editor.BlockManager.insertBlockForBlockId(JSON.parse(JSON.stringify(plugin.blockData)), this.Editor.BlockManager.currentHoverBlockId, this.Editor.BlockManager.cursor.cursorPosition);
                  }
                  setTimeout(() => {
                      this.command.visible = false;
                      this.layout.visible = false;
                      this.isCurrentBlockPos = false;
                  }, 0);
              });
              elements.push(popoverItem);
          });
          const handler = {
              element: elements,
          };
          return handler;
      }
      makePopoverLayoutItem() {
          const elements = [];
          this.Editor.BlockManager.toolInstances.toolbar.layout.forEach((layout) => {
              const popoverItem = Dom.make("div", ...[this.CSS.superDocToolbarItem], ...[]);
              popoverItem.textContent = layout.text;
              popoverItem.addEventListener("click", (event) => {
                  layout.action({ Editor: this.Editor });
                  event.stopPropagation();
              });
              elements.push(popoverItem);
          });
          const handler = {
              element: elements,
          };
          return handler;
      }
      // public toolbarFollowFocusBlock() {
      //   // TODO: 这里有bug 临时处理
      //   const focusBlockElement =
      //     this.Editor.BlockManager?.curentFocusBlock?.currentElement;
      //   if (!focusBlockElement) return;
      //   let {
      //     left: x,
      //     top: y,
      //     rect,
      //   } = getElementCoordinates(focusBlockElement.getBoundingClientRect());
      //   this.nodes.toolbarWrapper.style = !!this.nodes.toolbarWrapper.style
      //     ? this.nodes.toolbarWrapper.style
      //     : {};
      //   this.nodes.toolbarWrapper.style.left = x - 60 + "px";
      //   if (rect.height <= 45) {
      //     this.nodes.toolbarWrapper.style.top =
      //       rect.y + (rect.height - 24) / 2 + "px";
      //   } else {
      //     this.nodes.toolbarWrapper.style.top = rect.y + 3 + "px";
      //   }
      // }
      // 
      toolbarFollowFocusBlock() {
          var _a, _b;
          // TODO: 这里有bug 临时处理
          const focusBlockElement = (_b = (_a = this.Editor.BlockManager) === null || _a === void 0 ? void 0 : _a.curentFocusBlock) === null || _b === void 0 ? void 0 : _b.currentElement;
          if (!focusBlockElement)
              return;
          let holder;
          if (isString(this.config.holder)) {
              holder = Dom.querySelector(this.config.holder);
          }
          else if (isDOM(this.config.holder)) {
              holder = this.config.holder;
          }
          let rect = focusBlockElement.getBoundingClientRect();
          let hodlerRect = holder.getBoundingClientRect();
          this.nodes.toolbarWrapper.style = !!this.nodes.toolbarWrapper.style
              ? this.nodes.toolbarWrapper.style
              : {};
          this.nodes.toolbarWrapper.style.left = rect.left - hodlerRect.left - 60 + "px";
          this.nodes.toolbarWrapper.style.top = rect.top - hodlerRect.top + 3 + "px";
      }
  }

  //

  var script$a = {
    props: ["content", "contenteditable", "params"],
    data() {
      return {};
    },
    watch:{
      content(newVal,oldVal){
        this.init();
      }
    },
    methods: {
      init() {
        const _temp = document.createElement('p');
        _temp.innerHTML = this.content;
        this.syncDom(_temp);

        // bindMenu(this.$refs['super-paragraph']);
      },
      /**
       * 各种类型的快捷转换
       * 目前统一在段落实现
       * 后续换成各个模块负责
      */
      quickTransform(event) {
        const content = event.target.innerText;
        if (content === "/") {
          showCommand(true);
        }
      },
      contentChange(event) {
        if (!event.target.childNodes) return;
        this.quickTransform(event);
        this.$emit('contentChange', {content: markdownSyntaxTransform(event.target.innerHTML), params: this.params});
      },
      syncDom(newDom) {
        syncDom(this.$refs['super-paragraph'], newDom);
      },
      focus() {
        this.$refs['super-paragraph'].focus();
      }
    },
    mounted() {
        this.init();
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      let hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  const isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return (id, style) => addStyle(id, style);
  }
  let HEAD;
  const styles = {};
  function addStyle(id, css) {
      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          let code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  style.element.setAttribute('media', css.media);
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              const index = style.ids.size - 1;
              const textNode = document.createTextNode(code);
              const nodes = style.element.childNodes;
              if (nodes[index])
                  style.element.removeChild(nodes[index]);
              if (nodes.length)
                  style.element.insertBefore(textNode, nodes[index]);
              else
                  style.element.appendChild(textNode);
          }
      }
  }

  /* script */
  const __vue_script__$a = script$a;

  /* template */
  var __vue_render__$b = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "p",
      _vm._g(
        {
          ref: "super-paragraph",
          staticClass: "super-block",
          staticStyle: { margin: "0" },
          attrs: {
            id: "superdoc-paragraph",
            contenteditable: _vm.contenteditable,
            placeholder: '"/"插入内容',
          },
          on: {
            input: function ($event) {
              $event.stopPropagation();
              if ($event.target !== $event.currentTarget) {
                return null
              }
              return _vm.contentChange.apply(null, arguments)
            },
            focus: function ($event) {
              $event.stopPropagation();
              if ($event.target !== $event.currentTarget) {
                return null
              }
              return _vm.$emit("focusChange", true)
            },
            blur: function ($event) {
              $event.stopPropagation();
              if ($event.target !== $event.currentTarget) {
                return null
              }
              return _vm.$emit("focusChange", false)
            },
          },
        },
        _vm.$listeners
      )
    )
  };
  var __vue_staticRenderFns__$a = [];
  __vue_render__$b._withStripped = true;

    /* style */
    const __vue_inject_styles__$a = function (inject) {
      if (!inject) return
      inject("data-v-470d4fb2_0", { source: ".super-block[data-v-470d4fb2]:focus:empty::before {\n  content: attr(placeholder);\n  display: block;\n  color: #c4c4c4;\n  font-weight: 400;\n}\n#superdoc-paragraph[data-v-470d4fb2] {\n  min-height: 22px;\n}\n", map: {"version":3,"sources":["input.vue"],"names":[],"mappings":"AAAA;EACE,0BAA0B;EAC1B,cAAc;EACd,cAAc;EACd,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB","file":"input.vue","sourcesContent":[".super-block:focus:empty::before {\n  content: attr(placeholder);\n  display: block;\n  color: #c4c4c4;\n  font-weight: 400;\n}\n#superdoc-paragraph {\n  min-height: 22px;\n}\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$a = "data-v-470d4fb2";
    /* module identifier */
    const __vue_module_identifier__$a = undefined;
    /* functional template */
    const __vue_is_functional_template__$a = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$a = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$a },
      __vue_inject_styles__$a,
      __vue_script__$a,
      __vue_scope_id__$a,
      __vue_is_functional_template__$a,
      __vue_module_identifier__$a,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  var script$9 = {
    props: ["$superConfig"],
    data() {
      return {
        blockData: getBlockData(this.$attrs["block-id"]),
        content: getBlockData(this.$attrs["block-id"]).data,
        blockId: this.$attrs["block-id"],
        showTranslate: false,
      };
    },
    components: {
      SuperDocInput: __vue_component__$a,
    },
    methods: {
      contentChange({ content, id }) {
        this.content.text = content;
      },
      keydownHandler(event) {
        if (event.keyCode === 91 && !!this.content.translate) {
          this.showTranslate = true;
          this.$nextTick(() => {
            this.$refs["translate"].focus();
          });
        }
      },
      keyupHandler(event) {
        if (event.keyCode === 91 && !!this.content.translate) {
          this.showTranslate = false;
          this.$nextTick(() => {
            this.$refs["superDocInput"].focus();
          });
        }
      },
      restoreHandler() {
        this.content.text = this.content.translate;
        this.content.translate = '';
      },
      closeHandler() {
        this.content.translate = '';
      }
    },
    mounted() {
    },
    watch: {
      "content.text"(n) {
        const _temp = document.createElement("div");
        _temp.innerHTML = n;
        this.$refs["superDocInput"].syncDom(_temp);
      },
      "content.translate"(n) {
      },
    },
  };

  /* script */
  const __vue_script__$9 = script$9;

  /* template */
  var __vue_render__$a = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "paragraph-container" },
      [
        _c("SuperDocInput", {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: !_vm.showTranslate,
              expression: "!showTranslate",
            },
          ],
          ref: "superDocInput",
          staticClass: "super-input",
          staticStyle: {
            margin: "0px 0px 8px 0px",
            padding: "0 0",
            "line-height": "1.7",
          },
          attrs: { contenteditable: "true", content: _vm.content.text },
          on: { contentChange: _vm.contentChange },
        }),
        _vm._v(" "),
        _vm.content.translate
          ? _c(
              "div",
              { ref: "translate", staticClass: "translate" },
              [
                _c("span", [_vm._v("原：")]),
                _vm._v(
                  _vm._s(_vm.content ? _vm.content.translate : "") + "\n    "
                ),
                _c("el-divider"),
                _vm._v(" "),
                _c(
                  "div",
                  { staticStyle: { "text-align": "right" } },
                  [
                    _c(
                      "el-button",
                      {
                        attrs: { type: "primary", size: "mini" },
                        on: { click: _vm.restoreHandler },
                      },
                      [_vm._v("还原")]
                    ),
                    _vm._v(" "),
                    _c(
                      "el-button",
                      {
                        attrs: { size: "mini" },
                        on: { click: _vm.closeHandler },
                      },
                      [_vm._v("关闭")]
                    ),
                  ],
                  1
                ),
              ],
              1
            )
          : _vm._e(),
      ],
      1
    )
  };
  var __vue_staticRenderFns__$9 = [];
  __vue_render__$a._withStripped = true;

    /* style */
    const __vue_inject_styles__$9 = function (inject) {
      if (!inject) return
      inject("data-v-05dd620d_0", { source: ".super-block[data-v-05dd620d]:focus:empty::before {\n  content: attr(placeholder);\n  display: block;\n  color: #c4c4c4;\n  font-weight: 400;\n}\n.super-input[data-v-05dd620d] {\n  color: #25272a;\n  font-size: 11pt;\n  font-family: \"zh quote\", \"Helvetica Neue\", -apple-system, \"PingFang SC\", \"Microsoft YaHei\", STHeiti, Helvetica, Arial, sans-serif, \"Apple Color Emoji\";\n}\n#superdoc-paragraph[data-v-05dd620d] {\n  min-height: 22px;\n}\n", map: {"version":3,"sources":["paragraph.vue"],"names":[],"mappings":"AAAA;EACE,0BAA0B;EAC1B,cAAc;EACd,cAAc;EACd,gBAAgB;AAClB;AACA;EACE,cAAc;EACd,eAAe;EACf,sJAAsJ;AACxJ;AACA;EACE,gBAAgB;AAClB","file":"paragraph.vue","sourcesContent":[".super-block:focus:empty::before {\n  content: attr(placeholder);\n  display: block;\n  color: #c4c4c4;\n  font-weight: 400;\n}\n.super-input {\n  color: #25272a;\n  font-size: 11pt;\n  font-family: \"zh quote\", \"Helvetica Neue\", -apple-system, \"PingFang SC\", \"Microsoft YaHei\", STHeiti, Helvetica, Arial, sans-serif, \"Apple Color Emoji\";\n}\n#superdoc-paragraph {\n  min-height: 22px;\n}\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$9 = "data-v-05dd620d";
    /* module identifier */
    const __vue_module_identifier__$9 = undefined;
    /* functional template */
    const __vue_is_functional_template__$9 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$9 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$9 },
      __vue_inject_styles__$9,
      __vue_script__$9,
      __vue_scope_id__$9,
      __vue_is_functional_template__$9,
      __vue_module_identifier__$9,
      false,
      createInjector,
      undefined,
      undefined
    );

  class Paragraph extends BlockBase {
    config = null;
    platform = "vue";
    name = "Paragraph"
    constructor(options) {
      super(options);
      if (!options) return;
      const { config, ...other } = options;
      this.config = config;
      
      this.editor = false;
    }

    render() {
      return __vue_component__$9;
    }

    compileData(blockInstance,text){
      return compileParagraph(text)
    }

    copyEventCallBack(context,event, blockInstance){
      console.log(`【superDoc】: 执行复制_paragraph`);
      // let manager = context.Event["Editor"].BlockManager
      // let text = copyDom.querySelector("#superdoc-paragraph").innerHTML
      // let paragraphObject = generateParagraphData()
      // paragraphObject.data.text = text;
      // manager.currentCopyBlockInfo.data.push(paragraphObject)
    }

    pasteEventCallBack(context,event){
      console.log(`【superDoc】: 执行粘贴_paragraph`);
      let manager = context.Event["Editor"].BlockManager;
      let focusBlock =  manager.curentFocusBlock;
      let { block, type, status, data, selectionContent} = manager.currentCopyBlockInfo;
      let deepCloneBlock = deepCloneRefreshId(data, [
        "id",
      ]);
      // TODO:待优化
      var clipboardData = event.clipboardData || window["clipboardData"]; // 获取剪贴板数据对象
      let clipboardText = clipboardData.getData("text/plain");
      let textList = clipboardText.split('\r\n').filter(i =>!!i);
      // 这里是为了校验是否是从外部复制粘贴过来的内容
      if(textList.every((t,index)=> t == selectionContent[index])){
        if(type == "text"){
          if(!focusBlock.data.text){
            // var text =
            // manager.currentCopyBlockInfo.content ||
            // clipboardData.getData("text/plain"); // 获取纯文本格式的复制内容
            // deepCloneBlock[0].data.text = text;
            manager.replaceCurrentBlock(deepCloneBlock, focusBlock.id);
            event.preventDefault();
            return
          }
          // console.log("【superDoc】:执行默认粘贴事件");
        }else {
          // 粘贴的是块级节点 , 直接添加到当前节点尾部
          const currentBlockIndex = manager.blocks.findIndex(block => block.id === focusBlock.id);
          manager.blocks.splice(currentBlockIndex + 1, 0, ...deepCloneBlock);
          event.preventDefault();
        }
      }else {
        let clipboardHTML = clipboardData.getData("text/html") || `${clipboardText.split('\n').map(m=> `<p>${m}</p>`).join('')}`;
        let blockData = complieHTMLToBlockData.call(context.Event["Editor"],clipboardHTML);
        console.log("clipboardHTML",blockData);
        const currentBlockIndex = manager.blocks.findIndex(block => block.id === focusBlock.id);
        manager.blocks.splice(currentBlockIndex + 1, 0, ...blockData);
        event.preventDefault();
      }
     
    }

    cutEventCallBack(context,event,cutData, blockInstance){
      console.log(`【superDoc】: 执行剪切_paragraph`);
      let manager = context.Event.Editor.BlockManager;
      let text = blockInstance.element.querySelector("[block-id]").firstChild?.innerHTML || "";
      if(!text){
        manager.removeBlock(cutData.id);
       }else {
        blockInstance.data.text = text;
       }
    }

    selectionCallBack(context,event,selectionDom, blockInstance){
      console.log(`【superDoc】: 执行选中回调_paragraph`);
      let manager = context.Editor.BlockManager;
      let text = selectionDom.querySelector("#superdoc-paragraph").innerHTML;
      let paragraphObject = generateParagraphData();
      paragraphObject.data.text = text;
      paragraphObject.id = blockInstance.id;
      manager.currentSelectionBlockInfo.data.push(paragraphObject);
      // 记录选择的文本
      manager.currentSelectionBlockInfo.selectionContent.push(text);
    }
  }

  //

  var script$8 = {
    data() {
      return {
        mouseX: 0,
        mouseY: 0,
        aiInput: {
          default: {
            session_id: "20231026",
            content:
              "",
            prompt:
              "你现在扮演一个文档内容生成AI，根据用户需求直接返回用户所需的内容，不需要额外的描述信息。用户需求：${{user_input}}",
          },
          expand: {
            session_id: "20231026111",
            content:
              "",
            prompt: (content) =>
              `你现在扮演一个文本提示词扩写领域的专家，从专业的角度，您认为用户输入的内容是否有需要扩写的地方？把扩写后的内容插入到用户的文本中，最后只需要把全文返回给用户，不需要额外的描述。\n\n用户全文内容是${content}：\n\n 需要扩写的内容是：\${{user_input}}`,
          },
          perfect: {
            session_id: "20231026222",
            content: "",
            prompt: (content) =>
              `你现在扮演一个文本提示词完善领域的专家，从专业的角度，您认为用户输入的内容是否有需要修改的地方？把修改后的内容插入到用户的文本中，最后只需要把全文返回给用户，不需要额外的描述。\n\n用户全文内容是${content}：\n\n 需要完善的内容是：\${{user_input}}`,
          },
        },
        aiOutput: "",
        loading: false,
        showTools: false,
        selectText: null,
        session_id: "20231026",
      };
    },
    props: ["$superConfig"],
    computed: {
      toolsStyle() {
        return `position: fixed;display: ${
      this.showTools ? "unset" : "none"
    };top: ${this.mouseY}px;left: ${this.mouseX}px`;
      },
      aiOutputHtml() {
        return this.aiOutput
          .split("\n")
          .filter((content) => !!content)
          .map(
            (content) =>
              `<div style="margin: 14px auto;" class="__ai_output__">${content}</div>`
          )
          .join("");
      },
      content: {
        get() {
          return this.$superConfig.blockData.text;
        },
        set(val) {
          this.$refs["aiInput"].textContent = val;
        },
      },
    },
    methods: {
      handlerAbandon() {
        this.aiOutput = "";
        this.$refs.aiInput.focus();
        
      },
      handlerRegenerate() {
        this.requestAiApi();
      },
      handlerUseAiContent() {
        const blocks = compileParagraph(
          this.aiOutput
            .split("\n")
            .filter((content) => !!content)
            .join("\n")
        );
        // console.log(blocks);
        this.$replaceCurrentBlock(blocks, this.$superConfig.blockId);
        // 销毁ai事件内容
         this.$options.beforeDestroy.forEach(hook => {
          hook.call(this);
        });
      },
      generateAiContent(event) {
        if (event.keyCode === 13) {
          this.requestAiApi(); 
        }
        event.stopPropagation();
      },
      async requestAiApi() {
        this.loading = true;
        this.aiOutput = "";
        const result = await Ue({
          method: "POST",
          // url: "/ai/api/v1/ecology/exec_instruction",
          url: "/docs/api/v1/ecology/exec_instruction",
          data: {
            user_input: this.aiInput.default.content,
            session_id: this.aiInput.default.session_id,
            instruction: {
              id: "",
              name: "",
              desc: "",
              prompt: this.aiInput.default.prompt,
              result_type: "string",
            },
          },
        }).then((res) => {
          try {
            if (res.status === 200) {
              return res?.data?.results?.instruction_result.raw_result;
            }  
          } catch (error) {
            alert('AI服务暂时无法使用');
          }
        });
        this.aiOutput = result;
        this.loading = false;
      },
      async requestExpandAiApi() {
        this.loading = true;
        this.aiOutput = "";
        const result = await Ue({
          method: "POST",
          // url: "http://10.8.6.30:9994/ai_service/exec_instruction/",
          url: "/docs/api/v1/ecology/exec_instruction",
          data: {
            session_id: this.aiInput.expand.session_id,
            user_input: this.selectText,
            instruction: {
              id: "",
              name: "",
              desc: "",
              prompt: this.aiInput.expand.prompt(this.aiOutput),
              result_type: "string",
            },
          },
        }).then((res) => {
          if (res.status === 200) {
            return res?.data?.results?.instruction_result.raw_result;
          }
        });
        this.aiOutput = result;
        this.loading = false;
      },
      async requestPerfectAiApi() {
        this.loading = true;
        const result = await Ue({
          method: "POST",
          // url: "http://10.8.6.30:9994",
          url: "/docs/api/v1/ecology/exec_instruction",
          data: {
            session_id: this.aiInput.perfect.session_id,
            user_input: this.selectText,
            instruction: {
              id: "",
              name: "",
              desc: "",
              prompt: this.aiInput.perfect.prompt(this.aiOutput),
              result_type: "string",
            },
          },
        }).then((res) => {
          if (res.status === 200) {
            return res?.data?.results?.instruction_result.raw_result;
          }
        });
        this.aiOutput = result;
        this.loading = false;
      },
      contentChange(content) {
        this.$superDocUpdateBlockData(this.$superConfig.blockId, {
          text: content,
        });
      },
      aiMouseUp(event){
          this.mouseX = event.clientX + window.pageXOffset;
        this.mouseY = event.clientY + window.pageYOffset;
        setTimeout(() => {
          this.showTools = !!this.selectText;
        }, 100);
      },
      aiSelectChange(event){
          if (
          document.getSelection().anchorNode?.parentNode.className !==
          "__ai_output__"
        ) ; else {
          if (!document.getSelection().toString()) {
            setTimeout(() => {
              this.selectText = document.getSelection().toString();
              console.log(this.selectText);
            }, 50);
          } else {
            this.selectText = document.getSelection().toString();
            console.log(this.selectText);
          }
        }
      }
    },
    mounted() {
      // 要做释放
      document.addEventListener("mouseup", this.aiMouseUp);
      document.addEventListener("selectionchange", this.aiSelectChange);
      // TODO: 这里要改
      addListener("update", (block) => {
        if(block && this.$superConfig.blockId === block.id) {
          this.content = block.data.text;
        }
      });
    },
    beforeDestroy(){
      document.removeEventListener("mouseup", this.aiMouseUp);
      document.removeEventListener("selectionchange", this.aiSelectChange);
    }
  };

  /* script */
  const __vue_script__$8 = script$8;

  /* template */
  var __vue_render__$9 = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "ai-border" }, [
      _c(
        "div",
        { staticClass: "ai-input" },
        [
          _c("el-input", {
            ref: "aiInput",
            staticStyle: { border: "none" },
            attrs: {
              type: "textarea",
              "prefix-icon": _vm.loading
                ? "el-icon-loading"
                : "el-icon-magic-stick",
              clearable: "",
              placeholder: "请选择或输入指令，如：“帮我写一篇短文小说”",
              disabled: _vm.loading,
            },
            on: { change: _vm.contentChange },
            nativeOn: {
              keydown: function ($event) {
                return _vm.generateAiContent($event)
              },
            },
            model: {
              value: _vm.aiInput.default.content,
              callback: function ($$v) {
                _vm.$set(_vm.aiInput.default, "content", $$v);
              },
              expression: "aiInput.default.content",
            },
          }),
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "ai-content-container" }, [
        _vm.aiOutput
          ? _c("div", {
              staticClass: "ai-content",
              attrs: { disabled: _vm.loading },
              domProps: { innerHTML: _vm._s(_vm.aiOutputHtml) },
            })
          : _vm._e(),
      ]),
      _vm._v(" "),
      _vm.aiOutput
        ? _c("div", { staticClass: "handler" }, [
            _c(
              "div",
              [
                _c(
                  "el-button",
                  {
                    attrs: { size: "mini", icon: "el-icon-delete", type: "text" },
                    on: { click: _vm.handlerAbandon },
                  },
                  [_vm._v("放弃")]
                ),
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              [
                _c(
                  "el-button",
                  {
                    attrs: {
                      size: "mini",
                      icon: "el-icon-refresh-left",
                      type: "text",
                    },
                    on: { click: _vm.handlerRegenerate },
                  },
                  [_vm._v("重新生成")]
                ),
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              [
                _c(
                  "el-button",
                  {
                    attrs: {
                      size: "mini",
                      icon: "el-icon-check",
                      type: "primary",
                    },
                    on: { click: _vm.handlerUseAiContent },
                  },
                  [_vm._v("使用")]
                ),
              ],
              1
            ),
          ])
        : _vm._e(),
      _vm._v(" "),
      _c("div", { staticClass: "tools", style: _vm.toolsStyle }, [
        _c("div", [
          _c(
            "span",
            {
              staticStyle: {
                "font-size": "12px",
                color: "red",
                "font-weight": "600",
                "user-select": "none",
              },
            },
            [_vm._v("AI")]
          ),
          _vm._v(" "),
          _c(
            "span",
            {
              staticStyle: { cursor: "pointer" },
              on: { click: _vm.requestExpandAiApi },
            },
            [_vm._v("扩写")]
          ),
          _vm._v(" "),
          _c(
            "span",
            {
              staticStyle: { cursor: "pointer" },
              on: { click: _vm.requestPerfectAiApi },
            },
            [_vm._v("完善")]
          ),
        ]),
      ]),
    ])
  };
  var __vue_staticRenderFns__$8 = [];
  __vue_render__$9._withStripped = true;

    /* style */
    const __vue_inject_styles__$8 = function (inject) {
      if (!inject) return
      inject("data-v-19c0d90a_0", { source: ".ai-border[data-v-19c0d90a] {\n  flex-wrap: wrap;\n  border-radius: 6px;\n  margin: 5px auto;\n  padding: 3px 0px;\n  border: 2px solid transparent;\n  background-clip: padding-box, border-box;\n  background-origin: padding-box, border-box;\n  background-image: linear-gradient(to right, #ffffff, #ffffff), radial-gradient(circle at 0px 5%, rgba(255, 116, 236, 0.7), rgba(133, 112, 255, 0.7) 20%, rgba(133, 112, 255, 0.7) 30%, rgba(90, 239, 255, 0.7) 60%, rgba(90, 239, 255, 0.7) 80%, #2e96ff 100%);\n  align-items: center;\n}\n.ai-border .ai-input[data-v-19c0d90a] textarea {\n  border: none;\n}\n.ai-border .el-input[data-v-19c0d90a] input {\n  border: none;\n  color: #000;\n}\n.ai-border .el-input[data-v-19c0d90a] .el-input-group__append {\n  border: none;\n  background: transparent;\n}\n.ai-border .ai-content-container .ai-content[data-v-19c0d90a] {\n  border-top: 1px solid #dddede;\n  padding: 5px;\n  font-size: 14px;\n  line-height: 1.7;\n}\n.ai-border .handler[data-v-19c0d90a] {\n  display: flex;\n  justify-content: right;\n}\n.ai-border .handler > div[data-v-19c0d90a] {\n  margin-right: 10px;\n}\n.ai-border .tools > div[data-v-19c0d90a] {\n  display: flex;\n  font-size: 13px;\n  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6), 0 2px 4px 0 rgba(232, 237, 250, 0.5);\n  background: #ffffff;\n}\n.ai-border .tools > div > span[data-v-19c0d90a] {\n  transition: color 0.2s;\n  margin: 3px 6px;\n}\n.ai-border .tools > div > span[data-v-19c0d90a]:hover {\n  color: #ccc;\n}\n", map: {"version":3,"sources":["ai.vue"],"names":[],"mappings":"AAAA;EACE,eAAe;EACf,kBAAkB;EAClB,gBAAgB;EAChB,gBAAgB;EAChB,6BAA6B;EAC7B,wCAAwC;EACxC,0CAA0C;EAC1C,8PAA8P;EAC9P,mBAAmB;AACrB;AACA;EACE,YAAY;AACd;AACA;EACE,YAAY;EACZ,WAAW;AACb;AACA;EACE,YAAY;EACZ,uBAAuB;AACzB;AACA;EACE,6BAA6B;EAC7B,YAAY;EACZ,eAAe;EACf,gBAAgB;AAClB;AACA;EACE,aAAa;EACb,sBAAsB;AACxB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,aAAa;EACb,eAAe;EACf,oFAAoF;EACpF,mBAAmB;AACrB;AACA;EACE,sBAAsB;EACtB,eAAe;AACjB;AACA;EACE,WAAW;AACb","file":"ai.vue","sourcesContent":[".ai-border {\n  flex-wrap: wrap;\n  border-radius: 6px;\n  margin: 5px auto;\n  padding: 3px 0px;\n  border: 2px solid transparent;\n  background-clip: padding-box, border-box;\n  background-origin: padding-box, border-box;\n  background-image: linear-gradient(to right, #ffffff, #ffffff), radial-gradient(circle at 0px 5%, rgba(255, 116, 236, 0.7), rgba(133, 112, 255, 0.7) 20%, rgba(133, 112, 255, 0.7) 30%, rgba(90, 239, 255, 0.7) 60%, rgba(90, 239, 255, 0.7) 80%, #2e96ff 100%);\n  align-items: center;\n}\n.ai-border .ai-input /deep/ textarea {\n  border: none;\n}\n.ai-border .el-input /deep/ input {\n  border: none;\n  color: #000;\n}\n.ai-border .el-input /deep/ .el-input-group__append {\n  border: none;\n  background: transparent;\n}\n.ai-border .ai-content-container .ai-content {\n  border-top: 1px solid #dddede;\n  padding: 5px;\n  font-size: 14px;\n  line-height: 1.7;\n}\n.ai-border .handler {\n  display: flex;\n  justify-content: right;\n}\n.ai-border .handler > div {\n  margin-right: 10px;\n}\n.ai-border .tools > div {\n  display: flex;\n  font-size: 13px;\n  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6), 0 2px 4px 0 rgba(232, 237, 250, 0.5);\n  background: #ffffff;\n}\n.ai-border .tools > div > span {\n  transition: color 0.2s;\n  margin: 3px 6px;\n}\n.ai-border .tools > div > span:hover {\n  color: #ccc;\n}\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$8 = "data-v-19c0d90a";
    /* module identifier */
    const __vue_module_identifier__$8 = undefined;
    /* functional template */
    const __vue_is_functional_template__$8 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$8 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$8 },
      __vue_inject_styles__$8,
      __vue_script__$8,
      __vue_scope_id__$8,
      __vue_is_functional_template__$8,
      __vue_module_identifier__$8,
      false,
      createInjector,
      undefined,
      undefined
    );

  class AI extends BlockBase {
      config = null;
      platform = "vue";
      constructor(options) {
        super(options);
        if (!options) return;
        const { config, ...other } = options;
        this.config = config;
        
        this.editor = false;
      }
    
      render() {
        return __vue_component__$8;
      }
  }

  //
  var script$7 = {
    props: ["$superConfig"],
    data() {
      return {
        blockData: getBlockData(this.$attrs["block-id"]),
        content: getBlockData(this.$attrs["block-id"]).data,
        blockId: this.$attrs["block-id"],
        showTranslate: false,
      };
    },
    components: {
      SuperDocInput: __vue_component__$a,
      Paragraph: __vue_component__$9
    },
    methods: {
      contentChange({ content, id }) {
        this.content.text = content;
      },
      keydownHandler(event) {
        if (event.keyCode === 91 && !!this.content.translate) {
          this.showTranslate = true;
          this.$nextTick(() => {
            this.$refs["translate"].focus();
          });
        }
      },
      keyupHandler(event) {
        if (event.keyCode === 91 && !!this.content.translate) {
          this.showTranslate = false;
          this.$nextTick(() => {
            this.$refs["superDocInput"].focus();
          });
        }
      },
      restoreHandler() {
        const _temp = this.content.translate;
        this.content.translate = '';
        this.content.text = _temp;
      },
      closeHandler() {
        this.content.translate = '';
      }
    },
    mounted() {
    },
    watch: {
      "content.text"(n) {
        const _temp = document.createElement("div");
        _temp.innerHTML = n;
        this.$refs["superDocInput"].syncDom(_temp);
      },
      "content.translate"(n) {
      },
    },
  };

  /* script */
  const __vue_script__$7 = script$7;

  /* template */
  var __vue_render__$8 = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "paragraph-container" }, [
      _vm.content.level === "h1"
        ? _c(
            "h1",
            [
              _c("SuperDocInput", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: !_vm.showTranslate,
                    expression: "!showTranslate",
                  },
                ],
                ref: "superDocInput",
                staticClass: "super-input",
                staticStyle: {
                  "font-size": "32px",
                  "margin-top": "26px",
                  "margin-bottom": "12px",
                  padding: "0",
                  margin: "0",
                  "font-weight": "bold",
                  "line-height": "1.45",
                },
                attrs: { contenteditable: "true", content: _vm.content.text },
                on: { contentChange: _vm.contentChange },
              }),
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.content.level === "h2"
        ? _c(
            "h2",
            [
              _c("SuperDocInput", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: !_vm.showTranslate,
                    expression: "!showTranslate",
                  },
                ],
                ref: "superDocInput",
                staticClass: "super-input",
                staticStyle: {
                  "font-size": "25px",
                  "margin-top": "21px",
                  "margin-bottom": "12px",
                  padding: "0",
                  margin: "0",
                  "font-weight": "bold",
                  "line-height": "1.45",
                },
                attrs: { contenteditable: "true", content: _vm.content.text },
                on: { contentChange: _vm.contentChange },
              }),
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.content.level === "h3"
        ? _c(
            "h3",
            [
              _c("SuperDocInput", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: !_vm.showTranslate,
                    expression: "!showTranslate",
                  },
                ],
                ref: "superDocInput",
                staticClass: "super-input",
                staticStyle: {
                  "font-size": "18px",
                  "margin-top": "18px",
                  "margin-bottom": "12px",
                  padding: "0",
                  margin: "0",
                  "font-weight": "bold",
                  "line-height": "1.45",
                },
                attrs: { contenteditable: "true", content: _vm.content.text },
                on: { contentChange: _vm.contentChange },
              }),
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.content.level === "h4"
        ? _c(
            "h4",
            [
              _c("SuperDocInput", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: !_vm.showTranslate,
                    expression: "!showTranslate",
                  },
                ],
                ref: "superDocInput",
                staticClass: "super-input",
                staticStyle: {
                  "font-size": "16px",
                  "margin-top": "16px",
                  "margin-bottom": "12px",
                  padding: "0",
                  margin: "0",
                  "font-weight": "bold",
                  "line-height": "1.45",
                },
                attrs: { contenteditable: "true", content: _vm.content.text },
                on: { contentChange: _vm.contentChange },
              }),
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.content.level === "h5"
        ? _c(
            "h5",
            [
              _c("SuperDocInput", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: !_vm.showTranslate,
                    expression: "!showTranslate",
                  },
                ],
                ref: "superDocInput",
                staticClass: "super-input",
                attrs: { contenteditable: "true", content: _vm.content.text },
                on: { contentChange: _vm.contentChange },
              }),
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.content.translate
        ? _c(
            "div",
            { ref: "translate", staticClass: "translate" },
            [
              _c("span", [_vm._v("原：")]),
              _vm._v(_vm._s(_vm.content ? _vm.content.translate : "") + "\n    "),
              _c("el-divider"),
              _vm._v(" "),
              _c(
                "div",
                { staticStyle: { "text-align": "right" } },
                [
                  _c(
                    "el-button",
                    {
                      attrs: { type: "primary", size: "mini" },
                      on: { click: _vm.restoreHandler },
                    },
                    [_vm._v("还原")]
                  ),
                  _vm._v(" "),
                  _c(
                    "el-button",
                    { attrs: { size: "mini" }, on: { click: _vm.closeHandler } },
                    [_vm._v("关闭")]
                  ),
                ],
                1
              ),
            ],
            1
          )
        : _vm._e(),
    ])
  };
  var __vue_staticRenderFns__$7 = [];
  __vue_render__$8._withStripped = true;

    /* style */
    const __vue_inject_styles__$7 = function (inject) {
      if (!inject) return
      inject("data-v-2a13b30b_0", { source: ".super-block[data-v-2a13b30b]:focus:empty::before {\n  content: attr(placeholder);\n  display: block;\n  color: #c4c4c4;\n  font-weight: 400;\n}\n.super-input[data-v-2a13b30b] {\n  color: #25272a;\n  font-size: 11pt;\n  font-family: \"zh quote\", \"Helvetica Neue\", -apple-system, \"PingFang SC\", \"Microsoft YaHei\", STHeiti, Helvetica, Arial, sans-serif, \"Apple Color Emoji\";\n}\n#superdoc-paragraph[data-v-2a13b30b] {\n  min-height: 22px;\n}\n", map: {"version":3,"sources":["head.vue"],"names":[],"mappings":"AAAA;EACE,0BAA0B;EAC1B,cAAc;EACd,cAAc;EACd,gBAAgB;AAClB;AACA;EACE,cAAc;EACd,eAAe;EACf,sJAAsJ;AACxJ;AACA;EACE,gBAAgB;AAClB","file":"head.vue","sourcesContent":[".super-block:focus:empty::before {\n  content: attr(placeholder);\n  display: block;\n  color: #c4c4c4;\n  font-weight: 400;\n}\n.super-input {\n  color: #25272a;\n  font-size: 11pt;\n  font-family: \"zh quote\", \"Helvetica Neue\", -apple-system, \"PingFang SC\", \"Microsoft YaHei\", STHeiti, Helvetica, Arial, sans-serif, \"Apple Color Emoji\";\n}\n#superdoc-paragraph {\n  min-height: 22px;\n}\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$7 = "data-v-2a13b30b";
    /* module identifier */
    const __vue_module_identifier__$7 = undefined;
    /* functional template */
    const __vue_is_functional_template__$7 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$7 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$7 },
      __vue_inject_styles__$7,
      __vue_script__$7,
      __vue_scope_id__$7,
      __vue_is_functional_template__$7,
      __vue_module_identifier__$7,
      false,
      createInjector,
      undefined,
      undefined
    );

  // import { Plugin, addListener, showCommand, syncDom } from "@super-doc/api";

  class Head extends BlockBase {
    config = null;
    platform = "vue";
    name = "Head"
    constructor(options) {
      super(options);
      if (!options) return;
      const { config, ...other } = options;
      this.config = config;
      
      this.editor = false;
    }

    render() {
      return __vue_component__$7;
    }

    // 复制回调构建blockData数据
    copyEventCallBack(context,event, blockInstance){
      console.log(`【superDoc】: 执行复制_head`);
    }
    cutEventCallBack(context,event,cutData, blockInstance){
      let manager = context.Event.Editor.BlockManager;

      console.log(`【superDoc】: 执行剪切_head`,cutData,blockInstance);
      let text = blockInstance.element.querySelector("[block-id]").firstChild?.firstChild?.innerHTML || "";
     if(!text){
      manager.removeBlock(cutData.id);
     }else {
      blockInstance.data.text = text;
     }
    }

    pasteEventCallBack(context,event){
      console.log(`【superDoc】: 执行粘贴_head`);
      let manager = context.Event["Editor"].BlockManager;
      let focusBlock =  manager.curentFocusBlock;
      let { block, type, status, data ,selectionContent} = manager.currentCopyBlockInfo;
      let deepCloneBlock = deepCloneRefreshId(data, [
        "id",
      ]);
      var clipboardData = event.clipboardData || window["clipboardData"]; // 获取剪贴板数据对象
      let clipboardText = clipboardData.getData("text/plain");
      let textList = clipboardText.split('\r\n').filter(i =>!!i);
      // 这里是为了校验是否是从外部复制粘贴过来的内容
      if(textList.every((t,index)=> t == selectionContent[index])){
        if(type == "text"){
          if(!focusBlock.data.text){
            // var clipboardData = event.clipboardData || window["clipboardData"]; // 获取剪贴板数据对象
            // var text =
            // manager.currentCopyBlockInfo.content ||
            // clipboardData.getData("text/plain"); // 获取纯文本格式的复制内容
            manager.replaceCurrentBlock(deepCloneBlock, focusBlock.id);
            event.preventDefault();
            return
          }
          // console.log("【superDoc】:执行默认粘贴事件");
        }else {
          // 粘贴的是块级节点 , 直接添加到当前节点尾部
          const currentBlockIndex = manager.blocks.findIndex(block => block.id === focusBlock.id);
          manager.blocks.splice(currentBlockIndex + 1, 0, ...deepCloneBlock);
          event.preventDefault();
        }
      }else {
        let clipboardHTML = clipboardData.getData("text/html") || `${clipboardText.split('\n').map(m=> `<p>${m}</p>`).join('')}`;
        let blockData = complieHTMLToBlockData.call(context.Event["Editor"],clipboardHTML);
        console.log("clipboardHTML",blockData);
        const currentBlockIndex = manager.blocks.findIndex(block => block.id === focusBlock.id);
        manager.blocks.splice(currentBlockIndex + 1, 0, ...blockData);
        event.preventDefault();
      }
     
    }

    compileData(instance,text){
      console.log(text,'compileData');
      return compileHead(text,instance.data.level)
    }

    selectionCallBack(context,event,copyDom, blockInstance){
      console.log(`【superDoc】: 执行选择_head`);
      let manager = context.Editor.BlockManager;
      let text = copyDom.querySelector("#superdoc-paragraph").innerHTML;
      let headObject = generateHeadData(blockInstance.data.level);
      headObject.data.text = text;
      // 当前选中节点的id赋值
      headObject.id = blockInstance.id;
      manager.currentSelectionBlockInfo.data.push(headObject);
      manager.currentSelectionBlockInfo.selectionContent.push(text);

    }
  }

  typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
      var e = new Error(message);
      return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };

  function e(e,t){return function(){return e.apply(t,arguments)}}const{toString:t}=Object.prototype,{getPrototypeOf:n}=Object,r=(o=Object.create(null),e=>{const n=t.call(e);return o[n]||(o[n]=n.slice(8,-1).toLowerCase())});var o;const s=e=>(e=e.toLowerCase(),t=>r(t)===e),i=e=>t=>typeof t===e,{isArray:a}=Array,c=i("undefined");const u=s("ArrayBuffer");const l=i("string"),f=i("function"),d=i("number"),p=e=>null!==e&&"object"==typeof e,h=e=>{if("object"!==r(e))return !1;const t=n(e);return !(null!==t&&t!==Object.prototype&&null!==Object.getPrototypeOf(t)||Symbol.toStringTag in e||Symbol.iterator in e)},m=s("Date"),y=s("File"),g=s("Blob"),b=s("FileList"),E=s("URLSearchParams");function w(e,t,{allOwnKeys:n=!1}={}){if(null==e)return;let r,o;if("object"!=typeof e&&(e=[e]),a(e))for(r=0,o=e.length;r<o;r++)t.call(null,e[r],r,e);else {const o=n?Object.getOwnPropertyNames(e):Object.keys(e),s=o.length;let i;for(r=0;r<s;r++)i=o[r],t.call(null,e[i],i,e);}}function O(e,t){t=t.toLowerCase();const n=Object.keys(e);let r,o=n.length;for(;o-- >0;)if(r=n[o],t===r.toLowerCase())return r;return null}const S="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:global,R=e=>!c(e)&&e!==S;const A=(T="undefined"!=typeof Uint8Array&&n(Uint8Array),e=>T&&e instanceof T);var T;const C=s("HTMLFormElement"),N=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),j=s("RegExp"),v=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};w(n,((n,o)=>{let s;!1!==(s=t(n,o,e))&&(r[o]=s||n);})),Object.defineProperties(e,r);},x="abcdefghijklmnopqrstuvwxyz",P={DIGIT:"0123456789",ALPHA:x,ALPHA_DIGIT:x+x.toUpperCase()+"0123456789"};const U=s("AsyncFunction"),F={isArray:a,isArrayBuffer:u,isBuffer:function(e){return null!==e&&!c(e)&&null!==e.constructor&&!c(e.constructor)&&f(e.constructor.isBuffer)&&e.constructor.isBuffer(e)},isFormData:e=>{let t;return e&&("function"==typeof FormData&&e instanceof FormData||f(e.append)&&("formdata"===(t=r(e))||"object"===t&&f(e.toString)&&"[object FormData]"===e.toString()))},isArrayBufferView:function(e){let t;return t="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&u(e.buffer),t},isString:l,isNumber:d,isBoolean:e=>!0===e||!1===e,isObject:p,isPlainObject:h,isUndefined:c,isDate:m,isFile:y,isBlob:g,isRegExp:j,isFunction:f,isStream:e=>p(e)&&f(e.pipe),isURLSearchParams:E,isTypedArray:A,isFileList:b,forEach:w,merge:function e(){const{caseless:t}=R(this)&&this||{},n={},r=(r,o)=>{const s=t&&O(n,o)||o;h(n[s])&&h(r)?n[s]=e(n[s],r):h(r)?n[s]=e({},r):a(r)?n[s]=r.slice():n[s]=r;};for(let e=0,t=arguments.length;e<t;e++)arguments[e]&&w(arguments[e],r);return n},extend:(t,n,r,{allOwnKeys:o}={})=>(w(n,((n,o)=>{r&&f(n)?t[o]=e(n,r):t[o]=n;}),{allOwnKeys:o}),t),trim:e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,""),stripBOM:e=>(65279===e.charCodeAt(0)&&(e=e.slice(1)),e),inherits:(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n);},toFlatObject:(e,t,r,o)=>{let s,i,a;const c={};if(t=t||{},null==e)return t;do{for(s=Object.getOwnPropertyNames(e),i=s.length;i-- >0;)a=s[i],o&&!o(a,e,t)||c[a]||(t[a]=e[a],c[a]=!0);e=!1!==r&&n(e);}while(e&&(!r||r(e,t))&&e!==Object.prototype);return t},kindOf:r,kindOfTest:s,endsWith:(e,t,n)=>{e=String(e),(void 0===n||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return -1!==r&&r===n},toArray:e=>{if(!e)return null;if(a(e))return e;let t=e.length;if(!d(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},forEachEntry:(e,t)=>{const n=(e&&e[Symbol.iterator]).call(e);let r;for(;(r=n.next())&&!r.done;){const n=r.value;t.call(e,n[0],n[1]);}},matchAll:(e,t)=>{let n;const r=[];for(;null!==(n=e.exec(t));)r.push(n);return r},isHTMLForm:C,hasOwnProperty:N,hasOwnProp:N,reduceDescriptors:v,freezeMethods:e=>{v(e,((t,n)=>{if(f(e)&&-1!==["arguments","caller","callee"].indexOf(n))return !1;const r=e[n];f(r)&&(t.enumerable=!1,"writable"in t?t.writable=!1:t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")}));}));},toObjectSet:(e,t)=>{const n={},r=e=>{e.forEach((e=>{n[e]=!0;}));};return a(e)?r(e):r(String(e).split(t)),n},toCamelCase:e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,(function(e,t,n){return t.toUpperCase()+n})),noop:()=>{},toFiniteNumber:(e,t)=>(e=+e,Number.isFinite(e)?e:t),findKey:O,global:S,isContextDefined:R,ALPHABET:P,generateString:(e=16,t=P.ALPHA_DIGIT)=>{let n="";const{length:r}=t;for(;e--;)n+=t[Math.random()*r|0];return n},isSpecCompliantForm:function(e){return !!(e&&f(e.append)&&"FormData"===e[Symbol.toStringTag]&&e[Symbol.iterator])},toJSONObject:e=>{const t=new Array(10),n=(e,r)=>{if(p(e)){if(t.indexOf(e)>=0)return;if(!("toJSON"in e)){t[r]=e;const o=a(e)?[]:{};return w(e,((e,t)=>{const s=n(e,r+1);!c(s)&&(o[t]=s);})),t[r]=void 0,o}}return e};return n(e,0)},isAsyncFn:U,isThenable:e=>e&&(p(e)||f(e))&&f(e.then)&&f(e.catch)};function _(e,t,n,r,o){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=(new Error).stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),o&&(this.response=o);}F.inherits(_,Error,{toJSON:function(){return {message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:F.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const B=_.prototype,D={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach((e=>{D[e]={value:e};})),Object.defineProperties(_,D),Object.defineProperty(B,"isAxiosError",{value:!0}),_.from=(e,t,n,r,o,s)=>{const i=Object.create(B);return F.toFlatObject(e,i,(function(e){return e!==Error.prototype}),(e=>"isAxiosError"!==e)),_.call(i,e.message,t,n,r,o),i.cause=e,i.name=e.name,s&&Object.assign(i,s),i};function L(e){return F.isPlainObject(e)||F.isArray(e)}function k(e){return F.endsWith(e,"[]")?e.slice(0,-2):e}function q(e,t,n){return e?e.concat(t).map((function(e,t){return e=k(e),!n&&t?"["+e+"]":e})).join(n?".":""):t}const I=F.toFlatObject(F,{},null,(function(e){return /^is[A-Z]/.test(e)}));function z(e,t,n){if(!F.isObject(e))throw new TypeError("target must be an object");t=t||new FormData;const r=(n=F.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,(function(e,t){return !F.isUndefined(t[e])}))).metaTokens,o=n.visitor||u,s=n.dots,i=n.indexes,a=(n.Blob||"undefined"!=typeof Blob&&Blob)&&F.isSpecCompliantForm(t);if(!F.isFunction(o))throw new TypeError("visitor must be a function");function c(e){if(null===e)return "";if(F.isDate(e))return e.toISOString();if(!a&&F.isBlob(e))throw new _("Blob is not supported. Use a Buffer instead.");return F.isArrayBuffer(e)||F.isTypedArray(e)?a&&"function"==typeof Blob?new Blob([e]):Buffer.from(e):e}function u(e,n,o){let a=e;if(e&&!o&&"object"==typeof e)if(F.endsWith(n,"{}"))n=r?n:n.slice(0,-2),e=JSON.stringify(e);else if(F.isArray(e)&&function(e){return F.isArray(e)&&!e.some(L)}(e)||(F.isFileList(e)||F.endsWith(n,"[]"))&&(a=F.toArray(e)))return n=k(n),a.forEach((function(e,r){!F.isUndefined(e)&&null!==e&&t.append(!0===i?q([n],r,s):null===i?n:n+"[]",c(e));})),!1;return !!L(e)||(t.append(q(o,n,s),c(e)),!1)}const l=[],f=Object.assign(I,{defaultVisitor:u,convertValue:c,isVisitable:L});if(!F.isObject(e))throw new TypeError("data must be an object");return function e(n,r){if(!F.isUndefined(n)){if(-1!==l.indexOf(n))throw Error("Circular reference detected in "+r.join("."));l.push(n),F.forEach(n,(function(n,s){!0===(!(F.isUndefined(n)||null===n)&&o.call(t,n,F.isString(s)?s.trim():s,r,f))&&e(n,r?r.concat(s):[s]);})),l.pop();}}(e),t}function M(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,(function(e){return t[e]}))}function H(e,t){this._pairs=[],e&&z(e,this,t);}const J=H.prototype;function V(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function W(e,t,n){if(!t)return e;const r=n&&n.encode||V,o=n&&n.serialize;let s;if(s=o?o(t,n):F.isURLSearchParams(t)?t.toString():new H(t,n).toString(r),s){const t=e.indexOf("#");-1!==t&&(e=e.slice(0,t)),e+=(-1===e.indexOf("?")?"?":"&")+s;}return e}J.append=function(e,t){this._pairs.push([e,t]);},J.toString=function(e){const t=e?function(t){return e.call(this,t,M)}:M;return this._pairs.map((function(e){return t(e[0])+"="+t(e[1])}),"").join("&")};const K=class{constructor(){this.handlers=[];}use(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!n&&n.synchronous,runWhen:n?n.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null);}clear(){this.handlers&&(this.handlers=[]);}forEach(e){F.forEach(this.handlers,(function(t){null!==t&&e(t);}));}},$={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},G={isBrowser:!0,classes:{URLSearchParams:"undefined"!=typeof URLSearchParams?URLSearchParams:H,FormData:"undefined"!=typeof FormData?FormData:null,Blob:"undefined"!=typeof Blob?Blob:null},isStandardBrowserEnv:(()=>{let e;return ("undefined"==typeof navigator||"ReactNative"!==(e=navigator.product)&&"NativeScript"!==e&&"NS"!==e)&&("undefined"!=typeof window&&"undefined"!=typeof document)})(),isStandardBrowserWebWorkerEnv:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope&&"function"==typeof self.importScripts,protocols:["http","https","file","blob","url","data"]};function X(e){function t(e,n,r,o){let s=e[o++];const i=Number.isFinite(+s),a=o>=e.length;if(s=!s&&F.isArray(r)?r.length:s,a)return F.hasOwnProp(r,s)?r[s]=[r[s],n]:r[s]=n,!i;r[s]&&F.isObject(r[s])||(r[s]=[]);return t(e,n,r[s],o)&&F.isArray(r[s])&&(r[s]=function(e){const t={},n=Object.keys(e);let r;const o=n.length;let s;for(r=0;r<o;r++)s=n[r],t[s]=e[s];return t}(r[s])),!i}if(F.isFormData(e)&&F.isFunction(e.entries)){const n={};return F.forEachEntry(e,((e,r)=>{t(function(e){return F.matchAll(/\w+|\[(\w*)]/g,e).map((e=>"[]"===e[0]?"":e[1]||e[0]))}(e),r,n,0);})),n}return null}const Q={transitional:$,adapter:["xhr","http"],transformRequest:[function(e,t){const n=t.getContentType()||"",r=n.indexOf("application/json")>-1,o=F.isObject(e);o&&F.isHTMLForm(e)&&(e=new FormData(e));if(F.isFormData(e))return r&&r?JSON.stringify(X(e)):e;if(F.isArrayBuffer(e)||F.isBuffer(e)||F.isStream(e)||F.isFile(e)||F.isBlob(e))return e;if(F.isArrayBufferView(e))return e.buffer;if(F.isURLSearchParams(e))return t.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let s;if(o){if(n.indexOf("application/x-www-form-urlencoded")>-1)return function(e,t){return z(e,new G.classes.URLSearchParams,Object.assign({visitor:function(e,t,n,r){return G.isNode&&F.isBuffer(e)?(this.append(t,e.toString("base64")),!1):r.defaultVisitor.apply(this,arguments)}},t))}(e,this.formSerializer).toString();if((s=F.isFileList(e))||n.indexOf("multipart/form-data")>-1){const t=this.env&&this.env.FormData;return z(s?{"files[]":e}:e,t&&new t,this.formSerializer)}}return o||r?(t.setContentType("application/json",!1),function(e,t,n){if(F.isString(e))try{return (t||JSON.parse)(e),F.trim(e)}catch(e){if("SyntaxError"!==e.name)throw e}return (n||JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){const t=this.transitional||Q.transitional,n=t&&t.forcedJSONParsing,r="json"===this.responseType;if(e&&F.isString(e)&&(n&&!this.responseType||r)){const n=!(t&&t.silentJSONParsing)&&r;try{return JSON.parse(e)}catch(e){if(n){if("SyntaxError"===e.name)throw _.from(e,_.ERR_BAD_RESPONSE,this,null,this.response);throw e}}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:G.classes.FormData,Blob:G.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};F.forEach(["delete","get","head","post","put","patch"],(e=>{Q.headers[e]={};}));const Z=Q,Y=F.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),ee=Symbol("internals");function te(e){return e&&String(e).trim().toLowerCase()}function ne(e){return !1===e||null==e?e:F.isArray(e)?e.map(ne):String(e)}function re(e,t,n,r,o){return F.isFunction(r)?r.call(this,t,n):(o&&(t=n),F.isString(t)?F.isString(r)?-1!==t.indexOf(r):F.isRegExp(r)?r.test(t):void 0:void 0)}class oe{constructor(e){e&&this.set(e);}set(e,t,n){const r=this;function o(e,t,n){const o=te(t);if(!o)throw new Error("header name must be a non-empty string");const s=F.findKey(r,o);(!s||void 0===r[s]||!0===n||void 0===n&&!1!==r[s])&&(r[s||t]=ne(e));}const s=(e,t)=>F.forEach(e,((e,n)=>o(e,n,t)));return F.isPlainObject(e)||e instanceof this.constructor?s(e,t):F.isString(e)&&(e=e.trim())&&!/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim())?s((e=>{const t={};let n,r,o;return e&&e.split("\n").forEach((function(e){o=e.indexOf(":"),n=e.substring(0,o).trim().toLowerCase(),r=e.substring(o+1).trim(),!n||t[n]&&Y[n]||("set-cookie"===n?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r);})),t})(e),t):null!=e&&o(t,e,n),this}get(e,t){if(e=te(e)){const n=F.findKey(this,e);if(n){const e=this[n];if(!t)return e;if(!0===t)return function(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}(e);if(F.isFunction(t))return t.call(this,e,n);if(F.isRegExp(t))return t.exec(e);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,t){if(e=te(e)){const n=F.findKey(this,e);return !(!n||void 0===this[n]||t&&!re(0,this[n],n,t))}return !1}delete(e,t){const n=this;let r=!1;function o(e){if(e=te(e)){const o=F.findKey(n,e);!o||t&&!re(0,n[o],o,t)||(delete n[o],r=!0);}}return F.isArray(e)?e.forEach(o):o(e),r}clear(e){const t=Object.keys(this);let n=t.length,r=!1;for(;n--;){const o=t[n];e&&!re(0,this[o],o,e,!0)||(delete this[o],r=!0);}return r}normalize(e){const t=this,n={};return F.forEach(this,((r,o)=>{const s=F.findKey(n,o);if(s)return t[s]=ne(r),void delete t[o];const i=e?function(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,((e,t,n)=>t.toUpperCase()+n))}(o):String(o).trim();i!==o&&delete t[o],t[i]=ne(r),n[i]=!0;})),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const t=Object.create(null);return F.forEach(this,((n,r)=>{null!=n&&!1!==n&&(t[r]=e&&F.isArray(n)?n.join(", "):n);})),t}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map((([e,t])=>e+": "+t)).join("\n")}get[Symbol.toStringTag](){return "AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...t){const n=new this(e);return t.forEach((e=>n.set(e))),n}static accessor(e){const t=(this[ee]=this[ee]={accessors:{}}).accessors,n=this.prototype;function r(e){const r=te(e);t[r]||(!function(e,t){const n=F.toCamelCase(" "+t);["get","set","has"].forEach((r=>{Object.defineProperty(e,r+n,{value:function(e,n,o){return this[r].call(this,t,e,n,o)},configurable:!0});}));}(n,e),t[r]=!0);}return F.isArray(e)?e.forEach(r):r(e),this}}oe.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]),F.reduceDescriptors(oe.prototype,(({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return {get:()=>e,set(e){this[n]=e;}}})),F.freezeMethods(oe);const se=oe;function ie(e,t){const n=this||Z,r=t||n,o=se.from(r.headers);let s=r.data;return F.forEach(e,(function(e){s=e.call(n,s,o.normalize(),t?t.status:void 0);})),o.normalize(),s}function ae(e){return !(!e||!e.__CANCEL__)}function ce(e,t,n){_.call(this,null==e?"canceled":e,_.ERR_CANCELED,t,n),this.name="CanceledError";}F.inherits(ce,_,{__CANCEL__:!0});const ue=G.isStandardBrowserEnv?{write:function(e,t,n,r,o,s){const i=[];i.push(e+"="+encodeURIComponent(t)),F.isNumber(n)&&i.push("expires="+new Date(n).toGMTString()),F.isString(r)&&i.push("path="+r),F.isString(o)&&i.push("domain="+o),!0===s&&i.push("secure"),document.cookie=i.join("; ");},read:function(e){const t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5);}}:{write:function(){},read:function(){return null},remove:function(){}};function le(e,t){return e&&!/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)?function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}(e,t):t}const fe=G.isStandardBrowserEnv?function(){const e=/(msie|trident)/i.test(navigator.userAgent),t=document.createElement("a");let n;function r(n){let r=n;return e&&(t.setAttribute("href",r),r=t.href),t.setAttribute("href",r),{href:t.href,protocol:t.protocol?t.protocol.replace(/:$/,""):"",host:t.host,search:t.search?t.search.replace(/^\?/,""):"",hash:t.hash?t.hash.replace(/^#/,""):"",hostname:t.hostname,port:t.port,pathname:"/"===t.pathname.charAt(0)?t.pathname:"/"+t.pathname}}return n=r(window.location.href),function(e){const t=F.isString(e)?r(e):e;return t.protocol===n.protocol&&t.host===n.host}}():function(){return !0};function de(e,t){let n=0;const r=function(e,t){e=e||10;const n=new Array(e),r=new Array(e);let o,s=0,i=0;return t=void 0!==t?t:1e3,function(a){const c=Date.now(),u=r[i];o||(o=c),n[s]=a,r[s]=c;let l=i,f=0;for(;l!==s;)f+=n[l++],l%=e;if(s=(s+1)%e,s===i&&(i=(i+1)%e),c-o<t)return;const d=u&&c-u;return d?Math.round(1e3*f/d):void 0}}(50,250);return o=>{const s=o.loaded,i=o.lengthComputable?o.total:void 0,a=s-n,c=r(a);n=s;const u={loaded:s,total:i,progress:i?s/i:void 0,bytes:a,rate:c||void 0,estimated:c&&i&&s<=i?(i-s)/c:void 0,event:o};u[t?"download":"upload"]=!0,e(u);}}const pe={http:null,xhr:"undefined"!=typeof XMLHttpRequest&&function(e){return new Promise((function(t,n){let r=e.data;const o=se.from(e.headers).normalize(),s=e.responseType;let i,a;function c(){e.cancelToken&&e.cancelToken.unsubscribe(i),e.signal&&e.signal.removeEventListener("abort",i);}F.isFormData(r)&&(G.isStandardBrowserEnv||G.isStandardBrowserWebWorkerEnv?o.setContentType(!1):o.getContentType(/^\s*multipart\/form-data/)?F.isString(a=o.getContentType())&&o.setContentType(a.replace(/^\s*(multipart\/form-data);+/,"$1")):o.setContentType("multipart/form-data"));let u=new XMLHttpRequest;if(e.auth){const t=e.auth.username||"",n=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";o.set("Authorization","Basic "+btoa(t+":"+n));}const l=le(e.baseURL,e.url);function f(){if(!u)return;const r=se.from("getAllResponseHeaders"in u&&u.getAllResponseHeaders());!function(e,t,n){const r=n.config.validateStatus;n.status&&r&&!r(n.status)?t(new _("Request failed with status code "+n.status,[_.ERR_BAD_REQUEST,_.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n)):e(n);}((function(e){t(e),c();}),(function(e){n(e),c();}),{data:s&&"text"!==s&&"json"!==s?u.response:u.responseText,status:u.status,statusText:u.statusText,headers:r,config:e,request:u}),u=null;}if(u.open(e.method.toUpperCase(),W(l,e.params,e.paramsSerializer),!0),u.timeout=e.timeout,"onloadend"in u?u.onloadend=f:u.onreadystatechange=function(){u&&4===u.readyState&&(0!==u.status||u.responseURL&&0===u.responseURL.indexOf("file:"))&&setTimeout(f);},u.onabort=function(){u&&(n(new _("Request aborted",_.ECONNABORTED,e,u)),u=null);},u.onerror=function(){n(new _("Network Error",_.ERR_NETWORK,e,u)),u=null;},u.ontimeout=function(){let t=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded";const r=e.transitional||$;e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(new _(t,r.clarifyTimeoutError?_.ETIMEDOUT:_.ECONNABORTED,e,u)),u=null;},G.isStandardBrowserEnv){const t=(e.withCredentials||fe(l))&&e.xsrfCookieName&&ue.read(e.xsrfCookieName);t&&o.set(e.xsrfHeaderName,t);}void 0===r&&o.setContentType(null),"setRequestHeader"in u&&F.forEach(o.toJSON(),(function(e,t){u.setRequestHeader(t,e);})),F.isUndefined(e.withCredentials)||(u.withCredentials=!!e.withCredentials),s&&"json"!==s&&(u.responseType=e.responseType),"function"==typeof e.onDownloadProgress&&u.addEventListener("progress",de(e.onDownloadProgress,!0)),"function"==typeof e.onUploadProgress&&u.upload&&u.upload.addEventListener("progress",de(e.onUploadProgress)),(e.cancelToken||e.signal)&&(i=t=>{u&&(n(!t||t.type?new ce(null,e,u):t),u.abort(),u=null);},e.cancelToken&&e.cancelToken.subscribe(i),e.signal&&(e.signal.aborted?i():e.signal.addEventListener("abort",i)));const d=function(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}(l);d&&-1===G.protocols.indexOf(d)?n(new _("Unsupported protocol "+d+":",_.ERR_BAD_REQUEST,e)):u.send(r||null);}))}};F.forEach(pe,((e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t});}catch(e){}Object.defineProperty(e,"adapterName",{value:t});}}));const he=e=>`- ${e}`,me=e=>F.isFunction(e)||null===e||!1===e,ye=e=>{e=F.isArray(e)?e:[e];const{length:t}=e;let n,r;const o={};for(let s=0;s<t;s++){let t;if(n=e[s],r=n,!me(n)&&(r=pe[(t=String(n)).toLowerCase()],void 0===r))throw new _(`Unknown adapter '${t}'`);if(r)break;o[t||"#"+s]=r;}if(!r){const e=Object.entries(o).map((([e,t])=>`adapter ${e} `+(!1===t?"is not supported by the environment":"is not available in the build")));throw new _("There is no suitable adapter to dispatch the request "+(t?e.length>1?"since :\n"+e.map(he).join("\n"):" "+he(e[0]):"as no adapter specified"),"ERR_NOT_SUPPORT")}return r};function ge(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new ce(null,e)}function be(e){ge(e),e.headers=se.from(e.headers),e.data=ie.call(e,e.transformRequest),-1!==["post","put","patch"].indexOf(e.method)&&e.headers.setContentType("application/x-www-form-urlencoded",!1);return ye(e.adapter||Z.adapter)(e).then((function(t){return ge(e),t.data=ie.call(e,e.transformResponse,t),t.headers=se.from(t.headers),t}),(function(t){return ae(t)||(ge(e),t&&t.response&&(t.response.data=ie.call(e,e.transformResponse,t.response),t.response.headers=se.from(t.response.headers))),Promise.reject(t)}))}const Ee=e=>e instanceof se?e.toJSON():e;function we(e,t){t=t||{};const n={};function r(e,t,n){return F.isPlainObject(e)&&F.isPlainObject(t)?F.merge.call({caseless:n},e,t):F.isPlainObject(t)?F.merge({},t):F.isArray(t)?t.slice():t}function o(e,t,n){return F.isUndefined(t)?F.isUndefined(e)?void 0:r(void 0,e,n):r(e,t,n)}function s(e,t){if(!F.isUndefined(t))return r(void 0,t)}function i(e,t){return F.isUndefined(t)?F.isUndefined(e)?void 0:r(void 0,e):r(void 0,t)}function a(n,o,s){return s in t?r(n,o):s in e?r(void 0,n):void 0}const c={url:s,method:s,data:s,baseURL:i,transformRequest:i,transformResponse:i,paramsSerializer:i,timeout:i,timeoutMessage:i,withCredentials:i,adapter:i,responseType:i,xsrfCookieName:i,xsrfHeaderName:i,onUploadProgress:i,onDownloadProgress:i,decompress:i,maxContentLength:i,maxBodyLength:i,beforeRedirect:i,transport:i,httpAgent:i,httpsAgent:i,cancelToken:i,socketPath:i,responseEncoding:i,validateStatus:a,headers:(e,t)=>o(Ee(e),Ee(t),!0)};return F.forEach(Object.keys(Object.assign({},e,t)),(function(r){const s=c[r]||o,i=s(e[r],t[r],r);F.isUndefined(i)&&s!==a||(n[r]=i);})),n}const Oe={};["object","boolean","number","function","string","symbol"].forEach(((e,t)=>{Oe[e]=function(n){return typeof n===e||"a"+(t<1?"n ":" ")+e};}));const Se={};Oe.transitional=function(e,t,n){function r(e,t){return "[Axios v1.5.1] Transitional option '"+e+"'"+t+(n?". "+n:"")}return (n,o,s)=>{if(!1===e)throw new _(r(o," has been removed"+(t?" in "+t:"")),_.ERR_DEPRECATED);return t&&!Se[o]&&(Se[o]=!0,console.warn(r(o," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(n,o,s)}};const Re={assertOptions:function(e,t,n){if("object"!=typeof e)throw new _("options must be an object",_.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let o=r.length;for(;o-- >0;){const s=r[o],i=t[s];if(i){const t=e[s],n=void 0===t||i(t,s,e);if(!0!==n)throw new _("option "+s+" must be "+n,_.ERR_BAD_OPTION_VALUE)}else if(!0!==n)throw new _("Unknown option "+s,_.ERR_BAD_OPTION)}},validators:Oe},Ae=Re.validators;class Te{constructor(e){this.defaults=e,this.interceptors={request:new K,response:new K};}request(e,t){"string"==typeof e?(t=t||{}).url=e:t=e||{},t=we(this.defaults,t);const{transitional:n,paramsSerializer:r,headers:o}=t;void 0!==n&&Re.assertOptions(n,{silentJSONParsing:Ae.transitional(Ae.boolean),forcedJSONParsing:Ae.transitional(Ae.boolean),clarifyTimeoutError:Ae.transitional(Ae.boolean)},!1),null!=r&&(F.isFunction(r)?t.paramsSerializer={serialize:r}:Re.assertOptions(r,{encode:Ae.function,serialize:Ae.function},!0)),t.method=(t.method||this.defaults.method||"get").toLowerCase();let s=o&&F.merge(o.common,o[t.method]);o&&F.forEach(["delete","get","head","post","put","patch","common"],(e=>{delete o[e];})),t.headers=se.concat(s,o);const i=[];let a=!0;this.interceptors.request.forEach((function(e){"function"==typeof e.runWhen&&!1===e.runWhen(t)||(a=a&&e.synchronous,i.unshift(e.fulfilled,e.rejected));}));const c=[];let u;this.interceptors.response.forEach((function(e){c.push(e.fulfilled,e.rejected);}));let l,f=0;if(!a){const e=[be.bind(this),void 0];for(e.unshift.apply(e,i),e.push.apply(e,c),l=e.length,u=Promise.resolve(t);f<l;)u=u.then(e[f++],e[f++]);return u}l=i.length;let d=t;for(f=0;f<l;){const e=i[f++],t=i[f++];try{d=e(d);}catch(e){t.call(this,e);break}}try{u=be.call(this,d);}catch(e){return Promise.reject(e)}for(f=0,l=c.length;f<l;)u=u.then(c[f++],c[f++]);return u}getUri(e){return W(le((e=we(this.defaults,e)).baseURL,e.url),e.params,e.paramsSerializer)}}F.forEach(["delete","get","head","options"],(function(e){Te.prototype[e]=function(t,n){return this.request(we(n||{},{method:e,url:t,data:(n||{}).data}))};})),F.forEach(["post","put","patch"],(function(e){function t(t){return function(n,r,o){return this.request(we(o||{},{method:e,headers:t?{"Content-Type":"multipart/form-data"}:{},url:n,data:r}))}}Te.prototype[e]=t(),Te.prototype[e+"Form"]=t(!0);}));const Ce=Te;class Ne{constructor(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");let t;this.promise=new Promise((function(e){t=e;}));const n=this;this.promise.then((e=>{if(!n._listeners)return;let t=n._listeners.length;for(;t-- >0;)n._listeners[t](e);n._listeners=null;})),this.promise.then=e=>{let t;const r=new Promise((e=>{n.subscribe(e),t=e;})).then(e);return r.cancel=function(){n.unsubscribe(t);},r},e((function(e,r,o){n.reason||(n.reason=new ce(e,r,o),t(n.reason));}));}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e];}unsubscribe(e){if(!this._listeners)return;const t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1);}static source(){let e;return {token:new Ne((function(t){e=t;})),cancel:e}}}const je=Ne;const ve={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(ve).forEach((([e,t])=>{ve[t]=e;}));const xe=ve;const Pe=function t(n){const r=new Ce(n),o=e(Ce.prototype.request,r);return F.extend(o,Ce.prototype,r,{allOwnKeys:!0}),F.extend(o,r,null,{allOwnKeys:!0}),o.create=function(e){return t(we(n,e))},o}(Z);Pe.Axios=Ce,Pe.CanceledError=ce,Pe.CancelToken=je,Pe.isCancel=ae,Pe.VERSION="1.5.1",Pe.toFormData=z,Pe.AxiosError=_,Pe.Cancel=Pe.CanceledError,Pe.all=function(e){return Promise.all(e)},Pe.spread=function(e){return function(t){return e.apply(null,t)}},Pe.isAxiosError=function(e){return F.isObject(e)&&!0===e.isAxiosError},Pe.mergeConfig=we,Pe.AxiosHeaders=se,Pe.formToJSON=e=>X(F.isHTMLForm(e)?new FormData(e):e),Pe.getAdapter=ye,Pe.HttpStatusCode=xe,Pe.default=Pe;

  //
  var script$6 = {
    data() {
      return {
        blockData: getBlockData(this.$attrs["block-id"]),
        blockId: this.$attrs["block-id"],
        menuId: 149,
        imageFile: null,
        loading: false,
      };
    },
    props: ["$superConfig"],
    methods: {
      async uploadImage(event) {
        // this.loading = true;
        // let manager = this.$superConfig.blockData.BlockManager
        console.log('进入获取让图片');
        // 上传照片不直接走接口
        let url = URL.createObjectURL(event.file);
        this.imagePath = url;
        this.blockData.data.file = event.file;
        this.blockData.data.upload = true;
      },
      imageKeydown(event){
        if(event.keyCode == 8){
          let manager = this.$superConfig.blockData.BlockManager;
          manager.removeBlock(this.blockId);
          event.preventDefault();
        }else {
          event.preventDefault();
        }
      },
      // 不严谨判断 ,暂时处理
      isBase64(str){
          if(str.indexOf('data:')!=-1 && str.indexOf('base64')!=-1 ){
              return true;
          }else {
              return false;
          }
      }
    },
    computed: {
      imagePath: {
        get() {
          let url = this.blockData.data.url;
          if(url){
            if(this.isBase64(url)) return url
            if(url.startsWith('blob')) return url
             return url
          }else {
            return ""
          }
        },
        set(val) {
          this.blockData.data.url = val;
        },
      },
    },
    mounted() {
      if (!this.imagePath) {
        this.$refs["uploadEl"]?.click();
      }
    },
  };

  /* script */
  const __vue_script__$6 = script$6;

  /* template */
  var __vue_render__$7 = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "image-wrap" },
      [
        !_vm.imagePath
          ? _c(
              "el-upload",
              {
                directives: [
                  {
                    name: "loading",
                    rawName: "v-loading",
                    value: _vm.loading,
                    expression: "loading",
                  },
                ],
                staticClass: "upload-demo",
                staticStyle: { "text-align": "center" },
                attrs: {
                  drag: "",
                  action: "#",
                  accept: "image/jpeg,image/png,image/jpg",
                  "show-file-list": false,
                  "http-request": _vm.uploadImage,
                  "element-loading-text": "图片上传中...",
                  "element-loading-spinner": "el-icon-loading",
                  "element-loading-background": "rgba(255, 247, 247, 0.8)",
                },
              },
              [
                _c("i", { staticClass: "el-icon-upload" }),
                _vm._v(" "),
                _c("div", { ref: "uploadEl", staticClass: "el-upload__text" }, [
                  _vm._v("\n      将文件拖到此处，或"),
                  _c("em", [_vm._v("点击上传")]),
                ]),
              ]
            )
          : _c(
              "div",
              {
                attrs: { contenteditable: "true" },
                on: { keydown: _vm.imageKeydown },
              },
              [
                _c("el-image", {
                  attrs: {
                    contenteditable: "true",
                    src: _vm.imagePath,
                    "preview-src-list": [_vm.imagePath],
                  },
                }),
              ],
              1
            ),
      ],
      1
    )
  };
  var __vue_staticRenderFns__$6 = [];
  __vue_render__$7._withStripped = true;

    /* style */
    const __vue_inject_styles__$6 = function (inject) {
      if (!inject) return
      inject("data-v-c5113200_0", { source: ".image-wrap[data-v-c5113200] {\n  position: relative;\n  border: 2px solid transparent;\n  transition: border 0.3s;\n  margin-top: 5px;\n}\n", map: {"version":3,"sources":["image.vue"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,6BAA6B;EAC7B,uBAAuB;EACvB,eAAe;AACjB","file":"image.vue","sourcesContent":[".image-wrap {\n  position: relative;\n  border: 2px solid transparent;\n  transition: border 0.3s;\n  margin-top: 5px;\n}\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$6 = "data-v-c5113200";
    /* module identifier */
    const __vue_module_identifier__$6 = undefined;
    /* functional template */
    const __vue_is_functional_template__$6 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$6 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$6 },
      __vue_inject_styles__$6,
      __vue_script__$6,
      __vue_scope_id__$6,
      __vue_is_functional_template__$6,
      __vue_module_identifier__$6,
      false,
      createInjector,
      undefined,
      undefined
    );

  class ImageDoc extends BlockBase {
      config = null;
      platform = "vue";
      constructor(options) {
        super(options);
        if (!options) return;
        const { config, ...other } = options;
        this.config = config;
        
        this.editor = false;
      }
    
      render() {
        return __vue_component__$6;
      }

      copyEventCallBack(context,event,blockInstance){
        console.log('copy');
      }

      selectionCallBack(context,event,copyDom, blockInstance){
        console.log(`【superDoc】: 执行选中回调_img`);
        // let manager = context.Event["Editor"].BlockManager
        // let text = copyDom.querySelector("#superdoc-paragraph").innerHTML
        // let headObject = generateHeadData(blockInstance.data.level)
        // headObject.data.text = text;
        // manager.currentSelectionBlockInfo.data.push(headObject)
      }

  }

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$5 = {
    name: "",
    props: ["list"],
    data() {
      return {
          contextMenuDisplay:false,
      };
    },
  };

  /* script */
  const __vue_script__$5 = script$5;

  /* template */
  var __vue_render__$6 = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.contextMenuDisplay,
            expression: "contextMenuDisplay",
          },
        ],
        staticClass: "table-context-menu",
      },
      [
        _c(
          "ul",
          _vm._l(_vm.list, function (item) {
            return _c(
              "li",
              {
                key: item.operation,
                on: {
                  click: function ($event) {
                    return _vm.$emit("contextClick", item)
                  },
                },
              },
              [_vm._v("\n      " + _vm._s(item.label) + "\n    ")]
            )
          }),
          0
        ),
      ]
    )
  };
  var __vue_staticRenderFns__$5 = [];
  __vue_render__$6._withStripped = true;

    /* style */
    const __vue_inject_styles__$5 = function (inject) {
      if (!inject) return
      inject("data-v-9fef70aa_0", { source: ".table-context-menu[data-v-9fef70aa] {\n  position: fixed;\n  width: 120px;\n  background: #fff;\n  z-index: 12;\n  font-size: 14px;\n  border-radius: 5px;\n  box-shadow: 0px 2px 5px rgba(51, 51, 51, 0.2);\n  cursor: pointer;\n}\n.table-context-menu ul[data-v-9fef70aa] {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n.table-context-menu ul li[data-v-9fef70aa] {\n  padding: 5px 8px;\n  text-align: center;\n}\n.table-context-menu ul li[data-v-9fef70aa]:hover {\n  background: rgb(239, 240, 240);\n}\n\n/*# sourceMappingURL=contextMenu.vue.map */", map: {"version":3,"sources":["D:\\Company\\agree_project\\super-doc\\packages\\components\\src\\components\\table\\contextMenu.vue","contextMenu.vue"],"names":[],"mappings":"AAsBA;EACA,eAAA;EACA,YAAA;EAEA,gBAAA;EACA,WAAA;EACA,eAAA;EACA,kBAAA;EACA,6CAAA;EACA,eAAA;ACtBA;ADuBA;EACA,SAAA;EACA,UAAA;EACA,gBAAA;ACrBA;ADsBA;EACA,gBAAA;EACA,kBAAA;ACpBA;ADqBA;EACA,8BAAA;ACnBA;;AAEA,0CAA0C","file":"contextMenu.vue","sourcesContent":["<template>\r\n  <div class=\"table-context-menu\" v-show=\"contextMenuDisplay\">\r\n    <ul>\r\n      <li v-for=\"item in list\" :key=\"item.operation\" @click=\"$emit('contextClick', item)\">\r\n        {{ item.label }}\r\n      </li>\r\n    </ul>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  name: \"\",\r\n  props: [\"list\"],\r\n  data() {\r\n    return {\r\n        contextMenuDisplay:false,\r\n    };\r\n  },\r\n};\r\n</script>\r\n<style lang=\"scss\" scoped>\r\n.table-context-menu {\r\n  position: fixed;\r\n  width: 120px;\r\n  // height: 100px;\r\n  background: #fff;\r\n  z-index: 12;\r\n  font-size: 14px;\r\n  border-radius: 5px;\r\n  box-shadow: 0px 2px 5px rgba(51, 51, 51, 0.2);\r\n  cursor: pointer;\r\n  ul {\r\n    margin: 0;\r\n    padding: 0;\r\n    list-style: none;\r\n    li {\r\n      padding: 5px 8px;\r\n      text-align: center;\r\n      &:hover {\r\n        background: rgba(239, 240, 240);\r\n      }\r\n    }\r\n  }\r\n}\r\n</style>\r\n",".table-context-menu {\n  position: fixed;\n  width: 120px;\n  background: #fff;\n  z-index: 12;\n  font-size: 14px;\n  border-radius: 5px;\n  box-shadow: 0px 2px 5px rgba(51, 51, 51, 0.2);\n  cursor: pointer;\n}\n.table-context-menu ul {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n.table-context-menu ul li {\n  padding: 5px 8px;\n  text-align: center;\n}\n.table-context-menu ul li:hover {\n  background: rgb(239, 240, 240);\n}\n\n/*# sourceMappingURL=contextMenu.vue.map */"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$5 = "data-v-9fef70aa";
    /* module identifier */
    const __vue_module_identifier__$5 = undefined;
    /* functional template */
    const __vue_is_functional_template__$5 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$5 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$5 },
      __vue_inject_styles__$5,
      __vue_script__$5,
      __vue_scope_id__$5,
      __vue_is_functional_template__$5,
      __vue_module_identifier__$5,
      false,
      createInjector,
      undefined,
      undefined
    );

  //

    var script$4 = {
      data() {
        return {
          tableData: {table: [], title: []},
          uuid: generateId(),
          coords: [],
          hiddens: [],
          merges: [],
          currentColumn: null,
          contextList:[{
            label:'向左插入一列',
            operation:"left",
          },{
            label:'向右插入一列',
            operation:"right",
          }]
        }
      },
      components: {
        SuperDocInput: __vue_component__$a,
        contextMenu: __vue_component__$5
      //   Cell
      },
      methods: {
        init() {
          const _data = getBlockData(this.$attrs["block-id"]).data;
          _data.table.forEach(d => {
            d.__id__ = generateId();
          });
          
          this.tableData = {table: _data.table, title: _data.title};
          _data.mergeInfo?.forEach(item => {
            this.coords.push(item.coord);
            this.merges.push(item.merge);
            this.hiddens.push(...item.hidden);
          });
        },
        formatTitleVal(content) {
          return content.split(".")[1].replace("}", ""); 
        },
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
          let merge = null;
          this.coords.some((coord, idx) => {
            const [r, c] = coord;
            const [mr, mc] = this.merges[idx];
            if(rowIndex === r && columnIndex === c) {
              merge = [mr, mc];
              return true;
            }
          });
          if(merge) return merge;

          let hidden = null; 
          this.hiddens.some(([ hr, hc ]) => {
            if(rowIndex === hr && columnIndex === hc) {
              hidden = [0, 0];
              return true;
            }
          });
          if(hidden) return [0, 0];
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
          if (columnIndex === 0) {
            if (rowIndex % 2 === 0) {
              return {
                rowspan: 2,
                colspan: 1,
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0,
              };
            }
          }
        },
        contentChange({content, params}) {
          const propName = params.scope.column.property;
          console.log(content,'yyjs');
          params.scope.row[propName] = content;
        },
        // 头部数据变更
        headContentChange({content, params},item){
           params.scope.column.property;
           item.title = content;
        },
        getRandomLetter(length) {
          var result = '';
          var randomIndex = '';
          var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$';
          var charactersLength = characters.length;
          for (var i = 0; i < length; i++) {
             // 首字符不是数字
            if (i === 0) {
              charactersLength = charactersLength - 10;
            } 
            randomIndex = Math.floor(Math.random() * charactersLength);
            result += characters.charAt(randomIndex);
          }
          return result;
        },
        tableHeadClick(column, event){
          this.currentColumn = column.index;
          this.hiddenContextMenu();
        },
        headerContextmenu(column, event){
          this.hiddenContextMenu();
          this.currentColumn = column.index;
          let contextMenu = this.$el.querySelector('.table-context-menu');
          contextMenu.__vue__.contextMenuDisplay = true;
          contextMenu.style.left = event.clientX + 'px';
          contextMenu.style.top = event.clientY + 'px';
          event.stopPropagation();
          event.preventDefault();
        },
        // 菜单点击事件
        contextClick(item){
          let column = this.currentColumn;
          if(item.operation == 'right'){
            column++;
          }
          let key = this.getRandomLetter(7);
          
          //this.tableData.table.forEach(item=>{
          //  item[key] = ""
          //})
          let _data = getBlockData(this.$attrs["block-id"]).data;

           _data.title.splice(column, 0, {
            value: "${datas[]." + key + "}",
            title: "新一列",
          });
          _data.table.forEach(item=>{
            item[key] = "-";
          });
          // 响应式问题处理
          this.tableData.title = [];
          setTimeout(()=>{
              this.tableData.title = _data.title;
          });
          this.hiddenContextMenu();
        },
        cellClassName({row, column, rowIndex, columnIndex}){
          if(columnIndex == this.currentColumn) return 'clickColumnBg'
          return 'default'
        },
        // 表格键盘点击事件
        tableKeyDonwEvent(event,scope){
          this.hiddenContextMenu();
          this.currentColumn = null;
          if (event.keyCode === 13 || event.key == 'Enter') {
            const { $index , row} = scope;
            console.log('yyjs:event',event,scope);
            let newRow = Object.create({});
            Object.keys(row).forEach(key =>{
              newRow[key] = key== '__id__' ? generateId() :"-";
            });
            this.tableData.table.splice($index+1 , 0,newRow);
            //debugger
            console.log(this.tableData.table,'yyjs:33table',newRow);
           
            event.preventDefault();
            event.stopPropagation();
          }
        },
        // 隐藏右键菜单
        hiddenContextMenu(){
          try{
            let contextMenuList = document.querySelectorAll('.table-context-menu');
            contextMenuList.forEach((item)=>{
             item.__vue__.contextMenuDisplay = false;
            });
          }catch(e){
            console.log(`table:隐藏菜单失败`,e);
          }
        }
      },
      mounted() {
        this.init();
      },
    };

  /* script */
  const __vue_script__$4 = script$4;

  /* template */
  var __vue_render__$5 = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        on: {
          click: function ($event) {
            return _vm.hiddenContextMenu(true)
          },
        },
      },
      [
        _c(
          "el-table",
          {
            ref: "table",
            staticStyle: { width: "100%", "margin-top": "20px" },
            attrs: {
              data: _vm.tableData.table,
              border: "",
              "span-method": _vm.arraySpanMethod,
              "header-cell-class-name": _vm.cellClassName,
              "cell-class-name": _vm.cellClassName,
            },
            on: {
              "header-click": _vm.tableHeadClick,
              "header-contextmenu": _vm.headerContextmenu,
            },
          },
          _vm._l(_vm.tableData.title, function (item, index) {
            return _c("el-table-column", {
              key: item.__id__,
              attrs: { index: index, prop: _vm.formatTitleVal(item.value) },
              scopedSlots: _vm._u(
                [
                  {
                    key: "header",
                    fn: function (scope) {
                      return [
                        _c("SuperDocInput", {
                          staticStyle: { width: "100%" },
                          attrs: {
                            contenteditable: "true",
                            prop: _vm.formatTitleVal(item.value),
                            content: item.title,
                            params: { scope: scope },
                          },
                          on: {
                            contentChange: function (changeScope) {
                              return _vm.headContentChange(changeScope, item)
                            },
                          },
                        }),
                      ]
                    },
                  },
                  {
                    key: "default",
                    fn: function (scope) {
                      return [
                        _c("SuperDocInput", {
                          staticStyle: { width: "100%" },
                          attrs: {
                            contenteditable: "true",
                            content: scope.row[_vm.formatTitleVal(item.value)],
                            params: { scope: scope },
                          },
                          on: {
                            contentChange: _vm.contentChange,
                            keydown: function (event) {
                              return _vm.tableKeyDonwEvent(event, scope)
                            },
                          },
                        }),
                      ]
                    },
                  },
                ],
                null,
                true
              ),
            })
          }),
          1
        ),
        _vm._v(" "),
        _c("contextMenu", {
          attrs: { list: _vm.contextList },
          on: { contextClick: _vm.contextClick },
        }),
      ],
      1
    )
  };
  var __vue_staticRenderFns__$4 = [];
  __vue_render__$5._withStripped = true;

    /* style */
    const __vue_inject_styles__$4 = function (inject) {
      if (!inject) return
      inject("data-v-13658752_0", { source: ".clickColumnBg {\n  background: rgb(229, 243, 255) !important;\n}\n\n/*# sourceMappingURL=index.vue.map */", map: {"version":3,"sources":["D:\\Company\\agree_project\\super-doc\\packages\\components\\src\\components\\table\\index.vue","index.vue"],"names":[],"mappings":"AA2OA;EACA,yCAAA;AC1OA;;AAEA,oCAAoC","file":"index.vue","sourcesContent":["<template>\r\n    <div @click=\"hiddenContextMenu(true)\">\r\n      <el-table\r\n        :data=\"tableData.table\"\r\n        border\r\n        ref=\"table\"\r\n        style=\"width: 100%; margin-top: 20px\"\r\n        :span-method=\"arraySpanMethod\"\r\n        @header-click=\"tableHeadClick\"\r\n        @header-contextmenu=\"headerContextmenu\"\r\n        :header-cell-class-name=\"cellClassName\"\r\n        :cell-class-name=\"cellClassName\"\r\n      >\r\n        <el-table-column\r\n          v-for=\"(item,index) in tableData.title\"\r\n          :key=\"item.__id__\"\r\n          :index=\"index\"\r\n          :prop=\"formatTitleVal(item.value)\"\r\n        >\r\n          <template slot=\"header\" slot-scope=\"scope\">\r\n             <SuperDocInput\r\n              style=\"width: 100%;\"\r\n              contenteditable=\"true\"\r\n              :prop=\"formatTitleVal(item.value)\"\r\n              :content=\"item.title\"\r\n              :params=\"{scope: scope}\"\r\n              @contentChange=\"(changeScope) => headContentChange(changeScope,item)\"\r\n            />\r\n          </template>\r\n          <template slot-scope=\"scope\">\r\n            <SuperDocInput\r\n              style=\"width: 100%;\"\r\n              contenteditable=\"true\"\r\n              :content=\"scope.row[formatTitleVal(item.value)]\"\r\n              :params=\"{scope: scope}\"\r\n              @contentChange=\"contentChange\"\r\n              @keydown=\"(event) => tableKeyDonwEvent(event,scope)\"\r\n            />\r\n          </template>\r\n        </el-table-column>\r\n      </el-table>\r\n      <contextMenu  @contextClick=\"contextClick\" :list=\"contextList\"/>\r\n    </div>\r\n  </template>\r\n  \r\n  <script>\r\n  import { generateId, getBlockData } from \"@super-doc/api\";\r\n  import SuperDocInput from '../../common/input.vue';\r\n  // import Cell from './cell.vue';\r\n  \r\n  import contextMenu from './contextMenu.vue'\r\n\r\n  export default {\r\n    data() {\r\n      return {\r\n        tableData: {table: [], title: []},\r\n        uuid: generateId(),\r\n        coords: [],\r\n        hiddens: [],\r\n        merges: [],\r\n        currentColumn: null,\r\n        contextList:[{\r\n          label:'向左插入一列',\r\n          operation:\"left\",\r\n        },{\r\n          label:'向右插入一列',\r\n          operation:\"right\",\r\n        }]\r\n      }\r\n    },\r\n    components: {\r\n      SuperDocInput,\r\n      contextMenu\r\n    //   Cell\r\n    },\r\n    methods: {\r\n      init() {\r\n        const _data = getBlockData(this.$attrs[\"block-id\"]).data;\r\n        _data.table.forEach(d => {\r\n          d.__id__ = generateId();\r\n        });\r\n        \r\n        this.tableData = {table: _data.table, title: _data.title};\r\n        _data.mergeInfo?.forEach(item => {\r\n          this.coords.push(item.coord);\r\n          this.merges.push(item.merge);\r\n          this.hiddens.push(...item.hidden);\r\n        })\r\n      },\r\n      formatTitleVal(content) {\r\n        return content.split(\".\")[1].replace(\"}\", \"\"); \r\n      },\r\n      arraySpanMethod({ row, column, rowIndex, columnIndex }) {\r\n        let merge = null;\r\n        this.coords.some((coord, idx) => {\r\n          const [r, c] = coord;\r\n          const [mr, mc] = this.merges[idx]\r\n          if(rowIndex === r && columnIndex === c) {\r\n            merge = [mr, mc];\r\n            return true;\r\n          }\r\n        })\r\n        if(merge) return merge;\r\n\r\n        let hidden = null; \r\n        this.hiddens.some(([ hr, hc ]) => {\r\n          if(rowIndex === hr && columnIndex === hc) {\r\n            hidden = [0, 0];\r\n            return true;\r\n          }\r\n        });\r\n        if(hidden) return [0, 0];\r\n      },\r\n      objectSpanMethod({ row, column, rowIndex, columnIndex }) {\r\n        if (columnIndex === 0) {\r\n          if (rowIndex % 2 === 0) {\r\n            return {\r\n              rowspan: 2,\r\n              colspan: 1,\r\n            };\r\n          } else {\r\n            return {\r\n              rowspan: 0,\r\n              colspan: 0,\r\n            };\r\n          }\r\n        }\r\n      },\r\n      contentChange({content, params}) {\r\n        const propName = params.scope.column.property;\r\n        console.log(content,'yyjs')\r\n        params.scope.row[propName] = content;\r\n      },\r\n      // 头部数据变更\r\n      headContentChange({content, params},item){\r\n         const propName = params.scope.column.property;\r\n         item.title = content\r\n      },\r\n      getRandomLetter(length) {\r\n        var result = '';\r\n        var randomIndex = ''\r\n        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$';\r\n        var charactersLength = characters.length;\r\n        for (var i = 0; i < length; i++) {\r\n           // 首字符不是数字\r\n          if (i === 0) {\r\n            charactersLength = charactersLength - 10\r\n          } \r\n          randomIndex = Math.floor(Math.random() * charactersLength);\r\n          result += characters.charAt(randomIndex);\r\n        }\r\n        return result;\r\n      },\r\n      tableHeadClick(column, event){\r\n        this.currentColumn = column.index;\r\n        this.hiddenContextMenu()\r\n      },\r\n      headerContextmenu(column, event){\r\n        this.hiddenContextMenu()\r\n        this.currentColumn = column.index\r\n        let contextMenu = this.$el.querySelector('.table-context-menu')\r\n        contextMenu.__vue__.contextMenuDisplay = true\r\n        contextMenu.style.left = event.clientX + 'px';\r\n        contextMenu.style.top = event.clientY + 'px';\r\n        event.stopPropagation()\r\n        event.preventDefault()\r\n      },\r\n      // 菜单点击事件\r\n      contextClick(item){\r\n        let column = this.currentColumn\r\n        if(item.operation == 'right'){\r\n          column++\r\n        }\r\n        let key = this.getRandomLetter(7);\r\n        \r\n        //this.tableData.table.forEach(item=>{\r\n        //  item[key] = \"\"\r\n        //})\r\n        let _data = getBlockData(this.$attrs[\"block-id\"]).data;\r\n\r\n         _data.title.splice(column, 0, {\r\n          value: \"${datas[].\" + key + \"}\",\r\n          title: \"新一列\",\r\n        })\r\n        _data.table.forEach(item=>{\r\n          item[key] = \"-\"\r\n        })\r\n        // 响应式问题处理\r\n        this.tableData.title = []\r\n        setTimeout(()=>{\r\n            this.tableData.title = _data.title\r\n        })\r\n        this.hiddenContextMenu()\r\n      },\r\n      cellClassName({row, column, rowIndex, columnIndex}){\r\n        if(columnIndex == this.currentColumn) return 'clickColumnBg'\r\n        return 'default'\r\n      },\r\n      // 表格键盘点击事件\r\n      tableKeyDonwEvent(event,scope){\r\n        this.hiddenContextMenu();\r\n        this.currentColumn = null;\r\n        if (event.keyCode === 13 || event.key == 'Enter') {\r\n          const { $index , row} = scope\r\n          console.log('yyjs:event',event,scope)\r\n          let newRow = Object.create({})\r\n          Object.keys(row).forEach(key =>{\r\n            newRow[key] = key== '__id__' ? generateId() :\"-\"\r\n          })\r\n          this.tableData.table.splice($index+1 , 0,newRow)\r\n          //debugger\r\n          console.log(this.tableData.table,'yyjs:33table',newRow)\r\n         \r\n          event.preventDefault();\r\n          event.stopPropagation();\r\n        }\r\n      },\r\n      // 隐藏右键菜单\r\n      hiddenContextMenu(){\r\n        try{\r\n          let contextMenuList = document.querySelectorAll('.table-context-menu')\r\n          contextMenuList.forEach((item)=>{\r\n           item.__vue__.contextMenuDisplay = false\r\n          })\r\n        }catch(e){\r\n          console.log(`table:隐藏菜单失败`,e)\r\n        }\r\n      }\r\n    },\r\n    mounted() {\r\n      this.init();\r\n    },\r\n  };\r\n  </script>\r\n  <style lang=\"scss\">\r\n    .clickColumnBg{\r\n      background: rgba(229, 243, 255,1) !important;\r\n    }\r\n  </style>\r\n  ",".clickColumnBg {\n  background: rgb(229, 243, 255) !important;\n}\n\n/*# sourceMappingURL=index.vue.map */"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$4 = undefined;
    /* module identifier */
    const __vue_module_identifier__$4 = undefined;
    /* functional template */
    const __vue_is_functional_template__$4 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$4 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$4 },
      __vue_inject_styles__$4,
      __vue_script__$4,
      __vue_scope_id__$4,
      __vue_is_functional_template__$4,
      __vue_module_identifier__$4,
      false,
      createInjector,
      undefined,
      undefined
    );

  class TableDoc extends BlockBase {
    config = null;
    platform = "vue";
    constructor(options) {
      super(options);
      if (!options) return;
      const { config, ...other } = options;
      this.config = config;

      this.editor = true;
    }

    render() {
      return __vue_component__$4;
    }
    copyEventCallBack(context,event, blockInstance){
      console.log('copy');
    }
    cutEventCallBack(context,event,cutData, blockInstance){}

    compileData(blockInstance,text){
      return []
    }
  }

  //

  var script$3 = {
    props: ['listData', 'isFocus', 'type',"blockId"],
    methods: {
      keydownHandler(event) {
        console.log('删除');
        // 回车添加
        if (event.keyCode === 13) {
          event.preventDefault();
          event.stopPropagation();
          this.$emit('addHandler', this.listData.id);
        } else if(event.keyCode === 8 && !this.listData.text) {
          this.$emit('remove', this.listData.id);
        }
      },
      init() {
        const _div = document.createElement('div');
        _div.innerHTML = this.listData.text;
        syncDom(this.$refs['list-content'], _div);

        if(this.isFocus) {
          this.$refs['list-content'].focus(); 
        }
      },
      contentChange(content) {
        this.$emit("updateContent", {id: this.listData.id, content: event.target.innerHTML});
      }
    },
    mounted() {
      this.init();
    }
  };

  /* script */
  const __vue_script__$3 = script$3;

  /* template */
  var __vue_render__$4 = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        staticClass: "super-list-container",
        attrs: { "parent-id": _vm.blockId },
      },
      [
        _c(
          "div",
          { staticClass: "super-list-icon", attrs: { contenteditable: "false" } },
          [_vm._v(_vm._s(_vm.type))]
        ),
        _vm._v(" "),
        _c("div", {
          key: _vm.listData.id,
          ref: "list-content",
          staticClass: "super-list-content",
          staticStyle: { width: "100%", "min-height": "22px" },
          attrs: { contenteditable: "", id: _vm.listData.id },
          on: {
            keydown: function ($event) {
              $event.stopPropagation();
              return _vm.keydownHandler.apply(null, arguments)
            },
            input: function ($event) {
              $event.stopPropagation();
              if ($event.target !== $event.currentTarget) {
                return null
              }
              return _vm.contentChange.apply(null, arguments)
            },
          },
        }),
      ]
    )
  };
  var __vue_staticRenderFns__$3 = [];
  __vue_render__$4._withStripped = true;

    /* style */
    const __vue_inject_styles__$3 = function (inject) {
      if (!inject) return
      inject("data-v-730285d3_0", { source: ".super-list-container[data-v-730285d3] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: flex-start;\n}\n.super-list-container > .super-list-icon[data-v-730285d3] {\n  margin-right: 10px;\n  font-weight: 600;\n}\n\n/*# sourceMappingURL=DivEditable.vue.map */", map: {"version":3,"sources":["D:\\Company\\agree_project\\super-doc\\packages\\components\\src\\components\\list\\DivEditable.vue","DivEditable.vue"],"names":[],"mappings":"AAuDA;EACA,aAAA;EACA,uBAAA;EACA,2BAAA;ACtDA;ADuDA;EACA,kBAAA;EACA,gBAAA;ACrDA;;AAEA,0CAA0C","file":"DivEditable.vue","sourcesContent":["<template>\r\n  <div class=\"super-list-container\" :parent-id=\"blockId\">\r\n    <div class=\"super-list-icon\" contenteditable=\"false\" >{{ type }}</div>\r\n    <div\r\n      contenteditable\r\n      ref=\"list-content\"\r\n      class=\"super-list-content\"\r\n      style=\"width: 100%; min-height: 22px\"\r\n      :id=\"listData.id\"\r\n      :key=\"listData.id\"\r\n      @keydown.stop=\"keydownHandler\"\r\n      @input.stop.self=\"contentChange\"\r\n    ></div>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport {\r\n  syncDom,\r\n} from \"@super-doc/api\";\r\n\r\nexport default {\r\n  props: ['listData', 'isFocus', 'type',\"blockId\"],\r\n  methods: {\r\n    keydownHandler(event) {\r\n      console.log('删除')\r\n      // 回车添加\r\n      if (event.keyCode === 13) {\r\n        event.preventDefault();\r\n        event.stopPropagation();\r\n        this.$emit('addHandler', this.listData.id);\r\n      } else if(event.keyCode === 8 && !this.listData.text) {\r\n        this.$emit('remove', this.listData.id);\r\n      }\r\n    },\r\n    init() {\r\n      const _div = document.createElement('div');\r\n      _div.innerHTML = this.listData.text;\r\n      syncDom(this.$refs['list-content'], _div);\r\n\r\n      if(this.isFocus) {\r\n        this.$refs['list-content'].focus(); \r\n      }\r\n    },\r\n    contentChange(content) {\r\n      this.$emit(\"updateContent\", {id: this.listData.id, content: event.target.innerHTML});\r\n    }\r\n  },\r\n  mounted() {\r\n    this.init();\r\n  }\r\n};\r\n</script>\r\n\r\n<style lang=\"scss\" scoped>\r\n.super-list-container {\r\n  display: flex;\r\n  align-items: flex-start;\r\n  justify-content: flex-start;\r\n  > .super-list-icon {\r\n    margin-right: 10px;\r\n    font-weight: 600;\r\n  }\r\n}\r\n</style>\r\n",".super-list-container {\n  display: flex;\n  align-items: flex-start;\n  justify-content: flex-start;\n}\n.super-list-container > .super-list-icon {\n  margin-right: 10px;\n  font-weight: 600;\n}\n\n/*# sourceMappingURL=DivEditable.vue.map */"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$3 = "data-v-730285d3";
    /* module identifier */
    const __vue_module_identifier__$3 = undefined;
    /* functional template */
    const __vue_is_functional_template__$3 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$3 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$3 },
      __vue_inject_styles__$3,
      __vue_script__$3,
      __vue_scope_id__$3,
      __vue_is_functional_template__$3,
      __vue_module_identifier__$3,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  var script$2 = {
    props: ["$superConfig"],
    data() {
      return {
        list: [],
        focusId: '',
        listType: 'ul'
      };
    },
    components: {
      ListItem: __vue_component__$3,
    },
    methods: {
      updateContent({id, content}) {
        this.list.some((item) => {
          if(item.id === id) {
            item.text = content;
            return true;
          }
        });
        console.log('当前数据：', this.list);
      },
      keydownHandler(id) {
        this.list.some((item, i) => {
          if (item.id === id) {
            const nId = generateId();
            this.focusId = nId;
            this.list.splice(i + 1, 0, { text: "", id: nId });
            return true;
          }
        });
      },
      removeHandler(id) {
        const index = this.list.findIndex(item => item.id === id);
        this.list.PROXY_TARGET.splice(index, 1);
        const selection = window.getSelection();
        if(this.list.length == 0){
          // 空数据替换成p标签内容
          let manager = this.$superConfig.blockData.BlockManager;
          let focusId = manager.curentFocusBlock.id;
          manager.replaceCurrentBlock(this.list,focusId);
        }else {
          // 聚焦上一条
          let preIndex = index - 1;
          let preListItem = this.list[preIndex];
          let preListDom = document.querySelector(`[id="${preListItem?.id}"]`);
          if(preListDom){
             preListDom.focus();
            if (preListItem.text.length > 0) {
              let range = document.createRange();
              range.setStart(preListDom.firstChild,preListItem.text.length);
              range.setEnd(preListDom.firstChild,preListItem.text.length);
              range.collapse(true);
              selection.removeAllRanges();
              selection.addRange(range);
           }
          }
          console.log(this.$superConfig.blockData,'editor;lfjs',index,this.list);
        }
      },
      initData() {
        const { list: _list, type ,} = findBlockDataForId(this.$superConfig.blockId);
        _list.forEach((item) => {
          item.id = item.id ? item.id : generateId();
          this.focusId = this.focusId ? this.focusId : item.id;
          return item;
        });
        this.list = _list;
        this.listType = type;
      },
      contentChange({id, text}) {
        this.list.some(item => {
          if(item.id === id) {
            item.text = text;
            return true;
          }
        });
      }
    },
    mounted() {
      this.initData();
    }
  };

  /* script */
  const __vue_script__$2 = script$2;

  /* template */
  var __vue_render__$3 = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      _vm._l(_vm.list, function (item, index) {
        return _c("ListItem", {
          key: item.id,
          staticClass: "list-item",
          attrs: {
            blockId: _vm.$superConfig.blockId,
            listData: item,
            isFocus: _vm.focusId,
            type: _vm.listType.toUpperCase() === "UL" ? "•" : index + 1,
          },
          on: {
            addHandler: _vm.keydownHandler,
            updateContent: _vm.updateContent,
            remove: _vm.removeHandler,
          },
        })
      }),
      1
    )
  };
  var __vue_staticRenderFns__$2 = [];
  __vue_render__$3._withStripped = true;

    /* style */
    const __vue_inject_styles__$2 = function (inject) {
      if (!inject) return
      inject("data-v-92493118_0", { source: "\n.list-item[data-v-92493118]{\r\n  margin-top: 2.6px;\r\n  margin-bottom: 2.6px;\r\n  padding-left: 0px;\n}\r\n", map: {"version":3,"sources":["D:\\Company\\agree_project\\super-doc\\packages\\components\\src\\components\\list\\index.vue"],"names":[],"mappings":";AAgHA;EACA,iBAAA;EACA,oBAAA;EACA,iBAAA;AACA","file":"index.vue","sourcesContent":["<template>\r\n  <div>\r\n    <ListItem\r\n      v-for=\"(item, index) in list\"\r\n      :blockId=\"$superConfig.blockId\"\r\n      :listData=\"item\"\r\n      :key=\"item.id\"\r\n      :isFocus=\"focusId\"\r\n      :type=\"listType.toUpperCase() === 'UL' ? '•' : index + 1\"\r\n      @addHandler=\"keydownHandler\"\r\n      @updateContent=\"updateContent\"\r\n      @remove=\"removeHandler\"\r\n      class=\"list-item\"\r\n    ></ListItem>\r\n  </div>\r\n</template>\r\n<script>\r\nimport {\r\n  showCommand,\r\n  addListener,\r\n  syncDom,\r\n  markdownSyntaxTransform,\r\n  findBlockDataForId,\r\n  generateId,\r\n} from \"@super-doc/api\";\r\n\r\nimport ListItem from \"./DivEditable.vue\";\r\nexport default {\r\n  props: [\"$superConfig\"],\r\n  data() {\r\n    return {\r\n      list: [],\r\n      focusId: '',\r\n      listType: 'ul'\r\n    };\r\n  },\r\n  components: {\r\n    ListItem,\r\n  },\r\n  methods: {\r\n    updateContent({id, content}) {\r\n      this.list.some((item) => {\r\n        if(item.id === id) {\r\n          item.text = content;\r\n          return true;\r\n        }\r\n      })\r\n      console.log('当前数据：', this.list);\r\n    },\r\n    keydownHandler(id) {\r\n      this.list.some((item, i) => {\r\n        if (item.id === id) {\r\n          const nId = generateId();\r\n          this.focusId = nId;\r\n          this.list.splice(i + 1, 0, { text: \"\", id: nId });\r\n          return true;\r\n        }\r\n      });\r\n    },\r\n    removeHandler(id) {\r\n      const index = this.list.findIndex(item => item.id === id);\r\n      this.list.PROXY_TARGET.splice(index, 1);\r\n      const selection = window.getSelection();\r\n      if(this.list.length == 0){\r\n        // 空数据替换成p标签内容\r\n        let manager = this.$superConfig.blockData.BlockManager\r\n        let focusId = manager.curentFocusBlock.id;\r\n        manager.replaceCurrentBlock(this.list,focusId)\r\n      }else{\r\n        // 聚焦上一条\r\n        let preIndex = index - 1;\r\n        let preListItem = this.list[preIndex]\r\n        let preListDom = document.querySelector(`[id=\"${preListItem?.id}\"]`)\r\n        if(preListDom){\r\n           preListDom.focus()\r\n          if (preListItem.text.length > 0) {\r\n            let range = document.createRange();\r\n            range.setStart(preListDom.firstChild,preListItem.text.length)\r\n            range.setEnd(preListDom.firstChild,preListItem.text.length)\r\n            range.collapse(true);\r\n            selection.removeAllRanges();\r\n            selection.addRange(range);\r\n         }\r\n        }\r\n        console.log(this.$superConfig.blockData,'editor;lfjs',index,this.list)\r\n      }\r\n    },\r\n    initData() {\r\n      const { list: _list, type ,} = findBlockDataForId(this.$superConfig.blockId);\r\n      _list.forEach((item) => {\r\n        item.id = item.id ? item.id : generateId();\r\n        this.focusId = this.focusId ? this.focusId : item.id;\r\n        return item;\r\n      });\r\n      this.list = _list;\r\n      this.listType = type;\r\n    },\r\n    contentChange({id, text}) {\r\n      this.list.some(item => {\r\n        if(item.id === id) {\r\n          item.text = text;\r\n          return true;\r\n        }\r\n      })\r\n    }\r\n  },\r\n  mounted() {\r\n    this.initData();\r\n  }\r\n};\r\n</script>\r\n<style scoped>\r\n.list-item{\r\n  margin-top: 2.6px;\r\n  margin-bottom: 2.6px;\r\n  padding-left: 0px;\r\n}\r\n</style>\r\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$2 = "data-v-92493118";
    /* module identifier */
    const __vue_module_identifier__$2 = undefined;
    /* functional template */
    const __vue_is_functional_template__$2 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$2 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      false,
      createInjector,
      undefined,
      undefined
    );

  class ListDoc extends BlockBase {
    config = null;
    platform = "vue";
    constructor(options) {
      super(options);
      if (!options) return;
      const { config, ...other } = options;
      this.config = config;
      
      this.editor = false;
    }

    render() {
      return __vue_component__$2;
    }

    copyEventCallBack(context,event,blockInstance){
      console.log(`【superDoc】: 执行复制_ListDoc`);
      // let manager = context.Event["Editor"].BlockManager
      // let listDocArr = copyDom.querySelectorAll("[id]")
      // let listObject = generateListData(blockInstance.data.type)
      // listDocArr.forEach((item)=>{
      //   listObject.data.list.push({id: _.generateBlockId(),text:item.innerHTML})
      // })
      // manager.currentCopyBlockInfo.data.push(listObject)
    }
    cutEventCallBack(context,event,cutData, blockInstance){
      console.log(`【superDoc】: 执行剪切_ListDoc`,cutData,blockInstance);
      let manager = context.Event.Editor.BlockManager;
      let listDoc = blockInstance.element.querySelectorAll("[id]");
      if(listDoc.length==0){
        manager.removeBlock(cutData.id);
      }else {
        let list = blockInstance.data.list;
        for(let i=0; i<= list.length-1; i++){
          let element = [...listDoc].find((f)=> f.getAttribute('id') == list[i].id);
          if(element){
            if(element.innerHTML){ // 有文本覆盖
              list[i].text = element.innerHTML;
            }else {
              // 无文本删除内容
              list.splice(i,1);
              i--;
            }
          }else {
            list.splice(i,1);
            i--;
          }
        }
      }
    }

    pasteEventCallBack(context,event){
      console.log(`【superDoc】: 执行粘贴_ListDoc`);
      let manager = context.Event["Editor"].BlockManager;
      let focusBlock = manager.curentFocusBlock;
      let { block, type, status, data} = manager.currentCopyBlockInfo;
      let deepCloneBlock = deepCloneRefreshId(data, ["id"]) ;
      if(type == "text"){
        return
      }
      // 判断内容类型是否全都是ListDoc  否则 截断当前内容 TODO
      let targetId = event.target.getAttribute("id");
      focusBlock.data.list.some((item,i)=>{
        if(item=> item.id == targetId){
          return true
        }
      });
      if(deepCloneBlock.every(i=>["ul","ol"].includes(i.data.type)));
        //暂时处理: 粘贴的是块级节点 , 直接添加到当前节点尾部
        const currentBlockIndex = manager.blocks.findIndex(block => block.id === focusBlock.id);
        manager.blocks.splice(currentBlockIndex + 1, 0, ...deepCloneBlock);
        event.preventDefault();

     
    }

    compileData(blockInstance,text){
      return [compileListData([{text}],blockInstance.data.type)]
    }

    selectionCallBack(context,event,copyDom, blockInstance){
      console.log(`【superDoc】: 执行选中回调_ListDoc`);
      let manager = context.Editor.BlockManager;
      let listDocArr = copyDom.querySelectorAll("[id]");
      let listObject = generateListData(blockInstance.data.type);
      listDocArr.forEach((item)=>{
        // _.generateBlockId()
        listObject.data.list.push({id: item.getAttribute('id'),text:item.innerHTML});
        manager.currentSelectionBlockInfo.selectionContent.push(item.innerHTML);
      });
      listObject.id = blockInstance.id;
      manager.currentSelectionBlockInfo.data.push(listObject);

      // •
    }
  }

  //
  var script$1 = {
    props: ["todo", "focus", "blockId"],
    data() {
      return {
        foucsFlag:false,
      };
    },
    components: {
      SuperDocInput: __vue_component__$a,
    },
    methods: {
      init() {
        if(this.focus) {
          this.$refs['superDocInput'].$refs['super-paragraph'].focus();
        } 
      },
      contentChange({content, id}) {
        /**
         * 更新data后续改成sdk提供的方法
         */
        console.log("-----", this.todo);  
        this.todo.task = content;
      },
      enterKeydownHandler(event) {
        if (event.keyCode === 13 && this.todo.task) {
          event.preventDefault();
          event.stopPropagation();
          this.$emit("add", this.todo.id);
        } else if (event.keyCode === 13 && !this.todo.task) {
          this.$emit("remove", this.todo.id);
        }
      },
      focusChange(flag){
        this.foucsFlag = flag;
      }
    },
    mounted() {
      this.init();
      console.log("新增的任务：", this.todo);
    },
    watch: {
      "todo.task"(n) {
        const _temp = document.createElement("div");
        _temp.innerHTML = n;
        this.$refs["superDocInput"].syncDom(_temp);
      },
    },
  };

  /* script */
  const __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$2 = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        staticClass: "super-doc-todo-option-container",
        class: [_vm.foucsFlag ? "foucs-style" : ""],
        attrs: { "parent-id": _vm.blockId, "task-id": _vm.todo.id },
        on: { keydown: _vm.enterKeydownHandler },
      },
      [
        _c("el-checkbox", {
          staticClass: "icon",
          attrs: { size: "small" },
          model: {
            value: _vm.todo.finish,
            callback: function ($$v) {
              _vm.$set(_vm.todo, "finish", $$v);
            },
            expression: "todo.finish",
          },
        }),
        _vm._v(" "),
        _c("SuperDocInput", {
          ref: "superDocInput",
          class: { finish: _vm.todo.finish },
          staticStyle: { width: "calc(650px - 24px)" },
          attrs: { contenteditable: !_vm.todo.finish, content: _vm.todo.task },
          on: { contentChange: _vm.contentChange, focusChange: _vm.focusChange },
        }),
      ],
      1
    )
  };
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$2._withStripped = true;

    /* style */
    const __vue_inject_styles__$1 = function (inject) {
      if (!inject) return
      inject("data-v-ef2d8e56_0", { source: ".super-doc-todo-option-container[data-v-ef2d8e56] {\n  display: flex;\n  align-items: baseline;\n  border-left: 4px solid transparent;\n  border-radius: 4px;\n  padding: 2px 2px 2px 0;\n  transform: translateX(-4px);\n  transition: background-color 0.1s ease-in;\n  width: 100%;\n}\n.super-doc-todo-option-container > .icon[data-v-ef2d8e56] {\n  margin-right: 10px;\n}\n.super-doc-todo-option-container .finish[data-v-ef2d8e56] {\n  color: #ccc;\n}\n.super-doc-todo-option-container[data-v-ef2d8e56]:hover {\n  background-color: var(--we_overlay_light_color, rgba(23, 26, 29, 0.06));\n}\n.foucs-style[data-v-ef2d8e56] {\n  background-color: var(--we_overlay_light_color, rgba(23, 26, 29, 0.06));\n}\n", map: {"version":3,"sources":["todoItem.vue"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,qBAAqB;EACrB,kCAAkC;EAClC,kBAAkB;EAClB,sBAAsB;EACtB,2BAA2B;EAC3B,yCAAyC;EACzC,WAAW;AACb;AACA;EACE,kBAAkB;AACpB;AACA;EACE,WAAW;AACb;AACA;EACE,uEAAuE;AACzE;AACA;EACE,uEAAuE;AACzE","file":"todoItem.vue","sourcesContent":[".super-doc-todo-option-container {\n  display: flex;\n  align-items: baseline;\n  border-left: 4px solid transparent;\n  border-radius: 4px;\n  padding: 2px 2px 2px 0;\n  transform: translateX(-4px);\n  transition: background-color 0.1s ease-in;\n  width: 100%;\n}\n.super-doc-todo-option-container > .icon {\n  margin-right: 10px;\n}\n.super-doc-todo-option-container .finish {\n  color: #ccc;\n}\n.super-doc-todo-option-container:hover {\n  background-color: var(--we_overlay_light_color, rgba(23, 26, 29, 0.06));\n}\n.foucs-style {\n  background-color: var(--we_overlay_light_color, rgba(23, 26, 29, 0.06));\n}\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$1 = "data-v-ef2d8e56";
    /* module identifier */
    const __vue_module_identifier__$1 = undefined;
    /* functional template */
    const __vue_is_functional_template__$1 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  var script = {
    data() {
      return {
        list: getBlockData(this.$attrs["block-id"]).data.list,
        blockId: this.$attrs["block-id"],
        focusId: ''
      };
    },
    components: {
      TodoItem: __vue_component__$1,
    },
    methods: {
      initData() {
        this.list.forEach((item) => (item.id = generateId()));
      },
      addHandler(id) {
        const focusId = generateId();
        this.list.some((item, index) => {
          if (item.id === id) {
            this.list.splice(index + 1, 0, {
              task: "",
              id: focusId,
              finish: false,
            });
            return true;
          }
        });
        this.focusId = focusId;
      },
      removeHandler(id) {
        this.list.some((item, index) => {
          if (item.id === id) {
            this.list.splice(index, 1);
            return true;
          }
        });
      },
    },
    created() {
      this.initData();
    },
    mounted() {
    },
  };

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__$1 = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "todo-container" },
      _vm._l(_vm.list, function (todo) {
        return _c("TodoItem", {
          key: todo.id,
          staticStyle: {
            "margin-top": "2.6px",
            "margin-bottom": "2.6px",
            "padding-left": "0px",
          },
          attrs: { todo: todo, focus: _vm.focusId === todo.id },
          on: { add: _vm.addHandler, remove: _vm.removeHandler },
        })
      }),
      1
    )
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__$1._withStripped = true;

    /* style */
    const __vue_inject_styles__ = undefined;
    /* scoped */
    const __vue_scope_id__ = "data-v-0a35971c";
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      undefined,
      undefined,
      undefined
    );

  class TodoList extends BlockBase {
    config = null;
    platform = "vue";
    constructor(options) {
      super(options);
      if (!options) return;
      const { config, ...other } = options;
      this.config = config;

      this.editor = true;
    }

    render() {
      return __vue_component__;
    }
     copyEventCallBack(context,event,blockInstance){
      console.log(`【superDoc】: 执行复制_TodoList`);
      // let manager = context.Event["Editor"].BlockManager
      // let todoArr = copyDom.querySelectorAll("[id]")
      // let todoObject = generateTodoData()
      // todoArr.forEach((item)=>{
      //   todoObject.data.list.push({id: _.generateBlockId(),task:item.innerHTML})
      // })
      // manager.currentCopyBlockInfo.data.push(listObject)
    }


    pasteEventCallBack(context,event){
      console.log(`【superDoc】: 执行粘贴_TodoList`);
      let manager = context.Event["Editor"].BlockManager;
      let focusBlock = manager.curentFocusBlock;
      let { block, type, status, data} = manager.currentCopyBlockInfo;
      let deepCloneBlock = deepCloneRefreshId(data, ["id"]) ;
      if(type == "text"){
        return
      }
        //暂时处理: 粘贴的是块级节点 , 直接添加到当前节点尾部
        const currentBlockIndex = manager.blocks.findIndex(block => block.id === focusBlock.id);
        manager.blocks.splice(currentBlockIndex + 1, 0, ...deepCloneBlock);
        event.preventDefault();
    }
    cutEventCallBack(context,event,cutData,blockInstance){
      context.Event.Editor.BlockManager;

    }


    compileData(blockInstance,text){
      return [compileTodoData([{task:text,finish:false}])]
    }

    selectionCallBack(context,event,copyDom, blockInstance){
      console.log(`【superDoc】: 执行复制_TodoList`);
      let manager = context.Editor.BlockManager;
      let todoArr = copyDom.querySelectorAll("[id]");
      let todoObject = generateTodoData();
      todoArr.forEach((item)=>{
        // _.generateBlockId()
        todoObject.data.list.push({id: item.getAttribute("id"),task:item.innerHTML});
      });
      todoObject.id = blockInstance.id;

      manager.currentSelectionBlockInfo.data.push(listObject);
    }
  }

  /* script */

  /* template */
  var __vue_render__ = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", [_vm._v("AUAE编辑器")])
  };
  __vue_render__._withStripped = true;

  class ParagraphTool extends ToolPluginBase {
      type = "Paragraph";
      text = "段落";
      icon = null;
      nodeName = ["P","p"]

    
      blockData = generateParagraphData();
    
      constructor(options) {
        super(options);
        this.getIcon();
      }
    
      getIcon() {
        const div = document.createElement("div");
        div.textContent = "H";
        return div;
      }
      complieHTMLToBlockData(node,blockData){
        if(typeof node.innerHTML !== "undefined") {
          // 为了能够每个元素都能编辑，遍历元素追加内容
          this.loopAddStyle(node,{outline:"none",},{ tabIndex: 0 });
          blockData.push(...compileParagraph(node.innerHTML.split("\n").join('')));

        }
          // blockData.push(..._.compileParagraph(node.innerHTML))
      }

      deComplieBlockDataToHTML(block){
        return  `<p>${block.data.text}</p>`
      }

      compileMdToBlockData(str,blockData){
        blockData.push(...compileParagraph(str));
      }
     
  }

  class AITool extends ToolPluginBase {
    type = 'AI';
    text = 'AI';
    icon = null;

    blockData = {
      type: this.type,
      data: {
        text: ''
      },
      class: this.type
    };

    constructor(options) {
      super(options);
      this.getIcon();
    }

    getIcon() {
      const div = document.createElement('div');
      div.textContent = 'H';
      return div;
    }
  }


  // useUpdate(() => {}, [block.data.text]);
  // useAdd(() => {})
  // useDelete(() => {})

  class HeadTool1 extends ToolPluginBase {
    type = "Head";
    text = "H1 一级标题";
    icon = null;
    nodeName = ["h1","H1"]


    blockData = {
      type: this.type,
      data: {
        text: "",
        level: "h1",
      },
      class: this.type,
    };

    constructor(options) {
      super(options);
      this.getIcon();
    }

    getIcon() {
      const div = document.createElement("div");
      div.textContent = "H";
      return div;
    }
    complieHTMLToBlockData(node,blockData){
      if(typeof node.innerHTML !== "undefined") {
        this.loopAddStyle(node,{outline:"none",},{ tabIndex: 0 });
        blockData.push(...compileHead(node.innerHTML.split("\n").join(''),node.nodeName.toLowerCase()));
      }
    }
    deComplieBlockDataToHTML(block){
      return `<${block.data.level}>${block.data.text}</${block.data.level}>`
    }

    checkMdToolType(str){
      if(str.startsWith("# ")){
        return true
      }
    }

    compileMdToBlockData(str,blockData){
      blockData.push(...compileHead(str.replace('# ', ''), 'h1'));
    }

  }
  class HeadTool2 extends ToolPluginBase {
    type = "Head";
    text = "H2 二级标题";
    nodeName = ["h2","H2"]
    icon = null;

    blockData = {
      type: this.type,
      data: {
        text: "",
        level: "h2",
      },
      class: this.type,
    };

    constructor(options) {
      super(options);
      this.getIcon();
    }

    getIcon() {
      const div = document.createElement("div");
      div.textContent = "H";
      return div;
    }
    complieHTMLToBlockData(node,blockData){
      if(typeof node.innerHTML !== "undefined") {
        this.loopAddStyle(node,{outline:"none",},{ tabIndex: 0 });
        blockData.push(...compileHead(node.innerHTML.split("\n").join(''),node.nodeName.toLowerCase()));
      }
      // blockData.push(..._.compileHead(node.innerHTML,node.nodeName.toLowerCase()))
    }
    deComplieBlockDataToHTML(block){
      return `<${block.data.level}>${block.data.text}</${block.data.level}>`
    }

    checkMdToolType(str){
      if(str.startsWith("## ")){
        return true
      }
    }

    compileMdToBlockData(str,blockData){
      blockData.push(...compileHead(str.replace('## ', ''), 'h2'));
    }
  }
  class HeadTool3 extends ToolPluginBase {
    type = "Head";
    text = "H3 三级标题";
    icon = null;
    nodeName = ["h3","H3"]
    blockData = {
      type: this.type,
      data: {
        text: "",
        level: "h3",
      },
      class: this.type,
    };

    constructor(options) {
      super(options);
      this.getIcon();
    }

    getIcon() {
      const div = document.createElement("div");
      div.textContent = "H";
      return div;
    }
    complieHTMLToBlockData(node,blockData){
      if(typeof node.innerHTML !== "undefined") {
        this.loopAddStyle(node,{outline:"none",},{ tabIndex: 0 });
        blockData.push(...compileHead(node.innerHTML.split("\n").join(''),node.nodeName.toLowerCase()));
      }
    }
    deComplieBlockDataToHTML(block){
      return `<${block.data.level}>${block.data.text}</${block.data.level}>`
    }

    checkMdToolType(str){
      if(str.startsWith("### ")){
        return true
      }
    }

    compileMdToBlockData(str,blockData){
      blockData.push(...compileHead(str.replace('### ', ''), 'h3'));
    }
  }
  class HeadTool4 extends ToolPluginBase {
    type = "Head";
    text = "H4 四级标题";
    nodeName = ["h4","H4"]
    icon = null;

    blockData = {
      type: this.type,
      data: {
        text: "",
        level: "h4",
      },
      class: this.type,
    };

    constructor(options) {
      super(options);
      this.getIcon();
    }

    getIcon() {
      const div = document.createElement("div");
      div.textContent = "H";
      return div;
    }
    complieHTMLToBlockData(node,blockData){
      if(typeof node.innerHTML !== "undefined") {
        this.loopAddStyle(node,{outline:"none",},{ tabIndex: 0 });
        blockData.push(...compileHead(node.innerHTML.split("\n").join(''),node.nodeName.toLowerCase()));
      }
    }
    deComplieBlockDataToHTML(block){
      return `<${block.data.level}>${block.data.text}</${block.data.level}>`
    }

    checkMdToolType(str){
      if(str.startsWith("#### ")){
        return true
      }
    }

    compileMdToBlockData(str,blockData){
      blockData.push(...compileHead(str.replace('#### ', ''), 'h4'));
    }
  }

  class ImageTool extends ToolPluginBase {
      type = "ImageDoc";
      text = "图片";
      icon = null;
      nodeName = ["img","IMG"]

      blockData = {
        type: this.type,
        data: {
          desc: '',
          url: ''
        },
        class: this.type,
      };
    
      constructor(options) {
        super(options);
        this.getIcon();
      }
    
      getIcon() {
        const div = document.createElement("div");
        div.textContent = "图片";
        return div;
      }
      complieHTMLToBlockData(node,blockData){
        let desc = node.getAttribute("alt");
        let url = node.getAttribute("src");
        blockData.push(compileImageData({desc,url}));
      }

      deComplieBlockDataToHTML(block){
        return `<div class="">\r\n <img alt="${block.data.desc}" src="${block.data.url}" />\r\n </div>`
      }

      checkMdToolType(str){
          let exp = /!\[.*?\]\(.*?\)/;
          return exp.test(str)
      }
      compileMdToBlockData(str,blockData){
        let urlList = str.match(/\((.*?)\)/);
        let descList = str.match(/\[(.*?)\]/);
        blockData.push(compileImageData({desc:descList[1],url:urlList[1]}));
      }

  }

  class TableTool extends ToolPluginBase {
    type = "TableDoc";
    text = "表格";
    icon = null;

    blockData = {
      type: this.type,
      data: {
        table: [
          {
            enName: "Taxableinformation",
            name: "应缴信息",
            description: "-",
            id: "05cOkDnN",
          },
          {
            enName: "Role",
            name: "角色",
            description: "-",
            id: "2lPmQ0HO",
          },
          {
            enName: "Authority",
            name: "权限",
            description: "-",
            id: "7hm6pr99",
          },
          {
            enName: "SettlementAccountInfo",
            name: "结算账户信息",
            description: "-",
            id: "AN0oELJG",
          },
          {
            enName: "Merchantcontract",
            name: "商户合约",
            description: "-",
            id: "dBmxm7aN",
          },
          {
            enName: "CustomerContract",
            name: "客户合约",
            description: "-",
            id: "e7PYF8ZN",
          },
          {
            enName: "Collect",
            name: "代收",
            description: "-",
            id: "epMNsvPj",
          },
          {
            enName: "TempAccountInformation",
            name: "暂存账户信息",
            description: "-",
            id: "heTQfdyD",
          },
          {
            enName: "MerchantContractApplicationForm",
            name: "商户合约申请单",
            description: "-",
            id: "Hh7DPJ3y",
          },
          {
            enName: "MerchantInformation",
            name: "商户信息",
            description: "-",
            id: "Ii0fOZ1S",
          },
          {
            enName: "CustomerContractApplicationForm",
            name: "客户合约申请单",
            description: "-",
            id: "LKYun9WI",
          },
          {
            enName: "Collectablerecordstatus",
            name: "代收记录状态",
            description: "-",
            id: "mmodB9uk",
          },
          {
            enName: "MerchantContract",
            name: "商户合约",
            description: "-",
            id: "NRDQosvs",
          },
          {
            enName: "Billpaymenthistory",
            name: "缴费记录",
            description: "-",
            id: "RyQTzPUu",
          },
          {
            enName: "Merchantsettlementaccountinfo",
            name: "商户结算账户信息",
            description: "-",
            id: "SGP2StmW",
          },
          {
            enName: "CustomerInformation",
            name: "客户信息",
            description: "-",
            id: "YH8guijP",
          },
          {
            enName: "User",
            name: "用户",
            description: "-",
            id: "zDtefAYX",
          },
        ],
        title: [
          {
            value: "${datas[].name}",
            title: "中文",
          },
          {
            value: "${datas[].enName}",
            title: "英文"
          },
          {
            value: "${datas[].description}",
            title: "业务含义"
          }
        ],
      },
      class: this.type,
    };

    constructor(options) {
      super(options);
      this.getIcon();
    }

    getIcon() {
      const div = document.createElement("div");
      div.textContent = "表格";
      return div;
    }
  }

  class ListTool extends ToolPluginBase {
    type = "ListDoc";
    text = "列表";
    icon = null;
    nodeName = ["UL","OL","ol","ul"]

    blockData = {
      type: this.type,
      data: {
        type: "ul",
        list: [{ text: "", id: generateBlockId() }],
      },
      class: this.type,
    };

    constructor(options) {
      super(options);
      this.getIcon();
    }

    getIcon() {
      const div = document.createElement("div");
      div.textContent = "L";
      return div;
    }
    complieHTMLToBlockData(node,blockData){
      let list = [];
      node.childNodes.forEach((c)=> {
        if(typeof c.innerHTML !== "undefined") list.push({text:c.innerHTML});
      });
      blockData.push(compileListData(list,node.nodeName.toLowerCase()));
    }

    deComplieBlockDataToHTML(block){
      return `<${block.data.type}>${block.data.list.map(item=>{ return `<li>${item.text}</li>`}).join('\r\n')}</${block.data.type}>`
    }

    // checkMdToolType(str){
    //   if(str.startsWith("- ")){
    //     return true
    //   }
    //   if(str.startsWith("+ ")){
    //     return true
    //   }
    // }

    // compileMdToBlockData(str,blockData){
    //   blockData.push(..._.compileListData(str))
    // }
  }

  class TodoListTool extends ToolPluginBase {
    type = "TodoList";
    text = "代办列表";
    icon = null;

    blockData = {
      type: this.type,
      data: {
        list: [{ id: generateBlockId(), finish: false, task: "" }],
      },
      class: this.type,
    };

    constructor(options) {
      super(options);
      this.getIcon();
    }

    getIcon() {
      const div = document.createElement("div");
      div.textContent = "L";
      return div;
    }
  }

  class DeleteTool extends ToolLayoutBase {
    type = "Delete";
    text = "删除";
    icon = null;

    blockData = {
      type: this.type,
      data: {},
      class: this.type,
    };

    constructor(options) {
      super(options);
      this.getIcon();
    }

    getIcon() {
      const div = document.createElement("div");
      div.textContent = "H";
      return div;
    }

    action({ Editor }) {
      this.Editor = Editor;
      const { BlockManager } = this.Editor;
      const { currentHoverBlockId } = BlockManager;
      BlockManager.removeBlock(currentHoverBlockId);
    }
  }

  class MoveDownTool extends ToolLayoutBase {
    type = "MoveDown";
    text = "下移";
    icon = null;

    blockData = {
      type: this.type,
      data: {},
      class: this.type,
    };

    constructor(options) {
      super(options);
      this.getIcon();
    }

    getIcon() {
      const div = document.createElement("div");
      div.textContent = "H";
      return div;
    }

    action({ Editor }) {
      this.Editor = Editor;
      const { BlockManager } = this.Editor;
      const { currentHoverBlockId } = BlockManager;
      BlockManager.moveDown(currentHoverBlockId);
    }
  }

  class MoveUpTool extends ToolLayoutBase {
    type = "MoveUp";
    text = "上移";
    icon = null;

    blockData = {
      type: this.type,
      data: {},
      class: this.type,
    };

    constructor(options) {
      super(options);
      this.getIcon();
    }

    getIcon() {
      const div = document.createElement("div");
      div.textContent = "H";
      return div;
    }

    action({ Editor }) {
      this.Editor = Editor;
      const { BlockManager } = this.Editor;
      const { currentHoverBlockId } = BlockManager;
      BlockManager.moveUp(currentHoverBlockId);
    }
  }

  /**
   * block plugins
   */

  var interComponents = {
    blocks: {
      Paragraph,
      AI,
      Head,
      ImageDoc,
      TableDoc,
      ListDoc,
      TodoList,
      // Auae
    },
    tools: {
      plugins: [
        AITool,
        ParagraphTool,
        HeadTool1,
        HeadTool2,
        HeadTool3,
        HeadTool4,
        ImageTool,
        TableTool,
        ListTool,
        TodoListTool,
        // AuaeTool
      ],
      layout: [MoveUpTool, DeleteTool, MoveDownTool],
    },
    // menu: [bold, italic],
    menu: [],
  };

  class Renderer extends Module {
      block2html(block) {
          const [dom, callback, instance] = this.blockTypeTrans(block);
          const element = this.assembleBlockEl(dom);
          return [element, callback, instance];
      }
      blockTypeTrans(block) {
          var _a;
          if (block.class) {
              const _class = (_a = window[block.class]) !== null && _a !== void 0 ? _a : interComponents.blocks[block.class];
              const blockInstance = new _class({
                  config: block,
                  "block-id": block.id,
              });
              return blockInstance._render().concat(blockInstance);
          }
          else {
              throw "不存在block对应的class";
          }
      }
      assembleBlockEl(el) {
          const blockContainerDiv = this.Editor.UI.generateBlockContainerDiv();
          blockContainerDiv.firstChild.appendChild(el);
          return blockContainerDiv;
      }
      firstInsert() {
          const blockInstances = this.Editor.BlockManager.blockInstances;
          let wrapEl = null;
          if (isString(this.config.holder)) {
              wrapEl = Dom.querySelector(this.config.holder);
          }
          else if (isDOM(this.config.holder)) {
              wrapEl = this.config.holder;
          }
          if (!wrapEl)
              throw `不存在元素${this.config.holder}`;
          wrapEl = wrapEl.querySelector(`.${this.Editor.UI.CSS.editorZone}`);
          blockInstances.forEach((block) => wrapEl.appendChild(block.element));
      }
      getEditorZone() {
          const { UI } = this.Editor;
          return Dom.get(UI.CSS.editorZone);
      }
      renderForBlockDataId(blockId) {
          const blockInstances = this.Editor.BlockManager.blockInstances;
          let block = null;
          blockInstances.some((_block, index, target) => {
              if (_block.id === blockId) {
                  target[index - 1].element.insertAdjacentElement("afterend", _block.element);
                  block = _block;
                  return true;
              }
          });
          return block;
      }
      reredner() {
          const { blockInstances } = this.Editor.BlockManager;
          const blockInstanceElement = blockInstances.map((block) => block.element);
          const { editorZone, wrapper } = this.Editor.UI.CSS;
          const blocksContainer = Dom.querySelector(`.${editorZone}`);
          let blockDocEls = Array.from(blocksContainer.querySelectorAll(`.${wrapper}`));
          // 删除不存在
          blockDocEls.forEach((element) => {
              if (!blockInstanceElement.includes(element)) {
                  element.remove();
              }
          });
          blockDocEls = Array.from(blocksContainer.querySelectorAll(`.${wrapper}`));
          // 添加
          blockInstances.forEach((block, index) => {
              if (!blockDocEls.includes(block.element)) {
                  if (index > blockDocEls.length - 1) {
                      blocksContainer.appendChild(block.element);
                  }
                  else {
                      blocksContainer.insertBefore(block.element, blockDocEls[index]);
                  }
                  block.mountedCallback();
              }
          });
          // 调换位置
          // TODO: 这里需要优化 当使用splice插入多个block时，会存在新的block数量跟旧的的数量不相同
          blockDocEls = Array.from(blocksContainer.querySelectorAll(`.${wrapper}`));
          if (blockInstances.length !== blockDocEls.length)
              return;
          blockInstances.forEach((block, index, _t) => {
              blockDocEls = Array.from(blocksContainer.querySelectorAll(`.${wrapper}`));
              if (block.element !== blockDocEls[index]) {
                  let node1 = block.element;
                  let node2 = blockDocEls[index];
                  let sibling = node2.nextSibling === node1 ? node2 : node2.nextSibling;
                  blocksContainer.insertBefore(node2, node1);
                  blocksContainer.insertBefore(node1, sibling);
              }
          });
      }
  }

  /**
   * 复制 keydown keycode识别的复制 ctrl+c
   * @param event
   */
  const copyEventByKeyBoardCallBack = function (event) {
      let that = this;
      let manager = that.Event["Editor"].BlockManager;
      try {
          if (that.isCheckAllStatus()) {
              console.log("lfjs:全选复制");
              copyEventByClipboardCallBack.call(that, event, manager.curentFocusBlock);
              event.stopPropagation();
              event.preventDefault();
          }
          else if (that.isCheckSingleBlockStatus()) {
              // 单段被复制
              event.stopPropagation();
          }
          else {
              console.log("【superDoc】：执行原生复制事件");
          }
      }
      catch (e) {
          console.error(`【superDoc_error】:执行复制失败${e}`);
      }
  };
  /**
   * 复制原生事件
   * @param event
   */
  const copyEventByClipboardCallBack = function (event, instance) {
      var _a, _b;
      console.log("执行次数", instance);
      let that = this;
      // 默认文本的复制
      let manager = that.Event["Editor"].BlockManager;
      manager.currentCopyBlockInfo.id = instance.id;
      manager.currentCopyBlockInfo.block = instance;
      manager.currentCopyBlockInfo.data = [];
      manager.currentCopyBlockInfo.content = "";
      manager.currentCopyBlockInfo.selectionContent = manager.currentSelectionBlockInfo.selectionContent;
      // 设置为文本类型
      if (manager.currentSelectionBlockInfo.type == "text") {
          manager.currentCopyBlockInfo.type = "text";
          (_a = event.clipboardData) === null || _a === void 0 ? void 0 : _a.setData("text/plain", manager.currentSelectionBlockInfo.string);
          // 解析文本类型的block
          manager.currentCopyBlockInfo.data = instance.instance.compileData(instance, manager.currentSelectionBlockInfo.content);
          // 文本类型，代表单行复制。所以阻止默认的复制事件
          event.preventDefault();
      }
      else {
          manager.currentCopyBlockInfo.type = "block";
          let refreshBlockData = deepCloneRefreshId(manager.currentSelectionBlockInfo.data, ["id"]);
          manager.currentCopyBlockInfo.data = refreshBlockData;
          manager.currentSelectionBlockInfo.data.forEach((item) => {
              var _a, _b, _c;
              let block = manager.findBlockInstanceForId(item.id);
              let copyEventCallBack = (_c = (_b = (_a = block.target) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.instance) === null || _c === void 0 ? void 0 : _c.copyEventCallBack;
              copyEventCallBack && copyEventCallBack(that, event, block.target.state);
          });
          // 设置复制文本的内容
          (_b = event.clipboardData) === null || _b === void 0 ? void 0 : _b.setData("text/plain", manager.currentCopyBlockInfo.selectionContent.join('\r\n'));
          event.preventDefault();
      }
  };
  /**
   * 粘贴事件 keydown keycode识别的粘贴
   * 1、是否全选
   * 2、是否单段block完全选择替换
   * @param event
   */
  const pasteEventByKeyBoardCallBack = function (event) {
      let that = this;
      let manager = that.Event["Editor"].BlockManager;
      try {
          if (that.isCheckAllStatus()) {
              console.log("粘贴全选:lfjs");
              event.preventDefault();
          }
          else if (that.isCheckSingleBlockStatus()) {
              // 单段全部 - 直接替换block
              // let copyBlockData = manager.currentCopyBlock[0].getBlockData();
              let copyBlockData = manager.currentCopyBlock.map((m) => {
                  let blockData = m.getBlockData();
                  let deepCloneBlock = deepCloneRefreshId(blockData, [
                      "id",
                  ]);
                  return deepCloneBlock;
              });
              let focusBlock = manager.curentFocusBlock;
              // 拷贝block内容刷新id
              manager.replaceCurrentBlock(copyBlockData, focusBlock.id);
              event.preventDefault();
          }
      }
      catch (e) {
          console.error(`【superDoc_error】: 执行粘贴事件失败${e}`);
      }
  };
  /**
   * 粘贴事件 原生事件的粘贴 paste
   * 1、是否单段部分选择
   * 2、TODO：是否跨段落选择和粘贴
   * @param event
   */
  const pasteEventByClipboardCallBack = function (event) {
      // if (event.target["getAttribute"]("id") !== "superdoc-paragraph") return;
      console.log("【superDoc】: 执行粘贴_总线层");
      try {
          let that = this;
          let manager = that.Event["Editor"].BlockManager;
          let focusBlock = manager.curentFocusBlock;
          let clipboardData = event.clipboardData;
          let pasteEventCallBack = focusBlock.instance.pasteEventCallBack;
          // let { block, type, status, data } = manager.currentCopyBlockInfo;
          // TODO:优化不仅仅只有文件的情况
          if (clipboardData.types.includes("Files")) {
              pasteFile(that, event);
          }
          else if (pasteEventCallBack) {
              pasteEventCallBack(that, event);
              return;
          }
          else {
          }
      }
      catch (e) {
          console.error(`【superDoc_error】: 执行粘贴事件失败${e}`);
      }
  };
  const cutEventByClipboardCallBack = function (event, instance) {
      var _a;
      console.log("【superDoc】: 执行剪切_总线层");
      try {
          let that = this;
          let manager = that.Event["Editor"].BlockManager;
          // 默认文本的复制 剪切都是这个逻辑
          manager.currentCopyBlockInfo.id = instance.id;
          let selection = window.getSelection();
          let selectedRange = selection.getRangeAt(0);
          manager.currentCopyBlockInfo.block = instance;
          manager.currentCopyBlockInfo.data = [];
          manager.currentCopyBlockInfo.selectionContent = [];
          // 设置为文本类型
          if (manager.currentSelectionBlockInfo.type == "text") {
              manager.currentCopyBlockInfo.type = "text";
              (_a = event.clipboardData) === null || _a === void 0 ? void 0 : _a.setData("text/plain", manager.currentSelectionBlockInfo.string);
              // 解析文本类型的block TODO：instance 改成工具栏获取
              manager.currentCopyBlockInfo.data = instance.instance.compileData(instance, manager.currentSelectionBlockInfo.content);
              let extractContents = selectedRange.extractContents();
              console.log("lfjs：剪切事件");
              event.preventDefault();
          }
          else {
              manager.currentCopyBlockInfo.type = "block";
              let refreshBlockData = deepCloneRefreshId(manager.currentSelectionBlockInfo.data, ["id"]);
              manager.currentCopyBlockInfo.data = refreshBlockData;
              // 清除选中内容
              let extractContents = selectedRange.extractContents();
              manager.currentSelectionBlockInfo.data.forEach((item, index) => {
                  let block = manager.findBlockInstanceForId(item.id);
                  // 逻辑是选取的内容中间全部去除。执行剪切事件。 (不严谨暂时处理)
                  if (index == 0 ||
                      manager.currentSelectionBlockInfo.data.length - 1 == index) {
                      let cutEventCallBack = block.target.state.instance.cutEventCallBack;
                      cutEventCallBack &&
                          cutEventCallBack(that, event, item, block.target.state);
                  }
                  else {
                      manager.removeBlock(item.id);
                  }
              });
              event.preventDefault();
          }
      }
      catch (e) {
          console.error(`【superDoc_error】: 执行剪切事件失败${e}`);
      }
  };
  const getSelectionBlockData = function (event, instance) {
      console.log("【superDoc】: 执行获取选中的文本");
      try {
          let that = this;
          let manager = that.Editor.BlockManager;
          let selection = window.getSelection();
          let selectedRange = selection.getRangeAt(0);
          let cloneContents = selectedRange.cloneContents();
          let selectFragment = document.createElement("div");
          selectFragment.appendChild(cloneContents);
          // 默认文本的复制
          manager.currentSelectionBlockInfo.id = instance.id;
          manager.currentSelectionBlockInfo.block = instance;
          manager.currentSelectionBlockInfo.data = [];
          manager.currentSelectionBlockInfo.selectionContent = [];
          if (selectFragment.innerHTML) {
              // 如何存在选择内容
              let selectedBlock = selectFragment.querySelectorAll("[block-id]") || [];
              let childNode = selectFragment.querySelector("[parent-id]");
              // 检查是否有blockId的模块被选中
              manager.currentSelectionBlockInfo.content = selectFragment.innerHTML;
              if (selectedBlock.length == 0) {
                  manager.currentSelectionBlockInfo.string = selectedRange.toString();
                  manager.currentSelectionBlockInfo.type = "text";
                  manager.currentSelectionBlockInfo.data = instance.instance.compileData(instance, selectFragment.innerHTML);
                  manager.currentSelectionBlockInfo.selectionContent = [selectedRange.toString()];
                  if (childNode) {
                      manager.currentSelectionBlockInfo.data = [];
                      let blockId = childNode.getAttribute("parent-id");
                      let blockInstance = manager.blockInstances.find((b) => b.id == blockId);
                      if (blockInstance) {
                          let selectionCallBack = blockInstance.instance.selectionCallBack;
                          selectionCallBack &&
                              selectionCallBack(that, event, selectFragment, blockInstance);
                          manager.currentSelectionBlockInfo.type = "block";
                      }
                  }
              }
              else {
                  manager.currentSelectionBlockInfo.type = "block";
                  selectedBlock.forEach((item) => {
                      let blockId = item.getAttribute("block-id");
                      let blockInstance = manager.blockInstances.find((b) => b.id == blockId);
                      if (blockInstance) {
                          let selectionCallBack = blockInstance.instance.selectionCallBack;
                          selectionCallBack &&
                              selectionCallBack(that, event, item, blockInstance);
                      }
                  });
              }
              console.log(manager.currentSelectionBlockInfo, "currentSelectionBlockInfo");
          }
      }
      catch (e) {
          console.error(`【superDoc_error】: 获取选中的文本内容失败${e}`);
      }
  };
  function pasteFile(that, event) {
      return __awaiter(this, void 0, void 0, function* () {
          // 获取剪贴板中的数据
          let items = event.clipboardData.items;
          let manager = that.Event["Editor"].BlockManager;
          let focusBlock = manager.curentFocusBlock;
          // 图片默认追加不做处理
          for (let i = 0; i < items.length; i++) {
              if (items[i].type.indexOf("image") !== -1) {
                  // 获取图片文件
                  let blob = items[i].getAsFile();
                  try {
                      let imageBlockData = generateImageData({
                          desc: "粘贴图",
                          url: URL.createObjectURL(blob),
                      });
                      // 将图片添加到页面中
                      manager.replaceCurrentBlock([imageBlockData], focusBlock.id);
                      // let url  = manager.config.imageConfig.uploadHost
                      // const result = await uploadImage({ file: blob },url);
                      // const path = result?.data?.msg;
                      // console.log(`【superDoc】: 图片粘贴`);
                      // if (!path) {
                      //   console.log(`【superDoc】: 图片粘贴返回无内容`);
                      //   event.preventDefault();
                      //   return;
                      // }
                      // let imageBlockData = generateImageData({
                      //   desc: "粘贴图",
                      //   url: path,
                      // });
                      // manager.replaceCurrentBlock([imageBlockData], focusBlock.id);
                      // 阻止默认的粘贴行为
                      event.preventDefault();
                  }
                  catch (e) {
                      // let imageBlockData = generateImageData({desc:"粘贴图",url:URL.createObjectURL(blob)})
                      // // 将图片添加到页面中
                      // manager.replaceCurrentBlock([imageBlockData], focusBlock.id);
                      console.error(`【superDoc_error】:上传图片失败${e}`);
                  }
              }
          }
      });
  }
  // question
  // block删除时会获取不到

  class KeyDown {
      constructor(blockInstances, Event) {
          this.isBindEvent = false;
          this.keydownHandler = (event) => {
              const { BlockManager } = getModules();
              const { curentFocusBlock, blockInstances } = BlockManager;
              if (event.keyCode === keyCodes.UP || event.keyCode === keyCodes.DOWN) {
                  this.checkoutBlockEvent(event);
              }
              else if (event.keyCode === keyCodes.BACKSPACE) {
                  this.backspaceEvent(event);
              }
              else if (event.keyCode === keyCodes.ENTER) {
                  this.enterEvent(event);
              }
              else if ((event.metaKey || event.ctrlKey) &&
                  event.keyCode === keyCodes.A) {
                  curentFocusBlock.CURRENT_CHECKOUT_COUNT += 1;
                  if (curentFocusBlock.CHECKOUT_ALL_NUMBER == curentFocusBlock.CURRENT_CHECKOUT_COUNT) {
                      // 设置全选数据
                      BlockManager.setSelectionBlockInfo({ id: curentFocusBlock.id, content: "", block: curentFocusBlock, data: BlockManager.blocks, type: "block" });
                  }
                  if (curentFocusBlock.CURRENT_CHECKOUT_COUNT < curentFocusBlock.CHECKOUT_BLOCK_NUMBER)
                      return;
                  event.preventDefault();
              }
              else if ((event.metaKey || event.ctrlKey) &&
                  event.keyCode === keyCodes.C) {
                  copyEventByKeyBoardCallBack.call(this, event);
              }
              else if ((event.metaKey || event.ctrlKey) && event.keyCode === keyCodes.V) {
                  pasteEventByKeyBoardCallBack.call(this, event);
              }
              else if ((event.metaKey || event.ctrlKey) && event.keyCode === keyCodes.X) {
                  if (this.isCheckAllStatus()) {
                      console.log('剪切lfjs');
                      // 设置全局剪切事件
                      let currentSelection = JSON.parse(JSON.stringify(BlockManager.currentSelectionBlockInfo.data));
                      let refreshBlockData = deepCloneRefreshId(currentSelection, ["id"]);
                      BlockManager.setCurrentBlockInfo("currentCopyBlockInfo", { id: curentFocusBlock.id, content: "", block: curentFocusBlock, data: refreshBlockData, type: "block" });
                      currentSelection.forEach((item, index) => {
                          BlockManager.removeBlock(item.id);
                      });
                      event.stopPropagation();
                  }
              }
              else if ((event.metaKey || event.ctrlKey) && event.keyCode === keyCodes.S) {
                  console.log(event.keyCode, 'yyjs');
                  event.preventDefault();
              }
          };
          /**
           * 设置最接近x轴距离的坐标
           */
          this.setCursorForX = (node, x) => {
              let isFind = null;
              let firstLineY = null;
              const range = document.createRange();
              for (let i = 0; i < node.childNodes.length; i++) {
                  if (isFind)
                      break;
                  const child = node.childNodes[i];
                  if (child.nodeType === Node.TEXT_NODE) {
                      for (let j = 0; j < child.length; j++) {
                          range.setStart(child, j);
                          range.setEnd(child, j);
                          const { left, top } = getElementCoordinates(range.getBoundingClientRect());
                          firstLineY = firstLineY ? firstLineY : top;
                          if (firstLineY === top && x - left <= 0) {
                              range.setStart(child, j);
                              range.setEnd(child, j);
                              window.getSelection().removeAllRanges();
                              window.getSelection().addRange(range);
                              isFind = true;
                              break;
                          }
                      }
                  }
                  else if (child.nodeType === Node.ELEMENT_NODE) {
                      this.setCursorForX(child, x);
                  }
              }
              if (!isFind) {
                  const lastChild = node.childNodes.length
                      ? node.childNodes[node.childNodes.length - 1]
                      : node;
                  if (lastChild.nodeType === Node.TEXT_NODE) {
                      range.setStart(lastChild, lastChild.length);
                      range.setEnd(lastChild, lastChild.length);
                  }
                  else if (lastChild.nodeType === Node.ELEMENT_NODE) {
                      range.setStart(lastChild, 0);
                      range.setEnd(lastChild, 0);
                  }
                  window.getSelection().removeAllRanges();
                  window.getSelection().addRange(range);
              }
          };
          this.Event = Event;
          // TODO: 依赖于渲染后才能添加事件，但是该事件绑定是在new Block时注册的，所以采用了setTimeout，后续看看如何去除setTimeout
          setTimeout(() => {
              this.bindBlockKeydownEvents(blockInstances);
              // TODO：优化复制粘贴事件，由于copy、paste事件在全选的适合触发不了，所以这里用了两种事件监听 keydown 和 copy | paste
              this.bindCopyEvent(blockInstances);
          }, 0);
      }
      /**
       * 注册上下箭头事件
       */
      bindBlockKeydownEvents(blockInstances) {
          if (this.isBindEvent)
              return;
          blockInstances.forEach((blockInstance) => {
              const element = blockInstance.currentElement;
              element.removeEventListener("keydown", this.keydownHandler);
              element.addEventListener("keydown", this.keydownHandler);
          });
      }
      /**
       * 上下箭头
       */
      checkoutBlockEvent(event) {
          const isUP = event.key === "ArrowUp";
          const isDOWN = event.key === "ArrowDown";
          if (!isUP && !isDOWN)
              return;
          // 判断是否为第一行
          const { isFirstLine, isLastLine } = isCursorAtFirstOrLastLine(event.target);
          if ((isUP && !isFirstLine) || (isDOWN && !isLastLine))
              return;
          event.preventDefault();
          const [blockId, currentTarget] = getBlockIdForElement(event.currentTarget);
          const target = event.target;
          if (Dom.getAttr(target, "id") !== "superdoc-paragraph")
              return;
          const allParagraphs = getParagraphElements();
          let focusEl = null;
          allParagraphs.some((el, i, _element) => {
              if (el === target) {
                  if (i === _element.length - 1) {
                      focusEl = isUP ? _element[i - 1] : el;
                  }
                  else if (i === 0) {
                      focusEl = isDOWN ? _element[i + 1] : el;
                  }
                  else {
                      if (isDOWN) {
                          focusEl = _element[i + 1];
                      }
                      else if (isUP) {
                          focusEl = _element[i - 1];
                      }
                  }
                  return true;
              }
          });
          const selection = window.getSelection();
          const range = selection.getRangeAt(0);
          const { left: x } = getElementCoordinates(range.getBoundingClientRect());
          this.setCursorForX(focusEl, x);
          // TODO: 解决多个paragraph属于同一个block下导致焦点切换出错问题
          if (!currentTarget.contains(focusEl)) {
              const { pre, next } = this.Event["Editor"].BlockManager.findBlockInstanceForId(blockId);
              if (isUP && pre.state) {
                  this.Event["Editor"].BlockManager.changeCurrentBlockId(pre.state.id);
              }
              else if (isDOWN && next.state) {
                  this.Event["Editor"].BlockManager.changeCurrentBlockId(next.state.id);
              }
          }
      }
      /**
       * 回车增加段落
       * 不单纯的增加段落 (原先获取光标位置的判断有问题,这里直接判断处理)
       * 1.如果是在首位
       * 2.中间
       * 3.尾部
       */
      enterEvent(event) {
          let manager = this.Event["Editor"].BlockManager;
          let selection = window.getSelection();
          let cursorPosition = 2;
          if (selection.isCollapsed && selection.anchorOffset == 0) {
              cursorPosition = 0;
          }
          event.preventDefault();
          manager.insertBlockForBlockId(generateParagraphData(), manager.currentHoverBlockId, cursorPosition);
      }
      // bug：删不了表格图片等无编辑状态的内容
      backspaceEvent(event) {
          this.Event["Editor"];
          console.log('默认删除');
          return;
      }
      /**
       * 复制、粘贴、剪切事件
       */
      bindCopyEvent(blockInstances) {
          // TODO: 事件队列入栈
          const that = this;
          blockInstances.forEach((instance) => {
              instance.element.addEventListener("copy", (event) => {
                  // event.clipboardData.setData("text", event.target['innerHTML']);
                  copyEventByClipboardCallBack.call(that, event, instance);
                  // 不去阻止默认的复制事件
                  // event.preventDefault();
              });
              instance.element.addEventListener("paste", (event) => {
                  // if(event.target['getAttribute']('id') !== 'superdoc-paragraph') return;
                  var clipboardData = event.clipboardData || window['clipboardData']; // 获取剪贴板数据对象
                  if (clipboardData && clipboardData.getData) {
                      // event.preventDefault();
                      var text = clipboardData.getData("text/plain"); // 获取纯文本格式的复制内容
                      compileParagraph(text.split('\n')
                          .filter(content => !!content)
                          .join("\n"));
                      // const blockId = that.Event['Editor'].BlockManager.insertBlockForBlockId();
                      // that.Event['Editor'].BlockManager.replaceCurrentBlock(blocks, blockId)
                      // 真实粘贴代码
                      pasteEventByClipboardCallBack.call(that, event);
                  }
              });
              // 剪切
              instance.element.addEventListener("cut", (event) => {
                  cutEventByClipboardCallBack.call(that, event, instance);
              });
          });
      }
      // 判断是否全选
      isCheckAllStatus() {
          let { curentFocusBlock } = this.Event['Editor'].BlockManager;
          return curentFocusBlock.CURRENT_CHECKOUT_COUNT == curentFocusBlock.CHECKOUT_ALL_NUMBER;
      }
      // 判断是否单段block的选择
      isCheckSingleBlockStatus() {
          let { curentFocusBlock } = this.Event['Editor'].BlockManager;
          return curentFocusBlock.CURRENT_CHECKOUT_COUNT == curentFocusBlock.CHECKOUT_BLOCK_NUMBER;
      }
  }

  class Event extends Module {
      constructor() {
          super(...arguments);
          this.addListeners = new Set();
          this.deleteListeners = new Set();
          this.updateListeners = new Set();
          this.globalClickListenerList = [];
          this.Selection = {};
          this.keyDownInstance = null;
          this.isSelecting = false; // 是否处于框选状态
      }
      prepare() {
          if (this.config.isReadOnly)
              return;
          this.registerSelectionEvent();
          this.registerGlobalEvent();
          this.registerBlankAreaEvent();
          this.registerMenuEvent();
          this.regiterateGlobalClickEvent();
          // this.documentCopyEvent = this.bindEventListener(document,"copy",(event)=>{
          //   console.log('evnent:lfjs',event)
          //   let manager = this.Editor.BlockManager;
          //   copyEventByClipboardCallBack.call({Event:this},event,manager.curentFocusBlock)
          // })()
      }
      /**
       * 全局事件
       */
      registerGlobalEvent() {
          this.registerGlobalDocumentMousemove();
          this.registerGlobalClickEvent();
          this.regiterGlobalKeyDownEvent();
      }
      /**
       * 注册光标方向的事件
       */
      bindKeydownEvent(blockInstance, Event) {
          this.keyDownInstance = new KeyDown(blockInstance, Event);
      }
      registerSelectionEvent(element) {
          this.selectionChangeEvent = this.bindEventListener(document, "selectionchange", this.sectionHandler.bind(this))();
          // document.removeEventListener(
          //   "selectionchange",
          //   this.sectionHandler.bind(this)
          // );
          // document.addEventListener(
          //   "selectionchange",
          //   this.sectionHandler.bind(this)
          // );
          this.mouseUpEvent = this.bindEventListener(document, "mouseup", this.mouseUpHandler.bind(this))();
          this.mouseDownEvent = this.bindEventListener(document, "mousedown", this.mouseDownHandler.bind(this))();
          this.mouseMoveEvent = this.bindEventListener(document, "mousemove", this.mouseMoveHandler.bind(this))();
          // document.removeEventListener("mouseup", this.mouseUpHandler.bind(this));
          // document.addEventListener("mouseup", this.mouseUpHandler.bind(this));
          // document.removeEventListener("mousedown", this.mouseDownHandler.bind(this));
          // document.addEventListener("mousedown", this.mouseDownHandler.bind(this));
      }
      mouseUpHandler(event) {
          clearTimeout(this.SELECT_TIME);
          const selection = window.getSelection();
          if (!selection.isCollapsed && selection.rangeCount > 0) {
              this.SELECT_TIME = setTimeout(() => {
                  this.Editor.UI.menu.visible = true;
              }, 100);
          }
          else {
              this.Editor.UI.menu.visible = false;
          }
          clearTimeout(this.DOWN_TIME);
          this.setContentEdiableBySelector("false");
          this.isSelecting = false;
      }
      mouseDownHandler(event) {
          this.Editor.UI.menu.visible = false;
          // 保证页面的框选功能有效
          clearTimeout(this.SELECT_TIME);
          this.isSelecting = true;
          // 设置编辑态到最外层。增加range的选择范围
          this.setContentEdiableBySelector("true");
          document.caretRangeFromPoint(event.clientX, event.clientY);
      }
      sectionHandler(event) {
          const selection = window.getSelection();
          if (selection.type !== "Range")
              return;
          this.Selection = window.getSelection().getRangeAt(0);
          this.Selection["content"] = selection.toString();
          clearTimeout(this.SELECT_TIME);
          let manager = this.Editor.BlockManager;
          getSelectionBlockData.call(this, event, manager.curentFocusBlock);
      }
      registerGlobalDocumentMousemove() {
          // document.addEventListener("mousemove", this.mouseMoveHandler.bind(this));
      }
      mouseEvent(blocks) {
          blocks.forEach((block) => {
              block.element.addEventListener("click", this.mouseClick.bind(this));
              block.element.addEventListener("input", this.inputEvent.bind(this));
              // block.element.addEventListener("mouseout", this.onmouseout.bind(this));
              block.element.addEventListener("mouseover", this.onmouseover.bind(this), true);
          });
      }
      menuEvent(blocks) { }
      inputEvent(event) {
          const [id, element] = getBlockIdForElement(event.currentTarget);
          const block = this.Editor.BlockManager.findBlockConfigForId(id);
          block.data.text = element.innerHTML;
      }
      mouseClick(event) {
          // BUGGER 事件触发了两次
          console.log('【super_doc】block点击');
          if (!document.contains(event.currentTarget))
              return;
          this.setContentEdiableBySelector("false");
          const [id] = getBlockIdForElement(event.currentTarget);
          this.Editor.BlockManager.changeCurrentBlockId(id);
          this.Editor.BlockManager.cursor.block = this.Editor.BlockManager.curentFocusBlock;
          this.Editor.UI.command.visible = false;
          this.Editor.UI.layout.visible = false;
      }
      setContentEdiableBySelector(contenteditable) {
          const editorZoneElement = Dom.querySelector(`.${this.Editor.UI.CSS.editorZone}`);
          if (!editorZoneElement)
              return;
          if (contenteditable == "false") {
              editorZoneElement.removeAttribute("contenteditable");
          }
          else {
              editorZoneElement.setAttribute('contenteditable', contenteditable);
          }
      }
      onmouseout(event) { }
      onmouseover(event) {
          var _a, _b;
          let target = event.currentTarget;
          target = target.querySelector("[block-id]");
          if (!target) {
              console.log(event);
              return;
          }
          const blockId = target.getAttribute("block-id");
          const toolbar = this.Editor.UI.nodes.toolbarWrapper;
          // TODO: 这里有bug 临时处理
          if (!((_b = (_a = this.Editor.BlockManager) === null || _a === void 0 ? void 0 : _a.currentHoverBlock) === null || _b === void 0 ? void 0 : _b.element)) {
              debugger;
              return;
          }
          if (this.Editor.UI.command.visible || this.Editor.UI.layout.visible)
              return;
          if (blockId) {
              // 这里不应该用window作为依据
              // let {
              //   left: x,
              //   top: y,
              //   rect,
              // } = getElementCoordinates(target.getBoundingClientRect());
              let holder;
              if (isString(this.config.holder)) {
                  holder = Dom.querySelector(this.config.holder);
              }
              else if (isDOM(this.config.holder)) {
                  holder = this.config.holder;
              }
              let rect = target.getBoundingClientRect();
              let hodlerRect = holder.getBoundingClientRect();
              toolbar.style = !!toolbar.style ? toolbar.style : {};
              toolbar.style.left = rect.left - hodlerRect.left - 60 + "px";
              toolbar.style.top = rect.top - hodlerRect.top + 3 + "px";
              event.stopPropagation();
              toolbar.classList.add(this.Editor.UI.CSS.superDocToolbarOpen);
              this.Editor.BlockManager.currentHoverBlockId = blockId;
          }
      }
      enter(event) {
          event.preventDefault();
      }
      on(type, callback) {
          if (type === "add") {
              this.addListeners.add(callback);
          }
          else if (type === "delete") {
              this.deleteListeners.add(callback);
          }
          else if (type === "update") {
              this.updateListeners.add(callback);
          }
      }
      registerBlankAreaEvent() {
          const editorZoneElement = Dom.querySelector(`.${this.Editor.UI.CSS.editorZone}`);
          editorZoneElement.addEventListener("click", (event) => {
              if (window.getSelection().isCollapsed) {
                  event.target.focus();
                  console.log('focus');
                  this.Editor.BlockManager.clearSelectionBlockInfo();
              }
              if (event.target !== editorZoneElement)
                  return;
              const lastBlock = this.Editor.BlockManager.blocks.slice(-1);
              if (lastBlock &&
                  !!lastBlock.length &&
                  lastBlock[0].type.toLowerCase() !== "paragraph") {
                  this.Editor.BlockManager.blocks.push(generateParagraphData());
              }
              else {
                  console.log(this.Editor.BlockManager.blocks.slice(-1)[0].id);
                  this.Editor.BlockManager.changeCurrentBlockId(this.Editor.BlockManager.blocks.slice(-1)[0].id);
              }
          }, true);
      }
      registerGlobalClickEvent() {
          this.Editor.UI.nodes.wrapper.addEventListener("click", (event) => {
              this.Editor.BlockManager.checkAllStatus(false);
          });
      }
      registerMenuEvent() {
          const { menuElMap } = this.Editor.UI.menu;
          const { menuInstanceMap } = this.Editor.Menu;
          this.config.tools.menu.forEach((Menu) => {
              const el = menuElMap.get(Menu);
              const menuInstance = menuInstanceMap.get(Menu);
              el.addEventListener("click", (event) => {
                  var _a;
                  const placing = menuInstance.action((_a = this.Selection) === null || _a === void 0 ? void 0 : _a.content, this.Editor.BlockManager.curentFocusBlock);
                  if (placing) {
                      this.Selection.deleteContents();
                      this.Selection.insertNode(placing);
                      window.getSelection().removeAllRanges();
                      window.getSelection().addRange(this.Selection);
                  }
              });
          });
      }
      regiterateGlobalClickEvent() {
          this.Editor.UI.nodes.holder.addEventListener("click", (event) => {
              this.globalClickListenerList.forEach((fn) => fn());
          });
      }
      // 注册window的keydown事件
      regiterGlobalKeyDownEvent() {
          // const editorZoneElement = $.querySelector(
          //   `.${this.Editor.UI.CSS.editorZone}`
          // );
          // editorZoneElement.addEventListener('keydown',(e)=>{})
          // 暂时这么做。其他dom的获取keydom好像都不行。
          this.windowKeyDownEvent = this.bindEventListener(window, "keydown", this.windowKeyDownHanlder.bind(this))();
      }
      windowKeyDownHanlder(event) {
          let manager = this.Editor.BlockManager;
          let curentFocusBlock = manager.curentFocusBlock;
          let that = this;
          if (event.keyCode === keyCodes.BACKSPACE) {
              console.log("lfjs:全局删除");
              let selection = window.getSelection();
              let selectedRange;
              if (selection.type !== "None") {
                  selectedRange = selection === null || selection === void 0 ? void 0 : selection.getRangeAt(0);
              }
              if (manager.currentSelectionBlockInfo.data.length !== 0 && manager.currentSelectionBlockInfo.type == 'block') {
                  if (that.keyDownInstance.isCheckAllStatus()) {
                      JSON.parse(JSON.stringify(manager.currentSelectionBlockInfo.data)).forEach((item, index) => {
                          manager.removeBlock(item.id);
                      });
                      event.preventDefault();
                      return;
                  }
                  // 清除选中内容
                  selectedRange && selectedRange.extractContents();
                  manager.currentSelectionBlockInfo.data.forEach((item, index) => {
                      var _a, _b, _c;
                      let block = manager.findBlockInstanceForId(item.id);
                      // 逻辑是选取的内容中间全部去除。执行剪切事件。 (不严谨暂时处理)
                      if (index == 0 || manager.currentSelectionBlockInfo.data.length - 1 == index) {
                          let cutEventCallBack = (_c = (_b = (_a = block.target) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.instance) === null || _c === void 0 ? void 0 : _c.cutEventCallBack;
                          cutEventCallBack && cutEventCallBack({ Event: that }, event, item, block.target.state);
                      }
                      else {
                          manager.removeBlock(item.id);
                      }
                  });
                  manager.clearSelectionBlockInfo();
                  event.preventDefault();
              }
              else if (manager.currentBlockId && curentFocusBlock.type == "ImageDoc") {
                  // 删除图片
                  manager.removeBlock(manager.currentBlockId);
              }
              else if (manager.currentSelectionBlockInfo.type == 'text') {
                  selectedRange && selectedRange.extractContents();
                  if (event.target.childNodes.length == 0) {
                      manager.removeBlock(manager.curentFocusBlock.id);
                  }
              }
          }
      }
      mouseMoveHandler(event) {
          this.viewPortX = event.x;
          this.viewPortY = event.y;
      }
      // 注销事件
      destory() {
          this.mouseMoveEvent && this.mouseMoveEvent();
          this.mouseDownEvent && this.mouseDownEvent();
          this.mouseUpEvent && this.mouseUpEvent();
          this.selectionChangeEvent && this.selectionChangeEvent();
          this.windowKeyDownEvent && this.windowKeyDownEvent();
      }
      // 事件总代理实现
      bindEventListener(target, key, fn) {
          return () => {
              target === null || target === void 0 ? void 0 : target.addEventListener(key, fn);
              return () => {
                  target === null || target === void 0 ? void 0 : target.removeEventListener(key, fn);
              };
          };
      }
  }

  class Menu extends Module {
      constructor() {
          super(...arguments);
          this._visible = false;
          this.menuInstanceMap = new WeakMap();
      }
      set visible(val) {
          this.Editor.UI.menu.visible = val;
      }
      prepare() {
          this.instanceMenu();
      }
      instanceMenu() {
          const { menu } = this.config.tools;
          menu.forEach(Menu => {
              const instance = new Menu();
              this.menuInstanceMap.set(Menu, instance);
          });
      }
  }

  const Modules = {
      BlockManager,
      Renderer,
      API,
      UI: Ui,
      Menu,
      Event,
  };
  class Core {
      constructor(config) {
          this.moduleInstances = {};
          this.configuration = config;
          let onReady;
          this.validate();
          this.init();
          this.isReady = new Promise((resolve, reject) => {
              onReady = resolve;
          });
          Promise.resolve().then(() => __awaiter(this, void 0, void 0, function* () {
              yield this.start();
              yield this.render();
              onReady();
          }));
      }
      validate() { }
      init() {
          // 实例化模块
          this.constructModules();
          // 给各个模块挂载其他模块的实例
          this.configureModules();
      }
      // 运行所有module的prepare方法
      start() {
          return __awaiter(this, void 0, void 0, function* () {
              const modulesToPrepare = ["UI", "Menu", "BlockManager", "Event"];
              return modulesToPrepare.reduce((promise, module) => promise.then(() => __awaiter(this, void 0, void 0, function* () {
                  yield this.moduleInstances[module].prepare();
              })), Promise.resolve());
          });
      }
      /**
       * @description 加载core模块
       * block、blockManager、renderer模块
       */
      render() {
          return __awaiter(this, void 0, void 0, function* () {
              return new Promise((resolve, reject) => {
                  this.moduleInstances.Renderer.firstInsert();
                  resolve();
              });
          });
      }
      constructModules() {
          Object.entries(Modules).forEach(([key, module]) => {
              try {
                  this.moduleInstances[key] = new module({
                      config: this.configuration,
                  });
              }
              catch (e) {
                  console.error(`加载${key}模块失败`, e);
              }
          });
          setModules(this.moduleInstances);
      }
      configureModules() {
          for (const name in this.moduleInstances) {
              if (Object.prototype.hasOwnProperty.call(this.moduleInstances, name)) {
                  // this.getModulesDiff(name); TODO: 返回除了自身外的所有module实例
                  this.moduleInstances[name].state = this.getModulesDiff(name);
              }
          }
      }
      set configuration(config) {
          var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
          if (isObject(config)) {
              this.config = Object.assign({}, config);
          }
          else {
              this.config = {
                  holder: config,
              };
          }
          if (this.config.holder == null) {
              this.config.holder = "#editorjs";
          }
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          this.config.minHeight =
              this.config.minHeight !== undefined ? this.config.minHeight : 300;
          const defaultBlockData = generateHeadData('h1');
          defaultBlockData.data.text = '标题';
          this.config.placeholder = this.config.placeholder || false;
          this.config.hideToolbar = this.config.hideToolbar
              ? this.config.hideToolbar
              : false;
          this.config.data =
              this.config.data && ((_a = this.config.data.blocks) === null || _a === void 0 ? void 0 : _a.length)
                  ? this.config.data
                  : { blocks: [] };
          this.config.onReady = this.config.onReady || (() => { });
          this.config.inlineToolbar =
              this.config.inlineToolbar !== undefined
                  ? this.config.inlineToolbar
                  : true;
          if (isEmpty(this.config.data) ||
              !this.config.data.blocks ||
              this.config.data.blocks.length === 0) {
              this.config.data = { blocks: [defaultBlockData] };
          }
          const [AITool, ParagraphTool, HeadTool1, HeadTool2, HeadTool3, HeadTool4, ImageTool, TableTool, ListTool, TodoListTool,] = interComponents.tools.plugins;
          this.config.tools = {
              toolbar: {
                  plugins: ((_d = (_c = (_b = this.config) === null || _b === void 0 ? void 0 : _b.tools) === null || _c === void 0 ? void 0 : _c.toolbar) === null || _d === void 0 ? void 0 : _d.plugins)
                      ? [
                          AITool,
                          ...(_g = (_f = (_e = this.config) === null || _e === void 0 ? void 0 : _e.tools) === null || _f === void 0 ? void 0 : _f.toolbar) === null || _g === void 0 ? void 0 : _g.plugins,
                          ParagraphTool,
                          HeadTool1,
                          HeadTool2,
                          HeadTool3,
                          HeadTool4,
                          ImageTool,
                          TableTool,
                          ListTool,
                          TodoListTool,
                      ]
                      : interComponents.tools.plugins,
                  layout: ((_k = (_j = (_h = this.config) === null || _h === void 0 ? void 0 : _h.tools) === null || _j === void 0 ? void 0 : _j.toolbar) === null || _k === void 0 ? void 0 : _k.layout)
                      ? [
                          ...(_o = (_m = (_l = this.config) === null || _l === void 0 ? void 0 : _l.tools) === null || _m === void 0 ? void 0 : _m.toolbar) === null || _o === void 0 ? void 0 : _o.layout,
                          ...interComponents.tools.layout,
                      ]
                      : interComponents.tools.layout,
              },
              menu: ((_q = (_p = this.config) === null || _p === void 0 ? void 0 : _p.tools) === null || _q === void 0 ? void 0 : _q.menu)
                  ? [...(_s = (_r = this.config) === null || _r === void 0 ? void 0 : _r.tools) === null || _s === void 0 ? void 0 : _s.menu, ...interComponents.menu]
                  : [...interComponents.menu],
          };
          // if(!this.config?.tools) {
          //     this.config.tools = {
          //         toolbar: {
          //             plugins: interComponents.tools.plugins,
          //             layout: interComponents.tools.layout
          //         },
          //         menu: [
          //             ...interComponents.menu
          //         ]
          //     };
          // } else {
          //     this.config.tools.toolbar.plugins.unshift(...interComponents.tools.plugins);
          //     this.config.tools.toolbar.layout.unshift(...interComponents.tools.layout);
          // }
      }
      get configuration() {
          return this.config;
      }
      getModulesDiff(name) {
          const diff = {};
          for (const moduleName in this.moduleInstances) {
              if (moduleName === name) {
                  continue;
              }
              diff[moduleName] = this.moduleInstances[moduleName];
          }
          return diff;
      }
      destroy() {
          setModules(null);
          if (isString(this.configuration.holder)) {
              Dom.querySelector(this.configuration.holder)["innerHTML"] =
                  "";
          }
          else if (isDOM(this.configuration.holder)) {
              this.configuration.holder["innerHTML"] = "";
          }
          if (this.moduleInstances.Event)
              this.moduleInstances.Event.destory();
      }
  }

  class SuperDoc {
      // 解析字符串html方法 转成blockData
      static complieHTMLToBlockData(htmlString) {
          return complieHTMLToBlockData(htmlString);
      }
      static deComplieBlockDataToHTML(blockData) {
          return deComplieBlockDataToHTML(blockData);
      }
      constructor(configuration) {
          this.blocks = [];
          this.editor = null;
          let onReady = () => { };
          if (configuration && isObject(configuration) && isFunction(configuration.onReady)) {
              onReady = configuration.onReady;
          }
          this.editor = new Core(configuration);
          this.isReady = this.editor.isReady.then(() => {
              //   this.exportAPI(editor);
              // 调用用户传入的渲染完成后的回调
              if (this.editor.config.isReadOnly) {
                  this.closeEditor();
              }
              onReady();
          });
      }
      closeEditor() {
          document.querySelectorAll('[contenteditable=true]').forEach(el => el.setAttribute('contenteditable', 'false'));
          this.editor.moduleInstances.UI.nodes.holder['style']['user-select'] = 'none';
      }
      /**
       * 设置blocks数据
      */
      setData(jsonData) {
          let blockJson;
          if (!jsonData || !jsonData.length) {
              blockJson = [generateParagraphData()];
          }
          else {
              blockJson = deepClone(jsonData);
          }
          this.editor.config.data.blocks.length = 0;
          blockJson.forEach(item => {
              item.id = item.id ? item.id : generateBlockId();
              this.editor.config.data.blocks.push(item);
          });
          // TODO:待优化
          if (this.editor.config.isReadOnly) {
              setTimeout(() => {
                  this.closeEditor();
              });
          }
      }
      /**
       *  获取文本字符串
       */
      getTextContent() {
          return this.editor.moduleInstances.BlockManager.blockInstances.map(instance => {
              var _a;
              return (_a = instance === null || instance === void 0 ? void 0 : instance.element) === null || _a === void 0 ? void 0 : _a.textContent;
          }).filter(text => !!text);
      }
      /**
       * 获取json
      */
      getBlocks() {
          return this.editor.config.data.blocks;
      }
      on(type, callback) {
          if (type === 'add') {
              this.editor.moduleInstances.Event.addListeners.add(callback);
          }
          else if (type === 'delete') {
              this.editor.moduleInstances.Event.deleteListeners.add(callback);
          }
          else if (type === 'update') {
              this.editor.moduleInstances.Event.updateListeners.add(callback);
          }
      }
      remove(type, callback) {
          if (type === 'add') {
              this.editor.moduleInstances.Event.addListeners.delete(callback);
          }
          else if (type === 'delete') {
              this.editor.moduleInstances.Event.deleteListeners.delete(callback);
          }
          else if (type === 'update') {
              this.editor.moduleInstances.Event.updateListeners.delete(callback);
          }
      }
      // 解析字符串html方法 转成blockData
      complieHTMLToBlockData(htmlString) {
          return complieHTMLToBlockData.call(this.editor.moduleInstances, htmlString);
          // let manager = this.editor.moduleInstances.BlockManager
          // console.log(`【superDoc】:解析html字符串转换成blockData`,htmlString)
          // let body:HTMLBodyElement = document.createElement('body');
          // body.innerHTML = htmlString;
          // let blockData = []
          // loopComplieNode(body,blockData)
          // function loopComplieNode(container,blockData){
          //   container.childNodes.forEach((child:HTMLElement)=>{
          //     if(child.nodeName == "DIV"){
          //       loopComplieNode(child,blockData)
          //     }else {
          //       let toolPlugin = manager.getToolByNodeName(child.nodeName);
          //       toolPlugin && toolPlugin?.complieHTMLToBlockData(child,blockData)
          //       if(!toolPlugin){
          //         console.log('【superDoc】:解析节点失败，暂无该节点解析器',child)
          //       }
          //     }
          //   })
          // }
          // // 释放节点
          // body.remove()
          // return blockData  
      }
      // blockData解析字符串html方法
      deComplieBlockDataToHTML(blockData) {
          let manager = this.editor.moduleInstances.BlockManager;
          try {
              let htmlString = blockData.map((block) => {
                  let toolPlugin = manager.getToolByType(block.type);
                  if (toolPlugin && toolPlugin.deComplieBlockDataToHTML) {
                      return toolPlugin.deComplieBlockDataToHTML(block);
                  }
                  else {
                      console.log(`【superDoc】:${block.type}无识别该类型的解析`, block);
                      return '空';
                  }
              }).join('\r\n');
              return `<html>\r\n<body>\r\n${htmlString}</body>\r\n</html>`;
          }
          catch (e) {
              console.error(`【superDoc_error】: 反解析为html失败${e}`);
          }
      }
      compileMdToBlockData(mdString) {
          let manager = this.editor.moduleInstances.BlockManager;
          console.log(`【superDoc】:解析默认字符串转换成blockData`, mdString);
          let blockData = [];
          let toolPlugin = manager.toolInstances.toolbar.plugins;
          let defaultTool = manager.getToolByType('Paragraph');
          mdString.split('\r\n').forEach((item) => {
              console.log(item);
              if (item) {
                  let tools = toolPlugin.find(tool => tool.checkMdToolType && tool.checkMdToolType(item));
                  if (tools) {
                      tools.compileMdToBlockData(item, blockData);
                  }
                  else {
                      defaultTool.compileMdToBlockData(item, blockData);
                  }
                  //  let tag = toolPlugin.some((tool)=>{
                  //     if(tool.checkMdToolType && tool.checkMdToolType(item)){
                  //       tool.compileMdToBlockData(item,blockData)
                  //       return true
                  //     }
                  //   })
                  //   if(!tag){
                  //    let tool = manager.getToolByType('Paragraph')
                  //    tool.compileMdToBlockData(item,blockData)
                  //   }
              }
              else {
                  defaultTool.compileMdToBlockData(item, blockData);
              }
          });
          // 释放节点
          return blockData;
      }
      destroy() {
          this.editor.destroy();
      }
  }

  return SuperDoc;

}));
