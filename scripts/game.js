let canvas;
let world;
let ctx;
let endbossFight = false;
const keyboard = new Keyboard();
let intervale = [];
let fullscreenOn = false;
let mute = false;

function playTheGame() {
    document.getElementsByClassName("overlay-start-screen")[0].classList.add("hidden");
    let startOverlay = document.getElementById("start-overlay");
    startOverlay.style.width = "0";
    startOverlay.style.height = "0";
    initLevel();
    initWorld();
}

function initWorld() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    world.level.enemies[3].moveAnimation();
    world.keyboard.mobileArrowKey()
}

function stopTheGame() {
    intervale.forEach(clearInterval);
}

function fullscreen() {
    if (!fullscreenOn) {
        openFullscreen();
        fullscreenOn = true;
    } else {
        closeFullscreen();
        fullscreenOn = false; 
    }    
}

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
  
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { 
        document.msExitFullscreen();
    }
}

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervale.push(id);
}

function muteTheGame() {
    if (mute) {
        document.getElementById("mute").style = "background-image: url('../assetes/icon/note.png');"
        mute = false;
    } else {
        document.getElementById("mute").style = "background-image: url('../assetes/icon/mute.png');"
        mute = true;
    }
    
}

function winTheGame() {
    setTimeout(() => {
        document.getElementsByClassName("win-overlay")[0].classList.remove("hidden");
        stopTheGame();
    },1000);
}

function showGameplay() {
    let width = document.getElementsByClassName("gameplay-menu")[0].style.width
    if (width != "") {
        document.getElementsByClassName("gameplay-menu")[0].style.width = "";
    } else {
        document.getElementsByClassName("gameplay-menu")[0].style.width = "1080px";
    }
}

document.addEventListener("keydown", (event) => { 
    keyboard.searchKeyEvent(event, true);
});

document.addEventListener("keyup", (event) => { 
    keyboard.searchKeyEvent(event, false);
});