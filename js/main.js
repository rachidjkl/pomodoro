document.addEventListener("DOMContentLoaded", function() {

  var timer;
  var endTime = new Date().getTime() + 25 * 60 * 1000;
  var modo = 0;
  const imgFlecha = document.getElementById('flechas');
  const btnStart = document.getElementById('btnStart');
  const btnStop = document.getElementById('btnStop');
  const btnPomo = document.getElementById('btnPomo');
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

  btnStart.addEventListener("click", function() {
    startTimer();
  });

  btnStop.addEventListener("click", function() {
    stopTimer();
  });

  btnPomo.addEventListener("click", function() {
    modoPomo("hsl(25deg 91% 57%)");
  });
  
  btnDes.addEventListener("click", function() {
    modoDes("hsl(231, 23%, 40%)");
  });
  
  btnLar.addEventListener("click", function() {
    modoLar("hsl(105, 16%, 40%)");
  });

  imgFlecha.addEventListener("click", function() {
    
  });

  function modoPomo(color) {
    document.getElementById('body').style.backgroundColor = color;
    stopTimer()
    document.getElementById('timer').innerText = "25:00";
    modo = 0;
    btnPomo.className = "btn primary";
    btnDes.className = "btn secondary";
    btnLar.className = "btn secondary";
  }
  function modoDes(color) {
    document.getElementById('body').style.backgroundColor = color;
    stopTimer()
    document.getElementById('timer').innerText = "05:00";
    modo = 1;
    btnPomo.className = "btn secondary";
    btnDes.className = "btn primary";
    btnLar.className = "btn secondary";
  }
  function modoLar(color) {
    document.getElementById('body').style.backgroundColor = color;
    stopTimer()
    document.getElementById('timer').innerText = "15:00";
    modo = 2;
    btnPomo.className = "btn secondary";
    btnDes.className = "btn secondary";
    btnLar.className = "btn primary";
  }
});