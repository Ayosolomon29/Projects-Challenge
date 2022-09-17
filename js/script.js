

const ageInDays = () => {
   var birthYear =  prompt("What year were your born?");
   var ageDays = (2022 - birthYear) * 365
   console.log(ageDays)
   document.getElementById("flex-box-result").innerHTML = `You are ${ageDays} years old in days`
}

function reset(){
    document.getElementById("flex-box-result").remove()
}



//Challenge 2: cat Generator

function generateCat(){
    var catImage = document.createElement("img");
    var catGroup = document.getElementById("flex-cat-gen");
    catImage.src = "img/cat2";
    catGroup.appendChild(catImage)
}


//Challenge 3: Rock, Paper, Scissors

function rpsGame(yourChoice){
    // console.log(yourChoice)
  var  humanChoice = yourChoice.id;
   console.log("human Choice:", humanChoice)
  
   var  botChoice = numberToChoice(randToRpsInt())
   console.log("computer Choice:", botChoice)
  
   results = decideWinner(humanChoice, botChoice) 
   console.log("Result:", results)
  
   message = finalMessage(results); // {message: "You won", "color": green}
   console.log(message)
   rpsFrontEnd(yourChoice, botChoice, message)
}

function randToRpsInt(){
    return Math.floor(Math.random() * 3)
}

function numberToChoice(number){
    return ["rock", "paper", "scissors"][number]
}


function decideWinner (yourChoice, computerChoice){
    var rpsData = {
        "rock" :{"scissors" : 1, "rock": 0.5, "paper": 0},
        "paper": {"rock" : 1, "paper": 0.5, "scissors": 0},
        "scissors": {"paper" : 1, "scissors": 0.5, "rock": 0}
    }
    var yourScore = rpsData[yourChoice][computerChoice];
    var computerScore = rpsData[computerChoice][yourChoice]

    return[yourScore, computerScore]
}

function finalMessage([yourScore, computerScore]){
    if (yourScore === 0) {
       return {"message": "You lost", "color": "red"};
    } else if (yourScore === 0.5) {
        return {"message": "You tied", "color": "yellow"};
    } else {
        return {"message": "You won", "color": "green"}
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    var ImagesDatabase = {
        "rock": document.getElementById("rock").src,
        "paper": document.getElementById("paper").src,
        "scissors": document.getElementById("scissors").src
    }

    //removeallImages
    document.getElementById("rock").remove();
    document.getElementById("paper").remove();
    document.getElementById("scissors").remove();

    var humanDiv = document.createElement("div");
    var botDiv = document.createElement("div");
    var messageDiv = document.createElement("div")

    humanDiv.innerHTML = "<img src= '" + ImagesDatabase[humanImageChoice] + "'height = 150 width = 150 style = 'box-shadow: 0px 10px 50px rgba(37, 50, 233, 1)'>"
    messageDiv.innerHTML = "<h1 style= 'color: " + finalMessage ['color'] + "; font-size: 60px; padding:30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src= '" + ImagesDatabase[botImageChoice] + "'height = 150 width = 150 style = 'box-shadow: 0px 10px 50px rgba(243, 38, 224, 1)'>";

    document.getElementById("box-rps").appendChild(humanDiv)
    document.getElementById("box-rps").appendChild(messageDiv)
    document.getElementById("box-rps").appendChild(botDiv)

}


//change color of all buttons

var allButtons = document.getElementsByTagName("button");

let copyAllButtons = [];
for (let i =0; i < allButtons.length; i++){
    copyAllButtons.push(allButtons[i].classList[1])
}

function buttonColorChange(buttonThingy){
if (buttonThingy.value === "red"){
    buttonsRed();
}else if (buttonThingy.value === "green"){
    buttonsGreen();
}else if(buttonThingy.value === "reset"){
    buttonsColorReset();
} else if (buttonThingy.value === "random"){
    randomColors(); 
}
}

function buttonsRed(){
    for (let i = 0; i < allButtons.length; i++){
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add("btn-danger")
    }
}

function buttonsGreen(){
    for (let i = 0; i < allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add("btn-success")
    }
}

function buttonsColorReset(){
    for (let i = 0; i < allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButtons[i])
    }
}

function randomColors(){
    let choices = ["btn-primary", "btn-danger", "btn-success", "btn-warning"];
    for (let i = 0; i < allButtons.length; i++){
        let randomNumber = Math.floor(Math.random() * 4);
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(choices[randomNumber])
    }
}


//Challenge 5: BlackJack

let blackjackGame = {
    "you": {"scoreSpan": "#your-blackjack-result", "div": "#your-box", "score": 0},
    "dealer": {"scoreSpan": "#dealer-blackjack-result", "div": "#dealer-box", "score": 0},
    "cards": [ "2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "J", "Q", "A"],
    "cardMap": {"2": 2, "3": 3, "4" : 4, "5" : 5, "6" : 6, "7" : 7, "8" : 8, "9" : 9, "10" : 10, "K" : 10, "J" : 10 , "Q" : 10, "A" : [1, 11]},
    "wins": 0,
    "losses": 0,
    "draws": 0,
    "isStand": false,
    "turnOver": false,
};

const You = blackjackGame["you"]
const Dealer = blackjackGame["dealer"];

const hitSound = new Audio("audio/jacksound/play-sound.mp3");
const winSound = new Audio("audio/jacksound/win-sound.wav");
const lossSound = new Audio("audio/jacksound/loss-sound.mp3");
const drawSound = new Audio("audio/jacksound/draw-sound.mp3");
// const winClip = new Video("video/win-clip.mp4");




//Hit and stand button activation
document.querySelector("#blackjack-hit-button").addEventListener('click', blackjackHit);
document.querySelector("#blackjack-stand-button").addEventListener('click', dealerLogic);

//blackjack hit function
function blackjackHit(){
    // showCard(Dealer)
    if (blackjackGame["isStand"] === false) {
       
   let card = (randomCards())
   showCard(card, You)
    updateScore(card, You)
    console.log(You["score"])
    showScore(You)
}
}


//function that select the cards randomly
function randomCards(){
    let randomIndex = Math.floor(Math.random()* 13);
    return blackjackGame["cards"][randomIndex]
}

//function that create image and where to show the image
function showCard(card, activePlayer){
    if (activePlayer["score"] <= 21){
     let cardImage = document.createElement("img");
        cardImage.src = `img/jack/${card}.png`;
        document.querySelector(activePlayer.div).appendChild(cardImage);
        hitSound.play();
}
}

//blackjack deal button remove the images
document.querySelector("#blackjack-deal-button").addEventListener("click", blackjackDeal);

function blackjackDeal(){
   if (blackjackGame["turnOver"] === true) {

    blackjackGame["isStand"] = false;

   
    let yourImages =  document.querySelector("#your-box").querySelectorAll("img");
    let dealerImages =  document.querySelector("#dealer-box").querySelectorAll("img");
 
  for (i=0; i < yourImages.length; i++){
    yourImages[i].remove()
  }

  for (i=0; i < dealerImages.length; i++){
    dealerImages[i].remove()
  }

  You["score"]= 0;
  Dealer["score"] = 0;
  document.querySelector("#your-blackjack-result").innerHTML = 0;
  document.querySelector("#dealer-blackjack-result").innerHTML = 0;

  document.querySelector("#your-blackjack-result").style.color = "White";
  document.querySelector("#dealer-blackjack-result").style.color = "white";

  document.querySelector("#black-jack-result").innerHTML = "Let's Play"
  document.querySelector("#black-jack-result").style.color = "black"

  blackjackGame["turnOver"] = true;
}
}


//function to update scores
function updateScore(card, activePlayer){
    if (card === "A") {
    //if adding 11 keeps me below 21, add 11 otherwise, add 1 
    if (activePlayer["score"] + blackjackGame["cardMap"][card][1] <= 21){
        activePlayer["score"] += blackjackGame["cardMap"][card][1];
    } else {
        activePlayer["score"] += blackjackGame["cardMap"][card][0]
    }
    } else {
        activePlayer["score"] += blackjackGame["cardMap"][card];
    }
}


function showScore(activePlayer){
    if (activePlayer["score"] > 21) {
        document.querySelector(activePlayer["scoreSpan"]).innerHTML = "BUST!"
        document.querySelector(activePlayer["scoreSpan"]).style.color = "red"
    }else {
    document.querySelector(activePlayer["scoreSpan"]).innerHTML = activePlayer["score"]
}
}

// function to delay the playing time of the stand button
function sleep(ms){
    return new Promise (resolve => setTimeout(resolve, ms));
}


//stand button function
async function dealerLogic(){
    blackjackGame["isStand"] = true;

    while (Dealer["score"] < 16 && blackjackGame["isStand"] === true){
    let card = randomCards();
    showCard(card, Dealer);
    updateScore(card, Dealer);
    showScore(Dealer);
    await sleep(1300)
}

    // if (Dealer["score"] > 15) {
        blackjackGame["turnOver"] = true;
        let winner = computeWinner()
        showResult(winner)
        console.log(blackjackGame["turnOver"])
    }
// }


// function to compute winner and return who just won
//update the wins. draws and losses

function computeWinner(){
    let winner;

    if (You["score"] <= 21) {
        // condition: higher score than dealer or when dealer burst and you are 21
        if (You["score"] > Dealer["score"] || (Dealer["score"] > 21)) {
            console.log("You Won!");
            blackjackGame["wins"]++;
            winner = You;
        } else if (You["score"] < Dealer["score"]) {
            console.log("You Lost!");
            blackjackGame["losses"]++;
            winner = Dealer;
        } else if (You["score"] === Dealer["score"]) {
            console.log("You drew!")
            blackjackGame["draws"]++;
        }

        //when user burst but dealer doesn't
    } else if (You["score"] > 21 && Dealer["score"] <= 21) {
        console.log("You Lost");
        winner = Dealer;
        blackjackGame["losses"]++;

        //condition: when you and the dealer busts
    } else if (You["score"] > 21 && Dealer["score"] > 21) {
        console.log("You drew!");
        blackjackGame["draws"]++;
    }
        console.log("Winner is:", winner)
        return winner;
}

function showResult(winner) {
    let message, messageColor;

    if (blackjackGame["turnOver"] === true){
        
    
        if(winner === You) {
            document.querySelector("#wins").innerHTML = blackjackGame["wins"];
            message = "You Won!";
            messageColor = "green";
            winSound.play();
            // winClip.play();
        } else if (winner === Dealer) {
            document.querySelector("#losses").innerHTML = blackjackGame["losses"];
            message = "You lost!";
            messageColor = "red";
            lossSound.play();
        } else {
            document.querySelector("#draws").innerHTML = blackjackGame["draws"];
            message = "You drew!";
            messageColor = "blue"
            drawSound.play()
        }
        document.querySelector("#black-jack-result").textContent = message;
        document.querySelector("#black-jack-result").style.color = messageColor;
    }
}

// function removeResult(){

//     document.getElementById("black-jack-result").reset()
//     let resultRemoval = document.querySelector("#black-jack-result").textContent;

//     for (i=0; i < resultRemoval.length; i++){
//         resultRemoval[i].remove()
//       }
// }