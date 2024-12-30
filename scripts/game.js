let canvas;
let world;
let ctx;
let endbossFight = false;
const keyboard = new Keyboard();


function playTheGame() {
    document.getElementsByClassName("overlay-start-screen")[0].classList.add("hidden");
    initLevel();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    world.level.enemies[3].moveAnimation();
}

function fullscreen() {
    playTheGame();
    world.canvas.requestFullscreen();
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