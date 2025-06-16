document.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    document.getElementById("game-display").textContent = `
You awaken in a quiet little village...
[1] Explore the village
[2] Check your inventory
[3] Sit on a bench and do nothing
    `;
  }
});
