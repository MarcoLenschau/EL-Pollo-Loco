class World {
    character = new Character();
    backgrounds = [
        new Background(backgroundImages[0], 0),
        new Background(backgroundImages[1], 0),
        new Background(backgroundImages[2], 0)
    ]
    air = new Air();
    statusbars = [
        new Statusbar(statusbarImages[0], 0),
        new Statusbar(statusbarImages[1], 60),
        new Statusbar(statusbarImages[2], 130)        
    ]
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ]
    clouds = [
        new Cloud()
    ];
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.addToMap(this.air);
        this.addObjToMap(this.backgrounds)
        this.addObjToMap(this.clouds)
        this.drawCharacterAndAnemies();
        let self = this;
        requestAnimationFrame(() => self.draw())
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
        this.ctx.drawImage(object.img, object.x, object.y ,object.width, object.heigth);
    }
}