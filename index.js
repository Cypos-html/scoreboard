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

// 1. Aktivace po první interakci uživatele (např. kliknutí kamkoliv na stránku)
document.addEventListener('click', () => {
  if (!wakeLock) {
    requestWakeLock();
  }
}, { once: true });

// 2. Opětovná aktivace při návratu na záložku
document.addEventListener('visibilitychange', async () => {
  if (wakeLock !== null && document.visibilityState === 'visible') {
    await requestWakeLock();
  }
});
