let t=null;const e={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]"),body:document.querySelector("body")};e.startBtn.addEventListener("click",(function(){t=setInterval((()=>{e.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),e.startBtn.setAttribute("disabled",!0)})),e.stopBtn.addEventListener("click",(function(){clearInterval(t),e.startBtn.removeAttribute("disabled",!0)}));
//# sourceMappingURL=01-color-switcher.e288528c.js.map
