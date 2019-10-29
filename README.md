# Memory Game Project
This project contains three files which interact with each other to produce a memory matching game. An HTML, CSS, and 
Javascript file integrate to produce a dynamic game which asks the player to turn over cards and match images. Code is 
written to hide the images, randomize their position, count moves, determine a star-rating, track the time of game play, and finally display a pop-up once the game is complete with final results.

## Table of Contents

* [How to Play](#play)
* [Game Behavior](#behavior)

## How to Play
<ul>
    <li>Begin by clicking any two cards to reveal the symbol (the timer will start)</li>
    <li>If the symbols match, the pair will remain "open"; otherwise they will be hidden</li>
    <li>Remember where symbols are hidden and continue making pairs</li>
    <li>Each time you click two cards, you increase your move count by one</li>
    <li>The fewer moves you complete the game in, the more stars you earn</li>
    <li>Once all matches are made, you win</li>
    <li>Click the circle arrow to restart at any time or "Play Again" once a game is complete</li>
</ul>

## Game Behavior
<ul>
    <li>The game randomly shuffles the cards. A user wins once all cards have succesfully been matched</li>
    <li>A modal appears once a user wins the game and asks if they want to play again. It displays how much time it took to win the game and the final star rating</li>
    <li>The restart button lets the player reset the game board, timer and star-rating</li>
    <li>The game displays a start rating from 1-4 to reflect the player's performance</li>
    <li>The displayed timer starts once the player clicks the second card</li>
    <li>The game displays the current number of moves a user has made</li>
