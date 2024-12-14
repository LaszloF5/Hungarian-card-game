let playerGameTable = document.querySelector(".js-player-table");
let computerGameTable = document.querySelector(".js-computer-table");
let dataField = document.querySelector(".js-datas");
let gameField = document.querySelector(".js-gamefield");

let playerCards = [];
let playerKeys = [];
let playerEarnedCards = [];
let playerCurrentKey = "";
let playerImgAlt = "";
let playerPoints = 0;
let playerOwnedCards = 0;

let computerCards = [];
let computerKeys = [];
let computerEarnedCards = [];
let computerCurrentKey = "";
let computerImgAlt = "";
let computerPoints = 0;
let computerOwnedCards = 0;

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

function renderDatas() {
  dataField.innerHTML = `
       <li>Number of player scorecards: ${playerPoints}</li>
       <li>Number of player earned cards: ${playerOwnedCards}</li>
       <li>Number of computer scorecards: ${computerPoints}</li>
       <li>Number of computer earned cards: ${computerOwnedCards}</li>
       <li>Number of cards in deck: ${deck.length}</li>
        <li>Value of player's cards: ${playerKeys} </li>
  <li>Value of computer's cards: ${computerKeys} </li>
<li>Value of the cards on the table: ${tempCardholder}</li>
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

function renderAfterRound() {
  gameField.innerHTML = "";
  dealCardsForPlayerAndComputer();
  tempCardholder = [];
  tempAnswer = "";
  playerKeys = getCardKeys(playerCards).flat();
  computerKeys = getCardKeys(computerCards).flat();
  renderDatas();
}

// Start button management (disabled)
function isDisabled() {
  if (deck.length === 32) {
    startButton.style.visibility = "visible";
  } else {
    startButton.style.visibility = "hidden";
  }
}

//Player pass button management

function isDisabledPassBtn() {
  if (playerCards.length === 4) {
    playerPassButton.disabled = true;
  } else {
    playerPassButton.disabled = false;
  }
}

// Deck shuffling function
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Removing card(s) from the deck
function dealCard(deck) {
  if (deck.length > 0) {
    return deck.shift()[0];
  } else {
    return null;
  }
}

// Game table update function (player, computer)
function updateGameTable(cards, gameTable) {
  gameTable.innerHTML = "";
  cards.forEach((card) => {
    //TODO: Átírni for ciklusra.
    const cardHtml = Object.values(card); //imgs // A playerCards egy szájbak*rt tömb!
    gameTable.innerHTML += cardHtml;
  });
}

// Distribution of cards to players
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

// Extracting the keys of the cards
function getCardKeys(cards) {
  return cards.map((card) => Object.keys(card));
}

// Player chooses a card and places it on the table

function playerManageCards() {
  return new Promise((resolve) => {
    function handleClick(event) {
      if (event.target.tagName === "IMG") {
        let selectedAlt = event.target.alt;
        let selectedKey = Number(selectedAlt.slice(1));

        if (gameField.childElementCount === 0) {

          gameField.appendChild(event.target);
          processPlayerCard(selectedAlt);
          resolve();
        } else {
          let firstCardAlt = gameField.firstChild.alt;
          let firstCardKey = Number(firstCardAlt.slice(1));

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
    }, 1000);
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

  if (
    gameField.childElementCount === 2 &&
    gameField.lastChild.className === "computer-card"
  ) {
    return;
  }

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
    cardElement.classList.add("computer-card");
    gameField.appendChild(cardElement);
    computerCards.splice(computerIndex, 1);
  }

  updateGameTable(computerCards, computerGameTable);
  renderDatas();
}

function findValidCard() {
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
        await playerManageCards();
        return;
      } else {
        await playerManageCards();
        tempAnswer = "none";
        return;
      }
    }

    if (playerKeys.includes(playerCurrentKey) || playerKeys.includes("12")) {
      await playerManageCards();
      return;
    } else {
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
        await playerManageCards(); 
        await roundEvaluation();
      } else {
        tempAnswer = "none";
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

async function nextPlayerRound() {
  await playerTurn();
  if (tempAnswer == "") {
    await computerTurn();
  }
  await roundEvaluation();
  return;
}

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
    return;
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
    return;
  }
}

async function passFunction() {
  await handleComputerWins();
}

async function kiertekeles() {
  if (gameField.childElementCount === 0) {
    return;
  }
  let firstCardValue = gameField?.firstChild?.alt?.slice(1);
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

  // Cases where players have less than 4 cards and the player starts

  if (
    playerKeys.length < 3 &&
    gameField.firstChild.className !== "computer-card"
  ) {
    if (firstCardValue !== computerCurrentKey && computerCurrentKey !== "12") {
      handlePlayerWins();
      return;
    } else if (
      firstCardValue === computerCurrentKey ||
      computerCurrentKey === "12"
    ) {
      if (playerKeys.includes(firstCardValue) || playerKeys.includes("12")) {
        await nextPlayerRound();
        return;
      } else if (
        !playerKeys.includes(firstCardValue) &&
        !playerKeys.includes("12")
      ) {
        handleComputerWins();
        return;
      }
    }
  }

  // Cases where players have less than 4 cards, and the computer starts

  if (
    computerKeys.length < 3 &&
    gameField.firstChild.className === "computer-card"
  ) {
    if (firstCardValue !== playerCurrentKey && playerCurrentKey !== "12") {
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

  // The cases when the player starts the round

  if (gameField.firstChild.className !== "computer-card") {
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

  await roundEvaluation();
}

async function startGame() {
  let currentDeck = deepCopyDeck(copiedDeck);
  deck = currentDeck;
  shuffleDeck(deck);
  dealCardsForPlayerAndComputer();
  playerKeys = getCardKeys(playerCards).flat();
  computerKeys = getCardKeys(computerCards).flat();
  renderDatas();
  isDisabled();
  await playerTurn();
  await computerTurn();
  await roundEvaluation();
}

startButton.addEventListener("click", startGame);
playerPassButton.addEventListener("click", passFunction);
