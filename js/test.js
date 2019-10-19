card.addEventListener("click", function() {
    
        if (tempHold.length === 1) {

            card.classList.add("open", "show", "disable");
            tempHold.push(card); 
                
            if (tempHold[1].innerHTML === tempHold[0].innerHTML) {

                tempHold[0].classList.add("match");
                tempHold[1].classList.add("match");
                matchHold.push(tempHold[0], tempHold[1]);
                tempHold = []; 

                endGame();

            } else {
                
                setTimeout(function() {
                    tempHold[0].classList.remove("open", "show");
                    tempHold[1].classList.remove("open", "show");
                    tempHold = [];
                }, 1000);   
            }

        } else {
            card.classList.add("open", "show", "disable");
            tempHold.push(card);
        }
            
})