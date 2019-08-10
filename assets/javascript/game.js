const wordBank = ['BISON','BLANCA','CHUNLI','EHONDA','KEN','RYU','SAGAT','SAKURA'];
let userGuesses = [];
let wordGuessed = [];
let randomFighter = Math.floor(Math.random() * (wordBank.length));
let wins = 0;
let losses = 0;
let winStatus = false;
let lossStatus = false;



document.addEventListener("DOMContentLoaded", function(){
   pickrandomFighter();
   let currentWordDiv = document.querySelector('#currentWord')
    currentWordDiv.textContent = wordGuessed;
});

function pickrandomFighter(){
    let myDiv = document.querySelector("#hint");
    let randomFighter = Math.floor(Math.random() * (wordBank.length));
    if(randomFighter == 0){
        myDiv.innerHTML = "<img src='assets/images/bison.png' width='100%'/>";
    }else if(randomFighter == 1){
        myDiv.innerHTML = "<img src='assets/images/blanca.png' width='100%'/>";
    }else if(randomFighter == 2){
        myDiv.innerHTML = "<img src='assets/images/chunli.png' width='100%'/>";
    }else if(randomFighter == 3){
        myDiv.innerHTML = "<img src='assets/images/ehonda.png' width='100%'/>";
    }else if(randomFighter == 4){
        myDiv.innerHTML = "<img src='assets/images/ken.png' width='100%'/>";
    }else if(randomFighter == 5){
        myDiv.innerHTML = "<img src='assets/images/ryu.png' width='100%'/>";
    }else if(randomFighter == 6){
        myDiv.innerHTML = "<img src='assets/images/sagat.png' width='100%'/>";
    }else if(randomFighter == 7){
        myDiv.innerHTML = "<img src='assets/images/sakura.png' width='100%'/>";
    }
    for (var i = 0; i < wordBank[randomFighter].length; i++) {
        wordGuessed.push("_");
    }   
}




document.onkeydown = function logKey(e) {
    if(event.keyCode >= 65 && event.keyCode <= 90) { //makes sure key is a-z
    userGuesses.push(`${e.key.toUpperCase()}`)
    let userGuessesDiv = document.querySelector('#guesses')
    userGuessesDiv.textContent = userGuesses;
    }
}