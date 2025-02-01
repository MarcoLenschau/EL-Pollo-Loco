/**
 * Represents the Endboss in the game.
 * The Endboss is a powerful enemy that appears towards the end of the level.
 * It has various animations, movements, and interactions with the player.
 */
class Endboss extends MovableObject {
    heigth = 350;
    width = 250;
    x = 2550;
    y = 100;
    boss_sound = new Audio("../audio/boss.mp3");
    speedY = 0;
    lastJump = 0;

    /**
     * Initializes the Endboss by loading images and starting animations.
     */
    constructor() {
        super().loadImage(endbossImages[0]);
        this.loadImages(endbossImages);
        this.loadImages(endbossWalkImages);
        this.loadImages(endbossHurtImages);
        this.loadImages(endbossDeadImages);
        this.loadImages(endbossAttackImages);
        this.moveAnimation();
    }

    /**
     * Starts the animation and movement logic of the Endboss.
     * The Endboss starts moving when the player reaches a certain position.
     */
    moveAnimation() {
        setStoppableInterval(() => {
            if (world.character.x >= 2000 || endbossFight) {
                if (this.isDead()) {
                    world.statusbars[3].hidden();
                } else {
                    this.showEndboss();
                    this.showAnimation();
                }
            }
        }, 100);
    }

    /**
     * Makes the Endboss visible and starts attacking.
     * The Endboss jumps forward when the fight starts.
     */
    showEndboss() {
        world.statusbars[3].show();
        let currentTime = new Date().getTime();
        let lastJumpTime = currentTime - this.lastJump;
        if (this.lastJump === 0 || lastJumpTime >= 1500) {
            this.x -= 200;
            this.jump();
        }
        endbossFight = true;
    }

    /**
     * Makes the Endboss jump into the air.
     */
    jump() {
        let groundY = 100;
        this.speedY = 15;
        let interval = setInterval(() => {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            if (this.speedY < 0 && this.y >= groundY) {
                this.y = groundY;
                clearInterval(interval);
            }
        }, 30);
        this.lastJump = new Date().getTime();
    }

    /**
     * Controls the Endboss animations depending on its state.
     */
    showAnimation() {
        let currentTime = new Date().getTime();
        if (this.isDead()) {
            this.playAnimation(endbossDeadImages);
        } else if (currentTime - this.lastHit < 3000) {
            this.playAnimation(endbossHurtImages);
        } else if (!endbossFight) {
            this.playAnimation(endbossImages);
        } else if (this.isAboveGroud()) {
            this.playBossSound();
            this.playAnimation(endbossAttackImages);
        } else {
            this.playBossSound();
            this.playAnimation(endbossWalkImages);
        }
    }

    /**
     * Plays the boss sound if the game is not muted.
     */
    playBossSound() {
        if (!mute) {
            this.boss_sound.play();
        }
    }

    /**
     * Handles when the Endboss gets hit by an attack.
     * Reduces the energy and checks if the Endboss is defeated.
     */
    hit() {
        const currentTime = new Date().getTime();
        const lastHitTime = currentTime - this.lastHit;
        if (this.energy > 0 && lastHitTime > 1000) {
            this.lastHit = new Date().getTime();
            this.energy -= 20;
            this.showLive(3);
        } else if (this.energy <= 0) {
            winTheGame();
        }
    }
}