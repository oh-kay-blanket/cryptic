"use strict";(self.webpackChunklearn_cryptic=self.webpackChunklearn_cryptic||[]).push([[311],{2737:function(e,t,n){n.d(t,{A:function(){return c}});var a=n(6540),l=n(4810),r=function(e){var t=e.btnInfo,n=t.path,r=void 0!==n&&n,c=t.name,s=t.style,m=t.onClick;return a.createElement(a.Fragment,null,r?a.createElement(l.Link,{to:r},a.createElement("button",{id:c.toLowerCase(),className:"show-btn ".concat(s),type:"button",onClick:m},c)):a.createElement("button",{id:c.toLowerCase(),className:"show-btn ".concat(s),type:"button",onClick:m},c))},c=function(e){var t=e.btnArr,n=e.isSolution,l=e.stack,c=void 0!==l&&l,s=t.map((function(e,t){return a.createElement(r,{key:t,btnInfo:e})}));return a.createElement("div",{className:"button-container".concat(c?" stack":"").concat(n?" solution":"")},s)}},255:function(e,t,n){n.r(t);var a=n(6540),l=n(4984),r=n(2737);t.default=function(e){var t=e.setReturnLearn,n=a.createElement(l.N_,{to:"/learn"},a.createElement("svg",{className:"back-button",xmlns:"http://www.w3.org/2000/svg",width:"25px",height:"25px",viewBox:"0 0 448 512"},a.createElement("path",{d:"M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"}))),c={easyClue:{path:"/clues/97",name:"Play an anagram clue",style:"primary",onClick:function(){t("anagram")}},return:{path:"/learn",name:"Return",style:"secondary"}},s=[c.return,c.easyClue],m=["new","broken","mad","crazy","wild","scrambled","mixed","shaken","rearranged","confused","odd","unusual","off","dancing","rocky","stirred"].map((function(e){return a.createElement("li",{className:"indicator"},e.toLowerCase())}));return a.createElement("div",{className:"learn container"},n,a.createElement("div",{className:"learn-section"},a.createElement("h1",null,"Anagram"),a.createElement("p",null,"In a clue with an anagram, a word or words are reordered to make a new word or words.")),a.createElement("div",{className:"learn-section"},a.createElement("h2",null,"Indicators"),a.createElement("p",null,"Clues with anagrams will always have an indicator word to let you know there will be an anagram. Common indicators include:"),a.createElement("ul",{className:"indicators mt-3"},m)),a.createElement("div",{className:"learn-section"},a.createElement("h2",null,"Examples"),a.createElement("div",{className:"example-container"},a.createElement("p",{className:"example"},'One unusual role in "The Matrix" (3)'),a.createElement("div",{className:"explanation"},a.createElement("ul",{className:"mt-0"},a.createElement("li",null,"The definition is ",a.createElement("strong",null,'role in "The Matrix"')),a.createElement("li",null,a.createElement("strong",null,"unusual")," indicates that ",a.createElement("strong",null,"One")," is an anagram")),a.createElement("p",{className:"text-center"},a.createElement("strong",null,"neo")," → ",a.createElement("strong",null,"one")),a.createElement("div",{className:"solution"},a.createElement("span",{className:"letter"},"n"),a.createElement("span",{className:"letter"},"e"),a.createElement("span",{className:"letter"},"o")))),a.createElement("div",{className:"example-container"},a.createElement("p",{className:"example"},"Altering odd three-sided figure (8)"),a.createElement("div",{className:"explanation"},a.createElement("ul",{className:"mt-0"},a.createElement("li",null,"The definition is ",a.createElement("strong",null,"three-sided figure")),a.createElement("li",null,a.createElement("strong",null,"odd")," indicates that ",a.createElement("strong",null,"Altering")," is an anagram")),a.createElement("p",{className:"text-center"},a.createElement("strong",null,"altering")," → ",a.createElement("strong",null,"triangle")),a.createElement("div",{className:"solution"},a.createElement("span",{className:"letter"},"t"),a.createElement("span",{className:"letter"},"r"),a.createElement("span",{className:"letter"},"i"),a.createElement("span",{className:"letter"},"a"),a.createElement("span",{className:"letter"},"n"),a.createElement("span",{className:"letter"},"g"),a.createElement("span",{className:"letter"},"l"),a.createElement("span",{className:"letter"},"e"))))),a.createElement("div",{className:"learn-section"},a.createElement(r.A,{btnArr:s})))}},6069:function(e,t){const n=/^[\u0021-\u003A\u003C\u003E-\u007E]+$/,a=/^[\u0021-\u003A\u003C-\u007E]*$/,l=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,r=/^[\u0020-\u003A\u003D-\u007E]*$/,c=Object.prototype.toString,s=(()=>{const e=function(){};return e.prototype=Object.create(null),e})();function m(e,t,n){do{const n=e.charCodeAt(t);if(32!==n&&9!==n)return t}while(++t<n);return n}function o(e,t,n){for(;t>n;){const n=e.charCodeAt(--t);if(32!==n&&9!==n)return t+1}return n}function i(e){if(-1===e.indexOf("%"))return e;try{return decodeURIComponent(e)}catch(t){return e}}}}]);
//# sourceMappingURL=component---src-pages-learn-anagram-js-20b546ba0d043617c38a.js.map