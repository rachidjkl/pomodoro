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

  
  const task = document.getElementById("task-2");



  // ----------------------------------------------------------DRAG AND DROP------------------------------------------------------//

  const porHacer = document.querySelector(".porHacer");
  const haciendo = document.querySelector(".haciendo");
  const hecho = document.querySelector(".hecho");

  porHacer.ondragover = dragOver;
  porHacer.ondragenter = dragEnter;
  porHacer.ondragleave = dragLeave;
  porHacer.ondrop = dragDrop;

  haciendo.ondragover = dragOver;
  haciendo.ondragenter = dragEnter;
  haciendo.ondragleave = dragLeave;
  haciendo.ondrop = dragDrop;

  hecho.ondragover = dragOver;
  hecho.ondragenter = dragEnter;
  hecho.ondragleave = dragLeave;
  hecho.ondrop = dragDrop;

  function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
  }
  
  function dragOver(event) {
    event.preventDefault();
  }
  
  function dragEnter(event) {
    event.preventDefault();
    if (event.target.classList.contains("divTask")) {
      event.target.classList.add("hovered");
    }
  }
  
  function dragLeave(event) {
    event.preventDefault();
    if (event.target.classList.contains("divTask")) {
      event.target.classList.remove("hovered");
    }
  }
  
  function dragDrop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text/plain");
    const draggedTask = document.getElementById(taskId);
    if (event.target.classList.contains("divTask")) {
      event.target.appendChild(draggedTask);
      event.target.classList.remove("hovered");
    }
  }

  const añadirButton = document.getElementById("añadir");
  añadirButton.addEventListener("click", añadirTask);

  function añadirTask() {
    let task = document.createElement("div");
    let taskTitleInput = document.createElement("input");
    let taskDescriptionTextarea = document.createElement("textarea");
    let taskTitle = document.createElement("h1");
    let taskDescription = document.createElement("h2");
    let confirmButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    const tareas = document.getElementsByClassName('task');

    task.id = "task-" + tareas.length;
    task.classList.add("task", "draggable");
    confirmButton.classList.add("btn");
    deleteButton.classList.add("btn");
    task.setAttribute("draggable", "true");

    taskTitleInput.placeholder = "Tarea";
    taskDescriptionTextarea.placeholder = "Descripcion";
    confirmButton.textContent = "Confirmar";
    deleteButton.textContent = "Borrar";

    task.appendChild(taskTitleInput);
    task.appendChild(taskDescriptionTextarea);
    task.appendChild(confirmButton);

    porHacer.appendChild(task);

    confirmButton.addEventListener("click", function () {
      if (!(taskTitleInput.value == "" && taskDescriptionTextarea.value == "")) {
        let title = taskTitleInput.value;
        let description = taskDescriptionTextarea.value;

        taskTitle.textContent = title;
        taskDescription.textContent = description;

        task.removeChild(taskTitleInput);
        task.removeChild(taskDescriptionTextarea);

        task.appendChild(taskTitle);
        task.appendChild(taskDescription);
        task.appendChild(deleteButton);

        confirmButton.style.display = "none";
      } else {
        alert("No pueden estar vacio");
      }
    });

    deleteButton.addEventListener("click", function () {
      task.parentNode.removeChild(task);
    });

    task.addEventListener("dragstart", dragStart);
  }


});