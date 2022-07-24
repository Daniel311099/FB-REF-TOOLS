
// 'use strict';

//     const script = document.createElement('script');
//     script.setAttribute("type", "module");
//     script.setAttribute("src", chrome.extension.getURL('main.js'));
//     const head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
//     head.insertBefore(script, head.lastChild);

(async () => {
    const src = chrome.runtime.getURL("main.js");
    console.log(src)
    const contentMain = await import(src);
    console.log(contentMain)
    contentMain.main();
  })();