let wakeLock = null;

async function keepScreenOn() {
    try {
        wakeLock = await navigator.wakeLock.request("screen");
        console.log("Displej zůstane zapnutý");
    } catch (err) {
        console.log("Wake Lock se nepodařilo aktivovat:", err);
    }
}

keepScreenOn();
