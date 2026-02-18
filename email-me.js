const form= document.querySelector("form");

const emailField = document.querySelector('input[name="email"]');

form.addEventListener("submit",function(event){
    if(!emailField.value.includes("@")){
        alert("Enter a valid email")
        event.preventDefault();
        return;
    }
});


//FOR  RATE LIMITING
let submitTimes = [];

function isRateLimited(){
    const now = Date.now();

    submitTimes = submitTimes.filter(time => now - time < 60000);

    if(submitTimes.length >= 3){
        return true;
    }else{
        submitTimes.push(now);
        return false;
    }
}

form.addEventListener("submit",(event)=>{
    if(isRateLimited()){
        event.preventDefault();
        alert("Too many submissions. Please wait (1) minute");
    }
});

//TIME BASED FILTERING

const formLoadTime = Date.now();

function isTooFast(){
    const submitTime = Date.now();
    const secondsTaken = (submitTime - formLoadTime) / 1000;

    return (secondsTaken < 2);
}

form.addEventListener("submit", (event) =>{
    if(isTooFast()){
        event.preventDefault();
        alert("Submission was too fast. Please Try Again");
    }
});

//SPAM HANDLING

const spamWords = ["free money", "buy now", "click here",
"subscribe", "promo","account blocked", "click the link", "login", 
"claim", "giveaway","cheap", "discount", "offer", "limited time", "guaranteed", 
"marketing", "seo", "increase traffic", "best price"];

function containsSpam(message){
    const lowerMessage = message.toLowerCase();

    return spamWords.some(word=> 
        lowerMessage.includes(word));
}

form.addEventListener("submit", (event)=>{
    const message = document.querySelector(`[name="message"]`).value;

    if(containsSpam(message)){
        event.preventDefault();
        alert("Your Message contains blocked spam keywords");
    }
});


