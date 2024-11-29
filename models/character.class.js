class Character extends MovableObject{
    width = 125;
    heigth = 150;

    constructor() {
        super().loadImage("./assetes/img/2_character_pepe/2_walk/W-21.png");
    }

    jump() {
        if (this.y >= 250) {
            this.y = this.y - 100;
            setTimeout(() => {
                this.y = this.y + 100
            },300);
        }

    }
}