let canvas;
let world;
let ctx;
let endbossFight = false;
const keyboard = new Keyboard();
let intervale = [];
let fullscreenOn = false;
let mute = false;
let homeScreen = true;
let intervaleNumber = 0;
let devicesInterval = 0;
let rotateInterval = 0;

/**
 * Starts the game by initializing the level and world and hiding overlays.
 */
function playTheGame() {
    homeScreen = false;
    clearInterval(devicesInterval);
    initLevel();
    initWorld();
    hiddenOverlays();
}

/**
 * Initializes the game world by setting up the canvas, world, enemies, and keyboard.
 */
function initWorld() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    world.keyboard.mobileArrowKey();
}

/**
 * Hides the start and end overlays.
 */
function hiddenOverlays() {
    let startOverlay = document.getElementById("start-overlay");
    let endOverlay = document.getElementsByClassName("end-overlay")[0];
    startOverlay.style = "height: 0 !important;";
    startOverlay.classList.add("hidden");
    endOverlay.classList.add("hidden");
}

/**
 * Stops all running intervals in the game.
 */
function stopTheGame() {
    intervale.forEach(clearInterval);
}

/**
 * Displays the start overlay.
 */
function showStartOverlay() {
    let startOverlay = document.getElementById("start-overlay");
    startOverlay.classList.remove("hidden");
    startOverlay.style = "";
}

/**
 * Initializes the game by setting up a device check interval.
 */
function init() {
    devicesInterval = setInterval(checkDevicesFormat, 100);
}

/**
 * Checks the device orientation and adjusts overlays and canvas visibility accordingly.
 */
function checkDevicesFormat() {
    const mediaQuery = window.matchMedia("(orientation: portrait)");
    if (mediaQuery.matches && window.innerWidth <= 800 && intervaleNumber == 0) {
        showDevicesOverlay();
    } else if (!mediaQuery.matches) {
        showLandscape();
    }
}

/**
 * Show the game in the landscape format.
 */
function showLandscape() {
    let startOverlay = document.getElementById("start-overlay");
    document.getElementById("end-overlay-image").classList.add("d_none");
    // document.getElementById("canvas").style.width = "100vw";
    // document.getElementById("canvas").style.height = "100vh";
    startOverlay.classList.remove("d_none");
    startOverlay.style = "";
    clearInterval(rotateInterval);
    intervaleNumber = 0;
}

/**
 * Show the turn mobile devices overlay.
 */
function showDevicesOverlay() {
    let endOverlay = document.getElementsByClassName("end-overlay")[0];
    hiddenOverlays();
    endOverlay.classList.remove("d_none");
    document.getElementById("canvas").style.width = "0";
    createDevicesOverlay();
    removeItem("mobile-gameplay");
    removeItem("play-button");
    removeItem("overlay-buttons");
    removeItem("mobile-hide");
    intervaleNumber = 1;
}

/**
 * Creates an overlay prompting users to rotate their devices.
 */
function createDevicesOverlay() {
    let endOverlay = document.getElementsByClassName("end-overlay")[0];
    let endOverlayImage = document.getElementById("end-overlay-image");
    endOverlay.classList.remove("hidden");
    endOverlay.style = "width: 100vw; margin: 24vh;";
    endOverlayImage.classList.add("d_none");
    endOverlay.innerHTML += "<h1 style='position: absolute; bottom: 0px;'>Turn your Devices</h1>"       
    rotateInterval = setInterval(rotateSmartphone, 4000);
}

/**
 * Toggles the rotation animation for the smartphone image.
 */
function rotateSmartphone() {
    document.getElementById("smartphone").classList.toggle("rotate");
}

/**
 * Removes an element by adding the "d_none" class to its first occurrence.
 * @param {string} objectClass - The class of the element to hide.
 */
function removeItem(objectClass) {
    document.getElementsByClassName(objectClass)[0].classList.add("d_none");
}

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
    let element = document.getElementById("fullscreen");
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

/**
 * Creates a stoppable interval and stores its ID.
 * @param {Function} fn - The function to execute at each interval.
 * @param {number} time - The interval time in milliseconds.
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervale.push(id);
}

/**
 * Toggles the game's mute state.
 */
function muteTheGame() {
    if (mute) {
        document.getElementById("mute").style = "background-image: url('../assetes/icon/note.png');";
        mute = false;
    } else {
        document.getElementById("mute").style = "background-image: url('../assetes/icon/mute.png');";
        mute = true;
    }
}

/**
 * Displays the victory screen and stops the game.
 */
function winTheGame() {
    let endOverlayImage = document.getElementById("end-overlay-image");
    document.getElementById("smartphone").classList.add("d_none");
    setTimeout(() => {  
        showEndOverlay();
        endOverlayImage.classList.remove("d_none")
        endOverlayImage.src = "../assetes/img/9_intro_outro_screens/win/win_1.png";
        endOverlayImage.style = "";
        stopTheGame();
    }, 1000);
}

/**
 * You lose the Game.
 */
function loseTheGame() {
    let endOverlayImage = document.getElementById("end-overlay-image");
    document.getElementById("smartphone").classList.add("d_none");
    setTimeout(() => {
        showEndOverlay();
        endOverlayImage.classList.remove("d_none")
        stopTheGame();
    },1000);
}

/**
 * Show the end overlay.
 */
function showEndOverlay() {
    let endOverlay = document.getElementsByClassName("end-overlay")[0];
    endOverlay.classList.remove("hidden");
    endOverlay.classList.remove("d_none")
}

/**
 * Toggles the display of the gameplay menu.
 */
function showGameplay() {
    let gameplayMenu = document.getElementsByClassName("gameplay-menu")[0];
    let width = gameplayMenu.style.width;
    if (fullscreenOn) {
        gameplayMenu.classList.toggle("fullscreen-mode");
    } else if (width != "") {
        gameplayMenu.style.width = "";
    } else {
        gameplayMenu.style.width = "1080px";
    }
}

document.addEventListener("keydown", (event) => { 
    keyboard.searchKeyEvent(event, true);
});

document.addEventListener("keyup", (event) => { 
    keyboard.searchKeyEvent(event, false);
});