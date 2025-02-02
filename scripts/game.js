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
    muteTheGame();
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
 * Stops all running intervals in the game.
 */
function stopTheGame() {
    intervale.forEach(clearInterval);
    stopAllSounds();
}

/**
 * Removes an element by adding the "d_none" class to its first occurrence.
 * @param {string} objectClass - The class of the element to hide.
 */
function removeItem(objectClass) {
    document.getElementsByClassName(objectClass)[0].classList.add("d_none");
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
        document.getElementById("mute").style = "background-image: url('./assetes/icon/note.png');";
        mute = false;
    } else {
        document.getElementById("mute").style = "background-image: url('./assetes/icon/mute.png');";
        mute = true;
        stopAllSounds();
    }
    localStorage.setItem("Mute", mute)

}

/**
 * Stop all sounds in the game.
 */
function stopAllSounds() {
    world.character.walking_sound.pause();
    world.character.jump_sound.pause();
    world.character.game_over_sound.pause();
    world.level.enemies[world.level.enemies.length - 1].boss_sound.pause();
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
        setInterval(() => {
            defineEndOverlaySize()
        },10);
    }, 1000);
}

/**
 * You lose the Game.
 */
function loseTheGame() {
    let endOverlayImage = document.getElementById("end-overlay-image");
    let smartphone = document.getElementById("smartphone");
    setTimeout(() => {
        showEndOverlay();
        let endOverlay = document.getElementsByClassName("end-overlay")[0];
        endOverlay.classList.add("end-overlay-lose");
        smartphone.style = "display: none;";
        endOverlayImage.innerHTML = "";
        endOverlayImage.classList.remove("d_none");
        stopTheGame();
        setInterval(() => {
            defineEndOverlaySize()
        },10);
    },1000);
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
    } else if (window.innerWidth <= 1301){
        gameplayMenu.style.width = "80vw";
    } else {
        gameplayMenu.style.width = "1080px"
    }
}

/**
 * Listens for the "keydown" event on the document and processes the event when a key is pressed.
 * It calls the `searchKeyEvent` method of the `keyboard` object with the `true` state,
 * indicating that a key has been pressed.
 */
document.addEventListener("keydown", (event) => { 
    keyboard.searchKeyEvent(event, true);
});

/**
 * Listens for the "keyup" event on the document and processes the event when a key is released.
 * It calls the `searchKeyEvent` method of the `keyboard` object with the `false` state,
 * indicating that a key has been released.
 */
document.addEventListener("keyup", (event) => { 
    keyboard.searchKeyEvent(event, false);
});