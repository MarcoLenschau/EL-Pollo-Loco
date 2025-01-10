class Endboss extends MovableObject {
    heigth = 350;
    width = 250;
    x = 2550;
    y = 100;

    constructor() {
        super().loadImage(endbossImages[0]);
        this.loadImages(endbossImages);
        this.loadImages(endbossHurtImages);
        this.moveAnimation();     
    }

    moveAnimation() {
        setStoppableInterval((interval = 0) => {
            if ((world.character.x >= 2000 || endbossFight) && this.energy > 0) {
                this.characterMourning();
                this.isBossFight(interval);
            } else {
                world.statusbars[3].hidden();
            }},1000);
    }

    characterMourning() {
        world.statusbars[3].show();
        this.x -= 20;
        endbossFight = true;
    }

    isBossFight(interval) {
        if (interval < 10 && !endbossFight) {
            this.playAnimation(endbossWalkImages);
        } else {
            this.playAnimation(endbossImages);      
        }
        interval++;
    }

    hit() {
        if (this.energy > 0) {
            this.energy -= 20;
            this.playAnimation(endbossHurtImages);
            this.showLive();
        } else {
            this.hidden();
            winTheGame();
        }
    }

    showLive() {
        setStoppableInterval(() => {
            world.statusbars[3].analysePercentage(this.energy, endbossStatusbarImages);            
        },1000 / 60);
    }
}  