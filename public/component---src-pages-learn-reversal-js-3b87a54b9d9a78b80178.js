"use strict";(self.webpackChunklearn_cryptic=self.webpackChunklearn_cryptic||[]).push([[376],{2737:function(e,t,n){n.d(t,{A:function(){return c}});var a=n(6540),l=n(4810),r=function(e){var t=e.btnInfo,n=t.path,r=void 0!==n&&n,c=t.name,s=t.style,m=t.onClick;return a.createElement(a.Fragment,null,r?a.createElement(l.Link,{to:r},a.createElement("button",{id:c.toLowerCase(),className:"show-btn ".concat(s),type:"button",onClick:m},c)):a.createElement("button",{id:c.toLowerCase(),className:"show-btn ".concat(s),type:"button",onClick:m},c))},c=function(e){var t=e.btnArr,n=e.isSolution,l=e.stack,c=void 0!==l&&l,s=t.map((function(e,t){return a.createElement(r,{key:t,btnInfo:e})}));return a.createElement("div",{className:"button-container".concat(c?" stack":"").concat(n?" solution":"")},s)}},6452:function(e,t,n){n.d(t,{A:function(){return m}});var a=n(6540),l=n(4810),r=n(4700),c=n.p+"static/logo-short-1bc27782bd51e8a2c1a14d4b9578bf31.png",s=function(){var e=(0,a.useContext)(r.R).setReturnLearn;return a.createElement(a.Fragment,null,a.createElement("header",{className:"top-bar"},a.createElement("div",{className:"container"},a.createElement(l.Link,{to:"/",onClick:function(){e(!1)}},a.createElement("img",{src:c,alt:""})))))},m=(n(8199),function(e){var t=e.children;return a.createElement(a.Fragment,null,a.createElement(s,null),a.createElement("main",null,t))})},7826:function(e,t,n){n.r(t);var a=n(6540),l=n(6452),r=n(4700),c=n(2737);t.default=function(){var e=(0,a.useContext)(r.R),t=e.setReturnLearn,n=e.typeViewed,s=e.setTypeViewed,m=n.find((function(e){return"reversal"===e}));(0,a.useEffect)((function(){m||"function"!=typeof s||s("reversal")}),[m,s]);var o=a.createElement("button",{onClick:function(){return window.history.back()},"aria-label":"Go back"},a.createElement("svg",{className:"back-button",xmlns:"http://www.w3.org/2000/svg",width:"25px",height:"25px",viewBox:"0 0 448 512"},a.createElement("path",{d:"M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"}))),i={easyClue:{path:"/clues/208",name:"Play a reversal clue",style:"primary",onClick:function(){t("reversal")}},return:{path:"/learn#learn-types",name:"Back to Learn",style:"secondary"},next:{path:"/learn/spoonerism",name:"Next (Spoonerism)",style:"alt"}},u=[i.easyClue],E=[i.return,i.next],p=["returning","back","backwards","retrace","retreat","reverse","upon reflection","up","inverted"].map((function(e){return a.createElement("li",{className:"indicator"},e.toLowerCase())}));return(0,a.useEffect)((function(){if("undefined"!=typeof window){var e=window.location.hash;e&&setTimeout((function(){var t=document.querySelector(e);t&&t.scrollIntoView({behavior:"instant"})}),1)}}),[]),a.createElement(l.A,null,a.createElement("div",{className:"learn container"},o,a.createElement("div",{className:"learn-section"},a.createElement("h1",null,"Reversal"),a.createElement("p",null,"In a clue with a reversal, reverse the letters to make a new word or words.")),a.createElement("div",{className:"learn-section"},a.createElement("h2",null,"Indicators"),a.createElement("p",null,"Common reversal indicators include:"),a.createElement("ul",{className:"indicators"},p)),a.createElement("div",{className:"learn-section"},a.createElement("h2",null,"Examples"),a.createElement("div",{className:"example-container"},a.createElement("p",{className:"example"},"King with a golden touch is unhappy I'm returning (5)"),a.createElement("div",{className:"explanation"},a.createElement("ul",{className:"mt-0"},a.createElement("li",null,"The definition is ",a.createElement("strong",null,"King with a golden touch")),a.createElement("li",null,a.createElement("strong",null,"unhappy")," can be ",a.createElement("strong",null,"sad")),a.createElement("li",null,a.createElement("strong",null,"I'm")," is used directly"),a.createElement("li",null,a.createElement("strong",null,"returning")," indicates a reversal")),a.createElement("p",{className:"text-center"},a.createElement("strong",null,"sad Im")," → ",a.createElement("strong",null,"midas")),a.createElement("div",{className:"solution"},a.createElement("span",{className:"letter"},"m"),a.createElement("span",{className:"letter"},"i"),a.createElement("span",{className:"letter"},"d"),a.createElement("span",{className:"letter"},"a"),a.createElement("span",{className:"letter"},"s")))),a.createElement("div",{className:"example-container"},a.createElement("p",{className:"example"},"Idly chat with actor Neeson, returning post office worker's sack (7)"),a.createElement("div",{className:"explanation"},a.createElement("ul",{className:"mt-0"},a.createElement("li",null,"The definition is ",a.createElement("strong",null,"post office worker's sack")),a.createElement("li",null,a.createElement("strong",null,"Idly chat")," can be ",a.createElement("strong",null,"gab")),a.createElement("li",null,a.createElement("strong",null,"actor Neeson")," can be ",a.createElement("strong",null,"Liam")),a.createElement("li",null,a.createElement("strong",null,"returning")," indicates a reversal")),a.createElement("p",{className:"text-center"},a.createElement("strong",null,"gab liam")," → ",a.createElement("strong",null,"mailbag")),a.createElement("div",{className:"solution"},a.createElement("span",{className:"letter"},"m"),a.createElement("span",{className:"letter"},"a"),a.createElement("span",{className:"letter"},"i"),a.createElement("span",{className:"letter"},"l"),a.createElement("span",{className:"letter"},"b"),a.createElement("span",{className:"letter"},"a"),a.createElement("span",{className:"letter"},"g")))),a.createElement("div",{id:"next"},a.createElement(c.A,{btnArr:u}))),a.createElement("div",{className:"learn-section"},a.createElement(c.A,{btnArr:E}))))}},8199:function(e,t,n){n.d(t,{p:function(){return l}});var a=n(6540),l=function(){return a.createElement(a.Fragment,null,a.createElement("meta",{charSet:"UTF-8"}),a.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),a.createElement("meta",{httpEquiv:"X-UA-Compatible",content:"ie=edge"}),a.createElement("meta",{property:"og:title",content:"Learn Cryptic"}),a.createElement("meta",{property:"og:description",content:"Learn Cryptic is a tool to help you learn about, practice and solve cryptic crossword clues."}),a.createElement("meta",{property:"og:type",content:"website"}),a.createElement("meta",{property:"og:url",content:"https://learncryptic.com"}),a.createElement("meta",{property:"og:image",content:"https://learncryptic.com/favicon.png"}),a.createElement("title",null,"Learn Cryptic"))}}}]);
//# sourceMappingURL=component---src-pages-learn-reversal-js-3b87a54b9d9a78b80178.js.map