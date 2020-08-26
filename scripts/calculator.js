const display=document.querySelector("div#screen");

var input1="";
var input2="";
var operation="";

document.querySelectorAll("button.btnNumber").forEach(button=>{
    button.addEventListener("click",(e)=>{
        display.innerHTML+=e.target.textContent;
    })    
});

document.querySelectorAll("button.btnOperation").forEach(button=>{
    button.addEventListener("click",(e)=>{
        let content=e.target.textContent;
        if(content=="="){
            display.innerHTML=resolve(input1,input2,operation);
        }else if(content="C") clear();
        else{
            operation=content;
        }
    })    
});

function clear(){
    var input1="";
    var input2="";
    var operation="";
    display.innerHTML="";
}

function resolve(input1,input2,operation){
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