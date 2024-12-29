class Endboss extends MovableObject {
    heigth = 350;
    width = 250;
    x = 2550;
    y = 100;

    constructor() {
        super().loadImage(endbossImages[0]);
        this.loadImages(endbossImages);
        this.moveAnimation();     
    }

    moveAnimation() {
        setInterval(() => {
            if (world.character.x >= 2000 && this.energy > 0) {
                world.statusbars[3].show();
                this.x -= 20;
                this.playAnimation(endbossImages);      
            } else {
                world.statusbars[3].hidden();
            }},1000);
    }

    hit() {
        if (this.energy > 0) {
            this.energy -= 20;
            this.showLive();
        } else {
            this.hidden();
        }
    }

    showLive() {
        setInterval(() => {
            world.statusbars[3].analysePercentage(this.energy, endbossStatusbarImages);            
        },1000 / 60);
    }
}  