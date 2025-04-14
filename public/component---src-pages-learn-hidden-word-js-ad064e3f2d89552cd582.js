"use strict";(self.webpackChunklearn_cryptic=self.webpackChunklearn_cryptic||[]).push([[701],{1626:function(e,t,n){n.d(t,{A:function(){return s}});var a=n(6540),l=n(4810),r=n(4700),c=n.p+"static/logo-short-1bc27782bd51e8a2c1a14d4b9578bf31.png",o=function(){var e=(0,a.useContext)(r.R).setReturnLearn;return a.createElement(a.Fragment,null,a.createElement("header",{className:"top-bar"},a.createElement("div",{className:"container"},a.createElement(l.Link,{to:"/",onClick:function(){e(!1)}},a.createElement("img",{src:c,alt:""})))))},s=(n(8199),function(e){var t=e.children;return a.createElement(a.Fragment,null,a.createElement(o,null),a.createElement("main",null,t))})},2737:function(e,t,n){n.d(t,{A:function(){return c}});var a=n(6540),l=n(4810),r=function(e){var t=e.btnInfo,n=t.path,r=void 0!==n&&n,c=t.name,o=t.style,s=t.onClick,i=t.img,m=void 0!==i&&i;return a.createElement(a.Fragment,null,r?a.createElement(l.Link,{to:r,id:c.toLowerCase(),className:"show-btn ".concat(o),type:"button",onClick:s},c):a.createElement("button",{id:c.toLowerCase(),className:"show-btn ".concat(o),type:"button",onClick:s},c,m))},c=function(e){var t=e.btnArr,n=e.isSolution,l=e.stack,c=void 0!==l&&l,o=t.map((function(e,t){return a.createElement(r,{key:t,btnInfo:e})}));return a.createElement("div",{className:"button-container".concat(c?" stack":"").concat(n?" solution":"")},o)}},3877:function(e,t,n){n.r(t);var a=n(6540),l=n(1626),r=n(4700),c=n(2737);t.default=function(){var e=(0,a.useContext)(r.R),t=e.setReturnLearn,n=e.typeViewed,o=e.setTypeViewed,s=n.find((function(e){return"hidden-word"===e}));(0,a.useEffect)((function(){s||"function"!=typeof o||o("hidden-word")}),[s,o]);var i=a.createElement("button",{onClick:function(){return window.history.back()},"aria-label":"Go back"},a.createElement("svg",{className:"back-button",xmlns:"http://www.w3.org/2000/svg",width:"25px",height:"25px",viewBox:"0 0 448 512"},a.createElement("path",{d:"M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"}))),m={easyClue:{path:"/clues/2",name:"Play a hidden word clue",style:"primary",onClick:function(){t("hidden-word")}},return:{path:"/learn#learn-types",name:"Back to Learn",style:"secondary"},next:{path:"/learn/homophone",name:"Next (Homophone)",style:"alt"}},u=[m.easyClue],d=[m.return,m.next],E=["concealed","within","member","held","inside","buried","featured","seen in","stocks","partly","smuggled","sheath"].map((function(e){return a.createElement("li",{className:"indicator"},e.toLowerCase())}));return(0,a.useEffect)((function(){if("undefined"!=typeof window){var e=window.location.hash;e&&setTimeout((function(){var t=document.querySelector(e);t&&t.scrollIntoView({behavior:"instant"})}),1)}}),[]),a.createElement(l.A,null,a.createElement("div",{className:"learn container"},i,a.createElement("div",{className:"learn-section"},a.createElement("h1",null,"Hidden Word"),a.createElement("p",null,"In a clue with a hidden word, the answer is a string of letters embedded in the clue.")),a.createElement("div",{className:"learn-section"},a.createElement("h2",null,"Indicators"),a.createElement("p",null,"Common hidden word indicators include:"),a.createElement("ul",{className:"indicators"},E)),a.createElement("div",{className:"learn-section"},a.createElement("h2",null,"Examples"),a.createElement("div",{className:"example-container"},a.createElement("p",{className:"example"},"Field in Far East (4)"),a.createElement("div",{className:"explanation"},a.createElement("ul",{className:"mt-0"},a.createElement("li",null,"The definition is ",a.createElement("strong",null,"Field")),a.createElement("li",null,a.createElement("strong",null,"in")," indicates a hidden word")),a.createElement("p",{className:"text-center"},a.createElement("strong",null,"f"),"(",a.createElement("strong",null,"ar ea"),")",a.createElement("strong",null,"st")),a.createElement("div",{className:"solution"},a.createElement("span",{className:"letter"},"a"),a.createElement("span",{className:"letter"},"r"),a.createElement("span",{className:"letter"},"e"),a.createElement("span",{className:"letter"},"a")))),a.createElement("div",{className:"example-container"},a.createElement("p",{className:"example"},"Focus too much on portion of job session (6)"),a.createElement("div",{className:"explanation"},a.createElement("ul",{className:"mt-0"},a.createElement("li",null,"The definition is ",a.createElement("strong",null,"Focus too much on")),a.createElement("li",null,a.createElement("strong",null,"portion of")," indicates a hidden word")),a.createElement("p",{className:"text-center"},a.createElement("strong",null,"j"),"(",a.createElement("strong",null,"ob sess"),")",a.createElement("strong",null,"ion")),a.createElement("div",{className:"solution"},a.createElement("span",{className:"letter"},"o"),a.createElement("span",{className:"letter"},"b"),a.createElement("span",{className:"letter"},"s"),a.createElement("span",{className:"letter"},"e"),a.createElement("span",{className:"letter"},"s"),a.createElement("span",{className:"letter"},"s")))),a.createElement("div",{id:"next"},a.createElement(c.A,{btnArr:u}))),a.createElement("div",{className:"learn-section"},a.createElement(c.A,{btnArr:d}))))}},8199:function(e,t,n){n.d(t,{p:function(){return l}});var a=n(6540),l=function(){return a.createElement(a.Fragment,null,a.createElement("meta",{charSet:"UTF-8"}),a.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),a.createElement("meta",{httpEquiv:"X-UA-Compatible",content:"ie=edge"}),a.createElement("meta",{property:"og:title",content:"Learn Cryptic"}),a.createElement("meta",{property:"og:description",content:"Learn Cryptic is a tool to help you learn about, practice and solve cryptic crossword clues."}),a.createElement("meta",{property:"og:type",content:"website"}),a.createElement("meta",{property:"og:url",content:"https://learncryptic.com"}),a.createElement("meta",{property:"og:image",content:"https://learncryptic.com/favicon.png"}),a.createElement("title",null,"Learn Cryptic"))}}}]);
//# sourceMappingURL=component---src-pages-learn-hidden-word-js-ad064e3f2d89552cd582.js.map