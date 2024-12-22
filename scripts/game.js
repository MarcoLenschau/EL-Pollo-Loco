let canvas;
let world;
let ctx;
const keyboard = new Keyboard();

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    world.level.enemies[3].moveAnimation();
}

function playTheGame() {
    document.getElementsByClassName("overlay-start-screen")[0].classList.add("hidden");
}

document.addEventListener("keydown", (event) => { 
    keyboard.searchKeyEvent(event, true);
});

document.addEventListener("keyup", (event) => { 
    keyboard.searchKeyEvent(event, false);
});