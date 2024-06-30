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
       <li>Computer pontszerző lapok száma: ${computerPoints}</li>
       <li>Computer megszerzett lapok száma: ${computerOwnedCards}</li>
       <li>Pakliban lévő lapok száma: ${deck.length}</li>
        <li>Player lapjainak az értéke: ${playerKeys} </li>
  <li>Computer lapjainak az értéke: ${computerKeys} </li>
<li>Asztalon lévő lapok értéke: ${tempCardholder}</li>
       `;
  isDisabledPassBtn();
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
    startButton.disabled = false;
  } else {
    startButton.disabled = true;
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
    //TODO: Átírni for ciklussá.
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
      // else {
      //   alert("Hiba!");
      // }
      renderDatas();
      playerGameTable.removeEventListener("click", handleClick);
    }

    playerGameTable.addEventListener("click", handleClick);
  });
}

function computerManageCards() { 
  if (gameField.childElementCount === 2) {
    if (gameField.firstChild.className === "computer-card" && gameField.childElementCount === 2 && !computerKeys.includes(gameField.firstChild.alt.slice(1))) {
      return false; // Ez a feltétel segít a pass - button helyes működésében !! 
  }
}
  let isContains = computerKeys.indexOf(playerCurrentKey.toString());
  // Új eset: Ha a computer kezdett, és ütőlapot tett le a játékos, viszont a computernek már nincs olyan lapja amivel lehozhatná a kört.
  if (gameField.childElementCount > 0) {
    if (
      gameField.firstChild.className === "computer-card" &&
      (playerCurrentKey === gameField.firstChild.alt.slice(1) ||
        playerCurrentKey === "12")
    ) {
      if (
        !computerKeys.includes(gameField.firstChild.alt.slice(1)) &&
        !computerKeys.includes("12")
      ) {
        return roundEvaluation();
      } else {
        // Meg kell írni, hogy ilyenkor csak olyan lapot rakhasson le ami az első lap, vagy 7-est. itt: 12-es.
        let exactValue = computerKeys.filter(
          (key) => key === gameField.firstChild.alt.slice(1)
        );
        let jokerValue = computerKeys.filter((key) => key === "12");
        if (exactValue.length > 0 || jokerValue.length > 0) {
          if (exactValue.length === 0) {
            exactValue = jokerValue;
          }
          isContains = computerKeys.findIndex((exactValue) =>
            computerKeys.includes(exactValue)
          );
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
            let cardElement = tempDiv.firstChild;
            cardElement.classList.add("computer-card"); // Piros keret hozzáadása
            gameField.appendChild(cardElement);
            computerCards.splice(computerIndex, 1);
            return;
          }
        }
      }
    }
  } else {
    // Ha a gameField.childElementCount === 0, akkor a computer egy random lapot választ
    let lowValueCards = computerKeys.filter((key) =>
      ["2", "3", "4", "8", "9"].includes(key)
    );
    let randomCardKey;

    if (lowValueCards.length > 0) {
      randomCardKey =
        lowValueCards[Math.floor(Math.random() * lowValueCards.length)];
    } else {
      randomCardKey =
        computerKeys[Math.floor(Math.random() * computerKeys.length)];
    }

    isContains = computerKeys.indexOf(randomCardKey);
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
      let cardElement = tempDiv.firstChild;
      cardElement.classList.add("computer-card"); // Piros keret hozzáadása
      gameField.appendChild(cardElement);
      computerCards.splice(computerIndex, 1);
      return;
    }
  }

  // Speciális eset: Ha a játékos értékes lapot rak le, megvizsgáljuk, hogy a computer legalább 2 ugyanolyan értékes lappal rendelkezik-e.
  // if (playerCurrentKey >= 10) {
  //   let sameValueCount = computerKeys.filter(
  //     (key) => key === playerCurrentKey.toString()
  //   ).length;
  //   if (sameValueCount >= 2) {
  //     //  || computerKeys.includes("12")
  //     isContains = computerKeys.indexOf(playerCurrentKey.toString());
  //     // if (isContains === -1) {
  //     //   isContains = computerKeys.indexOf("12");
  //     //}
  //     if (isContains >= 0) {
  //       computerCurrentKey = computerKeys[isContains];
  //       tempCardholder.push(computerCurrentKey);
  //       computerKeys.splice(isContains, 1);

  //       let computerIndex = computerCards.findIndex((card) => {
  //         let cardKey = Object.keys(card)[0];
  //         return cardKey == playerCurrentKey.toString();
  //       });
  //       if (computerIndex >= 0) {
  //         let cardHtml = Object.values(computerCards[computerIndex])[0];
  //         let tempDiv = document.createElement("div");
  //         tempDiv.innerHTML = cardHtml;
  //         let cardElement = tempDiv.firstChild;
  //         cardElement.classList.add("computer-card"); // Piros keret hozzáadása
  //         gameField.appendChild(cardElement);
  //         computerCards.splice(computerIndex, 1);
  //         return;
  //       }
  //     }
  //   } else if (computerKeys.includes("12")) {
  //     isContains = computerKeys.indexOf("12");
  //     computerCurrentKey = computerKeys[isContains];
  //     tempCardholder.push(computerCurrentKey);
  //     computerKeys.splice(isContains, 1);

  //     let computerIndex = computerCards.findIndex((card) => {
  //       let cardKey = Object.keys(card)[0];
  //       return cardKey = playerCurrentKey.toString(); // Itt volt 1 hiba, mert == jel volt, nem pedig = -jel.
  //     });
  //     if (computerIndex >= 0) {
  //       let cardHtml = Object.values(computerCards[computerIndex])[0];
  //       let tempDiv = document.createElement("div");
  //       tempDiv.innerHTML = cardHtml;
  //       let cardElement = tempDiv.firstChild;
  //       cardElement.classList.add("computer-card"); // Piros keret hozzáadása
  //       gameField.appendChild(cardElement);
  //       computerCards.splice(computerIndex, 1);
  //       return;
  //     }
  //   }
  // }

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
      let cardElement = tempDiv.firstChild;
      cardElement.classList.add("computer-card"); // Piros keret hozzáadása
      gameField.appendChild(cardElement);
      computerCards.splice(computerIndex, 1);
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
    if (isContains === -1) {
      const validKeys = ["2", "3", "4", "8", "9", "10", "11", "12"];
      isContains = computerKeys.findIndex((element) =>
        validWorthlessKeys.includes(element)
      );
    }
    if (isContains >= -0) {
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
        let cardElement = tempDiv.firstChild;
        cardElement.classList.add("computer-card"); // Piros keret hozzáadása
        gameField.appendChild(cardElement);
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
  // ide is beágyazásra került az a feltétel, amikor a computer kezdi a kört, és a játékosnak nincs több ütőlapja, viszont a computer reagál rá, és a játékosnak is kell.
  // if (gameField.childElementCount !== 0) {
  //   if ((gameField.firstChild.className === "computer-card" &&
  //     !playerKeys.includes(!gameField.firstChild.alt.slice(1)) &&
  //     !playerKeys.includes("12"))) {
  //       await playerManageCards();
  //   return;
  //     }
  // }
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
      playerKeys.includes(gameField.firstChild.alt.slice(1)) ||
      playerKeys.includes("12")
    ) {
      alert("Most jó helyen vagyunk! :D");
      await playerManageCards();
    } else {
      alert("Nincs ilyen lapom.");
      if (gameField.firstChild.className === "computer-card") {
        await playerManageCards(); // Végül kiderült, hogy ide kellett plusz 1 feltétel. A lenti esettel ellentétben, itt kötelező lapot raknia a játékosnak.
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
  }, 1500);
}

async function handlePlayerWins() {
  for (let i = 0; i < tempCardholder.length; ++i) {
    playerOwnedCards += 1;
    if (tempCardholder[i] >= 10 && tempCardholder[i] < 12) {
      playerPoints += 1;
    }
  }
  renderAfterRound();
  await playerTurn();
  await computerTurn();
  await roundEvaluation();
  if (
    deck.length === 0 &&
    playerKeys.length === 0 &&
    computerKeys.length === 0
  ) {
    setTimeout(() => {
      endGame();
    }, 2000);
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
  await computerTurn();
  await playerTurn();
  await roundEvaluation();
  if (
    deck.length === 0 &&
    playerKeys.length === 0 &&
    computerKeys.length === 0
  ) {
    setTimeout(() => {
      endGame();
    }, 2000);
    return; // További végrehajtás megállítása!!
  }
}

async function passFunction() {
  // A függvénynek a célja: Ha lefut, akkor a computer viszi a kört.
  // Ezt meg kell írni....
  tempAnswer = "none";
  kiertekeles();
}

/*********************************/

async function kiertekeles() {
  // Ebben a feltételben kezelve van az, hogy ha a computer lerak a játékos lapjára egy 7-est, a játékos tudjon rá reagálni.
  // Meg kell írni azokat az eseteket, hogy ha a computer rakja le az első lapot, akkor más lesz a kiértékelés.
  // 1 if ág a computer kezdésnek,
  let firstCardValue = gameField.firstChild.alt.slice(1); // Az első lerakott lap értéke
  let lastCardValue = gameField.lastChild.alt.slice(1); // Az utolsó lerakott lap értéke

  // Ha értéktelen lapra rak a player 12-es értékű lapot

  if (
    gameField.firstChild.className === "computer-card" &&
    playerCurrentKey === "12"
  ) {
    handlePlayerWins();
    return;
  }

  if (
    firstCardValue === playerCurrentKey &&
    playerCurrentKey === "12" &&
    computerCurrentKey !== firstCardValue
  ) {
    handlePlayerWins();
    return;
  }

  // Eset: Ha a player 10-est rak, a computer 11-est, a computer viszi a lapokat. Ez nem oké.
  // if (firstCardValue === playerCurrentKey && (computerCurrentKey !== playerCurrentKey || computerCurrentKey !== "12")) {
  //   alert('Vizsgáld meg.');
  //   handlePlayerWins();
  //   return;
  // }

  if (
    gameField.childElementCount >= 4 &&
    gameField.firstChild.className !== "computer-card"
  ) {
    if (
      (playerCurrentKey === "12" || playerCurrentKey === firstCardValue) &&
      (computerCurrentKey === firstCardValue || computerCurrentKey === "12") &&
      (playerKeys.includes(firstCardValue) || playerKeys.includes("12"))
    ) {
      await nextPlayerRound();
      return roundEvaluation();
    }
    if (
      (playerCurrentKey === "12" || playerCurrentKey === firstCardValue) &&
      (computerCurrentKey === firstCardValue || computerCurrentKey === "12") &&
      (!playerKeys.includes(firstCardValue) || !playerKeys.includes("12"))
    ) {
      handleComputerWins();
    }
    if (
      (playerCurrentKey === "12" || playerCurrentKey === firstCardValue) &&
      (computerCurrentKey !== firstCardValue || computerCurrentKey !== "12")
    ) {
      handlePlayerWins();
    } else {
      await nextPlayerRound();
      return roundEvaluation();
    }
  }

  if (
    gameField.childElementCount >= 4 &&
    gameField.firstChild.className !== "computer-card"
  ) {
    // Ez akkor lép életbe, ha min 4 lap van lent, a játékos kezdett, és még tudja ütni.
    if (
      ((playerCurrentKey === "12" || playerCurrentKey === firstCardValue) &&
        playerKeys.includes(firstCardValue)) ||
      (playerKeys.includes("12") &&
        (computerCurrentKey === firstCardValue || computerCurrentKey === "12"))
    ) {
      await nextPlayerRound();
      return roundEvaluation();
    }
    // Eddig tart a feltétel.

    if (
      (playerCurrentKey === "12" || playerCurrentKey === firstCardValue) &&
      (computerCurrentKey === firstCardValue || computerCurrentKey === "12") &&
      (!playerKeys.includes("12") || !playerKeys.includes(firstCardValue))
    ) {
      handleComputerWins();
      return;
    } else if (
      computerCurrentKey !== firstCardValue ||
      computerCurrentKey !== "12"
    ) {
      handlePlayerWins();
      return;
    } else {
      await nextPlayerRound();
      return roundEvaluation();
    }
  }

  // Ha a számítógép nyitott, a játékos ütötte, a számítógép is, a játékos viszont már nem tudja, szóval értéktelen lapot dob rá
  // Elvileg ezzel az utoló előtti játék bug is megvan oldva. // MEGOLDVA //
  if (
    gameField.childElementCount >= 4 &&
    gameField.firstChild.className === "computer-card"
  ) {
    // Belső feltétel
    if (
      (playerCurrentKey === firstCardValue || playerCurrentKey === "12") &&
      (computerCurrentKey === firstCardValue || computerCurrentKey === "12") &&
      computerKeys.includes("12")
    ) {
      await nextComputerRound();
      return roundEvaluation();
    }
    if (
      playerCurrentKey !== firstCardValue ||
      playerCurrentKey !== "12" ||
      !playerCards.includes(firstCardValue)
    ) {
      handleComputerWins();
      return;
    }
  }

  // Ha a számítógép nyitott, a játékos ütötte, viszont a számítógépnek nincs megfelelő lapja:

  if (
    gameField.firstChild.className === "computer-card" &&
    !computerKeys.includes(gameField.firstChild.alt.slice(1)) &&
    playerCurrentKey === gameField.firstChild.alt.slice(1)
  ) {
    handlePlayerWins();
    return;
  }

  if (
    playerCards.length === 0 &&
    computerCards.length === 0 &&
    gameField.childElementCount > 0
  ) {
    if (
      (gameField.firstChild.className === "computer-card" &&
        tempAnswer === "none") ||
      (firstCardValue === computerCurrentKey && playerCurrentKey != "12") ||
      (firstCardValue === playerCurrentKey && computerCurrentKey === "12")
    ) {
      alert("A computer viszi a lapokat.");
      handleComputerWins(); // Számítógép nyerése esetén lapok húzása és frissítés
      return;
    } else {
      alert("A játékos viszi a lapokat.");
      handlePlayerWins(); // Játékos nyerése esetén lapok húzása és frissítés
      return;
    }
  }
  if (
    playerCurrentKey === computerCurrentKey ||
    gameField.lastChild.alt.slice(1) === "12"
  ) {
    alert("Round 2");
    if (tempAnswer != "") {
      handleComputerWins();
      return; // TODO: Kiértékelésnél computer!!!!!
    }
    if (gameField.firstChild.className === "computer-card") {
      await nextComputerRound();
    } else {
      await nextPlayerRound(); // A következő kör elindítása játékos kezdéssel Itt van a hiba forrása.!!!!!!!!! NEWS: Elvileg a hibát ezzel elhárítottam.
    }
  } else {
    if (
      (firstCardValue === computerCurrentKey && playerCurrentKey != "12") ||
      (firstCardValue === playerCurrentKey && computerCurrentKey === "12")
    ) {
      alert("A computer viszi a lapokat.");
      handleComputerWins(); // Számítógép nyerése esetén lapok húzása és frissítés
      return;
    } else {
      alert("A játékos viszi a lapokat.");
      handlePlayerWins(); // Játékos nyerése esetén lapok húzása és frissítés
      return;
    }
  }

  await roundEvaluation(); // Következő kör kiértékelése
}

async function startGame() {
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
