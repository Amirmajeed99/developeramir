/*
GAME FUNCTIONS
player must guesss a nuber b/w a min and max
player get a certian amount of guesses
notify player of guesses remaining
notify the player of the correct answer if loose
let player choose to play again
*/

//GAME VALUES
let min = 1,
    max = 10,
    winningNum = getRandomNum(min,max),
    guessesLeft = 3;

//UI elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

//ASSIGN UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//play again event listener
game.addEventListener('mousedown',function(e){
    // console.log(1);
    if(e.target.className==='play-again'){
        window.location.reload();
       

    }
});

//listen for guess btn
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);
    // console.log(guess);
    //validate our input
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, `red`);
    }
    
    //winning number
   if (guess === winningNum) {
        //game over won
        //disable input
       // guessInput.disabled = true;
        //changing border color
        //guessInput.style.borderColor = 'green';
        //set message
        //setMessage(`${winningNum} is correct, YOU WIN!`, `green`);

        gameOver(true, `${winningNum} is correct, YOU WIN!`);
    } else {
        //wrong number
        guessesLeft -= 1;
        if (guessesLeft === 0) {
            //game over -lost

            //disable input
            //guessInput.disabled = true;
            //changing border color
            //guessInput.style.borderColor = 'red';
            //set message
            //setMessage(`Game Over, YOU LOST! The correct number was ${winningNum}`, `red`);

            gameOver(false, `Game Over, YOU LOST! The correct number was ${winningNum}`);
        } else {
            //Game continues answer wrong

            //changing border color
            guessInput.style.borderColor = 'red';

            //clear the input
            guessInput.value='';

            //tell user it is the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} Guesses left`,`red`);

        }

    }


});

//game over
function gameOver(won,msg){

 let color;
 won===true ? color='green': color='red';

//disable input
 guessInput.disabled = true;
//changing border color
 guessInput.style.borderColor = color;
//set text color
 message.style.color=color;
//set message
 setMessage(msg);

 //play again
 guessBtn.value='Play Again';
 guessBtn.className += 'play-again';
}

//get winning num
function getRandomNum(min,max){
return Math.floor(Math.random()*(max-min+1)+1);
}

//set message function
function setMessage(msg, color) {
    message.textContent = msg;
    message.style.color = color;
}
