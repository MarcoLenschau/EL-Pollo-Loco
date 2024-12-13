class World {
    character = new Character();
    level = level1;
    statusbars = [
        new Statusbar(statusbarImages[0], 0),
        new Statusbar(statusbarImages[1], 60),
        new Statusbar(statusbarImages[2], 130)        
    ];
    coin = [
        new Coin(coinImage),
        new Coin(coinImage),
        new Coin(coinImage),
        new Coin(coinImage)
    ];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level.enemies[3].world = this;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBackground();
        this.drawCharacterAndAnemies();
        this.ctx.translate(-this.camera_x - 30, 0);
        const self = this;
        this.addObjToMap(this.coin);
        requestAnimationFrame(() => self.draw());
    }

    drawBackground() {
        this.ctx.translate(this.camera_x + 30, 0);
        this.addObjToMap(this.level.backgroundObject);
        this.addObjToMap(this.level.clouds);
    }

    drawCharacterAndAnemies() {
        this.addToMap(this.character);
        this.addObjToMap(this.statusbars);
        this.addObjToMap(this.level.enemies);
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