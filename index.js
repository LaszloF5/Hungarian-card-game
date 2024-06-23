let playerGameTable = document.querySelector(".js-player-table");
let computerGameTable = document.querySelector(".js-computer-table");
let dataField = document.querySelector(".js-datas");
let gameField = document.querySelector(".js-gamefield");

let playerCards = []; // játékos lapjai
let playerKeys = []; // computer lapjai
let playerEarnedCards = []; // játékos megszerzett lapok
let playerCurrentKey = "";

let computerCards = []; // játékos lap értékei
let computerKeys = []; // computer lap értékei
let computerEarnedCards = []; // computer megszerzett lapok
let computerCurrentKey = "";

// Buttons
let startButton = document.querySelector(".js-start-button");

const deck = [
  [{ 2: '<img src=".//card-images//cards-medium//leaf-unter.png" alt="L2">' }],
  [{ 3: '<img src=".//card-images//cards-medium//leaf-ober.png" alt="L3">' }],
  [{ 4: '<img src=".//card-images//cards-medium//leaf-king.png" alt="L4">' }],
  [{ 7: '<img src=".//card-images//cards-medium//leaf-seven.png" alt="L7">' }],
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
      7: '<img src=".//card-images//cards-medium//heart-seven.png" alt="H7">',
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
      7: '<img src=".//card-images//cards-medium//acorn-seven.png" alt="A7">',
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
  [{ 7: '<img src=".//card-images//cards-medium//bell-seven.png" alt="B7">' }],
  [{ 8: '<img src=".//card-images//cards-medium//bell-eight.png" alt="B8">' }],
  [{ 9: '<img src=".//card-images//cards-medium//bell-nine.png" alt="B9">' }],
  [{ 10: '<img src=".//card-images//cards-medium//bell-ten.png" alt="B10">' }],
  [{ 11: '<img src=".//card-images//cards-medium//bell-ace.png" alt="B11">' }],
];

let gameTable = document.querySelector(".js-game-table");

// Adatok megjelenítése
function renderDatas() {
  dataField.innerHTML = `
       <li>Player pontszerző lapok száma: </li>
       <li>Player lapjainak az értéke: ${playerKeys} </li>
       <li>Computer pontszerző lapok száma: </li>
       <li>Computer lapjainak az értéke: ${computerKeys} </li>
       <li>Pakliban lévő lapok száma: ${deck.length}</li>
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

function playerManageCards() {
  return new Promise((resolve) => {
    function handleClick(event) {
      if (event.target.tagName === "IMG") {
        //A tagName egy adott DOM elem HTML tagjának nevét adja vissza. Jelen esetben a playerGameTable-ben szereplőkét.
        gameField.appendChild(event.target);
        let imgAlt = event.target.alt;
        let index = playerCards.findIndex((card) => {
          let cardHtml = Object.values(card)[0];
          return cardHtml.includes(imgAlt);
        });
        if (index > -1) {
          playerCards.splice(index, 1);
          updateGameTable(playerCards, playerGameTable);
          let myIndex = playerKeys.findIndex((key) => key == imgAlt);
          playerCurrentKey = Number(imgAlt.slice(1)); // pl.: imgAlt = H2 => Number(2) az eredmény. (vagy imgAlt.substring(1),de ezt is át kell alakítani Number-típussá)
          console.log(typeof playerCurrentKey);
          playerKeys.splice(myIndex, 1); // Ezt eltárolni, mert ezzel kell összehasonlítani a computer lapját!!!!!!!!!!!!
          console.log("playerKeys:", playerKeys); // Ezt később törölni !!
        } else {
          alert("Hiba!");
        }
        renderDatas();
        playerGameTable.removeEventListener("click", handleClick); // Eseményfigyelő eltávolítása
        resolve(); // A Promise teljesítése
      }
    }

    playerGameTable.addEventListener("click", handleClick);
  });
}

function computerManageCards() {
  // A computerKeys tartalmazza-e a playerCurrentKey értékét?
  let isContains = computerKeys.indexOf(playerCurrentKey.toString());
  if (isContains >= 0) {
    // Ebben az esetben van olyan lapja, amit a játékos lerakott, vagyis ezt a lapot kell raknia a computernek.
    computerCurrentKey = computerKeys[isContains];
    computerKeys.splice(isContains, 1); // a computerKeys tömbből eltávolítva.
    let computerIndex = computerCards.findIndex((card) => {
      // Keresés a computerCards tömbben az adott kártya alapján
      let cardKey = Object.keys(card)[0];
      return cardKey == playerCurrentKey;
    });
    if (computerIndex >= 0) {
      let cardHtml = Object.values(computerCards[computerIndex])[0]; // computerCards tömb computerIndex-en található objektum értékét adja vissza.
      let tempDiv = document.createElement("div");
      tempDiv.innerHTML = cardHtml;
      gameField.appendChild(tempDiv.firstChild);
      computerCards.splice(computerIndex, 1); // kártya eltávolítása a computerCards tömbből.
    } else {
      alert("Hiba!");
    }
  } else {
    const validWorthlessKeys = ["2", "3", "4", "8", "9"];
    let isContains = computerKeys.findIndex((element) => validWorthlessKeys.includes(element));
    if (isContains == -1) {
      const validWorthKeys = ["7", "10", "11"];
      isContains = computerKeys.findIndex((element) => validWorthKeys.includes(element));
    }
    if (isContains >= 0) {
      computerCurrentKey = computerKeys[isContains];
      computerKeys.splice(isContains, 1);
      let computerIndex = computerCards.findIndex((card) => {
        // Keresés a computerCards tömbben az adott kártya alapján
        let cardKey = Object.keys(card)[0];
        return cardKey == computerCurrentKey;
      });
      if (computerIndex >= 0) {
        let cardHtml = Object.values(computerCards[computerIndex])[0]; // computerCards tömb computerIndex-en található objektum értékét adja vissza.
        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = cardHtml;
        gameField.appendChild(tempDiv.firstChild);
        computerCards.splice(computerIndex, 1); // kártya eltávolítása a computerCards tömbből.
      } else {
        alert("Hiba!");
      }
    }
  }
  updateGameTable(computerCards, computerGameTable);
  renderDatas();
}

async function playerTurn() {
  await playerManageCards();
}

async function computerTurn() {
  setTimeout(() => {
    computerManageCards();
  }, 1000);
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
}

/* 
    TODO: Egy függvény, ami folyamatosan frissíti a lapokat, és a hozzájuk tartozó értékeket!
    Klikkesemény létrehozása, melynek hatására az adott kártyalap elmozdul, az érték pedig a ...Keys tömbből eltávolodik.(renderelni kell a Cards tömb alapján) Az eseményfigyelőt a konténerre kell tenni, és this-el kell elérni a kártyalapokat.
    Ezt követően kiértékelés következik kulcs alapján. Lerakott lap kulcsa megtalálható-e az computerKeys tömbben. 
*/

/*
playerCards;
playerKeys;
computerCards;
computerKeys
 */

// Button events

startButton.addEventListener("click", startGame);

// playerKeys tömbből kinyerni azt az értéket, amelyiket beraktuk a gameField-be.

// https://sentry.io/answers/remove-specific-item-from-array/
