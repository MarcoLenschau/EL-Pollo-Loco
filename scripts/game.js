let canvas;
let world;
let ctx;

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas);
}

//* Function is executed when button is pressed 

document.addEventListener('keydown', (event) => { 
    whichKeyIsDown(event);
});

function whichKeyIsDown(event) {
    if(event.keyCode == 32) {
        world.character.jump();
    }
    else if(event.keyCode == 37) {
        world.character.moveLeft();
    } 
    else if(event.keyCode == 39) {
        world.character.moveRight();
    }
}