const workspace = document.querySelector(".workspace");
const controls = document.querySelector(".controls");
const rules = document.querySelector(".rules");
const htmlName = document.getElementById("name");
const htmlLevel = document.getElementById("level");
const htmlPoints = document.getElementById("points");
const htmlAction = document.getElementById("action");
const elemsWorkspace = workspace.getElementsByClassName("imgContainer");
const btnMenu = document.getElementById("main-menu");

/************************************************************/

player = JSON.parse(localStorage.getItem("player"));
rating = JSON.parse(localStorage.getItem("rating"));

/************************************************************/

const startImg = {
  top: workspace.getBoundingClientRect().height / 2 - 28,
  left: 0,
  imgSrc: "../img/runner.png",
  alt: "Человечек, который хочет домой",
  class: "start",
};
const finishImg = {
  top: workspace.getBoundingClientRect().height / 2 - 88,
  left: workspace.getBoundingClientRect().width - 195,
  imgSrc: "../img/home.png",
  alt: "Дом человечка",
  class: "finish",
};

/************************************************************/
const startBtn = document.getElementById("start-game");

const btnRefresh = document.createElement("button");
btnRefresh.classList.add("btn", "btn-fill");
btnRefresh.setAttribute("type", "button");
btnRefresh.textContent = "Заново";
btnRefresh.onclick = () => {
  refresh();
};

// выход игрока в главное меню (сохранение его в рейтинговой таблице)
btnMenu.onclick = () => {
  player.score = playerPoints;
  player.time = stopwatch;

  rating.push(player);
  localStorage.removeItem("player");
  localStorage.setItem("rating", JSON.stringify(rating));

  window.location.href = "../index.html";
};

/************************************************************/

/* @param stopwatch - секундомер времени игры */
let stopwatch = "00:00";
let sec = 0;
let min = 0;

/* @param stopwatchForLevel - секундомер времени после запуска игры */
let stopwatchForLevel = "0";
let t; // для остановки секундомера

let playerTime = 0;
let playerPoints = 0;
let level = 1;

/* @param tempElem элемент из задания */
let tempElem = null;

/* @param time время движения объекта */
let time = 0;

/************************************************************/

htmlName.textContent = "Имя игрока: " + player.name;
htmlPoints.textContent = "Очки: " + playerPoints;
htmlLevel.textContent = "Уровень: " + level;

/************************************************************/
// добавление фигур на страницу
function init() {
  workspace.appendChild(generateImg(startImg));
  workspace.appendChild(generateImg(finishImg));
}

function generateImg(imageInfo) {
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("imgContainer");
  imgContainer.classList.add(imageInfo.class);
  imgContainer.style.top = imageInfo.top + "px";
  imgContainer.style.left = imageInfo.left + "px";

  const img = document.createElement("img");
  img.src = imageInfo.imgSrc;
  img.alt = imageInfo.alt;
  imgContainer.appendChild(img);
  img.ondragstart = () => false;

  if (imageInfo.class === "start") {
    imgContainer.addEventListener("pointerdown", (e) => {
      handleImgPartCaptured(e, workspace);
    });
  }

  return imgContainer;
}

const handleImgPartCaptured = (e, workspace = document.body) => {
  const element = e.currentTarget;
  if (element === null) return;
  element.classList.add("runner_state_captured");

  let clickLeftOffset,
    clickTopOffset = 0;
  const workspaceHeight = workspace.getBoundingClientRect().height;
  const workspaceWidth = workspace.getBoundingClientRect().width;

  // координаты клика относительно верхнего левого края элемента
  clickLeftOffset = e.clientX - element.getBoundingClientRect().left;
  clickTopOffset = e.clientY - element.getBoundingClientRect().top;

  document.onpointermove = elementDrag;
  document.onpointerup = handleElementReleased;

  function elementDrag(e) {
    if (element === null) return;

    // получение координат курсора относительно рабочей области
    const cursorX = e.clientX - workspace.getBoundingClientRect().left;
    const cursorY = e.clientY - workspace.getBoundingClientRect().top;

    // ограничение перетаскивания элемента рабочей областью
    const offsetFromEdge = 1; //px
    const minLeft = offsetFromEdge;
    const maxLeft =
      workspaceWidth - element.getBoundingClientRect().width - offsetFromEdge;
    const minTop = offsetFromEdge;
    const maxTop =
      workspaceHeight - element.getBoundingClientRect().height - offsetFromEdge;

    // отслеживаем сдвиг элемента
    let topShift = cursorY - clickTopOffset;
    let leftShift = cursorX - clickLeftOffset;

    if (topShift > maxTop) topShift = maxTop;
    else if (topShift < minTop) topShift = minTop;

    if (leftShift > maxLeft) leftShift = maxLeft;
    else if (leftShift < minLeft) leftShift = minLeft;

    //element.style.top = (topShift / workspaceHeight) * 100 + "%";
    element.style.top = topShift + "px";
    //element.style.left = (leftShift / workspaceWidth) * 100 + "%";
    element.style.left = leftShift + "px";
  }

  function handleElementReleased() {
    document.onpointermove = null;
    element.classList.remove("runner_state_captured");
  }
};





// кнопки, инпуты, взаимодействия
function startGame() {
  init();
  rulesAdd();
  timer();
  timerForLevel();
  startBtn.remove();
  controls.append(btnRefresh);
}

//очистка workspace
function clear() {
  let amount = elemsWorkspace.length;
  for (let i = 0; i < amount; i++) {}
}

function refresh() {
  clearTimeout(t);
  clear();
  init();
  rulesAdd();
  timerForLevel();

  stopwatchForLevel = 0;
}

function check() {
  let result = false;

  //alert("Вы провели человечка за " + stopwatchForLevel/1000 + " сек.");
  clear();

  if (Math.abs(time - stopwatchForLevel) <= 500) {
    playerPoints += level++ * 100;
    result = true;

    //! ПОБЕДА
    if (level === 11) {
      win();
    }

    btnRefresh.style.fontSize = "0.9em";
    btnRefresh.textContent = "Следующий уровень";
    btnRefresh.onclick = () => {
      refresh();
      btnRefresh.textContent = "Заново";
      btnRefresh.style.fontSize = "1em";
    };
  } else {
    playerPoints -= level * 100;
    if (level > 1) {
      level -= 1;
    }
  }

  colorize(result);
  stopwatchForLevel = "0";
  htmlPoints.textContent = "Очки: " + playerPoints;
  htmlLevel.textContent = "Уровень: " + level;
}
// победа
function win() {
  alert("ВЫ ПОБЕДИЛИ ЗА " + stopwatch);

  player.score = playerPoints;
  player.time = stopwatch;

  rating.push(player);
  localStorage.removeItem("player");
  localStorage.setItem("rating", JSON.stringify(rating));

  window.location.href = "win.html";
}

function colorize(result) {
  let color = "red";
  if (result === true) {
    color = "green";
    options1.duration = options2.duration - 150;
    options2.duration = options1.duration - 150;
  }

  htmlPoints.animate(
    [
      { background: color },
      { opacity: 1 },
      { transform: "scale(1.3)" },
      { opacity: 0.3 },
      { transform: "scale(0.5)" },
      { transform: "scale(1)" },
      { opacity: 1 },
    ],
    500
  );
}

// Изменения текста в правилах
function rulesAdd() {
  time = level * 1000 + 4000;
  htmlAction.textContent =
    "Проводите человечка до дома за " + (time - (time % 1000)) / 1000 + " сек.";
}

// получить случайное число в диапазоне: [min; max)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

// реализация секундомера
function tick() {
  sec++;
  if (sec >= 60) {
    sec = 0;
    min++;
  }
}
function add() {
  tick();
  stopwatch = (min > 9 ? min : "0" + min) + ":" + (sec > 9 ? sec : "0" + sec);
  timer();
}
function timer() {
  setTimeout(add, 1000);
  //console.log(stopwatch);
}

function addmilliseconds() {
  stopwatchForLevel = parseInt(stopwatchForLevel) + 500;
  timerForLevel();
}
function timerForLevel() {
  t = setTimeout(addmilliseconds, 500);
  //console.log(stopwatchForLevel);
}
