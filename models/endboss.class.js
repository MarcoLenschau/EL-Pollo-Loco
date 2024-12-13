class Endboss extends MovableObject {
    heigth = 150;
    width = 150;
    x = 2650;
    world;

    constructor() {
        super().loadImage(endbossImages[0]);
        this.loadImages(endbossImages);
    }

    moveAnimation() {
        if (this.world.character.x >= 2000) {
            setInterval(() => this.x -= 50, 1000);
            setInterval(() => this.playAnimation(endbossImages),200);  
        } 
    }
}