const workspace = document.querySelector(".workspace");
const controls = document.querySelector(".controls");

let time = 0;
let playerTime = 0;
let level = 8;
let points = 0;

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

// добавление фигур на страницу
init();

function init() {
  let count = 0;
  count = level;
  for (let i = 0; i < count; i++) {
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
  figureContainer.style.cursor = "pointer";
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

  //   console.log(colorTxtRus[colorPicker]);
  //   console.log("left =>" + figureContainer.style.left);
  //   console.log("top =>" + figureContainer.style.top);
  //   console.log(size[sizePicker]);

  //   figureContainer.addEventListener("pointerdown", (e) => {
  //     handleImgPartCaptured(e, workspace);
  //   });

  return figureContainer;
}

let elems = document.getElementsByClassName("figure");

//action();

function action() {
  time = getRandomInt(1000, 8000);
  let switcher = getRandomInt(1, 4);
  let animation = null;

  switch (switcher) {
    case 1:
      animation = appearancing();
      break;
    case 2:
      animation = moving();
      break;
    case 3:
      animation = scaling();
      break;
    default:
      alert("alert");
  }



  //!не получается
  console.log(animation);
  elms.forEach((element) => {
    animation(element);
  });

  for (let index = 0; index < elems.length; index++) {
    const element = elems[index];
    animation(element);
  }
 //!не получается
  function appearancing(elem) {
    elem.animate(
      [{ transform: "opacity(0.1)" }, { transform: "opacity(1)" }],
      time
    );
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

//проверка ввода времени пользователя и заданным, начисление очков
function checkTime(playerTime) {
  playerTime = document.getElementById("input-time").value * 1000;

  //можно немного уменьшить сравнительное число "500"
  if (Math.abs(time - playerTime) <= 500) {
    points += 100;
  } else {
    points -= 100;
  }
}

function startGame() {
  init();
  //todo убрать кнопку "начать", добавить остальные инпуты и кнопки
  animate();
}

//Получить случайное число в диапазоне: [min; max)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
