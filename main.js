// ===== Game State =====
const gameState = {
  player: {
    name: "",
    class: "",
    hp: 100,
    maxHp: 100,
    attack: 10,
    defense: 5,
    inventory: [],
    equipped: {
      weapon: null,
      armor: null
    }
  },
  location: "village",
  visitedLocations: ["village"],
  quests: {},
  mapUnlocked: {
    village: true
  },
  flags: {}
};

// ===== Display Engine =====
const gameDisplay = document.getElementById("game-display");

function showText(text) {
  gameDisplay.textContent = text;
}

// ===== Input System =====
let currentScene = null;

// Handle numeric key input
document.addEventListener("keydown", function (e) {
  if (["1", "2", "3"].includes(e.key)) {
    if (currentScene) currentScene(e.key);
  } else if (e.key === "Enter" && !currentScene) {
    showIntro();
  }
});

// Handle text input for name
let listeningForName = false;
let nameBuffer = "";

document.addEventListener("keypress", function (e) {
  if (!listeningForName) return;

  if (e.key === "Enter") {
    gameState.player.name = nameBuffer.trim() || "Hero";
    nameBuffer = "";
    listeningForName = false;
    showClassSelection();
  } else {
    nameBuffer += e.key;
    showText(getNameInputScreen(nameBuffer));
  }
});

// ===== Scenes =====
function showIntro() {
  showText(`
╔════════════════════════════╗
║          TEXT RPG          ║
╚════════════════════════════╝

[1] Start New Game
[2] Load Game (Not Available)
  `);
  currentScene = handleIntroInput;
}

function handleIntroInput(choice) {
  if (choice === "1") {
    showText(getNameInputScreen(""));
    listeningForName = true;
    currentScene = () => {}; // Disable numbered input for name typing
  } else {
    showText("Load game is not available. Press [1] to start.");
  }
}

function getNameInputScreen(current) {
  return `
Enter your name:
> ${current}_`;
}

function showClassSelection() {
  showText(`
Choose your class:

[1] Knight  - High HP and strong defense
[2] Mage    - High magic power, low defense
[3] Rogue   - Fast, agile, and sneaky

Your name: ${gameState.player.name}
`);
  currentScene = handleClassSelection;
}

function handleClassSelection(choice) {
  let selectedClass = "";

  if (choice === "1") selectedClass = "Knight";
  else if (choice === "2") selectedClass = "Mage";
  else if (choice === "3") selectedClass = "Rogue";
  else return;

  gameState.player.class = selectedClass;

  // Set stats based on class
  if (selectedClass === "Knight") {
    gameState.player.hp = 120;
    gameState.player.attack = 10;
    gameState.player.defense = 15;
  } else if (selectedClass === "Mage") {
    gameState.player.hp = 80;
    gameState.player.attack = 18;
    gameState.player.defense = 5;
  } else if (selectedClass === "Rogue") {
    gameState.player.hp = 100;
    gameState.player.attack = 12;
    gameState.player.defense = 8;
  }

  showText(`
╔════════════════════════════╗
║      CHARACTER CREATED     ║
╚════════════════════════════╝

Name : ${gameState.player.name}
Class: ${selectedClass}

Press [Enter] to begin your adventure...
`);
  currentScene = () => {
    showVillage();
  };
}

function showVillage() {
  showText(`
You are in your quiet village.

[1] Talk to a villager
[2] Check inventory
[3] Leave village
  `);
  currentScene = handleVillageInput;
}

function handleVillageInput(choice) {
  if (choice === "1") {
    showText("The villager says: 'Lovely day, isn't it?'");
  } else if (choice === "2") {
    const inv = gameState.player.inventory.length
      ? gameState.player.inventory.join(", ")
      : "Nothing";
    showText(`Inventory: ${inv}`);
  } else if (choice === "3") {
    showText("You can't leave the village yet. The gate is locked.");
  }
}
