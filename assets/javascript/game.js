const wordBank = ['BISON','BLANCA','CHUNLI','EHONDA','KEN','RYU','SAGAT','SAKURA'];
let totalGuesses = 9;
let userGuesses = []; // letters the user guessed
let wordGuessed = []; // This will be the word we actually build to match the current word
let randomFighter = null;
let guessesLeft = 0;
let wins = 0;
let losses = 0;
let gameover = false;

const koSound = new Audio('./assets/mp3/ko-sound.mp3');
const youLose = new Audio('./assets/mp3/lose.mp3');
const perfect = new Audio('./assets/mp3/perfect.mp3');
const final = new Audio('./assets/mp3/final.mp3');

const coinSound = new Audio('./assets/mp3/coin_1.mp3');
const startSound = new Audio('./assets/mp3/playagain.wav');
const bgMusic = new Audio("./assets/mp3/music.mp3");

document.addEventListener("DOMContentLoaded", function(){
    startGame();
});

function startGame(){
    pickrandomFighter();
    
}
function pickrandomFighter(){
    wordGuessed = [];
    userGuesses = [];
    guessesLeft = totalGuesses;
    randomFighter = Math.floor(Math.random() * (wordBank.length));
    let divHint = document.querySelector("#hint");
   
    // let randomFighter = Math.floor(Math.random() * (wordBank.length));
    
    if(randomFighter == 0){
        divHint.innerHTML = "<img src='assets/images/bison.png' height='400px'style='padding:20px'/>";
    }else if(randomFighter == 1){
        divHint.innerHTML = "<img src='assets/images/blanca.png' height='300px'style='padding:20px'/>";
    }else if(randomFighter == 2){
        divHint.innerHTML = "<img src='assets/images/chunli.png' height='300px' style='padding:20px'/>";
    }else if(randomFighter == 3){
        divHint.innerHTML = "<img src='assets/images/ehonda.png' height='300px'style='padding:20px'/>";
    }else if(randomFighter == 4){
        divHint.innerHTML = "<img src='assets/images/ken.png'height='300px' style='padding:20px'/>";
    }else if(randomFighter == 5){
        divHint.innerHTML = "<img src='assets/images/ryu.png' height='300px' style='padding:20px'/>";
    }else if(randomFighter == 6){
        divHint.innerHTML = "<img src='assets/images/sagat.png'  height='300px' style='padding:20px'/>";
    }else if(randomFighter == 7){
        divHint.innerHTML = "<img src='assets/images/sakura.png' height='300px' style='padding:20px'/>";
    }
    
    for (let i = 0; i < wordBank[randomFighter].length; i++) {
        wordGuessed.push("_");
    }   

    
    console.log(wordBank[randomFighter]);
    let currentWordDiv = document.querySelector('#currentWord')
    currentWordDiv.textContent = wordGuessed.join(" "); //sets the word guessed and adds space instead of comma
}





//guessing
function makeGuess(letter) {
    if (guessesLeft > 0) {
        // Make sure we didn't use this letter
        if (userGuesses.indexOf(letter) === -1) {
            userGuesses.push(letter);
            evaluateGuess(letter);
          
        }
    }
};

//compare letters entered to the character you're trying to guess
function evaluateGuess(letter) {
    let positions = [];

    for (let i = 0; i < wordBank[randomFighter].length; i++) {
        if(wordBank[randomFighter][i] === letter) {
            positions.push(i); //pushes letter to spot
            bgMusic.volume = 0.2;
            coinSound.play();
            bgMusic.volume = 1;
        }
    }

    if (positions.length <= 0) {
        guessesLeft--;
    } else {
        for(let i = 0; i < positions.length; i++) {
            wordGuessed[positions[i]] = letter;
        }
    }
};


//  Updates the display on the HTML Page
function updateGame() {
    document.getElementById("winsDiv").innerText = wins;
    document.getElementById("lossesDiv").innerText = losses;

    let guessingWordText = "";
    for (let i = 0; i < wordGuessed.length; i++) {
        guessingWordText += wordGuessed[i];
    }

    //update guesses, word, and letters entered
    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("guessesLeft").innerText = guessesLeft;
    document.getElementById("userGuesses").innerText = userGuesses;
};

//check if all letters have been entered.
function checkWin() {
    if(wordGuessed.indexOf("_") === -1) {
        wins++;
        gameover = true;
        perfect.play();
        //shows new win/loss score
        document.getElementById("winsDiv").innerText = wins;
        document.getElementById("lossesDiv").innerText = losses;
        //resets word guesses
        userGuesses = [];
        guessesLeft = 9;
        document.getElementById("guessesLeft").innerText = guessesLeft;
        document.getElementById("userGuesses").innerText = userGuesses;
    }
};

//check if the user is out of guesses
function checkLoss()
{
    if(guessesLeft <= 0) {
        losses++;
        gameover = true;
        bgMusic.pause();
        youLose.play();

         //shows new win/loss score
        document.getElementById("winsDiv").innerText = wins;
        document.getElementById("lossesDiv").innerText = losses;
    
    }
}

function playAgain()
{
     guessesLeft = 9;
     userGuesses = []; // letters the user guessed
     wordGuessed = []; // This will be the word we actually build to match the current word
     gameover = false;
    document.getElementById("guessesLeft").innerText = guessesLeft;
    document.getElementById("userGuesses").innerText = userGuesses;
    startSound.play();
    startGame();

}

function playMusic(){
    bgMusic.loop = true
    bgMusic.play();
}
function pauseMusic(){
    bgMusic.pause();
}



document.onkeydown = function(e) {
    if(gameover) {
        startGame();
        gameover = false;
    } else {
    if(e.keyCode >= 65 && e.keyCode <= 90) { //makes sure key is a-z
    // userGuesses.push(`${e.key.toUpperCase()}`)
    // let userGuessesDiv = document.querySelector('#guesses')
    // userGuessesDiv.textContent = userGuesses;
    makeGuess(e.key.toUpperCase());
    updateGame()
    checkWin();
    checkLoss();
    }
    }
}