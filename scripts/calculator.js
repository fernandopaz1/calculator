const display=document.querySelector("div#screen");

var input1="";
var input2="";
var operation="";
var showResult=false;

document.querySelectorAll("button.btnNumber").forEach(button=>{
    button.addEventListener("click",(e)=>{
        if(showResult==true){display.innerHTML="";}
        if(display.textContent.length>=7){
                clear();
                display.innerHTML="Error";
                showResult=true;
                return;
        }
        display.innerHTML+=e.target.textContent;
        input2= parseFloat(display.textContent);
        showResult=false;
    })    
});

document.querySelector("button.btnPoint").addEventListener("click",()=>{
    if(showResult) {
        display.innerHTML="";
        display.innerHTML+=".";
    }
    if(!hasPoint(display.textContent)){
        display.innerHTML+=".";
    }
})

document.querySelectorAll("button.btnOperation").forEach(button=>{
    button.addEventListener("click",(e)=>{
        let content=e.target.textContent;
            operationPress(content);
        
    })    
});

document.querySelector("button#btnEqual").addEventListener("click",equalPress);

document.querySelector("button#btnClear").addEventListener("click",clear);

document.querySelector("button#btnDel").addEventListener("click",deleteInput);

document.querySelector("button#btnMinPlus").addEventListener("click",changeSign)



function hasPoint(s){
    return s.includes(".");
}

function isAValidNumber(s){
    if(s=="" || s=="Nan" || isNaN(s)) return false;
    return true; 
}



function deleteInput(){
    display.textContent=display.textContent.slice(0,-1);
}

function changeSign() {
    if(display.textContent.charAt(0)=="-"){
        display.textContent=display.textContent.slice(1);
    }else{display.textContent="-"+display.textContent;}
    input2=parseFloat(display.textContent);
    
}

function clear(){
    input1="";
    input2="";
    operation="";
    display.innerHTML="";
}

function resolve(){
    if(input1=="" || input2=="") return "Nan"
    let int1=parseFloat(input1);
    let int2=parseFloat(input2);
    
    switch(operation){
        case "+": return Number((int1+int2).toFixed(4));
        case "-": return Number((int1-int2).toFixed(4));
        case "*": return Number((int1*int2).toFixed(4));
        case "/":
            return (int2==0) ? "Nan" : Number((int1/int2).toFixed(4));
        default: return "Nan"
    }
}

function equalPress(){
    if(isAValidNumber(input1) && isAValidNumber(input2) && operation!=""){
        display.innerHTML=resolve(input1,input2,operation);
        if(display.textContent.length>=7){
            clear();
            display.innerHTML="Error";
            showResult=true;
            return;
        }

        input2=parseFloat(display.textContent);
        input1="";
        operation="";
        showResult=true
    }
    return;
}

function operationPress(content){
    if(showResult && display.textContent!="Error" && display.textContent!="Nan"){
        input1=display.textContent;
        display.innerHTML="";
        input2="";
        operation=content;
    }
    
    if(isAValidNumber(input2) && input1=="" && operation==""){
        input1=input2;
        input2="";
        display.innerHTML="";
        operation=content;
    }

    if(isAValidNumber(input1) && isAValidNumber(input2) && operation!=""){
        input2=resolve(input1,input2,operation);
        display.innerHTML=input2;
        input1=input2;
        input2="";
        operation=content;   
        showResult=true;
    }
}