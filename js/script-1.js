const workspace = document.querySelector(".workspace");
const controls = document.querySelector(".controls");
const elems = document.getElementsByClassName("figure");
//const htmlName = document.getElementById("name");
const htmlPoints = document.getElementById("points");

//! ЗАМЕНИТЬ ИМЯ В HEADER'е
let paragraph = document.createTextNode("p");
let name = "Игрок";
let points = 0;
let level = 4;
let time = 0;
let playerTime = 0;

const size = [100, 50, 25];
const sizeTxt = ["большой", "средний", "маленький"];

const shape = [0, 50];
const shapeTxt = ["квадрат", "круг"];

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

htmlPoints.prepend();
htmlPoints.append();

// кнопки и инпуты, взаимодействие
function startGame() {
  //todo убрать кнопку "начать", добавить остальные инпуты и кнопки
  init();
  console.log(elems);
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
function check(playerTime) {
  playerTime = document.getElementById("input-time").value * 1000;

  if (Math.abs(time - playerTime) <= 850) {
    points += 100;
    alert("good");
  } else {
    points -= 100;
    alert("bad");
  }

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
