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

const timerMinutes = document.getElementById('minutes');
const timerSeconds = document.getElementById('seconds');
const timerHours = document.getElementById('hours');
const resetBtn = document.getElementById('reset-button');
const deck = document.getElementById('deck');

var timerInterval;
//Clicking reset button stops timer (continue button to start timer?)
resetBtn.addEventListener('click', () => {
  restartTimer();
});

window.onload = createCards();

function createCards() {
  // Duplicating the icons
  cardIcons.push(...cardIcons);
  // Shuffle randomly the cards icons using Fisher-Yates Algorithm
  for (let i = cardIcons.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    // Swapping the icons without using a 'temp' variable
    [cardIcons[i], cardIcons[j]] = [cardIcons[j], cardIcons[i]];
  }

  // Iterate the cards icons: creates a card, and adds it to the deck
  cardIcons.forEach((cardIcon) => {
    const icon = document.createElement('i');
    icon.className = `fas ${cardIcon}`;

    const card = document.createElement('li');
    card.className = 'card';
    card.appendChild(icon);
    card.addEventListener('click', () => {
      // TODO: function to toggle the visibility of the card
      console.log('Not implemented yet.');
    });

    deck.appendChild(card);
  });
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
  startTimer();
}

startTimer();
