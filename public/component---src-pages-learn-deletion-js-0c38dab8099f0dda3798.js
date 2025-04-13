"use strict";(self.webpackChunklearn_cryptic=self.webpackChunklearn_cryptic||[]).push([[848],{2737:function(e,t,n){n.d(t,{A:function(){return c}});var a=n(6540),l=n(4810),r=function(e){var t=e.btnInfo,n=t.path,r=void 0!==n&&n,c=t.name,s=t.style,i=t.onClick;return a.createElement(a.Fragment,null,r?a.createElement(l.Link,{to:r},a.createElement("button",{id:c.toLowerCase(),className:"show-btn ".concat(s),type:"button",onClick:i},c)):a.createElement("button",{id:c.toLowerCase(),className:"show-btn ".concat(s),type:"button",onClick:i},c))},c=function(e){var t=e.btnArr,n=e.isSolution,l=e.stack,c=void 0!==l&&l,s=t.map((function(e,t){return a.createElement(r,{key:t,btnInfo:e})}));return a.createElement("div",{className:"button-container".concat(c?" stack":"").concat(n?" solution":"")},s)}},6452:function(e,t,n){n.d(t,{A:function(){return i}});var a=n(6540),l=n(4810),r=n(4700),c=n.p+"static/logo-short-1bc27782bd51e8a2c1a14d4b9578bf31.png",s=function(){var e=(0,a.useContext)(r.R).setReturnLearn;return a.createElement(a.Fragment,null,a.createElement("header",{className:"top-bar"},a.createElement("div",{className:"container"},a.createElement(l.Link,{to:"/",onClick:function(){e(!1)}},a.createElement("img",{src:c,alt:""})))))},i=(n(8199),function(e){var t=e.children;return a.createElement(a.Fragment,null,a.createElement(s,null),a.createElement("main",null,t))})},8199:function(e,t,n){n.d(t,{p:function(){return l}});var a=n(6540),l=function(){return a.createElement(a.Fragment,null,a.createElement("meta",{charSet:"UTF-8"}),a.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),a.createElement("meta",{httpEquiv:"X-UA-Compatible",content:"ie=edge"}),a.createElement("meta",{property:"og:title",content:"Learn Cryptic"}),a.createElement("meta",{property:"og:description",content:"Learn Cryptic is a tool to help you learn about, practice and solve cryptic crossword clues."}),a.createElement("meta",{property:"og:type",content:"website"}),a.createElement("meta",{property:"og:url",content:"https://learncryptic.com"}),a.createElement("meta",{property:"og:image",content:"https://learncryptic.com/favicon.png"}),a.createElement("title",null,"Learn Cryptic"))}},9834:function(e,t,n){n.r(t);var a=n(6540),l=n(6452),r=n(4700),c=n(2737);t.default=function(){var e=(0,a.useContext)(r.R),t=e.setReturnLearn,n=e.typeViewed,s=e.setTypeViewed,i=n.find((function(e){return"deletion"===e}));(0,a.useEffect)((function(){i||"function"!=typeof s||s("deletion")}),[i,s]);var o=a.createElement("button",{onClick:function(){return window.history.back()},"aria-label":"Go back"},a.createElement("svg",{className:"back-button",xmlns:"http://www.w3.org/2000/svg",width:"25px",height:"25px",viewBox:"0 0 448 512"},a.createElement("path",{d:"M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"}))),m={easyClue:{path:"/clues/104",name:"Play a deletion clue",style:"primary",onClick:function(){t("deletion")}},return:{path:"/learn#learn-types",name:"Back to Learn",style:"secondary"},next:{path:"/learn/double-definition",name:"Next (Double Definition)",style:"alt"}},u=[m.easyClue],E=[m.return,m.next],p=["missing","minus","without","even","odd","hollow","middle","endless","headless","short","empty","outskirts","outside","inside","a couple"].map((function(e){return a.createElement("li",{className:"indicator"},e.toLowerCase())}));return(0,a.useEffect)((function(){if("undefined"!=typeof window){var e=window.location.hash;e&&setTimeout((function(){var t=document.querySelector(e);t&&t.scrollIntoView({behavior:"instant"})}),1)}}),[]),a.createElement(l.A,null,a.createElement("div",{className:"learn container"},o,a.createElement("div",{className:"learn-section"},a.createElement("h1",null,"Deletion"),a.createElement("p",null,"In a clue with a deletion, remove a letter or set of letters from the beginning, middle, or end of a word.")),a.createElement("div",{className:"learn-section"},a.createElement("h2",null,"Indicators"),a.createElement("p",null,"Common deletion indicators include:"),a.createElement("ul",{className:"indicators"},p)),a.createElement("div",{className:"learn-section"},a.createElement("h2",null,"Examples"),a.createElement("div",{className:"example-container"},a.createElement("p",{className:"example"},"Different parent starts late (6)"),a.createElement("div",{className:"explanation"},a.createElement("ul",{className:"mt-0"},a.createElement("li",null,"The definition is ",a.createElement("strong",null,"different")),a.createElement("li",null,a.createElement("strong",null,"parent")," can be ",a.createElement("strong",null,"mother")),a.createElement("li",null,a.createElement("strong",null,"starts late")," indicates a deletion")),a.createElement("p",{className:"text-center"},a.createElement("strong",null,"mother")," - ",a.createElement("strong",null,"m")," = ",a.createElement("strong",null,"other")),a.createElement("div",{className:"solution"},a.createElement("span",{className:"letter"},"o"),a.createElement("span",{className:"letter"},"t"),a.createElement("span",{className:"letter"},"h"),a.createElement("span",{className:"letter"},"e"),a.createElement("span",{className:"letter"},"r")))),a.createElement("div",{className:"example-container"},a.createElement("p",{className:"example"},"French city park is excluding kids, at first (5)"),a.createElement("div",{className:"explanation"},a.createElement("ul",{className:"mt-0"},a.createElement("li",null,"The definition is ",a.createElement("strong",null,"French city")),a.createElement("li",null,a.createElement("strong",null,"kids, at first")," gives us ",a.createElement("strong",null,"k")),a.createElement("li",null,a.createElement("strong",null,"excluding")," indicates a deletion")),a.createElement("p",{className:"text-center"},a.createElement("strong",null,"park is")," - ",a.createElement("strong",null,"k")," = ",a.createElement("strong",null,"paris")),a.createElement("div",{className:"solution"},a.createElement("span",{className:"letter"},"p"),a.createElement("span",{className:"letter"},"a"),a.createElement("span",{className:"letter"},"r"),a.createElement("span",{className:"letter"},"i"),a.createElement("span",{className:"letter"},"s")))),a.createElement("div",{id:"next"},a.createElement(c.A,{btnArr:u}))),a.createElement("div",{className:"learn-section"},a.createElement(c.A,{btnArr:E}))))}}}]);
//# sourceMappingURL=component---src-pages-learn-deletion-js-0c38dab8099f0dda3798.js.map