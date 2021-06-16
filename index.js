const timerMinutes = document.getElementById('minutes');
const timerSeconds = document.getElementById('seconds');
const timerHours = document.getElementById('hours');
const resetBtn = document.getElementById('reset-button');

var timerInterval;

//Clicking reset button stops timer (continue button to start timer?)
resetBtn.addEventListener('click', () => {
  stopTimer();
  restartTimer();
});

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

function stopTimer() {
  clearInterval(timerInterval);
  timerSeconds.textContent = 0;
  timerMinutes.textContent = 0;
  timerHours.textContent = 0;
}

function restartTimer() {
  startTimer();
}

startTimer();
