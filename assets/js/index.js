//Varibles
const listImages = [
  "aubergine",
  "banana",
  "carrots",
  "cherries",
  "dollar",
  "lemon",
  "orange",
  "peach",
  "potato",
  "tomato",
];

let lever;

const imgCards = [];

//Referencias HTML
const btnInCoins = document.querySelector(".coinsIn");
const inputCoins = document.querySelector("#coinsInput");
const numCoinsElement = document.querySelector(".numCoins");
const btnExit = document.querySelector(".exitBtn");
const placeForGame = document.querySelector(".images");
const placeForMoves = document.querySelector(".containerMoves");

//Funciones
const initialGame = () => {
  for (let i = 0; i < 3; i++) {
    const imgCard = document.createElement("img");
    imgCard.src = `./assets/img/pingu.png`;
    imgCard.classList.add("carsGame");
    imgCards.push(imgCard);
    placeForGame.append(imgCard);
  }
  lever = document.createElement("img");
  lever.src = "./assets/img/palancaUP.png";
  lever.classList.add("cardLever");
  placeForGame.append(lever);
};

const earningsCoin = (coins) => {
  let numCoins = parseInt(numCoinsElement.innerHTML);
  // let inputNum = parseInt(inputCoins.value);
  numCoins += coins;
  // inputNum += coins;
  numCoinsElement.innerHTML = numCoins;
  // inputCoins.value = inputNum;
};

const turnLeftCoin = () => {
  let numCoins = parseInt(numCoinsElement.innerHTML);
  // let inputNum = parseInt(inputCoins.value);
  numCoins -= 1;
  // inputNum -= 1;
  numCoinsElement.innerHTML = numCoins;
  // inputCoins.value = inputNum;
};

const earningsConditions = (results) => {
  //Si salen 3 monedas, se gana 10 monedas
  if (results.every((val) => val === "dollar")) {
    movementsHistorical("!Tres MONEDAS¡ Ganas 10 monedas.");
    earningsCoin(10);
  } else if (
    (results[0] === "dollar" && results[1] === "dollar") ||
    (results[0] === "dollar" && results[2] === "dollar") ||
    (results[1] === "dollar" && results[2] === "dollar")
  ) {
    movementsHistorical("!Dos MONEDAS¡ Ganas 4 monedas.");
    earningsCoin(4);
    return;
  }

  results = results.filter((value, index, arr) => arr.indexOf(value) === index);
  //si salen 3 frutas o verduras iguales, 5 monedas
  if (results.length === 1 && results[0] !== "dollar") {
    movementsHistorical("!Tres IGUALES¡ Ganas 5 monedas.");
    earningsCoin(5);
  } else if (results.length === 2 && results.some((val) => val === "dollar")) {
    movementsHistorical("!Dos IGUALES y una MONEDA¡ Ganas 3 monedas.");
    earningsCoin(3);
  } else if (results.length === 2) {
    movementsHistorical("!Dos IGUALES¡ Ganas 2 monedas.");
    earningsCoin(2);
  } else if (results.length === 3) {
    if (results.some((img) => img === "dollar")) {
      movementsHistorical("!Una MONEDA¡ Ganas 1 moneda.");
      earningsCoin(1);
    }
  }
};

initialGame();
//Eventos
btnInCoins.onclick = () => {
  if (!inputCoins.value || inputCoins.value <= 0) {
    swal("Valor incorrecto", "Debes introducir monedas", "error");
    inputCoins.value = "";
  } else {
    numCoinsElement.innerHTML = inputCoins.value;
    btnInCoins.disabled = true;
    inputCoins.disabled = true;
    inputCoins.value = "";
    movementsHistorical("Has introducido monedas.");
  }
};

btnExit.onclick = () => {
  debugger;
  const coinsWon = (numCoinsElement.innerHTML);
  swal(
    "Has salido del juego",
    `Has conseguido un total del ${coinsWon} monedas`,
    "success"
  );

  // inputCoins.value = inputNum;
  inputCoins.value = parseInt(numCoinsElement.innerHTML);
  numCoinsElement.innerHTML = 0;
  btnInCoins.disabled = false;
  inputCoins.disabled = false;
  movementsHistorical("Sacas todas las monedas.");
};

lever.onclick = () => {
  
  const cardsToGetResult = [];

  lever.src = "./assets/img/palancaDOWN.png";

  if (numCoinsElement.innerHTML <= 0) {
    swal("Insuficientes monedas", "Por favor, introduce monedas", "error");
    lever.src = "./assets/img/palancaUP.png";
    return;
  } else {
    turnLeftCoin();
  }

  for (let i = 0; i < 3; i++) {
    let num = Math.floor(Math.random() * 10);
    imgCards[i].src = `./assets/img/${listImages[num]}.png`;
    cardsToGetResult.push(listImages[num]);
  }

  setTimeout(() => {
    lever.src = "./assets/img/palancaUP.png";
  }, 500);
  movementsHistorical("Gastas una moneda");
  earningsConditions(cardsToGetResult);
  if (numCoinsElement.innerHTML == 0) {
    btnInCoins.disabled = false;
    inputCoins.disabled = false;
  }
};

const movementsHistorical = (moves) => {
  const move = document.createElement("li");
  const lastLiAdded = document.getElementsByTagName("li")[0];
  move.innerText = moves;
  placeForMoves.insertBefore(move, lastLiAdded);
};
