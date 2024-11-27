class World {
    character = new Character();
    enemies = [
        new Chicken(550, 350),
        new Chicken(500, 350),
        new Chicken(450, 350)
    ]
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.draw();
    }

    draw() {
        setTimeout(() => {
            this.ctx.drawImage(this.character.img, this.character.x, this.character.y ,this.character.width, this.character.heigth);
            this.enemies.forEach(element => {    
                this.ctx.drawImage(element.img, element.x, element.y ,element.width, element.heigth);
            });
        },100);
    }
}