const workspace = document.querySelector(".workspace");
const controls = document.querySelector(".controls");
const elems = document.getElementsByClassName("figure");
const htmlName = document.getElementById("name");
const htmlPoints = document.getElementById("points");
const htmlLevel = document.getElementById("level");

//! ЗАМЕНИТЬ ИМЯ В HEADER'е
let playerName = "ДОБАВИТЬ ИМЯ, ВВЕДЁННОЁ В ГЛАВНОМ МЕНЮ";
let playerTime = 0;
let playerPoints = 0;
let level = 1;
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

// кнопки и инпуты, взаимодействие
function startGame() {
  const startBtn = document.getElementById("start-game");
  startBtn.remove();

  const refreshBtn = document.createElement('button');
  const inputTime = document.createElement('button');
  const checkBtn = document.createElement('button');

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

  if (Math.abs(time - playerTime) <= 850) {
    playerPoints += 100;
    alert("good");
  } else {
    playerPoints -= 100;
    alert("bad");
  }

  //? добавить текст перед controls (prepend)
  // const newParagraph = document.createElement("p");
  // newParagraph.innerHTML = `<b>У вас получилось ! поздравляю !<b>`; //выбор цвета фона, чётные - class1, нечётные - class2
  // workspace.append(newParagraph);
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
  //! изменить max время
  time = getRandomInt(1000, 2000);
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

// получить случайное число в диапазоне: [min; max)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
