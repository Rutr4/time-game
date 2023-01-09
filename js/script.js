const workspace = document.querySelector(".workspace");
// const testBtn = document.querySelector(".js-btn-test");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

let time = 0;
let level = 7;
let points = 0;

const colorTxtEng = ["yellow", "blue", "green", "black", "purple", "pink"];
const colorTxtRus = [
  "жёлтый",
  "синий",
  "зелёный",
  "чёрный",
  "фиолетовый",
  "розовый",
];

const size = [100, 50, 25];
const sizeTxt = ["большой", "средний", "маленький"];

const shape = [0, 50];
const shapeTxt = ["квадрат", "круг"];

// добавление фигур на страницу
init();
console.log(workspace.getBoundingClientRect());

function init() {
    let count = 0;
    if (level>4) {
        count = getRandomInt(5, 9)
    }else{
        count = level;
    }
  for (let i = 0; i < count; i++) {
    workspace.appendChild(generateFigure(i));
  }
}

function generateFigure(iterator) {
  const figureContainer = document.createElement("div");

  let sizePicker = getRandomInt(0, size.length);
  let shapePicker = getRandomInt(0, shape.length);
  let colorPicker = getRandomInt(0, colorTxtEng.length);

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
      (workspace.getBoundingClientRect().height - size[sizePicker])
    ) + "px";
  figureContainer.style.left =
    getRandomInt(
      0,
      (workspace.getBoundingClientRect().width - size[sizePicker])
    ) + "px";

  console.log(colorTxtRus[colorPicker])
  console.log("left =>" + figureContainer.style.left);
  console.log("top =>" + figureContainer.style.top);
  console.log(size[sizePicker]);    

  //   figureContainer.addEventListener("pointerdown", (e) => {
  //     handleImgPartCaptured(e, workspace);
  //   });

  return figureContainer;
}

// todo ДОБАВИТЬ RESET уровня, если элементы наехали друг на друга

const elem = document.getElementById("");

//move(elem);

function move(elem) {
  time = getRandomInt(1000, 8000);
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
