class World {
    character = new Character();
    backgrounds = [
        new Background("./assetes/img/5_background/layers/3_third_layer/1.png", 0),
        new Background("./assetes/img/5_background/layers/2_second_layer/1.png", 0),
        new Background("./assetes/img/5_background/layers/1_first_layer/1.png", 0)
    ]
    air = new Air();
    statusbar = new Statusbar();
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
        this.addToMap(this.statusbar);
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