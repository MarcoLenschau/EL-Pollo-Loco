class Endboss extends MovableObject {
    heigth = 150;
    width = 150;
    x = 2650;

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