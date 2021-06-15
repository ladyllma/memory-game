const timerMinutes = document.getElementById('minutes');
const timerSeconds = document.getElementById('seconds');
const resetBtn = document.getElementById('reset-button');

var timerInterval;

resetBtn.addEventListener('click', () => {
  stopTimer();
});

function startTimer() {
  var seconds = 0;
  var minutes = 0;
  timerInterval = setInterval(() => {
    seconds++;
    if (seconds == 60) {
      minutes++;
      seconds = 0;
    }
    timerSeconds.textContent = seconds;
    timerMinutes.textContent = minutes;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerSeconds.textContent = 0;
  timerMinutes.textContent = 0;
}

startTimer();
