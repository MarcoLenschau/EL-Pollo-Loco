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
        setStoppableInterval(() => {
            if ((world.character.x >= 2000 || endbossFight)) {
                if (this.isDead()) {
                    this.playAnimation(endbossDeadImages);    
                    world.statusbars[3].hidden();
                } else {
                    this.characterMourning();
                    this.isBossFight();
                }
            }},1000);
    }

    characterMourning() {
        world.statusbars[3].show();
        this.x -= 150; 
        this.applyGravity();
        if (this.y > 200) {
            this.y = 10;
        }
        endbossFight = true;
    }

    isBossFight() {
        if (!endbossFight) {
            this.playAnimation(endbossImages);
        } else {
            this.playAnimation(endbossWalkImages);
            this.playBossSound();
        }
    }

    playBossSound() {
        if (!mute) {
            this.boss_sound.play();
        }
    }

    hit() {
        const currentTime = new Date().getTime();        
        if (this.energy > 0 && currentTime - this.lastHit > 1000) {
            this.lastHit = new Date().getTime();
            this.energy -= 20;
            this.playAnimation(endbossHurtImages);
            this.showLive();
        } else if (this.energy <= 0) {
            winTheGame()
        }
    }

    showLive() {
        setStoppableInterval(() => {
            world.statusbars[3].analysePercentage(this.energy, endbossStatusbarImages);            
        },1000 / 60);
    }
}  