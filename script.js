

let screen = document.getElementById("screen");
let history = document.getElementById("history");
let clock = document.getElementById("clock");



function displayValue(value){

    screen.value += value;

}



function clearScreen(){

    screen.value = "";

}


function deleteValue(){

    screen.value = screen.value.slice(0,-1);

}



function calculateResult(){

    if(screen.value===""){

        return;

    }

    try{

        let expression = screen.value;

        let answer = eval(expression);

        
        let item = document.createElement("li");

        item.innerHTML = expression + " = <strong>" + answer + "</strong>";

        history.prepend(item);

        
        localStorage.setItem("history",history.innerHTML);

        
        screen.value = answer;

    }

    catch{

        screen.value="Error";

    }

}


function clearHistory(){

    history.innerHTML="";

    localStorage.removeItem("history");

}



function copyAnswer(){

    if(screen.value==""){

        alert("No answer to copy.");

        return;

    }

    navigator.clipboard.writeText(screen.value);

    alert("Answer Copied Successfully!");

}


function changeTheme(){

    document.body.classList.toggle("dark");

}



function showTime(){

    let now = new Date();

    let hours = now.getHours();

    let minutes = now.getMinutes();

    let seconds = now.getSeconds();

    if(hours<10){

        hours="0"+hours;

    }

    if(minutes<10){

        minutes="0"+minutes;

    }

    if(seconds<10){

        seconds="0"+seconds;

    }

    clock.innerHTML=hours+" : "+minutes+" : "+seconds;

}

setInterval(showTime,1000);

showTime();



window.onload=function(){

    let savedHistory=localStorage.getItem("history");

    if(savedHistory){

        history.innerHTML=savedHistory;

    }

}


document.addEventListener("keydown",function(event){

    let key=event.key;

    // Numbers
    if(!isNaN(key)){

        displayValue(key);

    }

    
    else if(

        key=="+" ||

        key=="-" ||

        key=="*" ||

        key=="/" ||

        key=="." ||

        key=="%"

    ){

        displayValue(key);

    }

    
    else if(key=="Enter"){

        event.preventDefault();

        calculateResult();

    }

    
    else if(key=="Backspace"){

        deleteValue();

    }

    
    else if(key=="Escape"){

        clearScreen();

    }

});
