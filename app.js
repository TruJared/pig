// variables
var scores = [0, 0];
var roundScore = 0;
var activePlayer = 0; // 0 === player one & 1 ==== player 2
var diceDom = document.querySelector('.dice');

// functions

// initialize game
function init() {
  // reset all variables to 0 (used for new game)
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0; // 0 === player one & 1 ==== player 2
  diceDom = document.querySelector('.dice');

  // hide dice on page load
  document.querySelector('.dice').style.display = 'none';

  // turn on buttons
  document.querySelector('.btn-roll').disabled = false;
  document.querySelector('.btn-hold').disabled = false;

  // set all to 0
  document.getElementById('score-0').innerHTML = 0;
  document.getElementById('score-1').innerHTML = 0;
  document.getElementById('current-0').innerHTML = 0;
  document.getElementById('current-1').innerHTML = 0;
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.add('active');
}

// game over
function gameOver() {
  document.querySelector('.btn-roll').disabled = true;
  document.querySelector('.btn-hold').disabled = true;
}

// switch players
function nextPlayer() {
  // reset roundScore
  roundScore = 0;
  document.getElementById('current-' + activePlayer).textContent = roundScore;
  document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

  // switch player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

// +++ game logic +++ //

window.onload = gameOver(); // start game "off"

// dice logic
document.querySelector('.btn-roll').addEventListener('click', function () {
  var dice = Math.floor(Math.random() * (6 - 1 + 1) + 1);
  //         Math.floor(Math.random() * (max-min+1)+min) --
  // allows for more flexibility if changed to anything other than min = 1

  // output results
  diceDom.style.display = 'block';
  diceDom.src = 'dice-' + dice + '.png';

  if (dice !== 1) {
    roundScore += dice;
    document.getElementById('current-' + activePlayer).textContent = roundScore;
  } else {
    nextPlayer();
    alert('You rolled a "1". Switch Players.');
  }
});

// hold logic
document.querySelector('.btn-hold').addEventListener('click', function () {
  // add current score to global score
  scores[activePlayer] += roundScore;

  // check for victory condition
  if (scores[activePlayer] >= 10) {
    document.getElementById('name-' + activePlayer).textContent = 'Winnah!!';
    diceDom.src = 'cake-icon.png';
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    gameOver();
  } else {
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    nextPlayer();
  }
});

document.querySelector('.btn-new').addEventListener('click', init);
