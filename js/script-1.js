const htmlName = document.getElementById("name");
const htmlLevel = document.getElementById("level");
const htmlPoints = document.getElementById("points");
const htmlAction = document.getElementById("action");
const controls = document.querySelector(".controls");
const rules = document.querySelector(".rules");
const elemsRules = rules.getElementsByClassName("figure");
const workspace = document.querySelector(".workspace");
const elemsWorkspace = workspace.getElementsByClassName("figure");
const btnMenu = document.getElementById("main-menu");

/************************************************************/

player = JSON.parse(localStorage.getItem("player"));
rating = JSON.parse(localStorage.getItem("rating"));

/************************************************************/

const startBtn = document.getElementById("start-game");

const btnRefresh = document.createElement("button");
btnRefresh.classList.add("btn", "btn-fill");
btnRefresh.setAttribute("type", "button");
btnRefresh.textContent = "Заново";
btnRefresh.onclick = () => {
  refresh();
};

const btnCheck = document.createElement("button");
btnCheck.classList.add("btn", "btn-fill");
btnCheck.setAttribute("type", "button");
btnCheck.textContent = "Проверить";
btnCheck.onclick = () => {
  check();
};

const inputTime = document.createElement("input");
inputTime.classList.add("input");
inputTime.setAttribute("type", "text");
inputTime.setAttribute("placeholder", "Введите время (сек)");
inputTime.setAttribute("size", "25");

// выход игрока в главное меню (сохранение его в рейтинговой таблице)
btnMenu.onclick = () => {
  player.score = playerPoints;
  player.time = stopwatch;

  rating.push(player);
  localStorage.removeItem("player");
  localStorage.setItem("rating", JSON.stringify(rating));

  window.location.href = '../index.html';
};
/************************************************************/

/* @param stopwatch - секундомер времени игры */
let stopwatch = "00:00";
let sec = 0;
let min = 0;
let t; // для остановки секундомера

let playerTime = 0;
let playerPoints = 0;
let level = 1;

/* @param tempElem элемент из задания */
/* @param txtAnimation отвечает за анимацию объекта задания */
let tempElem = null;
let txtAnimation = "";

/* @param time время движения объекта */
let time = 0;
const size = [100, 50, 25];
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
  action();
  clone();
  timer();

  startBtn.remove();

  controls.append(btnRefresh);
  controls.append(inputTime);
  controls.append(btnCheck);
}

function refresh() {
  //очистка workspace
  let amount = elemsWorkspace.length;
  for (let i = 0; i < amount; i++) {
    workspace.removeChild(elemsWorkspace[0]);
  }
  rules.removeChild(elemsRules[0]);
  init();
  action();
  clone();
}

function check() {
  playerTime = document.querySelector(".input").value * 1000;
  let result = false;

  if (Math.abs(time - playerTime) <= 850) {
    playerPoints += level++ * 100;
    result = true;

    //! ПОБЕДА
    if (level === 11) {
      win();
    }

    btnCheck.style.fontSize = "0.9em";
    btnCheck.textContent = "Следующий уровень";
    btnCheck.onclick = () => {
      refresh();
      btnCheck.textContent = "Проверить";
      btnCheck.style.fontSize = "1em";
      btnCheck.onclick = () => {
        check();
      };
    };
  } else {
    playerPoints -= level * 100;
    if (level > 1) {
      level -= 1;
    }
  }

  colorize(result);

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
  document
    .querySelector(".input")
    .animate(
      [
        { background: color },
        { transform: "scale(0.1)" },
        { transform: "scale(1.1)" },
      ],
      500
    );
}

// добавление фигур на страницу
function init() {
  for (let i = 0; i < level; i++) {
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
  figureContainer.style.position = "absolute";
  figureContainer.style.border = "2px solid black";

  figureContainer.style.width = figureContainer.style.height =
    size[sizePicker] + "px";
  figureContainer.style.borderRadius = shape[shapePicker] + "%";
  figureContainer.style.background = color[colorPicker];
  figureContainer.style.top =
    getRandomInt(
      0,
      workspace.getBoundingClientRect().height - size[sizePicker]
    ) + "px";
  figureContainer.style.left =
    getRandomInt(
      0,
      workspace.getBoundingClientRect().width - size[sizePicker]
    ) + "px";

  return figureContainer;
}

// анимация
function action() {
  for (let index = 0; index < elemsWorkspace.length; index++) {
    const element = elemsWorkspace[index];

    time = getRandomInt(1000, 8850);
    let switcher = getRandomInt(1, 4);
    let animation = null;

    switch (switcher) {
      case 1:
        animation = appearancing;
        txtAnimation = "появляется";
        break;
      case 2:
        animation = shaking;
        txtAnimation = "трясётся";
        break;
      case 3:
        animation = scaling;
        txtAnimation = "пульсирует";
        break;
      default:
        alert("alert");
    }

    animation(element);
  }

  function appearancing(elem) {
    elem.animate([{ opacity: 0.01 }, { opacity: 1 }], time);
  }
  function shaking(elem) {
    elemTop = parseInt(elem.style.top);
    elemLeft = parseInt(elem.style.left);

    elem.animate(
      [
        { left: elemLeft + "px" },
        { left: elemLeft + 10 + "px" },
        { left: elemLeft - 10 + "px" },
        { left: elemLeft + 10 + "px" },
        { left: elemLeft - 10 + "px" },
        { left: elemLeft + 10 + "px" },
        { left: elemLeft - 10 + "px" },
        { left: elemLeft + "px" },
      ],
      time
    );
  }
  function scaling(elem) {
    elem.animate(
      [
        { transform: "scale(0.1)" },
        { transform: "scale(0.4)" },
        { transform: "scale(0.8)" },
        { transform: "scale(0.4)" },
        { transform: "scale(0.7)" },
        { transform: "scale(0.2)" },
        { transform: "scale(1)" },
      ],
      time
    );
  }
}

// вставка элемента в rules
function clone() {
  htmlAction.textContent = "Сколько времени " + txtAnimation;
  tempElem = elemsWorkspace[elemsWorkspace.length - 1].cloneNode(true);
  tempElem.style.position = "relative";
  tempElem.style.display = "inline-block";
  tempElem.style.top = "0px";
  tempElem.style.left = "0px";

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
  t = setTimeout(add, 1000);
  console.log(stopwatch);
}
