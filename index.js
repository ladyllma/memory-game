const cardIcons = [
  'fa-horse-head',
  'fa-paw',
  'fa-dove',
  'fa-frog',
  'fa-spider',
  'fa-dog',
  'fa-dragon',
  'fa-cat',
];
// Duplicating the icons
cardIcons.push(...cardIcons);

const minutesLbl = document.getElementById('minutes');
const secondsLbl = document.getElementById('seconds');
const hoursLbl = document.getElementById('hours');
const movesLbl = document.getElementById('moves');
const resetBtn = document.getElementById('reset-button');
const deck = document.getElementById('deck');
const youRockDialog = document.getElementById('you-rock-dialog');
const tryAgainBtn = document.getElementById('try-again-button');
const scoreLbl = document.getElementById('score');

var cards = [];
var timerInterval;
const game = {
  moves: 0,
  points: 0,
  timer: {
    seconds: 0,
    minutes: 0,
    hours: 0,
  },
  score: 0,
};

// Clicking reset button restart the game
resetBtn.addEventListener('click', () => {
  restartGame();
});

tryAgainBtn.addEventListener('click', () => {
  youRockDialog.close();
  restartGame();
});

window.onload = startGame();

function startGame() {
  createCards();
}

function restartGame() {
  restartTimer();
  restartMoves();
  deleteCards();
  startGame();
}

function createCards() {
  // Shuffle randomly the card icons using Fisher-Yates Algorithm
  for (let i = cardIcons.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    // Swapping the icons without using a 'temp' variable
    [cardIcons[i], cardIcons[j]] = [cardIcons[j], cardIcons[i]];
  }

  // Iterate the card icons list: creates a card and then adds it to the cards list
  cardIcons.forEach((cardIcon) => {
    const icon = document.createElement('i');
    icon.className = `fas ${cardIcon}`;

    const card = document.createElement('li');
    card.className = 'card';
    card.appendChild(icon);

    cards.push({
      iconName: cardIcon,
      isMatched: false,
      isSelected: false,
      isDisabled: false,
      node: card,
      icon: icon,
    });
  });

  // Add a click event listener to increase the moves
  for (const card of cards) {
    card.node.addEventListener('click', () => {
      // Flip the card and disable all pointer events
      card.node.classList.toggle('flip-card');
      card.node.classList.toggle('disabled');
      card.isSelected = true;
      card.isDisabled = true;
      increaseMoves();
    });

    // Add the card to the DOM
    deck.appendChild(card.node);
  }
}

async function increaseMoves() {
  // Counts how many cards are selected
  const counter = cards.filter((card) => card.isSelected == true).length;

  // Check if there are two cards selected
  if (counter == 2) {
    // Increase the moves
    game.moves++;
    movesLbl.textContent = game.moves;

    // Start the timer if it is the first move
    game.moves == 1 && startTimer();

    // Disable all pointer events of all the
    // non-selected and non-matched cards
    cards.map((card) => {
      !card.isSelected &&
        !card.isMatched &&
        card.node.classList.toggle('disabled');
    });

    // Get the indexes of the selected cards
    const selected = cards.filter((card) => card.isSelected == true);
    const index1 = cards.indexOf(selected[0]);
    const index2 = cards.indexOf(selected[1]);

    await new Promise((resolve, reject) => {
      // Check if the selected cards have the same icon
      if (cards[index1].iconName !== cards[index2].iconName) {
        // cards[index1].node.classList.toggle('not-matched');
        // cards[index2].node.classList.toggle('not-matched');
        // Flip back the cards after half a second
        setTimeout(() => {
          // resolve(cards[index1].node.classList.toggle('not-matched'));
          // resolve(cards[index2].node.classList.toggle('not-matched'));
          resolve(cards[index1].node.classList.toggle('flip-card'));
          resolve(cards[index2].node.classList.toggle('flip-card'));
        }, 500);
      } else {
        // Mark the cards as matched
        resolve((cards[index1].isMatched = true));
        resolve(cards[index1].node.classList.add('matched'));
        resolve((cards[index2].isMatched = true));
        resolve(cards[index2].node.classList.add('matched'));
        // Increase a point
        resolve(game.points++);
      }
    });
    // Mark the cards as non-selected
    cards[index1].isSelected = false;
    cards[index2].isSelected = false;

    // Enable all pointer events of all the non-matched cards
    cards.map((card) => {
      !card.isMatched && card.node.classList.toggle('disabled');
    });

    // If the points are equal to 8, end the game
    // because all the cards are matched | (16/2 = 8)
    game.points == 8 && stopGame();
  }
}

function deleteCards() {
  deck.textContent = '';
  cards = [];
}

function startTimer() {
  game.timer.seconds = 0;
  game.timer.minutes = 0;
  game.timer.hours = 0;

  timerInterval = setInterval(() => {
    game.timer.seconds++;
    if (game.timer.seconds == 60) {
      game.timer.minutes++;
      game.timer.seconds = 0;
    }
    if (game.timer.minutes == 60) {
      game.timer.hours++;
      game.timer.minutes = 0;
    }
    secondsLbl.textContent = game.timer.seconds;
    minutesLbl.textContent = game.timer.minutes;
    hoursLbl.textContent = game.timer.hours;
  }, 1000);
}

function restartTimer() {
  stopTimer();
  secondsLbl.textContent = 0;
  minutesLbl.textContent = 0;
  hoursLbl.textContent = 0;
}

function stopTimer() {
  clearInterval(timerInterval);
}

function restartMoves() {
  cardsSelectedCounter = 0;
  game.moves = 0;
  movesLbl.textContent = game.moves;
}

function stopGame() {
  stopTimer();

  const { hours, minutes, seconds } = game.timer;

  if (hours == 0 && minutes == 0 && seconds > 20 && seconds <= 30) {
    console.log('+150');
    game.score += 150;
  } else if (hours == 0 && minutes == 0 && seconds > 10 && seconds <= 20) {
    console.log('+200');
    game.score += 200;
  } else if (hours == 0 && minutes == 0 && seconds > 1 && seconds <= 10) {
    console.log('+250');
    game.score += 250;
  }

  if (game.moves > 24) {
    console.log('+50');
    game.score += 50;
  } else if (game.moves > 8 && game.moves <= 24) {
    console.log('+500');
    game.score += 500;
  } else if (game.moves == 8) {
    console.log('+1500');
    game.score += 1500;
  }

  console.dir(game.score);

  scoreLbl.textContent = game.score;
  setTimeout(() => {
    youRockDialog.showModal();
  }, 500);
}
