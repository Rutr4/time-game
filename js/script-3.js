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
  xCenter: null,
  yCenter: null,
};
const finishImg = {
  top: workspace.getBoundingClientRect().height / 2 - 88,
  left: workspace.getBoundingClientRect().width - 195,
  imgSrc: "../img/home.png",
  alt: "Дом человечка",
  class: "finish",
};

let canvas = document.getElementById("canvas");
let canvasRect = canvas.getBoundingClientRect();

let ctx = canvas.getContext("2d");

let path = {
  keyPoints: [],

  x: 0,
  y: 0,

  currentPoints: 0,

  maxPoints: 6,
  xInterval: (canvas.getBoundingClientRect().width - 28) / 6,
};

/************************************************************/

// Canvas отрисовка
function createKeyPoints() {
  path.keyPoints = [];
  path.x = 0;
  path.y = 0;

  for (let i = 0; i < path.maxPoints; i++) {
    if (i === 0) {
      path.x += 28;
      path.y = canvasRect.height / 2;
    } else if (i === path.maxPoints - 1) {
      path.x = canvasRect.width - 90;
      path.y = canvasRect.height / 2;
    } else {
      path.x += path.xInterval;
      path.y = getRandomInt(0, canvasRect.height);
    }
    path.keyPoints.push([path.x, path.y]);
  }
}

function drawPath() {
  createKeyPoints();

  ctx.clearRect(0, 0, 1014, 696);

  ctx.beginPath();
  ctx.strokeStyle = "green";
  ctx.lineWidth = "10";
  ctx.lineCap = "round";

  ctx.moveTo(path.keyPoints[0][0], path.keyPoints[0][1]);
  for (let i = 1; i < path.maxPoints; i++) {
    ctx.lineTo(path.keyPoints[i][0], path.keyPoints[i][1]);
  }
  ctx.stroke();
}

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
  workspace.appendChild(generateImg(finishImg));
  workspace.appendChild(generateImg(startImg));
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
      //! дополнительно
      checkInterval = setInterval(checkHandledCenterImg, 100);
    });
  } else {
    imgContainer.addEventListener("pointerEnter", () => {
      console.log("over!!!!!!!!!!");
    });
  }

  return imgContainer;
}

let checkInterval;
//ПРОВЕРКА РАССТОЯНИЯ
function checkHandledCenterImg() {
  ctx.strokeStyle = "transparent";

  ctx.beginPath();
  ctx.moveTo(
    path.keyPoints[path.currentPoints][0],
    path.keyPoints[path.currentPoints][1]
  );
  ctx.lineTo(startImg.xCenter, startImg.yCenter);
  ctx.stroke();

  //от второй точки до курсора
  ctx.moveTo(
    path.keyPoints[path.currentPoints + 1][0],
    path.keyPoints[path.currentPoints + 1][1]
  );
  ctx.lineTo(startImg.xCenter, startImg.yCenter);
  ctx.stroke();

  let distance = distancePointToLine(
    startImg.xCenter,
    startImg.yCenter,
    path.keyPoints[path.currentPoints][0],
    path.keyPoints[path.currentPoints][1],
    path.keyPoints[path.currentPoints + 1][0],
    path.keyPoints[path.currentPoints + 1][1]
  ).d;

  if (startImg.xCenter > path.keyPoints[path.currentPoints + 1][0]) {
    path.currentPoints += 1;
  } else if (startImg.xCenter < path.keyPoints[path.currentPoints][0]) {
    path.currentPoints -= 1;
  } else if (startImg.xCenter >= 850) {
    check();
    return;
  }
  if (distance > 50) {
    path.currentPoints = 0;
    distance = 0;
    document.onpointermove = null;

    startImg.xCenter = 28;
    startImg.yCenter = workspace.getBoundingClientRect().height / 2;
    clearInterval(checkInterval);
    clearTimeout(t);
    refresh();
    return;
  }
}

const handleImgPartCaptured = (e, workspace = document.body) => {
  const element = e.currentTarget;
  if (element === null) return;
  element.classList.add("runner_state_captured");

  timerForLevel();

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

    element.style.top = topShift + "px";
    element.style.left = leftShift + "px";

    startImg.xCenter = leftShift + 28;
    startImg.yCenter = topShift + 33;
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
  changeOpacity();

  startBtn.remove();
  controls.append(btnRefresh);
  drawPath();
}

function changeOpacity() {
  canvas.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 7000 - level * 100,
  });
  canvas.style.opacity = 0;
}

//очистка workspace
function clear() {
  const amount = elemsWorkspace.length;
  for (let i = 0; i < amount; i++) {
    workspace.removeChild(elemsWorkspace[0]);
  }
}

function refresh() {
  clearTimeout(t);
  clear();
  init();
  rulesAdd();
  startImg.xCenter = 28;
  startImg.yCenter = workspace.getBoundingClientRect().height / 2;
  canvas.style.opacity = 1;
  drawPath();
  changeOpacity();

  stopwatchForLevel = 0;
}

function check() {
  let result = false;

  clear();

  if (Math.abs(time - stopwatchForLevel) <= 850) {
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

    startImg.xCenter = 28;
    startImg.yCenter = workspace.getBoundingClientRect().height / 2;
    clearInterval(checkInterval);
  } else {
    playerPoints -= level * 100;
    if (level > 1) {
      level -= 1;
    }

    alert(
      "не то время " +
        (stopwatchForLevel - (stopwatchForLevel % 1000)) / 1000 +
        " сек!"
    );
  }

  colorize(result);
  stopwatchForLevel = "0";
  htmlPoints.textContent = "Очки: " + playerPoints;
  htmlLevel.textContent = "Уровень: " + level;
}
// победа
function win() {
  //alert("ВЫ ПОБЕДИЛИ ЗА " + stopwatch);

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
}

// Изменения текста в правилах
function rulesAdd() {
  time = level * 1000 + 4000;
  htmlAction.textContent =
    "Проводите человечка до дома ровно за " +
    (time - (time % 1000)) / 1000 +
    " сек.";
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
  console.log(stopwatchForLevel);
}

/*
расчёт расстояния от точки до отрезка 
x_y - точка
x1_y1_x2_y2 - точки А_Б отрезка
*/
function distancePointToLine(x, y, x1, y1, x2, y2) {
  A = x - x1;
  B = y - y1;
  C = x2 - x1;
  D = y2 - y1;

  dot = A * C + B * D;
  len_sq = C * C + D * D;
  param = -1;
  if (len_sq != 0) {
    param = dot / len_sq;
  }
  xx = yy = 0;

  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  dx = x - xx;
  dy = y - yy;

  return { d: Math.sqrt(dx * dx + dy * dy) };
}
