class Endboss extends MovableObject {
    heigth = 350;
    width = 250;
    x = 2550;
    y = 100;
    boss_sound = new Audio("../audio/boss.mp3")


    constructor() {
        super().loadImage(endbossImages[0]);
        this.loadImages(endbossImages);
        this.loadImages(endbossWalkImages);
        this.loadImages(endbossHurtImages);
        this.loadImages(endbossDeadImages);
        this.moveAnimation();     
    }

    moveAnimation() {
        setStoppableInterval((interval = 0) => {
            if ((world.character.x >= 2000 || endbossFight)) {
                if (this.isDead()) {
                    this.playAnimation(endbossDeadImages);    
                    world.statusbars[3].hidden();
                } else {
                    this.characterMourning();
                    this.isBossFight(interval);
                }
            }},1000);
    }

    characterMourning() {
        world.statusbars[3].show();
        this.x -= 100;
        endbossFight = true;
    }

    isBossFight(interval) {
        if (interval < 10 && !endbossFight) {
            this.playAnimation(endbossImages);
        } else {
            this.playAnimation(endbossWalkImages);
            this.playBossSound();
        }
        interval++;
    }

    playBossSound() {
        if (!mute) {
            this.boss_sound.play();
        }
    }

    hit() {
        if (this.energy > 0) {
            this.energy -= 20;
            this.playAnimation(endbossHurtImages);
            this.showLive();
        } else {
            winTheGame()
        }
    }

    showLive() {
        setStoppableInterval(() => {
            world.statusbars[3].analysePercentage(this.energy, endbossStatusbarImages);            
        },1000 / 60);
    }
}  