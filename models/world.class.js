class World {
    character = new Character();
    backgrounds = [
        new Background("./assetes/img/5_background/layers/3_third_layer/1.png"),
        new Background("./assetes/img/5_background/layers/2_second_layer/1.png"),
        new Background("./assetes/img/5_background/layers/1_first_layer/full.png")
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
        this.clouds.forEach(cloud => {    
            this.addToMap(cloud);    
        });
        this.backgrounds.forEach(background => {
            this.addToMap(background);
        });
        this.drawCharacterAndAnemies();
  
        let self = this;
        requestAnimationFrame(() => self.draw())
    }

    drawCharacterAndAnemies() {
        this.addToMap(this.character);
        this.addToMap(this.statusbar);
        this.enemies.forEach(enemie => {   
            this.addToMap(enemie);
        });
    }

    addToMap(object) {
        this.ctx.drawImage(object.img, object.x, object.y ,object.width, object.heigth);
    }
}