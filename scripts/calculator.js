const display=document.querySelector("div#screen");

var input1="";
var input2="";
var operation="";

document.querySelectorAll("button.btnNumber").forEach(button=>{
    button.addEventListener("click",(e)=>{
        display.innerHTML+=e.target.textContent;
    })    
});

