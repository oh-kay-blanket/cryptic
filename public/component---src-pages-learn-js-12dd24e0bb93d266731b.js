"use strict";(self.webpackChunklearn_cryptic=self.webpackChunklearn_cryptic||[]).push([[427],{2737:function(e,t,a){a.d(t,{A:function(){return c}});var n=a(6540),l=a(4810),r=function(e){var t=e.btnInfo,a=t.path,r=void 0!==a&&a,c=t.name,i=t.style,o=t.onClick,m=t.img,A=void 0!==m&&m;return n.createElement(n.Fragment,null,r?n.createElement(l.Link,{to:r},n.createElement("button",{id:c.toLowerCase(),className:"show-btn ".concat(i),type:"button",onClick:o},c)):n.createElement("button",{id:c.toLowerCase(),className:"show-btn ".concat(i),type:"button",onClick:o},c,A))},c=function(e){var t=e.btnArr,a=e.isSolution,l=e.stack,c=void 0!==l&&l,i=t.map((function(e,t){return n.createElement(r,{key:t,btnInfo:e})}));return n.createElement("div",{className:"button-container".concat(c?" stack":"").concat(a?" solution":"")},i)}},6452:function(e,t,a){a.d(t,{A:function(){return o}});var n=a(6540),l=a(4810),r=a(4700),c=a.p+"static/logo-short-1bc27782bd51e8a2c1a14d4b9578bf31.png",i=function(){var e=(0,n.useContext)(r.R).setReturnLearn;return n.createElement(n.Fragment,null,n.createElement("header",{className:"top-bar"},n.createElement("div",{className:"container"},n.createElement(l.Link,{to:"/",onClick:function(){e(!1)}},n.createElement("img",{src:c,alt:""})))))},o=(a(8199),function(e){var t=e.children;return n.createElement(n.Fragment,null,n.createElement(i,null),n.createElement("main",null,t))})},6528:function(e,t,a){a.r(t),a.d(t,{default:function(){return A}});var n=a(6540),l=a(4810),r=a(6452),c=a(2737),i=a(4700),o=a.p+"static/type-pill-reveal-bd952b21bad1f05324a3ecbfc841d796.png",m=a.p+"static/example-e777dfa694b93f88a5dbedd47ea1270b.jpg",A=function(){var e=(0,n.useContext)(i.R).typeViewed,t=[{path:"/clues/208",name:"Try a clue",style:"primary"}],a=[{name:"Anagram",id:"anagram"},{name:"Charade",id:"charade"},{name:"Container",id:"container"},{name:"Deletion",id:"deletion"},{name:"Double Definition",id:"double-definition"},{name:"Hidden Word",id:"hidden-word"},{name:"Homophone",id:"homophone"},{name:"Initialism",id:"initialism"},{name:"Letter Bank",id:"letter-bank"},{name:"Reversal",id:"reversal"},{name:"Spoonerism",id:"spoonerism"},{name:"& Lit.",id:"lit"},{name:"Combination",id:"combination"}].map((function(t){var a=e.find((function(e){return e===t.id}));return n.createElement("li",{key:t.id,className:a?"viewed":""},n.createElement(l.Link,{to:t.id},t.name))}));return(0,n.useEffect)((function(){if("undefined"!=typeof window){var e=window.location.hash;e&&setTimeout((function(){var t=document.querySelector(e);t&&t.scrollIntoView({behavior:"instant"})}),1)}}),[]),n.createElement(r.A,null,n.createElement("div",{className:"learn container"},n.createElement("div",{className:"learn-section"},n.createElement("h2",{className:"learn-question"},"What is a cryptic crossword?"),n.createElement("p",{className:"learn-answer"},"A cryptic crossword is a type of crossword in which each clue is a puzzle in itself, often involving wordplay, anagrams, homophones, hidden words, or other linguistic tricks. Unlike standard crosswords, where clues are straightforward definitions, cryptic clues typically have two parts:"),n.createElement("ul",{className:"no-dec"},n.createElement("li",{className:"mt-3"},n.createElement("p",null,n.createElement("strong",null,"Definition")),n.createElement("p",null,"A straight or slightly disguised definition of the answer. This will ",n.createElement("span",{className:"underline"},"always")," be at the start or end of the clue.")),n.createElement("li",{className:"mt-3"},n.createElement("p",null,n.createElement("strong",null,"Wordplay")),n.createElement("p",null,"A cryptic hint involving anagrams, reversals, hidden words, homophones, or other forms of word manipulation."))),n.createElement("p",null,n.createElement("strong",null,"Example")),n.createElement("div",{className:"example-container"},n.createElement("div",{className:"example"},n.createElement("img",{src:m,alt:""})),n.createElement("div",{className:"explanation"},n.createElement("ul",{className:"mt-0"},n.createElement("li",null,"The definition is ",n.createElement("strong",null,"poison fungus")),n.createElement("li",null,n.createElement("strong",null,"toads")," is a synonym for ",n.createElement("strong",null,"frogs")),n.createElement("li",null,n.createElement("strong",null,"tool")," is a synonym for ",n.createElement("strong",null,"saw"))),n.createElement("p",{className:"text-center"},n.createElement("strong",null,"toads")," + ",n.createElement("strong",null,"tool")," = ",n.createElement("strong",null,"toadstool")),n.createElement("div",{className:"solution"},n.createElement("span",{className:"letter"},"t"),n.createElement("span",{className:"letter"},"o"),n.createElement("span",{className:"letter"},"a"),n.createElement("span",{className:"letter"},"d"),n.createElement("span",{className:"letter"},"s"),n.createElement("span",{className:"letter"},"t"),n.createElement("span",{className:"letter"},"o"),n.createElement("span",{className:"letter"},"o"),n.createElement("span",{className:"letter"},"l"))))),n.createElement("div",{className:"learn-section"},n.createElement("h2",{className:"learn-question"},"What is Learn Cryptic?"),n.createElement("p",{className:"learn-answer"},"Learn Cryptic is a  daily game to help you learn about and practice cryptic clues. There are two ways you can get help with solving clues:"),n.createElement("ul",{className:"no-dec"},n.createElement("li",{className:"mt-3"},n.createElement("p",null,n.createElement("strong",null,"Wordplay used")),n.createElement("p",null,"At the top of each clue you will see purple pills indicating the type(s) of wordplay used in this clue. Tapping on these will reveal more information about that type."),n.createElement("img",{className:"border",src:o,alt:""})),n.createElement("li",{className:"mt-3"},n.createElement("p",null,n.createElement("strong",null,"Hints")),n.createElement("p",null,'The "Show hint" and "Reveal solution" buttons in the clue provide direct guidance as to what steps you will need to take to find the solution.'),n.createElement("img",{className:"border",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAtCAYAAABYtc7wAAAMP2lDQ1BJQ0MgUHJvZmlsZQAASImVVwdYU8kWnluSkEBooUsJvQkCUgJICaEFkF4EGyEJEEqIgaBiL4sKrl0sYENXRRQ7IBYUUSwsig37goiKsi4W7MqbFNB1X/ne+b6597//nPnPmXPnlgFA7TRHJMpB1QHIFRaIY0MC6OOSU+ikXoAAFJCBEdDgcPNFzOjoCABt6Px3e3cLekO77iDV+mf/fzUNHj+fCwASDXEaL5+bC/ERAPAKrkhcAABRyptPLRBJMWxASwwThHixFGfIcYUUp8nxAZlPfCwL4mYAlFQ4HHEGAKpXIU8v5GZADdV+iJ2EPIEQADU6xL65uXk8iFMhtoE+Ioil+oy0H3Qy/qaZNqzJ4WQMY/lcZKYUKMgX5XCm/5/l+N+WmyMZimEFm0qmODRWOmdYt9vZeeFSrAJxnzAtMgpiTYg/CHgyf4hRSqYkNEHujxpy81mwZkAHYiceJzAcYkOIg4U5kREKPi1dEMyGGK4QdJqggB0PsR7Ei/n5QXEKn63ivFhFLLQ2XcxiKvgLHLEsrjTWQ0l2AlOh/zqTz1boY6pFmfFJEFMgtigUJEZCrAqxY352XLjCZ0xRJityyEcsiZXmbwFxLF8YEiDXxwrTxcGxCv+S3Pyh+WJbMwXsSAU+VJAZHyqvD9bM5cjyh3PBrvKFzIQhHX7+uIihufD4gUHyuWPP+MKEOIXOB1FBQKx8LE4R5UQr/HEzfk6IlDeD2DW/ME4xFk8sgAtSro+niwqi4+V54kVZnLBoeT74ChABWCAQ0IEEtjSQB7KAoK2vrg9eyXuCAQeIQQbgAwcFMzQiSdYjhMc4UAT+hIgP8ofHBch6+aAQ8l+HWfnRAaTLegtlI7LBE4hzQTjIgdcS2SjhcLRE8Bgygn9E58DGhfnmwCbt//f8EPudYUImQsFIhiLS1YY8iUHEQGIoMZhoixvgvrg3HgGP/rC54Azcc2ge3/0JTwjthEeEm4ROwp3Jgvnin7IcCzqhfrCiFmk/1gK3gppueADuA9WhMq6DGwAH3BXGYeJ+MLIbZFmKvKVVof+k/bcZ/HA3FH5kJzJK1iX7k21+Hqlqp+o2rCKt9Y/1keeaNlxv1nDPz/FZP1SfB8/hP3tii7HDWAt2BruIncDqAB1rxOqxVuykFA+vrsey1TUULVaWTzbUEfwj3tCdlVYy36naqdfpi7yvgD9N+o4GrDzRdLEgI7OAzoRfBD6dLeQ6jqS7OLm4ASD9vshfX29iZN8NRKf1O7fgDwB8GgcHB49/58IaATjoAR//Y985Gwb8dCgDcOEYVyIulHO49ECAbwk1+KTpA2NgDmzgfFyAO/AG/iAIhIEoEA+SwSSYfSZc52IwFcwE80AxKAUrwFqwEWwB28FusA8cAnXgBDgDzoPL4Cq4Ce7B1dMDXoB+8A58RhCEhFARGqKPmCCWiD3igjAQXyQIiUBikWQkFclAhIgEmYksQEqRVchGZBtShRxEjiFnkItIO3IH6UJ6kdfIJxRDVVAt1Ai1QkehDJSJhqPx6EQ0A52CFqEL0WXoerQS3YvWomfQy+hNtBN9gQ5gAFPGdDBTzAFjYCwsCkvB0jExNhsrwcqwSqwGa4D3+TrWifVhH3EiTsPpuANcwaF4As7Fp+Cz8aX4Rnw3Xos349fxLrwf/0agEgwJ9gQvApswjpBBmEooJpQRdhKOEs7BZ6mH8I5IJOoQrYke8FlMJmYRZxCXEjcR9xNPE9uJ3cQBEomkT7In+ZCiSBxSAamYtIG0l9RIukbqIX1QUlYyUXJRClZKURIqzVcqU9qjdErpmtJTpc9kdbIl2YscReaRp5OXk3eQG8hXyD3kzxQNijXFhxJPyaLMo6yn1FDOUe5T3igrK5speyrHKAuU5yqvVz6gfEG5S/mjiqaKnQpLZYKKRGWZyi6V0yp3VN5QqVQrqj81hVpAXUatop6lPqR+UKWpOqqyVXmqc1TLVWtVr6m+VCOrWaox1SapFamVqR1Wu6LWp05Wt1JnqXPUZ6uXqx9T71Af0KBpOGtEaeRqLNXYo3FR45kmSdNKM0iTp7lQc7vmWc1uGkYzp7FoXNoC2g7aOVqPFlHLWoutlaVVqrVPq02rX1tT21U7UXuadrn2Se1OHUzHSoetk6OzXOeQzi2dT7pGukxdvu4S3Rrda7rv9Ubo+evx9Ur09uvd1PukT9cP0s/WX6lfp//AADewM4gxmGqw2eCcQd8IrRHeI7gjSkYcGnHXEDW0M4w1nGG43bDVcMDI2CjESGS0weisUZ+xjrG/cZbxGuNTxr0mNBNfE4HJGpNGk+d0bTqTnkNfT2+m95samoaaSky3mbaZfjazNkswm2+23+yBOcWcYZ5uvsa8ybzfwsRirMVMi2qLu5ZkS4ZlpuU6yxbL91bWVklWi6zqrJ5Z61mzrYusq63v21Bt/Gym2FTa3LAl2jJss2032V61Q+3c7DLtyu2u2KP27vYC+0327SMJIz1HCkdWjuxwUHFgOhQ6VDt0Oeo4RjjOd6xzfDnKYlTKqJWjWkZ9c3JzynHa4XTPWdM5zHm+c4Pzaxc7F65LucuN0dTRwaPnjK4f/crV3pXvutn1thvNbazbIrcmt6/uHu5i9xr3Xg8Lj1SPCo8OhhYjmrGUccGT4BngOcfzhOdHL3evAq9DXn95O3hne+/xfjbGegx/zI4x3T5mPhyfbT6dvnTfVN+tvp1+pn4cv0q/R/7m/jz/nf5PmbbMLOZe5ssApwBxwNGA9ywv1izW6UAsMCSwJLAtSDMoIWhj0MNgs+CM4Org/hC3kBkhp0MJoeGhK0M72EZsLruK3R/mETYrrDlcJTwufGP4owi7CHFEw1h0bNjY1WPvR1pGCiProkAUO2p11INo6+gp0cdjiDHRMeUxT2KdY2fGtsTR4ibH7Yl7Fx8Qvzz+XoJNgiShKVEtcUJiVeL7pMCkVUmd40aNmzXucrJBsiC5PoWUkpiyM2VgfND4teN7JrhNKJ5wa6L1xGkTL04ymJQz6eRktcmcyYdTCalJqXtSv3CiOJWcgTR2WkVaP5fFXcd9wfPnreH18n34q/hP033SV6U/y/DJWJ3Rm+mXWZbZJ2AJNgpeZYVmbcl6nx2VvSt7MCcpZ3+uUm5q7jGhpjBb2JxnnDctr11kLyoWdU7xmrJ2Sr84XLwzH8mfmF9foAV/5FslNpJfJF2FvoXlhR+mJk49PE1jmnBa63S76UumPy0KLvptBj6DO6NppunMeTO7ZjFnbZuNzE6b3TTHfM7COT1zQ+bunkeZlz3v9/lO81fNf7sgaUHDQqOFcxd2/xLyS3WxarG4uGOR96Iti/HFgsVtS0Yv2bDkWwmv5FKpU2lZ6Zel3KWXfnX+df2vg8vSl7Utd1++eQVxhXDFrZV+K3ev0lhVtKp79djVtWvoa0rWvF07ee3FMteyLeso6yTrOtdHrK/fYLFhxYYvGzM33iwPKN9fYVixpOL9Jt6ma5v9N9dsMdpSuuXTVsHW29tCttVWWlWWbSduL9z+ZEfijpbfGL9V7TTYWbrz6y7hrs7dsbubqzyqqvYY7llejVZLqnv3Tth7dV/gvvoah5pt+3X2lx4AByQHnh9MPXjrUPihpsOMwzVHLI9UHKUdLalFaqfX9tdl1nXWJ9e3Hws71tTg3XD0uOPxXSdMT5Sf1D65/BTl1MJTg41FjQOnRaf7zmSc6W6a3HTv7LizN5pjmtvOhZ+7cD74/NkWZkvjBZ8LJy56XTx2iXGp7rL75dpWt9ajv7v9frTNva32iseV+queVxvax7SfuuZ37cz1wOvnb7BvXL4ZebP9VsKt2x0TOjpv824/u5Nz59Xdwruf7829T7hf8kD9QdlDw4eVf9j+sb/TvfNkV2BX66O4R/e6ud0vHuc//tKz8An1SdlTk6dVz1yenegN7r36fPzznheiF5/7iv/U+LPipc3LI3/5/9XaP66/55X41eDrpW/03+x66/q2aSB64OG73Hef35d80P+w+yPjY8unpE9PP0/9Qvqy/qvt14Zv4d/uD+YODoo4Yo7sVwCDDU1PB+D1LgCoyQDQ4P6MMl6+/5MZIt+zyhD4T1i+R5SZOwA18P89pg/+3XQAcGAH3H5BfbUJAERTAYj3BOjo0cNtaK8m21dKjQj3AVtjvqblpoF/Y/I95w95/3wGUlVX8PP5XzArfElCdFC8AAAAlmVYSWZNTQAqAAAACAAFARIAAwAAAAEAAQAAARoABQAAAAEAAABKARsABQAAAAEAAABSASgAAwAAAAEAAgAAh2kABAAAAAEAAABaAAAAAAAAAJAAAAABAAAAkAAAAAEAA5KGAAcAAAASAAAAhKACAAQAAAABAAAAZKADAAQAAAABAAAALQAAAABBU0NJSQAAAFNjcmVlbnNob3QB3MhSAAAACXBIWXMAABYlAAAWJQFJUiTwAAAC1mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MTMwPC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6VXNlckNvbW1lbnQ+U2NyZWVuc2hvdDwvZXhpZjpVc2VyQ29tbWVudD4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjU5PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+MTQ0PC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj4xNDQ8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgqko28PAAANH0lEQVR4Ae3aZ6glxRIA4N5gzjnrXRUj5hxRzKgogoqY9ocKiiiiYvihD9QfYkaMKCqKYI6IOUfEiKiYc1pzXtO8+cpX6+zcc+65Z1d57u5tmDMz3VXV1ZW6uuaM+u6776oy0v41Ehj9r+FkhJGQwIhC/mWGMKKQf5lCxv5d/Pzxxx9/F6lpls6oUaOKa2raVCmEEqqqKmPHji2zzDJL3KeGmWkZlyx+++23uDyPHj16ipQzRQpJRcw222xlzJgx5aeffiqfffZZ+fTTT8vXX39djM9IbfbZZy+LLLJIWWCBBcrcc88dS//555/L77//HvLpRxaj+k17TTLzzDOHR3z00Ufl+eefL2+++WZYw/zzz1/mnHPOYAwM7xmqce9uMO2x9nvSbfZ3e07Y4dyTRt7hdHtmeN9++20YoXsty7LQQguVNdZYo6y44ooRMX744Ye+vGXYCiE41xxzzFG++OKLctddd5X33nuvrLnmmmXllVcORngMV20uwmK0tuCzPwa7/DRxEj778j1R9Xfqy/Fu98TpRbc97j3ndP/ll19COW+99VZ57rnnCkVsu+22ZdVVV40x4Sxl040X/cNSSMZEAn/qqafKzTffHJOtt956Za655grX/PXXX+OejA416fQylgqhVMK2l84000yxj7z99tvllltuKQsuuGDZY489IqII7UL8UK2nQijDRAjdcMMN5YMPPij77bdfWXjhhYs4SfNaWlreh5p0ehxrGiLlSHKE9/vvv7889thj5eCDDy6LLrpoeM5QShlSIWkBFHLZZZeVWWedteyzzz4x0cSJE/uKjdOjEoZaE0NmnCLICy+8UC688MJy7LHHlsUWWyySoG5KGfJgSCHC1I033lhkEvvvv3+hCPGSkmZUbxhKETnGS8hH1mmTP/TQQ8vZZ58d+wzvobBOratCuJsN/PHHHy+yqb333rv8+OOPsZHRLmWNtN4SYLhfffVVbO677757ufzyywOp2wbfUSG0JzxNmDCh3HrrrWXfffeNMJVuOKKM3opoQlDKN998UzbccMMyzzzzlIcffjgiD6Nvt44KAYTIPffcU7bffvtJG3g3rbaJ5jsFutoK9N7uS5x/8o6Xbu2f5Enocgn3u+66a3nkkUfKl19+Gee5Nk+DFAJAjPvwww/L+++/X9Zdd90IVf3sFxaHDqVKA+HmxMYyvnYTzj/V320jNR+e+jE46+nHqMxNIU7zjgtPPPFEKKS91kEKAUCQTuA2I1nCcA81cDFpciEPAw5I3inZGOWg189i0J3aZj4hotu8+tNohjOX9VlXN3ptGuDAS4jWWWed8tJLL5Xvv/8+ZN2kMZlCEskB5o033iirrLLKpHNGe4JO7/BZmUOiQ5Hc+8ADDyxnnXVWeBulYEgKiCHv3ZSDFgG1LVG/K1uvd/jKOJ988kk56aSTIpYTTCoHPi++8847yxlnnBH8WUPO2+YBPKN67bXXyueffx5CTl563eGRjcOiMpNKh7mb6xmkEACyAkypyxBgP64M/6GHHorT6c4771yOPvro8uSTT5ZjjjkmQh9ad999d6SDYCllTO2RFp7NMzhjLi2Z5r0Emn2e812fZzDZ4KElQzz99NPDALIWR0AaGGtWEqKopGm8CWtM+k+5q622WtSuHAuavOe83e7mQn+55ZYLhbRl+xfn/6MAwIQ0yC0tBIEUyFATwWXxwt0pp5wSqTJ4HqIabHHCmBOrUMhaPv7444ir5qJ8LcOdMc/zzTdfLBptBTwCR8t8qgUER7nuaJiD4JqLtYa11147shs0ZD0MDg5BM55tttkmUn0RAm8yIpuvcbFfMx/5aODQQqOfRpZkYB8xTxN/zPHHH/+fJAaQRb766quhhBVWWCEW2ERI2PYdDHyCUv094ogjyk477RSLUpp2sSQM8CALVVYQRtR9ll122XBlQjT/qaeeWq6//vpyzTXXBA5e8HbuuedGwqGoid5VV10VaaSUklLU2W666aay+eabxxoIE09S+Ouuuy4Efnl9Frj00kvDSxVGCf7RRx+NEsdGG21Unn322XLeeeeVd955p5x//vkFPNoKhbfffnvwxjOURCg6eSGTXrIiIwbFaITttdZaa3JR1hqu8qqtpqqtsKoruVWdK8dzfdKs6s1nEkzCdrrXJeiq3sSrOkOrjjvuOIG+Ouqoo6qa8aoOCVVtXVUtmGr8+PExViumeuWVV6ott9yyOvLII6ufJ06sauXE2AknnFDVldOqFlRVe2t1zjnnVLVwqyuvvLKqhVGZq84Cq4GBgYCv43HwWKeV1SWXXFLVnhIw+K+NoKoXH3B77bVX9fLLL1fmxl+t0FpGVXXFFVdU9eE31vzAAw/EGN5ff/31qlZwvMNB74477oj32qCq2ouHJZuUFxnXnlXV346qiy66KHjMMffJ9hCqSg3TfL8NLosUCmqFhEsKOZtsskls5MIJ6xC+LrjggrDilVZaKbxJiv17HZKeeeaZqCQfdthhZemllw5cln344YeXz2orX3/99SNUiPfvvvtulP5ZNa9SprjtttsiVcc7a8z15FrQ4RVw1JZsrBrvy49LcJZZZplyyCGHlOWXX75svfXWZYcddohQxZuWWmqpwHEXevrZQ9BOvkQDz802aA/JwVpb+TgIadJAlwcbpLKLmM2dLWiLLbaId8qhlIGBgUnxH6w+zMHdYIMNAj/pKMhpE2pFCm1KEAp2MkGVZ3jisTCw2WablcUXXzwMw+JTWGAIl7HkvtjcZ4zbo+AIq/j2sU1qaozgc0/KvQ6d3MO6iGJQN1ro4BVu0kzAyTwEsEt8ZIHZMNmrwWNl9oMdd9wx0lxeJn6z6q222iriODq8hgIw44KbjZW++OKLwazNHC/SS43iCNH+UIe02GOcldC3H9VhLU7CmTC0+Yab8+ZY855RQZ+14A28lor1nDjWAa7Jv/FeDV0GDy/nTJzJFGIiE9uAIbCYtsASsdNduILrW8nJJ58cgn2n3hivvfbact9998WmCA/t5gIxxtr0qQw4wyj3+/bi69uJJ54YGym65nCwojTekgmDEHPvvfeGF1pkk745vQuLTeHxBPQ0d+8aWBmUlvAsOp8ZmSbcCZOpoOgcxg94eLxOstDkdbKQBZASHFwgSA1ZLBelmKEaXHDzzjtvOfPMM8vFF19cDjjggDipCyGEbL9wcve9ORdlkZgiXAIRl51bnBnqzTMEpZ4mNOHBHAN1uPMpYLvttguPMbcakbFx48YFjr5s5oDrk2quQ59U1twa7yEg/XhDp0ljiSWWCA+lOCGUN+62225xmFR8JTe4TZycv9Pdp972HOAGfaCiLWHi6quvDsEJByy67VqdJtGXCyJcqSYFULDwoy+tz6Jd4PWzQCHJgoQJFio1JjD4BAkuFyy2CxfG9VEGGuJ+uxknMDRzDn280vxwjIHxnLQSFj3rwJc54eJFcgImz0nteTu9J65qBaOCa740lI4KYS1yZLn5QQcdFAtFHLHhNEKnwBRWMxygYWFgXBpm9Gf4ICT44FJhYJNpOBmW9MN1GU8aYJrNOBzjaGreNYrwDJ+g81l/tibP8MEyKPPD6dXMnwqXSUpKxo8fPygpGBSHTMTShBVWw7UoKIXXa2LjaICXRaCRlo0pzXtTcJ6biwKnD37GbjSbzeJSGfp7CcY4S0xlwEHDlfMln21+wMJNnsGjZ236h9PAW4M56nNOZIPwmvx4n3yVeuqGSdoXc32g8s5q2sh/Qnf+xTQGXJ6bzXuzL2HbMN3wwQ2HRid67b7ko0mv+Zzw7XWAafclbPsOlgyFQ//asc9KwXumvUnIRGKmUoGalgwJMVpGfKT1J4FUhhqYRGWXXXaZ5G1tSh09JIUuXPhPke/qYp6Mqxla2sRG3gdLQJiTCAht6mN77rlnHE55R8q5idVRIQB4CWIOP75rKHXY6LkbT3GNtO4SEN7Jz/7rftppp0UZyEFWhpgJRZvCoCyrDZBEuZsyutxbHYgb0rKGOG33s8e055nW33P9aayyMsrwCYExb7rpplHel2prnbwj+uszxl91iwAd/EMpziY0W1dF49lBzCmZK2YmFARrxZis24SDqU/bPYwwLyuR6osqjNUB157hz4U+aNmXe8mmp4ekuChF5sUbfAd48MEHy+qrrx4f7CkGI2DSQmYUbxHaXRmC/Au+/qQQZziVAN+E3HkGuF5t2ApBiLBp2OlUaeXpp5+OmhLv8UlyySWXjC+BxpPBXgxMy+OMzllE5FCM9WHOv3WUijbeeOMyri6/CO0iyHDl0ZdCCA8TFMNbXDSvCOjbBGaUWbKaC3Z6Dl2pEJavvqUONzAwEEeFHCOz4XgGOK1vhfyJ9qdiTErzGcpYg7SYwoy5pufG2AjbBi5ka9bvsvZ+FJFymmKFJIGm4JPB6dkrct15z/UzQs3ap2b9k5Xfc5J+7m0GkrF+aEwPsFPiDZ3WPdUKaROdGuto05oR33vnYTOiVP6Pa/4vXko7xoOwvBUAAAAASUVORK5CYII=",alt:""})))),n.createElement("div",{id:"learn-types",className:"learn-section"},n.createElement("h2",{className:"learn-question"},"What different types of wordplay will I find?"),n.createElement("p",{className:"learn-answer"},"Tap a type below to learn more:"),n.createElement("ul",{className:"learn-types no-dec"},a)),n.createElement("div",{className:"learn-section"},n.createElement("h2",{className:"learn-question"},"Anything else I need to know?"),n.createElement("p",{className:"learn-answer"},"Now that you understand the basics of how cryptic clues are constructed and are familiar with some of the different types of hints, dive in and try a few!"),n.createElement(c.A,{btnArr:t,stack:!0}))))}},8199:function(e,t,a){a.d(t,{p:function(){return l}});var n=a(6540),l=function(){return n.createElement(n.Fragment,null,n.createElement("meta",{charSet:"UTF-8"}),n.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),n.createElement("meta",{httpEquiv:"X-UA-Compatible",content:"ie=edge"}),n.createElement("meta",{property:"og:title",content:"Learn Cryptic"}),n.createElement("meta",{property:"og:description",content:"Learn Cryptic is a tool to help you learn about, practice and solve cryptic crossword clues."}),n.createElement("meta",{property:"og:type",content:"website"}),n.createElement("meta",{property:"og:url",content:"https://learncryptic.com"}),n.createElement("meta",{property:"og:image",content:"https://learncryptic.com/favicon.png"}),n.createElement("title",null,"Learn Cryptic"))}}}]);
//# sourceMappingURL=component---src-pages-learn-js-12dd24e0bb93d266731b.js.map