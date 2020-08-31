const display=document.querySelector("div#screen");

var input1="";
var input2="";
var operation="";
var showResult=false;


function validPoints(s){
    let amount=s.split(".").length-1;
    return amount<2 ? true : false;
}

function isAValidNumber(s){
    if(s=="" || s=="Nan" || isNaN(s)) return false;
    return true; 
}


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

document.querySelectorAll("button.btnOperation").forEach(button=>{
    button.addEventListener("click",(e)=>{
        let content=e.target.textContent;
            operationPress(content);
        
    })    
});

document.querySelector("button#btnEqual").addEventListener("click",equalPress);

document.querySelector("button#btnClear").addEventListener("click",clear);

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
        case "+": return int1+int2;
        case "-": return int1-int2;
        case "*": return int1*int2;
        case "/":
            return (int2==0) ? "Nan" : int1/int2;
        default: return "Nan"
    }
}

function equalPress(){
    if(isAValidNumber(input1) && isAValidNumber(input2) && operation!=""){
        console.log("Entro en el equal")
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