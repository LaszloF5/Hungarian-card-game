let playerGameTable = document.querySelector(".js-player-table");
let computerGameTable = document.querySelector(".js-computer-table");
let dataField = document.querySelector(".js-datas");
let gameField = document.querySelector(".js-gamefield");

let playerCards = [];
let playerKeys = [];
let computerCards = [];
let computerKeys = [];

// Buttons
let startButton = document.querySelector(".js-start-button");

const deck = [
  [{ L2: '<img src=".//card-images//cards-medium//leaf-unter.png" alt="L2">' }],
  [{ L3: '<img src=".//card-images//cards-medium//leaf-ober.png" alt="L3">' }],
  [{ L4: '<img src=".//card-images//cards-medium//leaf-king.png" alt="L4">' }],
  [{ L7: '<img src=".//card-images//cards-medium//leaf-seven.png" alt="L7">' }],
  [{ L8: '<img src=".//card-images//cards-medium//leaf-eight.png" alt="L8">' }],
  [{ L9: '<img src=".//card-images//cards-medium//leaf-nine.png" alt="L9">' }],
  [{ L10: '<img src=".//card-images//cards-medium//leaf-ten.png" alt="L10">' }],
  [{ L11: '<img src=".//card-images//cards-medium//leaf-ace.png" alt="L11">' }],

  [
    {
      H2: '<img src=".//card-images//cards-medium//heart-unter.png" alt="H2">',
    },
  ],
  [{ H3: '<img src=".//card-images//cards-medium//heart-ober.png" alt="H3">' }],
  [{ H4: '<img src=".//card-images//cards-medium//heart-king.png" alt="H4">' }],
  [
    {
      H7: '<img src=".//card-images//cards-medium//heart-seven.png" alt="H7">',
    },
  ],
  [
    {
      H8: '<img src=".//card-images//cards-medium//heart-eight.png" alt="H8">',
    },
  ],
  [{ H9: '<img src=".//card-images//cards-medium//heart-nine.png" alt="H9">' }],
  [
    {
      H10: '<img src=".//card-images//cards-medium//heart-ten.png" alt="H10">',
    },
  ],
  [
    {
      H11: '<img src=".//card-images//cards-medium//heart-ace.png" alt="H11">',
    },
  ],

  [
    {
      A2: '<img src=".//card-images//cards-medium//acorn-unter.png" alt="A2">',
    },
  ],
  [{ A3: '<img src=".//card-images//cards-medium//acorn-ober.png" alt="A3">' }],
  [{ A4: '<img src=".//card-images//cards-medium//acorn-king.png" alt="A4">' }],
  [
    {
      A7: '<img src=".//card-images//cards-medium//acorn-seven.png" alt="A7">',
    },
  ],
  [
    {
      A8: '<img src=".//card-images//cards-medium//acorn-eight.png" alt="A8">',
    },
  ],
  [{ A9: '<img src=".//card-images//cards-medium//acorn-nine.png" alt="A9">' }],
  [
    {
      A10: '<img src=".//card-images//cards-medium//acorn-ten.png" alt="A10">',
    },
  ],
  [
    {
      A11: '<img src=".//card-images//cards-medium//acorn-ace.png" alt="A11">',
    },
  ],

  [{ B2: '<img src=".//card-images//cards-medium//bell-unter.png" alt="B2">' }],
  [{ B3: '<img src=".//card-images//cards-medium//bell-ober.png" alt="B3">' }],
  [{ B4: '<img src=".//card-images//cards-medium//bell-king.png" alt="B4">' }],
  [{ B7: '<img src=".//card-images//cards-medium//bell-seven.png" alt="B7">' }],
  [{ B8: '<img src=".//card-images//cards-medium//bell-eight.png" alt="B8">' }],
  [{ B9: '<img src=".//card-images//cards-medium//bell-nine.png" alt="B9">' }],
  [{ B10: '<img src=".//card-images//cards-medium//bell-ten.png" alt="B10">' }],
  [{ B11: '<img src=".//card-images//cards-medium//bell-ace.png" alt="B11">' }],
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

//Pakli keverése

//Pakliból kártyalapok kivétele
function dealCard(deck) {
  return deck.shift()[0];
}

// Játékasztal frissítése függvény (player, computer)
function updateGameTable(cards, gameTable) {
  gameTable.innerHTML = "";
  cards.forEach((card) => {
    const cardHtml = Object.values(card)[0]; //imgs
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
  return cards.map((card) => Object.keys(card)[0]); //Object.keys -> Visszaadja minden objektum kulcsát [0] <= Minden objektum 1. kulcsát
}

function startGame() {
  shuffleDeck(deck); // Pakli keverése
  dealCardsForPlayerAndComputer(); // Lapok kiosztása
  playerKeys = getCardKeys(playerCards); // Játékos lapjainak az értékének visszaadása
  computerKeys = getCardKeys(computerCards); // Computer lapjainak az értékének visszaadása
  renderDatas();
  isDisabled();
  console.log("playerCards", playerCards);
  console.log(computerCards);
  console.log(playerKeys);
  console.log(computerKeys);
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

playerGameTable.addEventListener('click', (event) => {
  debugger;
  if (event.target.tagName === 'IMG') { //A tagName egy adott DOM elem HTML tagjának nevét adja vissza. Jelen esetben a playerGameTable-ben szereplőkét.
    gameField.appendChild(event.target)
    let imgSrc = event.target.src; // A target src attribútumát nyerjük ki
    let index = playerCards.indexOf(imgSrc); // Az indexOf megkeresi az adott elem első előfordulási indexét a tömbben. 0 vagy nagyobb az index, akkor tartalmazza, ha -1 akkor nem
    if (index > -1) {
      playerCards.splice(index, 1) // index = A pozíció ahonnan az elemet el akarjuk távolítani, 1 = Az eltávolítani kívánt elemek száma.
    }
  }
})

// https://sentry.io/answers/remove-specific-item-from-array/
