let playerGameTable = document.querySelector(".js-player-table");
let computerGameTable = document.querySelector(".js-computer-table");
let dataField = document.querySelector(".js-datas");
let gameField = document.querySelector(".js-gamefield");

let playerCards = []; // játékos lapjai
let playerKeys = []; // computer lapjai
let playerEarnedCards = []; // játékos megszerzett lapok
let playerCurrentKey = "";
let playerImgAlt = "";
let playerPoints = 0;
let playerOwnedCards = 0;

let computerCards = []; // játékos lap értékei
let computerKeys = []; // computer lap értékei
let computerEarnedCards = []; // computer megszerzett lapok
let computerCurrentKey = "";
let computerImgAlt = "";
let computerPoints = 0;
let computerOwnedCards = 0;

// Buttons
let startButton = document.querySelector(".js-start-button");
let tempCardholder = [];
let tempAnswer = "";

const deck = [
  [{ 2: '<img src=".//card-images//cards-medium//leaf-unter.png" alt="L2">' }],
  [{ 3: '<img src=".//card-images//cards-medium//leaf-ober.png" alt="L3">' }],
  [{ 4: '<img src=".//card-images//cards-medium//leaf-king.png" alt="L4">' }],
  [
    {
      12: '<img src=".//card-images//cards-medium//leaf-seven.png" alt="L12">',
    },
  ],
  [{ 8: '<img src=".//card-images//cards-medium//leaf-eight.png" alt="L8">' }],
  [{ 9: '<img src=".//card-images//cards-medium//leaf-nine.png" alt="L9">' }],
  [{ 10: '<img src=".//card-images//cards-medium//leaf-ten.png" alt="L10">' }],
  [{ 11: '<img src=".//card-images//cards-medium//leaf-ace.png" alt="L11">' }],

  [
    {
      2: '<img src=".//card-images//cards-medium//heart-unter.png" alt="H2">',
    },
  ],
  [{ 3: '<img src=".//card-images//cards-medium//heart-ober.png" alt="H3">' }],
  [{ 4: '<img src=".//card-images//cards-medium//heart-king.png" alt="H4">' }],
  [
    {
      12: '<img src=".//card-images//cards-medium//heart-seven.png" alt="H12">',
    },
  ],
  [
    {
      8: '<img src=".//card-images//cards-medium//heart-eight.png" alt="H8">',
    },
  ],
  [{ 9: '<img src=".//card-images//cards-medium//heart-nine.png" alt="H9">' }],
  [
    {
      10: '<img src=".//card-images//cards-medium//heart-ten.png" alt="H10">',
    },
  ],
  [
    {
      11: '<img src=".//card-images//cards-medium//heart-ace.png" alt="H11">',
    },
  ],

  [
    {
      2: '<img src=".//card-images//cards-medium//acorn-unter.png" alt="A2">',
    },
  ],
  [{ 3: '<img src=".//card-images//cards-medium//acorn-ober.png" alt="A3">' }],
  [{ 4: '<img src=".//card-images//cards-medium//acorn-king.png" alt="A4">' }],
  [
    {
      12: '<img src=".//card-images//cards-medium//acorn-seven.png" alt="A12">',
    },
  ],
  [
    {
      8: '<img src=".//card-images//cards-medium//acorn-eight.png" alt="A8">',
    },
  ],
  [{ 9: '<img src=".//card-images//cards-medium//acorn-nine.png" alt="A9">' }],
  [
    {
      10: '<img src=".//card-images//cards-medium//acorn-ten.png" alt="A10">',
    },
  ],
  [
    {
      11: '<img src=".//card-images//cards-medium//acorn-ace.png" alt="A11">',
    },
  ],

  [{ 2: '<img src=".//card-images//cards-medium//bell-unter.png" alt="B2">' }],
  [{ 3: '<img src=".//card-images//cards-medium//bell-ober.png" alt="B3">' }],
  [{ 4: '<img src=".//card-images//cards-medium//bell-king.png" alt="B4">' }],
  [
    {
      12: '<img src=".//card-images//cards-medium//bell-seven.png" alt="B12">',
    },
  ],
  [{ 8: '<img src=".//card-images//cards-medium//bell-eight.png" alt="B8">' }],
  [{ 9: '<img src=".//card-images//cards-medium//bell-nine.png" alt="B9">' }],
  [{ 10: '<img src=".//card-images//cards-medium//bell-ten.png" alt="B10">' }],
  [{ 11: '<img src=".//card-images//cards-medium//bell-ace.png" alt="B11">' }],
];

let gameTable = document.querySelector(".js-game-table");
let firstCardKey = 0;

// Adatok megjelenítése
function renderDatas() {
  dataField.innerHTML = `
       <li>Player pontszerző lapok száma: ${playerPoints}</li>
       <li>Player megszerzett lapok száma: ${playerOwnedCards}</li>
       <li>Player lapjainak az értéke: ${playerKeys} </li>
       <li>Computer pontszerző lapok száma: ${computerPoints}</li>
       <li>Computer megszerzett lapok száma: ${computerOwnedCards}</li>
       <li>Computer lapjainak az értéke: ${computerKeys} </li>
       <li>Pakliban lévő lapok száma: ${deck.length}</li>
       <li>Asztalon lévő lapok értéke: ${tempCardholder}</li>
       `;
}

// Start button kezelése (disabled)
function isDisabled() {
  if (deck.length === 32) {
    startButton.disabled = false;
  } else {
    startButton.disabled = true;
  }
}

// Pakli keverő függvény
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

//Pakliból kártyalapok kivétele
function dealCard(deck) {
  return deck.shift()[0];
}

// Játékasztal frissítése függvény (player, computer)
function updateGameTable(cards, gameTable) {
  gameTable.innerHTML = ""; // Ez a 2. körtől kezdve nem lesz jó. Nem kell renderelni a gameTable-t
  cards.forEach((card) => {
    //TODO: Átírni for ciklussá.
    const cardHtml = Object.values(card); //imgs // A playerCards egy szájbak*rt tömb!
    gameTable.innerHTML += cardHtml;
  });
}

// Játékosok lapjainak kiosztása
function dealCardsForPlayerAndComputer() {
  for (let i = 0; i < 4; i += 1) {
    let dealtPlayerCard = dealCard(deck);
    playerCards.push(dealtPlayerCard);

    let dealtComputerCard = dealCard(deck);
    computerCards.push(dealtComputerCard);
  }

  updateGameTable(playerCards, playerGameTable);
  updateGameTable(computerCards, computerGameTable);
}

// A kártyák kulcsainak kinyerése
function getCardKeys(cards) {
  return cards.map((card) => Object.keys(card)); //Object.keys -> Visszaadja minden objektum kulcsát
}

// A játékos kártyát választ, és tesz az asztalra.

// TODO: A függvényben kell egy olyan módosítás, hogy ha kevesebb lapja van a játékosnak mint 4, akkor csak olyan lapot lehessen lerakni ami a kezdő lap, vagy 7-est.
function playerManageCards() {
  return new Promise((resolve) => {
    function handleClick(event) {
      if (event.target.tagName === "IMG") {
        let selectedAlt = event.target.alt;
        let selectedKey = Number(selectedAlt.slice(1));

        // Ellenőrzi, hogy van-e kártya a gameField-ben
        if (gameField.childElementCount === 0) {
          // Ha nincs kártya, bármilyen kártyát le lehet rakni
          gameField.appendChild(event.target);
          processPlayerCard(selectedAlt);
          resolve();
        } else {
          let firstCardAlt = gameField.firstChild.alt;
          let firstCardKey = Number(firstCardAlt.slice(1));

          // Ellenőrzi, hogy csak akkor engedélyezi a kártya lerakását, ha a kulcsok megegyeznek, vagy ha a kártya értéke 12
          if (selectedKey === firstCardKey || selectedKey === 12) {
            gameField.appendChild(event.target);
            processPlayerCard(selectedAlt);
            resolve();
          } else {
            alert(
              "Csak olyan értékű kártyát választhatsz, mint az első lerakott kártya vagy 12-es értékűt!"
            );
          }
        }
      }
    }

    function processPlayerCard(selectedAlt) {
      let index = playerCards.findIndex((card) => {
        let cardHtml = Object.values(card)[0];
        return cardHtml.includes(selectedAlt);
      });
      if (index > -1) {
        playerCards.splice(index, 1);
        updateGameTable(playerCards, playerGameTable);
        playerImgAlt = selectedAlt;
        playerCurrentKey = Number(selectedAlt.slice(1));
        tempCardholder.push(playerCurrentKey);
        playerKeys.splice(index, 1);
      } else {
        alert("Hiba!");
      }
      renderDatas();
      playerGameTable.removeEventListener("click", handleClick);
    }

    playerGameTable.addEventListener("click", handleClick);
  });
}

function computerManageCards() {
  let isContains = computerKeys.indexOf(playerCurrentKey.toString());
  // Speciális eset: Ha a játékos értékes lapot rak le, megvizsgáljuk, hogy a computer legalább 2 ugyanolyan értékes lappal rendelkezik-e.
  if (playerCurrentKey >= 10) {
    let sameValueCount = computerKeys.filter(
      (key) => key === playerCurrentKey.toString()
    ).length;
    if (sameValueCount >= 2) {
      isContains = computerKeys.indexOf(playerCurrentKey.toString());
      if (isContains >= 0) {
        computerCurrentKey = computerKeys[isContains];
        tempCardholder.push(computerCurrentKey);
        computerKeys.splice(isContains, 1);
        let computerIndex = computerCards.findIndex((card) => {
          let cardKey = Object.keys(card)[0];
          return cardKey == playerCurrentKey.toString();
        });
        if (computerIndex >= 0) {
          let cardHtml = Object.values(computerCards[computerIndex])[0];
          let tempDiv = document.createElement("div");
          tempDiv.innerHTML = cardHtml;
          gameField.appendChild(tempDiv.firstChild);
          computerCards.splice(computerIndex, 1);
          return;
        }
      }
    }
  }

  // A computerKeys tartalmazza-e a playerCurrentKey értékét?
  if (isContains >= 0 && firstCardKey >= 10) {
    firstCardKey = Number(firstCardAlt.slice(1));
    const validWorthKeys = ["12", "10", "11"];
    isContains = computerKeys.findIndex((element) =>
      validWorthKeys.includes(element)
    );
  }
  if (isContains >= 0) {
    computerCurrentKey = computerKeys[isContains];
    tempCardholder.push(computerCurrentKey);
    computerKeys.splice(isContains, 1);
    let computerIndex = computerCards.findIndex((card) => {
      let cardKey = Object.keys(card)[0];
      return cardKey == playerCurrentKey.toString();
    });
    if (computerIndex >= 0) {
      let cardHtml = Object.values(computerCards[computerIndex])[0];
      let tempDiv = document.createElement("div");
      tempDiv.innerHTML = cardHtml;
      gameField.appendChild(tempDiv.firstChild);
      computerCards.splice(computerIndex, 1);
    } else {
      alert("2. Hiba!");
    }
  } else {
    const validWorthlessKeys = ["2", "3", "4", "8", "9"];
    isContains = computerKeys.findIndex((element) =>
      validWorthlessKeys.includes(element)
    );
    if (isContains == -1) {
      const validWorthKeys = ["12", "10", "11"];
      isContains = computerKeys.findIndex((element) =>
        validWorthKeys.includes(element)
      );
    }
    if (isContains >= 0) {
      computerCurrentKey = computerKeys[isContains];
      tempCardholder.push(computerCurrentKey);
      computerKeys.splice(isContains, 1);
      let computerIndex = computerCards.findIndex((card) => {
        let cardKey = Object.keys(card)[0];
        return cardKey == computerCurrentKey;
      });
      if (computerIndex >= 0) {
        let cardHtml = Object.values(computerCards[computerIndex])[0];
        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = cardHtml;
        gameField.appendChild(tempDiv.firstChild);
        computerCards.splice(computerIndex, 1);
      } else {
        alert("3. Hiba!");
      }
    }
  }

  console.log("Computer selected card alt:", computerImgAlt); // Ellenőrzés céljából kiíratás, később törlésre kerül.
  updateGameTable(computerCards, computerGameTable);
  renderDatas();
}

async function playerTurn() {
  if (playerKeys.length < 4) {
    if (
      playerKeys.includes(gameField.firstChild.alt.slice(1)) ||
      playerKeys.includes("12")
    ) {
      alert("Most jó helyen vagyunk! :D");
      await playerManageCards();
    } else {
      alert("Nincs ilyen lapom.");
      tempAnswer = "none";
    }
  } else {
    await playerManageCards();
  }
  return tempAnswer;
}

async function computerTurn() {
  setTimeout(() => {
    computerManageCards();
  }, 1000);
}

// ha a játékos vitte a lapokat, vagyis ő kezdi a következő kört.
async function nextPlayerRound() {
  await playerTurn();
  if (tempAnswer == "") {
    await computerTurn();
  }
}

// ha a computer vitte a lapokat, vagyis ő kezdi a következő kört.
async function nextComputerRound() {
  await computerTurn();
  await playerTurn();
}

/****  Kiértékelés függvények ****/

function handlePlayerWins() {
  for (let i = 0; i < tempCardholder.length; ++i) {
    playerOwnedCards += 1;
    if (tempCardholder[i] >= 10 && tempCardholder[i] < 12) {
      playerPoints += 1;
    }
  }
  renderDatas();
}

function handleComputerWins() {
  for (let i = 0; i < tempCardholder.length; ++i) {
    computerOwnedCards += 1;
    if (tempCardholder[i] >= 10 && tempCardholder[i] < 12) {
      computerPoints += 1;
    }
  }
  renderDatas();
}

/*********************************/

async function kiertekeles() {
  // Ebben a feltételben kezelve van az, hogy ha a computer lerak a játékos lapjára egy 7-est, a játékos tudjon rá reagálni.
  if (
    playerCurrentKey == computerCurrentKey ||
    gameField.lastChild.alt.slice(1) === "7"
  ) {
    alert("Round 2");
    if (tempAnswer != "") {
      handleComputerWins();
      return false; // TODO: Kiértékelésnél computer!!!!!
    }
    await nextPlayerRound(); // A következő kör elindítása játékos kezdéssel
  } else {
    let firstCardValue = gameField.firstChild.alt.slice(1); // A játékos első lapjának értéke
    let lastCardValue = gameField.lastChild.alt.slice(1); // Az utolsó lerakott lap értéke
    if (
      (firstCardValue === lastCardValue || lastCardValue.slice(1) === "12") &&
      computerImgAlt === lastCardValue
    ) {
      alert("A computer viszi a lapokat.");
      handleComputerWins(); // Számítógép nyerése esetén lapok húzása és frissítés
      return false;
    } else {
      alert("A játékos viszi a lapokat.");
      handlePlayerWins(); // Játékos nyerése esetén lapok húzása és frissítés
      return false;
    }
  }
  await roundEvaluation(); // Következő kör kiértékelése
}

async function roundEvaluation() {
  // aki utoljára helyezte le a kártyalapot, megmutatja, hogy melyik játékos kezdte a kört : gameField.lastChild.alt[1];
  setTimeout(() => {
    kiertekeles();
  }, 1500);
}

async function startGame() {
  shuffleDeck(deck); // Pakli keverése
  dealCardsForPlayerAndComputer(); // Lapok kiosztása. Ezen belül van meghívva a updateGameTable().
  playerKeys = getCardKeys(playerCards).flat(); // Játékos lapjainak az értékének visszaadása
  computerKeys = getCardKeys(computerCards).flat(); // Computer lapjainak az értékének visszaadása
  renderDatas();
  isDisabled();
  console.log("playerCards", playerCards);
  console.log(computerCards);
  console.log(playerKeys);
  console.log(computerKeys);
  // Első kör levezetése
  await playerTurn();
  await computerTurn();
  await roundEvaluation();
}

/* 
    TODO: Egy függvény, ami folyamatosan frissíti a lapokat, és a hozzájuk tartozó értékeket!
    Klikkesemény létrehozása, melynek hatására az adott kártyalap elmozdul, az érték pedig a ...Keys tömbből eltávolodik.(renderelni kell a Cards tömb alapján) Az eseményfigyelőt a konténerre kell tenni, és this-el kell elérni a kártyalapokat.
    Ezt követően kiértékelés következik kulcs alapján. Lerakott lap kulcsa megtalálható-e az computerKeys tömbben. 
*/

// Button events
// playerKeys tömbből kinyerni azt az értéket, amelyiket beraktuk a gameField-be.

startButton.addEventListener("click", startGame);
