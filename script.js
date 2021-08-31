"use strict";

const playerEl0 = document.querySelector(".player--0");
const playerEl1 = document.querySelector(".player--1");
const scoreEl0 = document.getElementById("score--0");
const scoreEl1 = document.getElementById("score--1");
const currentScoreEl0 = document.getElementById("current--0");
const currentScoreEl1 = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");

let currentScore, activePlayer, playing, score;

// scoreEl0.textContent = 0;
// scoreEl1.textContent = 0;
// diceEl.classList.add("hidden");

// const score = [0, 0];
// let currentScore = 0; // initial current score
// let activePlayer = 0;
// let playing = true;

// All the initial values that required to start the game.

const initial = function () {
  currentScore = 0; // initial current score
  activePlayer = 0;
  playing = true;

  score = [0, 0];
  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  currentScoreEl0.textContent = 0;
  currentScoreEl1.textContent = 0;

  diceEl.classList.add("hidden");
  playerEl0.classList.remove("player--winner");
  playerEl1.classList.remove("player--winner");
  playerEl0.classList.add("player--active");
  playerEl1.classList.remove("player--active");
};

initial();

//switchPlayer
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0; // Again new initial value "zero"
  activePlayer = activePlayer === 0 ? 1 : 0;

  playerEl0.classList.toggle("player--active");
  playerEl1.classList.toggle("player--active");
};

//btnRoll
btnRoll.addEventListener("click", function () {
  if (playing) {
    const diceNo = Math.trunc(Math.random() * 6) + 1;
    // currentScoreEl0.textContent = diceNo;
    //   console.log(diceNo);

    diceEl.classList.remove("hidden");

    diceEl.src = `Image/dice-${diceNo}.png`;

    if (diceNo !== 1) {
      currentScore += diceNo;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//btnHold
btnHold.addEventListener("click", function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // console.log(
    //   typeof document.getElementById(`score--${activePlayer}`).textContent
    // );

    if (score[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      diceEl.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

//btnNew --- New Game
btnNew.addEventListener("click", initial);
