const workspace = document.querySelector(".workspace");
// const testBtn = document.querySelector(".js-btn-test");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

let time = 0;
let level = 3;
let points = 0;

const colorTxtEng = ["yellow", "blue", "green", "black", "purple"];
const colorTxtRus = ["жёлтый", "синий", "зелёный", "чёрный", "фиолетовый"];

const size = [100, 50, 25];
const sizeTxt = ["большой", "средний", "маленький"];

const shape = [0, 50];
const shapeTxt = ["квадрат", "круг"];

// добавление фигур на страницу
init();

function init() {
  for (let i = 0; i < level; i++) {
    workspace.appendChild(generateFigure(i));
  }
}

function generateFigure(iterator) {
  const figureContainer = document.createElement("div");

  let sizePicker = getRandomInt(0, 3);
  let shapePicker = getRandomInt(0, 2);
  let colorPicker = getRandomInt(0, 5);

  figureContainer.id = iterator;
  figureContainer.style.cursor = "pointer";
  figureContainer.style.position = "absolute";

  figureContainer.style.top = getRandomInt(0, 500) + "px";
  figureContainer.style.left = getRandomInt(0, 500) + "px";

  figureContainer.style.width = figureContainer.style.height =
    size[sizePicker] + "px";
  figureContainer.style.borderRadius = shape[shapePicker] + "%";
  figureContainer.style.background = colorTxtEng[colorPicker];

  //   figureContainer.addEventListener("pointerdown", (e) => {
  //     handleImgPartCaptured(e, workspace);
  //   });
  return figureContainer;
}

  // todo ДОБАВИТЬ RESET уровня, если элементы наехали друг на друга

const elem = document.getElementById("");

//move(elem);

function move(elem) {
  elem.animate(
    [
      { transform: "scale(0.5)" },
      { transform: "scale(0.7)" },
      { transform: "scale(0.1)" },
      { transform: "scale(1)" },
    ],
    3000
  );
}
