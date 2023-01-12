const workspace = document.querySelector(".workspace");
const controls = document.querySelector(".controls");
const elems = document.getElementsByClassName("figure");
const htmlName = document.getElementById("name");
const htmlPoints = document.getElementById("points");
const htmlLevel = document.getElementById("level");

/************************************************************/

const btnRefresh = document.createElement("button");
btnRefresh.classList.add("btn", "btn-fill");
btnRefresh.setAttribute("type", "button");
btnRefresh.textContent = "Заново";

const btnCheck = document.createElement("button");
btnCheck.classList.add("btn", "btn-fill");
btnCheck.setAttribute("type", "button");
btnCheck.textContent = "Проверить";

const inputTime = document.createElement("input");
inputTime.classList.add("input");
inputTime.setAttribute("type", "text");
inputTime.setAttribute("placeholder", "Введите время (сек)");
inputTime.setAttribute("size", "25");

/************************************************************/

//! ЗАМЕНИТЬ ИМЯ В HEADER'е
let stopwatch = "00:00:00";
let playerName = "ДОБАВИТЬ ИМЯ, ВВЕДЁННОЁ В ГЛАВНОМ МЕНЮ";
let playerTime = 0;
let playerPoints = 0;
let level = 3;
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

// кнопки и инпуты, взаимодействия
function startGame() {
  const startBtn = document.getElementById("start-game");
  startBtn.remove();

  //!! ЗАПУСТИТЬ ТАЙМЕР !!//
  //!! ПОТОМ РАСКОММЕНТИРОВАТЬ И ИСПОЛЬЗОВАТЬ ONCLICK!!//
  /*
  controls.append(btnRefresh);
  controls.append(inputTime);
  controls.append(btnCheck);
  */

  //onclick
  //https://ru.hexlet.io/qna/javascript/questions/kak-dobavit-onclick-k-knopke-cherez-js#:~:text=%D0%A1%D0%B2%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%BE%20onclick%20%D1%83%20%D1%8D%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%20%D0%BE%D1%82%D0%B2%D0%B5%D1%87%D0%B0%D0%B5%D1%82,%2F%2F%20%D0%94%D0%BE%D0%B1%D0%B0%D0%B2%D0%BB%D1%8F%D0%B5%D0%BC%20%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D1%83%20%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D1%8F%20element.

  init();
  action();
}

function refresh() {
  //очистка workspace
  let amount = elems.length;
  for (let i = 0; i < amount; i++) {
    workspace.removeChild(elems[0]);
    console.log(elems);
  }
  init();
  action();
}

function check() {
  playerTime = document.getElementById("input-time").value * 1000;
  let result = false;

  if (Math.abs(time - playerTime) <= 850) {
    playerPoints += level++ * 100;
    result = true;
    //! ПОБЕДА, ПОЛУЧАЕТСЯ
    if (level === 11) {
      win();
    }
    //todo const checkBtn = document.getElementById("check");
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
  //! ЗДЕСЬ ОБРАТИТЬСЯ К СОЗДАННОМУ(В START-GAME) ИНПУТУ
  const inputTEMP = document.getElementById("input-time");
  inputTEMP.animate(
    [
      { background: color },
      { transform: "scale(0.1)" },
      { transform: "scale(1.1)" },
      { transform: "transparent" },
      { transform: color },
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

//! ДОБАВИТЬ правильную реализацию MOVING()
// анимация
function action() {
  //! изменить max время
  time = getRandomInt(0, 1000);
  let switcher = getRandomInt(1, 4);
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
    elem.animate(
      [
        { transform: "scale(0.5)" },
        { transform: "scale(0.7)" },
        { transform: "scale(0.1)" },
        { transform: "scale(1)" },
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

function win() {
  alert("kapets")
  //! ОСТАНОВИТЬ ТАЙМЕР
  //TODO передать все основные значения в локальное хранилище данных
}
// получить случайное число в диапазоне: [min; max)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
