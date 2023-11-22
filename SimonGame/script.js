const title = document.getElementById('title');
title.textContent = 'Simon Game';

const btnEls = document.querySelectorAll(`.btn`);
const startEl = document.getElementById('start');
const colors = ['0, 89, 255', '2, 180, 2', '228, 0, 0', '231, 231, 0'];
let highscore = 0;
let gameStarted, sequence, guesses, score, time, squenceEl;
const btnGenerator = () => {
  return Math.trunc(Math.random() * 4);
};
const winningScore = 20;

const init = () => {
  guesses = [];
  sequence = [];
  score = 0;
  time = 1000;
  score = document.getElementById('score').textContent = guesses.length;
  gameStarted = false;
};
init();

// Add event listeners to buttons
for (let i = 0; i < btnEls.length; i++) {
  btnEls[i].setAttribute('style', `background-color: rgb(${colors[i]});`);
  btnEls[i].addEventListener('click', () => {
    flash(i);
    guesses = guesses.concat(Number(btnEls[i].id.substring(5)));
    // Check if last guess matches the sequence
    if (guesses[guesses.length - 1] !== sequence[guesses.length - 1]) {
      init();
      return console.log(`you loose`);
    }
    //If its the end of the sequence add another and play new sequence
    if (guesses.length === sequence.length) {
      time = time * 0.9;
      if (score === winningScore) {
        init();
        console.log('You win!');
      }
      increaseSequence();
      playSequence();

      // Update score accordingly
      score = document.getElementById('score').textContent = guesses.length;
      console.log(score);

      if (score > highscore) {
        highscore = score;
        document.getElementById('high-score').textContent = highscore;
      }
      //Reset guess array
      guesses = [];
    }
  });
}

// Make button i flash
const flash = i => {
  let selectedBtn = document.getElementById(`btn--${[i]}`);
  //btnEls[i].classList.add('clicked');
  console.log(selectedBtn);
  selectedBtn.style.boxShadow = `inset rgba(255,255,255, 0.5) 0px 0px 50px 30px`; //`0px 0px 80px 50px rgba(${colors[i]}, 0.5)`;
  selectedBtn.style.opacity = '150%';
  setTimeout(() => {
    selectedBtn.style.boxShadow = '';
    selectedBtn.style.opacity = '';
    //btnEls[i].classList.remove('clicked');
  }, time);
};

//generate sequence and play
const increaseSequence = () => {
  sequence = sequence.concat(btnGenerator());
};

// run through sequence of lights
squenceEl = 0;
const playSequence = () => {
  setTimeout(() => {
    flash(sequence[squenceEl]);
    squenceEl++;
    if (squenceEl < sequence.length) {
      console.log(sequence);
      playSequence(); // call function again with new value of sequenceEl until all el are called
    } else {
      squenceEl = 0;
    }
  }, time * 1.2); // timeout for playSequence has to match flash timeout so the flashes don't overlap
};

startEl.addEventListener('click', () => {
  if (!gameStarted) {
    gameStarted = true;
    increaseSequence();
    playSequence();
  }
});
