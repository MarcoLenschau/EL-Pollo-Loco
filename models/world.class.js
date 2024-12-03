class World {
    character = new Character();
    backgrounds = [
        new Background("./assetes/img/5_background/layers/air.png", 0),
        new Background(backgroundImages[0], 0),
        new Background(backgroundImages[1], 0),
        new Background(backgroundImages[2], 0),
        new Background("./assetes/img/5_background/layers/air.png", 720),
        new Background(backgroundImages[0], 720),
        new Background(backgroundImages[1], 720),
        new Background(backgroundImages[2], 720)
    ];
    statusbars = [
        new Statusbar(statusbarImages[0], 0),
        new Statusbar(statusbarImages[1], 60),
        new Statusbar(statusbarImages[2], 130)        
    ];
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    clouds = [
        new Cloud()
    ];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjToMap(this.backgrounds);
        this.addObjToMap(this.clouds);
        this.drawCharacterAndAnemies();
        this.ctx.translate(-this.camera_x, 0);
        const self = this;
        requestAnimationFrame(() => self.draw());
    }

    drawCharacterAndAnemies() {
        this.addToMap(this.character);
        this.addObjToMap(this.statusbars);
        this.addObjToMap(this.enemies);
    }

    addObjToMap(objects) {
        objects.forEach(obj => {    
            this.addToMap(obj);    
        });
    }
    
    addToMap(object) {
        if (object.otherDirection) {
            this.flipImage(object);
        }
        this.ctx.drawImage(object.img, object.x, object.y ,object.width, object.heigth);
        if (object.otherDirection) {
            this.flipImageBack(object);
        }
    }

    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * - 1;
    }

    flipImageBack(object) {
        this.ctx.restore();
        object.x = object.x * - 1;
    }
}