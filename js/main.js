var timer;
var endTime = new Date().getTime() + 25 * 60 * 1000;
var modo = 0;
const btnPom = document.getElementById('btnPom');
const btnDes = document.getElementById('btnDes');
const btnLar = document.getElementById('btnLar');

function updateTimer() {
  const currentTime = new Date().getTime();
  const difference = endTime - currentTime;

  if (difference > 0) {
    const minutes = Math.floor(difference / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById('timer').innerText = formattedTime;
  } else {
    clearInterval(timer);
    alert('Pomodoro session completed! Take a break.');
    resetTimer();
  }
}

function startTimer() {
  switch (modo) {
    case 0:
      endTime = new Date().getTime() + 25 * 60 * 1000;
    break;
    case 1:
      endTime = new Date().getTime() + 5 * 60 * 1000;
    break;
    case 2:
      endTime = new Date().getTime() + 15 * 60 * 1000;
    break;
    default:
    break;
  }
  timer = setInterval(updateTimer, 500);
  updateTimer();
}

function stopTimer() {
  clearInterval(timer);
}

function resetTimer() {
}

function modoPomo(color) {
  document.getElementById('body').style.backgroundColor = color;
  stopTimer()
  document.getElementById('timer').innerText = "25:00";
  modo = 0;
  btnPom.classList.add("secondary");
}
function modoDes(color) {
  document.getElementById('body').style.backgroundColor = color;
  stopTimer()
  document.getElementById('timer').innerText = "05:00";
  modo = 1;
  btnDes.classList.add("secondary");
}
function modoLar(color) {
  document.getElementById('body').style.backgroundColor = color;
  stopTimer()
  document.getElementById('timer').innerText = "15:00";
  modo = 2;
  btnLar.classList.add("secondary");
}