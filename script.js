/*=============================================
=            Variable Declaration          =
=============================================*/

var btnRoll = document.querySelector('.btn--roll');
var btnHold = document.querySelector('.btn--hold');
var dice = document.getElementById('dice');
var player0Panel = document.querySelector('.player--0');
var player1Panel = document.querySelector('.player--1');
var btnNew = document.querySelector('.btn--new');
var btnSubmit = document.querySelector('.btn--submit');
var input = document.querySelector('.input');
var form = document.querySelector('.form');

var scores, activePlayer, roundScore;
var isPlaying = true;
var count = 0;
var winningScore;

/*=============================================
=            Default           =
=============================================*/

// form.style.display = 'block'
newGame();

/*=============================================
=            Fucnction            =
=============================================*/

function rollDice() {
  if (isPlaying && winningScore != undefined ) {
    //generating random number
    currentValue = (Math.floor(Math.random() * 6 + 1));

    // currentValue = 6;

    var isSix = currentValue;

    //rolling the dice
    dice.style.display = 'block';
    dice.src = 'dice-' + currentValue + '.png';
    dice.classList.toggle("element");
    // dice.style.animation = "pulse .5s "
 

    if (isSix == 6) {
      count = count + 1;
      console.log(count);
    } else {
      count = 0;
      console.log(count);
    }

    //adding the values together if the value generated in not 1
    if (currentValue != 1) {
      if (count >= 2) {
        twoSix();
      } else {
        roundScore += currentValue;
        document.querySelector(
          '#current--' + activePlayer
        ).textContent = roundScore;
      }
    } else {
      switchPlayer();
    }
  }else if(winningScore == "" || winningScore == undefined || winningScore ==0){
    alert("Set the winning Score :(")
  }
  

}

/* 


function rollDice() {
  if (isPlaying) {
    //generating random number
    currentValue = (Math.floor(Math.random() * 6 + 1));

    // currentValue = 6;

    

    //rolling the dice
    dice.style.display = 'block';
    dice.src = 'dice-' + currentValue + '.png';
    dice.classList.toggle("element");
 

    if(currentValue === 6 && isSix ===6){
      twoSix();
    }else if{
        roundScore += currentValue;
        document.querySelector(
          '#current--' + activePlayer
        ).textContent = roundScore;
      }
    } else {
      switchPlayer();
    }


todo var isSix = currentValue;  => declaring at the last so that we will have the last value orelse it will get update 

    
  }
}

*/

function setWinningScore(){
  if(input.value == "" || input.value == undefined || input.value ==0){
    alert("Oops! Set the Winning Score to start the game  :(");
    isPlaying = false;
    return 0
  }else{
    console.log(input.value)
    winningScore = input.value
    isPlaying = true
    form.style.display = 'none';
    alert("The Winning Score is " + input.value);

  }
}


function twoSix() {
  dice.style.display = 'none';
  scores[activePlayer] = 0;
  roundScore = 0;
  document.querySelector('#score--' + activePlayer).textContent = '0';
  switchPlayer();
}






function switchPlayer() {
  if (isPlaying) {
    roundScore = 0;
    count = 0;
    dice.style.display = 'block';
    document.querySelector(
      '#current--' + activePlayer
    ).textContent = roundScore;
    if (activePlayer === 0) {
      activePlayer = 1;
      player0Panel.classList.toggle('player--active');
      player1Panel.classList.toggle('player--active');
    } else {
      activePlayer = 0;
      player0Panel.classList.toggle('player--active');
      player1Panel.classList.toggle('player--active');
    }
  }
}

function holdScore() {
  if (isPlaying) {
    scores[activePlayer] += roundScore;
    document.querySelector('#current--' + activePlayer).textContent;
    document.querySelector('#score--' + activePlayer).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name--' + activePlayer).textContent = 'Winner';
      document
        .querySelector('.player--' + activePlayer)
        .classList.add('player--winner');
      // dice.style.display = "none";
      isPlaying = false;
    } else {
      switchPlayer();
    }
  }
}

function newGame() {
  dice.style.display = 'none';
  isPlaying = true;
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  player0Panel.classList.remove('player--winner');
  player1Panel.classList.remove('player--winner');
  document.querySelector('#name--0').textContent = 'Player 1';
  document.querySelector('#name--1').textContent = 'Player 2';
  document.querySelector('#score--0').textContent = '0';
  document.querySelector('#score--1').textContent = '0';
  document.querySelector('#current--0').textContent = '0';
  document.querySelector('#current--1').textContent = '0';
  player0Panel.classList.remove('player--active');
  player1Panel.classList.remove('player--active');
  player0Panel.classList.add('player--active');
  winningScore = undefined;
  input.value = '';
  form.style.display = 'block';

}

/*=============================================
=         Event listeners & fun call          =
=============================================*/

btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScore);
btnNew.addEventListener('click', newGame);
btnSubmit.addEventListener('click', setWinningScore);







