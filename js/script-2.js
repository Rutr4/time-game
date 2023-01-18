const workspace = document.querySelector(".workspace");
const controls = document.querySelector(".controls");
const rules = document.querySelector(".rules");
const htmlName = document.getElementById("name");
const htmlLevel = document.getElementById("level");
const htmlPoints = document.getElementById("points");
const htmlAction = document.getElementById("action");
const elemsWorkspace = workspace.getElementsByClassName("figure");
const elemsRules = rules.getElementsByClassName("figure");
const btnMenu = document.getElementById("main-menu");

/************************************************************/

player = JSON.parse(localStorage.getItem("player"));
rating = JSON.parse(localStorage.getItem("rating"));

/************************************************************/

const options1 = {
  duration: 6300,
  iterations: Infinity,
  easing: "linear",
  direction: "alternate",
};
const options2 = {
  duration: 7000,
  iterations: Infinity,
  easing: "linear",
  direction: "alternate",
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
const size = [50];
const shape = [0, 50];
const color = [
  "orange",
  "purple",
  "red",
  "pink",
  "yellow",
  "blue",
  "green",
  "lime",
  "olive",
  "black",
];

/************************************************************/

htmlName.textContent = "Имя игрока: " + player.name;
htmlPoints.textContent = "Очки: " + playerPoints;
htmlLevel.textContent = "Уровень: " + level;

/************************************************************/

// кнопки, инпуты, взаимодействия
function startGame() {
  init();
  clone();
  timer();
  timerForLevel();
  action();
  addFunc();
  startBtn.remove();
  controls.append(btnRefresh);
}

//очистка workspace
function clear() {
  let amount = elemsWorkspace.length;
  for (let i = 0; i < amount; i++) {
    workspace.removeChild(elemsWorkspace[0]);
  }
  if (elemsRules.length != 0) rules.removeChild(elemsRules[0]);
}

function refresh() {
  clearTimeout(t);
  clear();
  init();
  clone();
  timerForLevel();
  addFunc();
  action();

  stopwatchForLevel = 0;
}

function check() {
  let result = false;

  //alert("Вы нажали за " + stopwatchForLevel/1000 + " сек.");
  clear();
  htmlAction.textContent = "";

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

// добавление фигур на страницу
function init() {
  for (let i = 0; i < 1; i++) {
    workspace.appendChild(generateFigure(i));
  }
}
function generateFigure(iterator) {
  const figureContainer = document.createElement("div");

  let sizePicker = getRandomInt(0, size.length);
  let shapePicker = getRandomInt(0, shape.length);
  let colorPicker = getRandomInt(0, color.length);

  figureContainer.classList.add("figure");
  figureContainer.id = iterator;
  figureContainer.style.cursor = "pointer";
  figureContainer.style.position = "absolute";
  figureContainer.style.border = "2px solid black";

  figureContainer.style.width = figureContainer.style.height =
    size[sizePicker] + "px";
  figureContainer.style.borderRadius = shape[shapePicker] + "%";
  figureContainer.style.background = color[colorPicker];

  return figureContainer;
}

// анимация
function action() {
  for (let index = 0; index < elemsWorkspace.length; index++) {
    let h = workspace.getBoundingClientRect().height;
    let w = workspace.getBoundingClientRect().width;

    let switcher = getRandomInt(1, 5);

    let animation1 = [];
    let animation2 = [];

    switch (switcher) {
      case 1:
        animation1 = [{ top: 0 + "px" }, { top: h - 50 + "px" }];
        animation2 = [{ left: 0 + "px" }, { left: w - 50 + "px" }];
        break;
      case 2:
        animation1 = [{ top: 0 + "px" }, { top: h - 50 + "px" }];
        animation2 = [{ left: w - 50 + "px" }, { left: 0 + "px" }];
        break;
      case 3:
        animation1 = [{ top: h - 50 + "px" }, { top: 0 + "px" }];
        animation2 = [{ left: 0 + "px" }, { left: w - 50 + "px" }];
        break;
      case 4:
        animation1 = [{ top: h - 50 + "px" }, { top: 0 + "px" }];
        animation2 = [{ left: w - 50 + "px" }, { left: 0 + "px" }];
        break;
      default:
        alert("alert");
        break;
    }

    const element = elemsWorkspace[index];

    element.animate(animation1, options1);
    element.animate(animation2, options2);
  }
}

function addFunc() {
  for (let i = 0; i < elemsWorkspace.length; i++) {
    const el = elemsWorkspace[i];
    el.onclick = () => {
      check();
    };
  }
}

// вставка элемента в rules
function clone() {
  time = level * 1000 + 4000;
  htmlAction.textContent =
    "Через " + (time - (time % 1000)) / 1000 + " сек. нажмите на ";
  tempElem = elemsWorkspace[elemsWorkspace.length - 1].cloneNode(true);
  tempElem.style.position = "relative";
  tempElem.style.display = "inline-block";
  tempElem.style.top = "0px";
  tempElem.style.left = "0px";
  tempElem.style.cursor = "not-allowed";

  rules.appendChild(tempElem);
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
  console.log(stopwatch);
}

function addmilliseconds() {
  stopwatchForLevel = parseInt(stopwatchForLevel) + 500;
  timerForLevel();
}
function timerForLevel() {
  t = setTimeout(addmilliseconds, 500);
  console.log(stopwatchForLevel);
}
