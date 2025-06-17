// ===== gameState object =====
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
  quests: {
    "firstQuest": "not-started"
  },
  mapUnlocked: {
    "village": true,
    "forest": false,
    "cave": false
  },
  flags: {}
};

// ===== Display Engine =====
const gameDisplay = document.getElementById("game-display");

function showText(text) {
  gameDisplay.textContent = text;
}

// ===== Scene Functions =====
function showIntro() {
  showText(`
Welcome to ASCII Fantasy RPG!

[1] Start a new game
[2] Load game (not available)
`);
  currentScene = handleIntroInput;
}

function showClassSelection() {
  showText(`
Choose your class:

[1] Knight  (High HP, strong attacks)
[2] Mage    (Spells, powerful magic)
[3] Rogue   (Fast and sneaky)
`);
  currentScene = handleClassSelection;
}

function showVillage() {
  showText(`
You are in the peaceful village.

[1] Talk to a villager
[2] Check inventory
[3] Leave village
`);
  currentScene = handleVillageInput;
}

// ===== Input Handling =====
let currentScene = null;

document.addEventListener("keydown", function (e) {
  if (e.key === "1" || e.key === "2" || e.key === "3") {
    if (currentScene) currentScene(e.key);
  } else if (e.key === "Enter" && !currentScene) {
    showIntro();
  }
});

// ===== Scene Handlers =====
function handleIntroInput(choice) {
  if (choice === "1") {
    showText("Enter your name:");
    currentScene = handleNameInput;
    listeningForName = true;
  } else {
    showText("That option doesn't work yet.");
  }
}

let listeningForName = false;
let nameBuffer = "";

function handleNameInput(e) {
  // This is a dummy handler to satisfy scene system
}

document.addEventListener("keypress", function (e) {
  if (!listeningForName) return;

  if (e.key === "Enter") {
    gameState.player.name = nameBuffer.trim() || "Hero";
    nameBuffer = "";
    listeningForName = false;
    showClassSelection();
  } else {
    nameBuffer += e.key;
    showText(`Enter your name: ${nameBuffer}`);
  }
});

function handleClassSelection(choice) {
  let selectedClass = "";

  if (choice === "1") selectedClass = "Knight";
  else if (choice === "2") selectedClass = "Mage";
  else if (choice === "3") selectedClass = "Rogue";
  else return;

  gameState.player.class = selectedClass;
  showText(`Welcome, ${gameState.player.name} the ${selectedClass}!\n\nPress [Enter] to continue...`);
  currentScene = () => {
    showVillage();
  };
}

function handleVillageInput(choice) {
  if (choice === "1") {
    showText("Villager: Nice weather, huh?");
  } else if (choice === "2") {
    const inv = gameState.player.inventory.length
      ? gameState.player.inventory.join(", ")
      : "Nothing";
    showText(`Inventory: ${inv}`);
  } else if (choice === "3") {
    showText("You can't leave yet. The forest gate is locked.");
  }
}

