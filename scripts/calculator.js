const display=document.querySelector("div#screen");

var input1="";
var input2="";
var operation="";

function isAValidNumber(s){
    if(s=="" || s=="Nan" || isNaN(s)) return false;
    return true; 
}

document.querySelectorAll("button.btnNumber").forEach(button=>{
    button.addEventListener("click",(e)=>{
        display.innerHTML+=e.target.textContent;
        input2= parseInt(display.textContent);
    })    
});

document.querySelectorAll("button.btnOperation").forEach(button=>{
    button.addEventListener("click",(e)=>{
        let content=e.target.textContent;
            operationPress(content);
        
    })    
});

document.querySelector("button#btnEqual").addEventListener("click",resolve);

document.querySelector("button#btnClear").addEventListener("click",clear);

function clear(){
    var input1="";
    var input2="";
    var operation="";
    display.innerHTML="";
}

function resolve(){
    if(input1=="" || input2=="") return "Nan"
    let int1=parseInt(input1);
    let int2=parseInt(input2);
    
    switch(operation){
        case "+": return int1+int2;
        case "-": return int1-int2;
        case "-": return int1*int2;
        case "/":
            return (int2==0) ? "Nan" : int1/int2;
        default: return "Nan"
    }
}

function equalPress(){
    let inScreen=display.textContent;
    if(input1=="" || isNaN(input1) && isAValidNumber(inScreen)) {
        input1=parseInt(inScreen);
    }else{input2=parseInt(display.textContent);
        display.innerHTML=resolve(input1,input2,operation);}
    
}
function operationPress(content){
    if(input1!="" && input2!="" && operation!=""){
        input1=resolve(input1,input2,operation);
        display.innerHTML=input1;   
    }
    if(!isNaN(input2)){
        input1=parseInt(display.textContent);
        operation=content;
    }
}