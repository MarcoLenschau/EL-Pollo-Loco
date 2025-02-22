/**
 * Toggles the fullscreen mode for the start screen overlay.
 */
function fullscreenStartScreen() {
    document.getElementById("start-overlay").classList.toggle("fullscreen-mode");
}

/**
 * Toggles fullscreen mode for the game.
 */
function fullscreen() {
    if (!fullscreenOn) {
        fullscreenOnShow();
    } else {
        fullscreenOff();
    }
}

/**
 * Enables fullscreen mode and adjusts styles accordingly.
 */
function fullscreenOnShow() {
    openFullscreen();
    fullscreenOn = true;
    document.getElementById("canvas").style = "position: absolute; top: 220px; width: 100vw;";
    fullscreenStartScreen();
}

/**
 * Disables fullscreen mode and restores styles.
 */
function fullscreenOff() {
    closeFullscreen();
    fullscreenOn = false;
    document.getElementById("canvas").style = "position: absolute; top: 220px;";
    fullscreenStartScreen();    
}

/**
 * Requests fullscreen mode for the specified element.
 */
function openFullscreen() {
    const element = document.getElementById("fullscreen");
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

/**
 * Exits fullscreen mode.
 */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}