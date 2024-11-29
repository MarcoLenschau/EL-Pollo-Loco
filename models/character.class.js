class Character extends MovableObject{
    width = 150;
    heigth = 200;
    y = 235;

    constructor() {
        super().loadImage("./assetes/img/2_character_pepe/2_walk/W-21.png");
    }

    jump() {
        if (this.y >= 230) {
            this.y = this.y - 100;
            setTimeout(() => {
                this.y = this.y + 100
            },300);
        }
    }
}