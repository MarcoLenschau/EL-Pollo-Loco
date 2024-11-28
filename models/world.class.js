class World {
    character = new Character();
    background = new Background();
    air = new Air();
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
        this.ctx.drawImage(this.background.img, this.background.x, this.background.y ,this.background.width, this.background.heigth)
        this.ctx.drawImage(this.air.img, this.air.x, this.air.y ,this.air.width, this.air.heigth)
        
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y ,this.character.width, this.character.heigth);
        this.enemies.forEach(enemie => {    
            this.ctx.drawImage(enemie.img, enemie.x, enemie.y ,enemie.width, enemie.heigth);
        });
        this.clouds.forEach(cloud => {    
            this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.heigth)    
        });
        let self = this;
        requestAnimationFrame(() => self.draw())
    }
}