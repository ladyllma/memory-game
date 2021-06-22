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

var cards = [];
var timerInterval;
var moves = 0;
var points = 0;
//Clicking reset button stops timer (continue button to start timer?)
resetBtn.addEventListener('click', () => {
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
    moves++;
    movesLbl.textContent = moves;

    // Start the timer if it is the first move
    moves == 1 && startTimer();

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
        // Flip back the cards after half a second
        setTimeout(() => {
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
        resolve(points++);
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
    points == 8 && stopGame();
  }
}

function deleteCards() {
  deck.textContent = '';
  cards = [];
}

function startTimer() {
  var seconds = 0;
  var minutes = 0;
  var hours = 0;

  timerInterval = setInterval(() => {
    seconds++;
    if (seconds == 60) {
      minutes++;
      seconds = 0;
    }
    if (minutes == 60) {
      hours++;
      minutes = 0;
    }
    secondsLbl.textContent = seconds;
    minutesLbl.textContent = minutes;
    hoursLbl.textContent = hours;
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
  moves = 0;
  movesLbl.textContent = moves;
}

function stopGame() {
  stopTimer();
}
