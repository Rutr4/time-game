const workspace = document.querySelector(".workspace");
const controls = document.querySelector(".controls");
const elems = document.getElementsByClassName("figure");
const htmlName = document.getElementById("name");
const htmlPoints = document.getElementById("points");
const htmlLevel = document.getElementById("level");

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

/************************************************************/

//! ЗАМЕНИТЬ ИМЯ В HEADER'е
/* @param stopwatch - секундомер времени игры */
let stopwatch = "00:00";
let sec = 0;
let min = 0;

let playerName = "ДОБАВИТЬ ИМЯ, ВВЕДЁННОЁ В ГЛАВНОМ МЕНЮ";
let playerTime = 0;
let playerPoints = 0;
let level = 11;
let time = 0;

const colorTxtEng = [
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
const colorTxtRus = [
  "оранжевый",
  "фиолетовый",
  "красный",
  "розовый",
  "жёлтый",
  "синий",
  "зелёный",
  "лаймовый",
  "оливковый",
  "чёрный",
];

const size = [100, 50, 25];
const sizeTxt = ["большой", "средний", "маленький"];

const shape = [0, 50];
const shapeTxt = ["квадрат", "круг"];

/************************************************************/

htmlName.textContent = "Имя игрока: " + playerName;
htmlPoints.textContent = "Очки: " + playerPoints;
htmlLevel.textContent = "Уровень: " + level;

/************************************************************/

// кнопки, инпуты, взаимодействия
function startGame() {
  init();
  action();
  timer();
  
  startBtn.remove();

  controls.append(btnRefresh);
  controls.append(inputTime);
  controls.append(btnCheck);
}

function refresh() {
  //очистка workspace
  let amount = elems.length;
  for (let i = 0; i < amount; i++) {
    workspace.removeChild(elems[0]);
  }
  init();
  action();
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

    //todo поменять кнопку "Проверить" на "Следующий уровень -> то же, что и Start-game"
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
  let colorPicker = getRandomInt(0, colorTxtEng.length);

  figureContainer.classList.add("figure");
  figureContainer.id = iterator;
  figureContainer.style.position = "absolute";
  figureContainer.style.border = "2px solid black";

  figureContainer.style.width = figureContainer.style.height =
    size[sizePicker] + "px";
  figureContainer.style.borderRadius = shape[shapePicker] + "%";
  figureContainer.style.background = colorTxtEng[colorPicker];
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
  time = getRandomInt(1000, 7000);
  let switcher = 2; //getRandomInt(1, 4);
  let animation = null;

  switch (switcher) {
    case 1:
      animation = appearancing;
      break;
    case 2:
      animation = moving;
      break;
    case 3:
      animation = scaling;
      break;
    default:
      alert("alert");
  }

  // перебор фигур
  for (let index = 0; index < elems.length; index++) {
    const element = elems[index];
    animation(element);
  }

  function appearancing(elem) {
    elem.animate([{ opacity: 0.01 }, { opacity: 1 }], time);
  }
  function moving(elem) {
    elemTop = parseInt(elem.style.top);
    elemLeft = parseInt(elem.style.left);

    elem.animate(
      [
        {
          top: elemTop + "px",
          left: elemLeft +"px",
        },
        {
          top: elemTop - 25 + "px",
          left: elemLeft - 15 + "px",
        },
        {
          top: elemTop - 45 + "px",
          left: elemLeft + 35 + "px",
        },
        {
          top: elemTop + 25 + "px",
          left: elemLeft + 35 + "px",
        },
        {
          top: elemTop + 5 + "px",
          left: elemLeft - 35 + "px",
        },
        {
          top: elemTop + "px",
          left: elemLeft +"px",
        },
      ],
      2000
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

function win() {
  let stopwatchResult = stopwatch;
  alert("kapets!! " + stopwatchResult);
  //! ОСТАНОВИТЬ ТАЙМЕР
  //TODO передать все основные значения в локальное хранилище данных
}
// получить случайное число в диапазоне: [min; max)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

// реализация секундомера
let t;

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
