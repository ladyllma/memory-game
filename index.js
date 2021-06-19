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

const timerMinutes = document.getElementById('minutes');
const timerSeconds = document.getElementById('seconds');
const timerHours = document.getElementById('hours');
const movesCounter = document.getElementById('moves');
const resetBtn = document.getElementById('reset-button');
const deck = document.getElementById('deck');

var timerInterval;
var moves = 0;
var cardsSelectedCounter = 0;
var cardsSelected = [];
//Clicking reset button stops timer (continue button to start timer?)
resetBtn.addEventListener('click', () => {
  restartGame();
});

window.onload = startGame();

function startGame() {
  createCards();
  startTimer();
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

  // Iterate the card icons: creates a card and then adds it to the deck
  cardIcons.forEach((cardIcon) => {
    const icon = document.createElement('i');
    icon.className = `fas ${cardIcon}`;

    const card = document.createElement('li');
    card.className = 'card';
    card.appendChild(icon);
    card.addEventListener('click', () => {
      card.classList.toggle('flip-card');
      card.classList.toggle('disabled');
      increaseMoves(card.firstChild);
    });

    deck.appendChild(card);
  });
}

function increaseMoves(card) {
  cardsSelected.push(card);
  cardsSelectedCounter++;
  if (cardsSelectedCounter == 2) {
    moves++;
    movesCounter.textContent = moves;
    cardsSelectedCounter = 0;

    const [card1, card2] = [cardsSelected[0], cardsSelected[1]];
    if (card1.classList.toString() !== card2.classList.toString()) {
      setTimeout(() => {
        card1.parentNode.classList.toggle('disabled');
        card1.parentNode.classList.toggle('flip-card');
        card2.parentNode.classList.toggle('disabled');
        card2.parentNode.classList.toggle('flip-card');
      }, 500);
    }
    cardsSelected = [];
  }
}

function deleteCards() {
  deck.textContent = '';
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
    timerSeconds.textContent = seconds;
    timerMinutes.textContent = minutes;
    timerHours.textContent = hours;
  }, 1000);
}

function restartTimer() {
  clearInterval(timerInterval);
  timerSeconds.textContent = 0;
  timerMinutes.textContent = 0;
  timerHours.textContent = 0;
}

function restartMoves() {
  cardsSelectedCounter = 0;
  moves = 0;
  movesCounter.textContent = moves;
}
