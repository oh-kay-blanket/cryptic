"use strict";(self.webpackChunklearn_cryptic=self.webpackChunklearn_cryptic||[]).push([[311],{719:function(e,t,n){n.r(t);var a=n(6540),r=(n(4810),n(6452)),l=n(4700),c=n(2737);t.default=function(){var e=(0,a.useContext)(l.R),t=e.setReturnLearn,n=e.typeViewed,s=e.setTypeViewed;!n.find((function(e){return"anagram"===e}))&&s("anagram");var m=a.createElement("button",{onClick:function(){return window.history.back()}},a.createElement("svg",{className:"back-button",xmlns:"http://www.w3.org/2000/svg",width:"25px",height:"25px",viewBox:"0 0 448 512"},a.createElement("path",{d:"M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"}))),o={easyClue:{path:"/clues/97",name:"Play an anagram clue",style:"primary",onClick:function(){t("anagram")}},return:{path:"/learn#learn-types",name:"Back to Learn",style:"secondary"},next:{path:"/learn/charade",name:"Next (Charade)",style:"alt"}},i=[o.easyClue],u=[o.return,o.next],d=["new","broken","mad","crazy","wild","scrambled","mixed","shaken","rearranged","confused","odd","unusual","off","dancing","rocky","stirred"].map((function(e,t){return a.createElement("li",{key:t,className:"indicator"},e.toLowerCase())}));return(0,a.useEffect)((function(){if("undefined"!=typeof window){var e=window.location.hash;e&&setTimeout((function(){var t=document.querySelector(e);t&&t.scrollIntoView({behavior:"instant"})}),1)}}),[]),a.createElement(r.A,null,a.createElement("div",{className:"learn container"},m,a.createElement("div",{className:"learn-section"},a.createElement("h1",null,"Anagram"),a.createElement("p",null,"In a clue with an anagram, a word or words are reordered to make a new word or words.")),a.createElement("div",{className:"learn-section"},a.createElement("h2",null,"Indicators"),a.createElement("p",null,"Clues with anagrams will always have an indicator word to let you know there will be an anagram. Common indicators include:"),a.createElement("ul",{className:"indicators mt-3"},d)),a.createElement("div",{className:"learn-section"},a.createElement("h2",null,"Examples"),a.createElement("div",{className:"example-container"},a.createElement("p",{className:"example"},'One unusual role in "The Matrix" (3)'),a.createElement("div",{className:"explanation"},a.createElement("ul",{className:"mt-0"},a.createElement("li",null,"The definition is ",a.createElement("strong",null,'role in "The Matrix"')),a.createElement("li",null,a.createElement("strong",null,"unusual")," indicates that ",a.createElement("strong",null,"One")," is an anagram")),a.createElement("p",{className:"text-center"},a.createElement("strong",null,"neo")," → ",a.createElement("strong",null,"one")),a.createElement("div",{className:"solution"},a.createElement("span",{className:"letter"},"n"),a.createElement("span",{className:"letter"},"e"),a.createElement("span",{className:"letter"},"o")))),a.createElement("div",{className:"example-container"},a.createElement("p",{className:"example"},"Altering odd three-sided figure (8)"),a.createElement("div",{className:"explanation"},a.createElement("ul",{className:"mt-0"},a.createElement("li",null,"The definition is ",a.createElement("strong",null,"three-sided figure")),a.createElement("li",null,a.createElement("strong",null,"odd")," indicates that ",a.createElement("strong",null,"Altering")," is an anagram")),a.createElement("p",{className:"text-center"},a.createElement("strong",null,"altering")," → ",a.createElement("strong",null,"triangle")),a.createElement("div",{className:"solution"},a.createElement("span",{className:"letter"},"t"),a.createElement("span",{className:"letter"},"r"),a.createElement("span",{className:"letter"},"i"),a.createElement("span",{className:"letter"},"a"),a.createElement("span",{className:"letter"},"n"),a.createElement("span",{className:"letter"},"g"),a.createElement("span",{className:"letter"},"l"),a.createElement("span",{className:"letter"},"e")))),a.createElement("div",{id:"next"},a.createElement(c.A,{btnArr:i}))),a.createElement("div",{className:"learn-section"},a.createElement(c.A,{btnArr:u}))))}},2737:function(e,t,n){n.d(t,{A:function(){return c}});var a=n(6540),r=n(4810),l=function(e){var t=e.btnInfo,n=t.path,l=void 0!==n&&n,c=t.name,s=t.style,m=t.onClick;return a.createElement(a.Fragment,null,l?a.createElement(r.Link,{to:l},a.createElement("button",{id:c.toLowerCase(),className:"show-btn ".concat(s),type:"button",onClick:m},c)):a.createElement("button",{id:c.toLowerCase(),className:"show-btn ".concat(s),type:"button",onClick:m},c))},c=function(e){var t=e.btnArr,n=e.isSolution,r=e.stack,c=void 0!==r&&r,s=t.map((function(e,t){return a.createElement(l,{key:t,btnInfo:e})}));return a.createElement("div",{className:"button-container".concat(c?" stack":"").concat(n?" solution":"")},s)}},6452:function(e,t,n){n.d(t,{A:function(){return m}});var a=n(6540),r=n(4810),l=n(4700),c=n.p+"static/logo-short-1bc27782bd51e8a2c1a14d4b9578bf31.png",s=function(){var e=(0,a.useContext)(l.R).setReturnLearn;return a.createElement(a.Fragment,null,a.createElement("header",{className:"top-bar"},a.createElement("div",{className:"container"},a.createElement(r.Link,{to:"/",onClick:function(){e(!1)}},a.createElement("img",{src:c,alt:""})))))},m=(n(8199),function(e){var t=e.children;return a.createElement(a.Fragment,null,a.createElement(s,null),a.createElement("main",null,t))})},8199:function(e,t,n){n.d(t,{p:function(){return r}});var a=n(6540),r=function(){return a.createElement(a.Fragment,null,a.createElement("meta",{charSet:"UTF-8"}),a.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),a.createElement("meta",{httpEquiv:"X-UA-Compatible",content:"ie=edge"}),a.createElement("meta",{property:"og:title",content:"Learn Cryptic"}),a.createElement("meta",{property:"og:description",content:"Learn Cryptic is a tool to help you learn about, practice and solve cryptic crossword clues."}),a.createElement("meta",{property:"og:type",content:"website"}),a.createElement("meta",{property:"og:url",content:"https://learncryptic.com"}),a.createElement("meta",{property:"og:image",content:"https://learncryptic.com/favicon.png"}),a.createElement("title",null,"Learn Cryptic"))}}}]);
//# sourceMappingURL=component---src-pages-learn-anagram-js-0b2dc827304ed4aba819.js.map