let wakeLock = null;

// Funkce pro žádost o zhasnutí/rozsvícení
async function requestWakeLock() {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    console.log('Screen Wake Lock je aktivní');

    // Detekce případného uvolnění zamknutí systémem
    wakeLock.addEventListener('release', () => {
      console.log('Screen Wake Lock byl uvolněn');
    });
  } catch (err) {
    console.error(`Chyba Wake Lock (${err.name}): ${err.message}`);
  }
}

// Aktivace po první interakci uživatele (např. kliknutí kamkoliv na stránku)
document.addEventListener('click', () => {
  if (!wakeLock) {
    requestWakeLock();
  }
}, { once: true });

// Opětovná aktivace při návratu na záložku
document.addEventListener('visibilitychange', async () => {
  if (wakeLock !== null && document.visibilityState === 'visible') {
    await requestWakeLock();
  }
});

let homescore = 0;
let awayscore = 0;
let history = [];

function homeTeamScore() {
  if ("vibrate" in navigator) {
    navigator.vibrate(50);
  }

  homescore++;
  history.push("home");
  updateScore();
  updateUndoButton();

  console.log("Home team score: " + homescore);
}
function awayTeamScore() {
  if ("vibrate" in navigator) {
    navigator.vibrate(50);
  }

  awayscore++;
  history.push("away");
  updateScore();
  updateUndoButton();

  console.log("Away team score: " + awayscore);
}

function updateUndoButton() {
  let backButton = document.getElementById("backButton");
  let resetButton = document.getElementById("resetButton");
  let infoText = document.getElementById("infoText");

  if (history.length === 0) {
    backButton.style.display = "none";
    resetButton.style.display = "none";
    infoText.style.display = "block";
  } else {
    backButton.style.display = "block";
    resetButton.style.display = "block";
    infoText.style.display = "none";
  }
}

function resetScore() {
  if ("vibrate" in navigator) {
    navigator.vibrate(50);
  }

  homescore = 0;
  awayscore = 0;
  history = [];
  updateUndoButton();

  document.getElementById("homescore").innerHTML = homescore;
  document.getElementById("awayscore").innerHTML = awayscore;

  console.log("Home team score: " + homescore);
  console.log("Home team score: " + awayscore);
  console.log(history)
}

function back() {
  if ("vibrate" in navigator) {
    navigator.vibrate(50);
  }

  let lastAction = history.pop();

  if (lastAction === "home") {
    homescore--;
  }

  if (lastAction === "away") {
    awayscore--;
  }

  updateScore();
  updateUndoButton();

  console.log(lastAction)
  console.log(history)
}

function updateScore() {
  document.getElementById("homescore").innerHTML = homescore;
  document.getElementById("awayscore").innerHTML = awayscore;
}

function updateClock() {
  const now = new Date();

  document.getElementById("clock").textContent =
    now.toLocaleTimeString("cs-CZ", {
      hour: "2-digit",
      minute: "2-digit",
    });
}

updateClock();

setInterval(updateClock, 1000);
