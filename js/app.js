//Create a list that holds all cards
let cardDeck = ["fa fa-diamond" , "fa fa-diamond" , "fa fa-paper-plane-o", "fa fa-paper-plane-o" , 
                "fa fa-anchor" , "fa fa-anchor" , "fa fa-bolt" , "fa fa-bolt" , 
                "fa fa-cube" , "fa fa-cube" , "fa fa-leaf" , "fa fa-leaf" , 
                "fa fa-bicycle" , "fa fa-bicycle", "fa fa-bomb" , "fa fa-bomb"];

//The Deck
const gameBoard = document.querySelector(".deck");

//array to temporarily hold two cards at a time // array to hold matched cards during game // array to check for startTimer()
let tempHold = [];
let matchHold = [];
let timerHold = [];

////////////////////////////Move Counter
let moveCount = 0;
let moveText = document.querySelector(".moves");

function addMove() {
    moveCount++;
    moveText.innerHTML = moveCount;
    rating();
}

////////////////////////////Star Rating
const starRating = document.querySelector(".stars");
let starsFinal = document.querySelector(".stars-final");

starRating.innerHTML = '<i class = "fa fa-star"></i> <i class = "fa fa-star"></i> <i class = "fa fa-star"></i> <i class = "fa fa-star"></i>';
starsFinal.innerHTML = 4

function rating() {
    switch(moveCount) {
        case 12:
            starRating.innerHTML = '<i class = "fa fa-star"></i> <i class = "fa fa-star"></i> <i class = "fa fa-star"></i>';
            starsFinal.innerHTML = 3;
        break;
        case 15:
            starRating.innerHTML = '<i class = "fa fa-star"></i> <i class = "fa fa-star"></i>';
            starsFinal.innerHTML = 2;
        break;
        case 20:
            starRating.innerHTML = '<i class = "fa fa-star"></i>';
            starsFinal.innerHTML = 1;
    }
}

/////////////////////////////Game Timer
let time = 0;
let timer;
let timeText = document.querySelector(".timer");

function startTimer() {
    timer = setInterval(function() {
        time++;
        timeText.innerHTML = `${time}`;
    }, 1000);
}

function clearTimer() {
    clearInterval(timer);
}

function restartTimer() {
    time=0;
    timeText.innerHTML = 0;
    clearTimer();
}

/////////////////////////////Shuffle function
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/////////////////////////////Start Game Function - invokes shuffle function, creates individual cards, icons as innerHTML, appends each to deck 
function gameStart () {

    shuffle(cardDeck);
    for (let i = 0; i < cardDeck.length; i++) {
        const card = document.createElement("li"); 
        card.classList.add("card"); 
        card.innerHTML = `<i class = "${cardDeck[i]}"></i>`;
        gameBoard.appendChild(card);
        
/////////////Card functionality - event listener

        card.addEventListener("click", function() {
            
            /////Only permit two cards to open at a time
            if (tempHold.length < 2) {

                /////if empty array, add classes to show card and prevent double click. Add to temporary hold array
                if (tempHold.length === 0) {
                    card.classList.add("open", "show", "disable");
                    tempHold.push(card);

                    /////allow up to three cards in timerHold array 
                    if (timerHold.length < 3) {
                    timerHold.push(card);
                    }

                /////if array not empty (second card) do same as firsrt card but will check if match/no match            
                } else {
                    card.classList.add("open", "show", "disable");
                    tempHold.push(card);

                    if (timerHold.length <3) {
                    timerHold.push(card);
                    }
                
                /////invoke startTimer() only once, when array length is two    
                if (timerHold.length === 2) {
                    startTimer();
                }
                
                /////if items in array are equal, add match class to both cards. Add to perma match array and empty temp aray
                /////run endGame function after each match to determine if all matches have been made, i.e. match array length===card deck length
                    if (tempHold[1].innerHTML === tempHold[0].innerHTML) {

                        tempHold[0].classList.add("match");
                        tempHold[1].classList.add("match");
                        matchHold.push(tempHold[0], tempHold[1]);
                        tempHold = []; 

                        endGame();

                /////if not a match, remove classes from cards to hide; empty temp array
                /////set 1 second delay to allow cards two cards to open briefly
                    } else {
                        setTimeout(function() {
                            tempHold[0].classList.remove("open", "show", "disable");
                            tempHold[1].classList.remove("open", "show", "disable");
                            tempHold = [];
                        }, 1000);   

                    }

                    addMove();  /////invoke addMove function each time two cards are in tempHold array
                }
        }          
})
}
}

gameStart();

/////////////////////////////End Game Function - checks for length of two arrays; if yes, timer stopped and modal invoked; slight delay to allow final card to reveal
function endGame() {
    if (matchHold.length === cardDeck.length) {
        setTimeout(function() {
            clearTimer();
            popUp();
        }, 250);
    }
}

/////////////////////////////modal that includes additional HTML components and reads final move count, star rating, and time;
//modal includes two buttons (functionality in "Play Again or Close Pop Up")

function popUp() {
    let box = document.querySelector("#pop-up");
    document.querySelector(".moves-final").innerHTML = moveCount;
    document.querySelector(".time-final").innerHTML = time;
    box.showModal();
}

/////////////////////////////Play Again or Close Pop Up
const playAgain = document.querySelector(".btn-restart");
const close = document.querySelector(".btn-close");

//Play Again?
playAgain.addEventListener("click", function() {
    gameBoard.innerHTML = "";
    gameStart();
    timerHold = [];
    matchHold = [];
    moveText.innerHTML = 0;
    moveCount = 0;
    restartTimer();
    starRating.innerHTML = '<i class = "fa fa-star"></i> <i class = "fa fa-star"></i> <i class = "fa fa-star"></i> <i class = "fa fa-star"></i>';
    closePopUp();
})

//Close 
close.addEventListener("click", closePopUp);

function closePopUp() {
    document.querySelector("#pop-up").close();
    restart();
    
}

/////////////////////////////Restart Game
const refresh = document.querySelector(".restart");

function restart() {
    refresh.addEventListener("click", function() {
    gameBoard.innerHTML = "";
    gameStart();
    timerHold = [];
    matchHold = [];
    moveText.innerHTML = 0;
    moveCount = 0;
    starRating.innerHTML = '<i class = "fa fa-star"></i> <i class = "fa fa-star"></i> <i class = "fa fa-star"></i> <i class = "fa fa-star"></i>';
    restartTimer();
})
}
restart();



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
