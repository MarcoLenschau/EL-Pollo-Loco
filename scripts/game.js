let canvas;
let world;
let ctx;

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas);
}


document.addEventListener('keydown', function(event) {
    if(event.keyCode == 32) {
        world.character.jump();
    }
    else if(event.keyCode == 37) {
        world.character.moveLeft();
    } 
    else if(event.keyCode == 39) {
        world.character.moveRight();
    }
});