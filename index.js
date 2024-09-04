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
let playerPassButton = document.querySelector(".js-player-pass-button");

let tempCardholder = [];
let tempAnswer = "";

let deck = [
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

function deepCopyDeck(deck) {
  return deck.map((cardArray) =>
    cardArray.map((cardObj) => Object.assign({}, cardObj))
  );
}

let copiedDeck = deepCopyDeck(deck);

// Adatok megjelenítése
function renderDatas() {
  dataField.innerHTML = `
       <li>Player pontszerző lapok száma: ${playerPoints}</li>
       <li>Player megszerzett lapok száma: ${playerOwnedCards}</li>
       <li>Computer pontszerző lapok száma: ${computerPoints}</li>
       <li>Computer megszerzett lapok száma: ${computerOwnedCards}</li>
       <li>Pakliban lévő lapok száma: ${deck.length}</li>
        <li>Player lapjainak az értéke: ${playerKeys} </li>
  <li>Computer lapjainak az értéke: ${computerKeys} </li>
<li>Asztalon lévő lapok értéke: ${tempCardholder}</li>
       ;`;
  isDisabledPassBtn();
}

function toTheBaseState() {
  playerCards = [];
  computerCards = [];
  playerKeys = [];
  computerKeys = [];
  playerPoints = 0;
  computerPoints = 0;
  playerOwnedCards = 0;
  computerOwnedCards = 0;
  deck = copiedDeck;
  tempCardholder = [];
  renderDatas();
}

/*
  A renderDaras-ból ezek kerülnek kivételre:
  <li>Player lapjainak az értéke: ${playerKeys} </li>
  <li>Computer lapjainak az értéke: ${computerKeys} </li>
*/
function renderAfterRound() {
  gameField.innerHTML = "";
  dealCardsForPlayerAndComputer();
  tempCardholder = [];
  tempAnswer = "";
  playerKeys = getCardKeys(playerCards).flat();
  computerKeys = getCardKeys(computerCards).flat();
  renderDatas();
}

// Start button kezelése (disabled)
function isDisabled() {
  if (deck.length === 32) {
    startButton.style.visibility = "visible";
  } else {
    startButton.style.visibility = "hidden";
  }
}

//Player pass btn kezelése

function isDisabledPassBtn() {
  if (playerCards.length === 4) {
    playerPassButton.disabled = true;
  } else {
    playerPassButton.disabled = false;
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
  if (deck.length > 0) {
    return deck.shift()[0];
  } else {
    return null;
  }
}

// Játékasztal frissítése függvény (player, computer)
function updateGameTable(cards, gameTable) {
  gameTable.innerHTML = "";
  cards.forEach((card) => {
    //TODO: Átírni for ciklusra.
    const cardHtml = Object.values(card); //imgs // A playerCards egy szájbak*rt tömb!
    gameTable.innerHTML += cardHtml;
  });
}

// Játékosok lapjainak kiosztása
function dealCardsForPlayerAndComputer() {
  while (
    deck.length > 0 &&
    (playerCards.length < 4 || computerCards.length < 4)
  ) {
    if (playerCards.length < 4) {
      let dealtPlayerCard = dealCard(deck);
      if (dealtPlayerCard !== null) {
        playerCards.push(dealtPlayerCard);
      }
    }
    if (computerCards.length < 4) {
      let dealtComputerCard = dealCard(deck);
      if (dealtComputerCard !== null) {
        computerCards.push(dealtComputerCard);
      }
    }
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
            if (computerCards.length < 4) {
              gameField.appendChild(event.target);
              processPlayerCard(selectedAlt);
              resolve();
            }
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
        playerCurrentKey = Number(selectedAlt.slice(1)).toString();
        tempCardholder.push(playerCurrentKey);
        playerKeys.splice(index, 1);
      }

      renderDatas();
      playerGameTable.removeEventListener("click", handleClick);
      playerGameTable.classList.remove("sign");
    }

    playerGameTable.addEventListener("click", handleClick);
    setTimeout(() => {
      playerGameTable.classList.add("sign");
    }, 1000); // Ez lehet túl nagy gap.
  });
}

function computerManageCards() {
  if (
    gameField.childElementCount !== 0 &&
    gameField.firstChild.className === "computer-card" &&
    computerCurrentKey !== playerCurrentKey &&
    playerCurrentKey !== "12"
  ) {
    return;
  }
  if (
    gameField.childElementCount === 6 &&
    gameField.lastChild.className === "computer-card"
  ) {
    return;
  }
  // Ellenőrizzük, hogy a computer nem rak le újabb lapot, ha már két lap van lent és a computeré az utolsó
  if (
    gameField.childElementCount === 2 &&
    gameField.lastChild.className === "computer-card"
  ) {
    return;
  }

  // Ha a játékos ütött, de a computernek nincs olyan lapja, amivel vissza tudná hozni a kört, futtassuk az értékelést
  if (
    gameField.childElementCount > 0 &&
    gameField.firstChild.className === "computer-card" &&
    (playerCurrentKey === gameField.firstChild.alt.slice(1) ||
      playerCurrentKey === "12") &&
    !computerKeys.includes(gameField.firstChild.alt.slice(1)) &&
    !computerKeys.includes("12")
  ) {
    return roundEvaluation();
  }

  // Ha a gameField üres, a computer random lapot választ
  if (gameField.childElementCount === 0) {
    let lowValueCards = computerKeys.filter((key) =>
      ["2", "3", "4", "8", "9"].includes(key)
    );
    let randomCardKey =
      lowValueCards.length > 0
        ? lowValueCards[Math.floor(Math.random() * lowValueCards.length)]
        : computerKeys[Math.floor(Math.random() * computerKeys.length)];

    playComputerCard(randomCardKey);
    return;
  }

  // Ha van még lap, és a computer képes játszani, akkor válasszunk megfelelő kártyát
  let validCard = findValidCard();
  if (validCard) {
    playComputerCard(validCard);
  }
}

function playComputerCard(cardKey) {
  let isContains = computerKeys.indexOf(cardKey);
  computerCurrentKey = computerKeys[isContains];
  tempCardholder.push(computerCurrentKey);
  computerKeys.splice(isContains, 1);

  let computerIndex = computerCards.findIndex(
    (card) => Object.keys(card)[0] == computerCurrentKey
  );
  if (computerIndex >= 0) {
    let cardHtml = Object.values(computerCards[computerIndex])[0];
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = cardHtml;
    let cardElement = tempDiv.firstChild;
    cardElement.classList.add("computer-card"); // Piros keret hozzáadása
    gameField.appendChild(cardElement);
    computerCards.splice(computerIndex, 1);
  }

  updateGameTable(computerCards, computerGameTable);
  renderDatas();
}

function findValidCard() {
  // Megpróbálunk találni egy lapot, amivel a computer játszhat
  let validCard = computerKeys.find(
    (key) => key === gameField.firstChild.alt.slice(1) || key === "12"
  );

  if (!validCard) {
    validCard = computerKeys.find((key) =>
      ["2", "3", "4", "8", "9"].includes(key)
    );
  }

  if (!validCard) {
    validCard = computerKeys.find((key) => ["10", "11", "12"].includes(key));
  }

  return validCard;
}

async function playerTurn() {
  // ide is beágyazásra került az a feltétel, amikor a computer kezdi a kört, és a játékosnak nincs több ütőlapja, viszont a computer reagál rá, és a játékosnak is kell.
  // playerGameTable.classList.add("sign");
  if (gameField.childElementCount !== 0) {
    if (
      gameField.firstChild.className === "computer-card" &&
      !playerKeys.includes(!gameField.firstChild.alt.slice(1)) &&
      !playerKeys.includes("12")
    ) {
      await playerManageCards();
      setTimeout(await roundEvaluation(), 2000);
      return;
    }
    // 2024.08.30. új feltétel, a word-ben felírt bug javítására.
    if (
      gameField.firstChild.className === "computer-card" &&
      (playerKeys.includes(gameField.firstChild.alt.slice(1)) ||
        playerKeys.includes("12"))
    ) {
      await playerManageCards();
      await roundEvaluation();
    }
  }
  if (deck.length === 0) {
    if (gameField.childElementCount > 0) {
      if (
        playerKeys.includes(gameField.firstChild.alt.slice(1)) ||
        playerKeys.includes("12")
      ) {
        await playerManageCards(); // biggest debug ever...
        return;
      } else {
        await playerManageCards();
        tempAnswer = "none";
        return;
      }
    }
    // Ha a pakli üres, a játékos rakott, és van ütőlapja:
    if (playerKeys.includes(playerCurrentKey) || playerKeys.includes("12")) {
      await playerManageCards();
      return;
    } else {
      // És ha nincs
      await playerManageCards();
      tempAnswer = "none";
      return;
    }
  }

  if (playerKeys.length < 4) {
    if (
      playerKeys.includes("12") ||
      playerKeys.includes(gameField.firstChild.alt.slice(1))
    ) {
      await playerManageCards();
    } else {
      if (gameField.firstChild.className === "computer-card") {
        await playerManageCards(); // Végül kiderült, hogy ide kellett plusz 1 feltétel. A lenti esettel ellentétben, itt kötelező lapot raknia a játékosnak.
        await roundEvaluation();
      } else {
        tempAnswer = "none"; // Csak akkor passzolja a kört, ha a játékos kezdte, és a computer ütötte, de nincs már ütőlapja a játékosnak.
      }
    }
  } else {
    await playerManageCards();
  }
  return tempAnswer;
}

async function computerTurn() {
  playerGameTable.classList.remove("sign");
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
  await roundEvaluation();
  return;
}

// ha a computer vitte a lapokat, vagyis ő kezdi a következő kört.
async function nextComputerRound() {
  try {
    await computerTurn();
  } catch (error) {
    console.error("Error during computerTurn:", error);
  }

  try {
    await playerTurn();
  } catch (error) {
    console.error("Error during playerTurn:", error);
  }

  try {
    await roundEvaluation();
  } catch (error) {
    console.error("Error during roundEvaluation:", error);
  }

  return;
}

/****  Kiértékelés függvények ****/

function endGame() {
  if (playerPoints > computerPoints) {
    alert("Nyertél!");
  } else if (computerPoints > playerPoints) {
    alert("A számítógép nyert!");
  } else {
    alert("Döntetlen!");
  }
}

async function roundEvaluation() {
  // aki utoljára helyezte le a kártyalapot, megmutatja, hogy melyik játékos kezdte a kört : gameField.lastChild.alt[1];
  setTimeout(() => {
    kiertekeles();
  }, 2000);
}

async function handlePlayerWins() {
  for (let i = 0; i < tempCardholder.length; ++i) {
    playerOwnedCards += 1;
    if (tempCardholder[i] >= 10 && tempCardholder[i] < 12) {
      playerPoints += 1;
    }
  }
  renderAfterRound();
  if (
    deck.length === 0 &&
    playerCards.length === 0 &&
    computerCards.length === 0
  ) {
    setTimeout(() => {
      endGame();
    }, 2000);
    setTimeout(() => {
      playerGameTable.classList.remove("sign");
      startButton.style.visibility = "visible";
      location.reload();
    }, 2500);
  } else {
    await playerTurn();
    await computerTurn();
    await roundEvaluation();
    return; // További végrehajtás megállítása!!
  }
}

async function handleComputerWins() {
  for (let i = 0; i < tempCardholder.length; ++i) {
    computerOwnedCards += 1;
    if (tempCardholder[i] >= 10 && tempCardholder[i] < 12) {
      computerPoints += 1;
    }
  }
  renderAfterRound();
  if (
    deck.length === 0 &&
    playerCards.length === 0 &&
    computerCards.length === 0
  ) {
    setTimeout(() => {
      endGame();
    }, 2000);
    setTimeout(() => {
      playerGameTable.classList.remove("sign");
      startButton.style.visibility = "visible";
      location.reload();
    }, 2500);
  } else {
    await computerTurn();
    await playerTurn();
    await roundEvaluation();
    return; // További végrehajtás megállítása!!
  }
}

async function passFunction() {
  await handleComputerWins();
}

/*********************************/

async function kiertekeles() {

  if (gameField.childElementCount === 0) {
    return;
  }
  let firstCardValue = gameField?.firstChild?.alt?.slice(1); // Az első lerakott lap értéke
  let lastCardValue = gameField?.lastChild?.alt?.slice(1);
  if (
    deck.length === 0 &&
    playerCards.length === 0 &&
    computerCards.length === 0
  ) {
    if (
      gameField.firstChild.className === "computer-card" &&
      (firstCardValue === lastCardValue || lastCardValue === "12") &&
      (playerCurrentKey === firstCardValue || playerCurrentKey === "12")
    ) {
      await handlePlayerWins();
      return;
    }
    if (
      gameField.firstChild.className !== "computerCard" &&
      (firstCardValue === lastCardValue || lastCardValue === "12") &&
      (computerCurrentKey === firstCardValue || computerCurrentKey === "12")
    ) {
      await handleComputerWins();
      return;
    }
  }

  // Azok az esetek amikor a játékosoknál kevesebb mint 4 kártyalap van, és a játékos kezd

  if (playerKeys < 3 && gameField.firstChild.className !== "computer-card") {
    if (firstCardValue !== computerCurrentKey || computerCurrentKey !== "12") {
      handlePlayerWins();
      return;
    } else if (
      firstCardValue === computerCurrentKey ||
      computerCurrentKey === "12"
    ) {
      if (!computerKeys.includes(firstCardValue)) {
        handlePlayerWins();
        return;
      } else if (
        playerKeys.includes(firstCardValue) ||
        playerKeys.includes("12")
      ) {
        await nextPlayerRound();
        return;
      } else {
        handleComputerWins();
        return;
      }
    }
  }

  // Azok az esetek amikor a játékosoknál kevesebb mint 4 kártyalap van, és a computer kezd

  if (computerKeys < 3 && gameField.firstChild.className === "computer-card") {
    if (firstCardValue !== playerCurrentKey || playerCurrentKey !== "12") {
      handleComputerWins();
      return;
    } else if (
      firstCardValue === playerCurrentKey ||
      playerCurrentKey === "12"
    ) {
      if (
        computerKeys.includes(firstCardValue) ||
        computerKeys.includes("12")
      ) {
        await nextComputerRound();
        return;
      } else {
        handlePlayerWins();
        return;
      }
    }
  }

  // Azok az esetek amikor a játékos kezdi a kört:

  if (gameField.firstChild.className !== "computer-card") {
    // Első nagy feltétel
    if (
      playerCurrentKey === computerCurrentKey ||
      computerCurrentKey === "12"
    ) {
      if (playerKeys.includes(firstCardValue) || playerKeys.includes("12")) {
        await nextPlayerRound();
        return roundEvaluation();
      } else if (
        computerCurrentKey === "12" &&
        !playerKeys.includes("12") &&
        firstCardValue !== "12"
      ) {
        handleComputerWins();
        return;
      } else {
        handleComputerWins();
        return;
      }
    } else if (playerCurrentKey !== computerCurrentKey) {
      handlePlayerWins();
      return;
    }
  }

  if (gameField.firstChild.className === "computer-card") {
    // Második nagy feltétel
    if (computerCurrentKey === playerCurrentKey || playerCurrentKey === "12") {
      if (computerKeys.includes(firstCardValue)) {
        await nextComputerRound();
        return roundEvaluation();
      } else {
        handlePlayerWins();
        return;
      }
    } else if (computerCurrentKey !== playerCurrentKey) {
      handleComputerWins();
      return;
    }
  }

  await roundEvaluation(); // Következő kör kiértékelése
}

async function startGame() {
  let currentDeck = deepCopyDeck(copiedDeck);
  deck = currentDeck;
  shuffleDeck(deck); // Pakli keverése
  dealCardsForPlayerAndComputer(); // Lapok kiosztása. Ezen belül van meghívva a updateGameTable().
  playerKeys = getCardKeys(playerCards).flat(); // Játékos lapjainak az értékének visszaadása
  computerKeys = getCardKeys(computerCards).flat(); // Computer lapjainak az értékének visszaadása
  renderDatas();
  isDisabled();
  // Első kör levezetése
  await playerTurn();
  await computerTurn();
  await roundEvaluation();
}

// Button events
// playerKeys tömbből kinyerni azt az értéket, amelyiket beraktuk a gameField-be.

startButton.addEventListener("click", startGame);
playerPassButton.addEventListener("click", passFunction);
