class Endboss extends MovableObject {
    heigth = 150;
    width = 150;
    x = 2650;

    constructor() {
        super().loadImage(endbossImages[0]);
        this.loadImages(endbossImages);
        // if (this.world.character.x >= 2000) {
        //     setInterval(() => this.x -= 50, 1000);
        //     this.moveAnimation();
        // }
        
    }

    moveAnimation() {
        setInterval(() => {
            this.playAnimation(endbossImages);
        },200);   
    }
}