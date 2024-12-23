class Endboss extends MovableObject {
    heigth = 350;
    width = 250;
    x = 2550;
    y = 100;

    constructor() {
        super().loadImage(endbossImages[0]);
        this.loadImages(endbossImages);
    }

    moveAnimation() {
        setInterval(() => {
            if (world.character.x >= 2000) {
                this.x -= 20;
                this.playAnimation(endbossImages);
            }},1000);
    }
}