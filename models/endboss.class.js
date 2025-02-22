/**
 * Represents the Endboss in the game.
 * The Endboss is a powerful enemy that appears towards the end of the level.
 * It has various animations, movements, and interactions with the player.
 */
class Endboss extends MovableObject {
    /**
     * The height of the end boss character.
     * @type {number}
     */
    heigth = 350;

    /**
     * The width of the end boss character.
     * @type {number}
     */
    width = 250;
    
    /**
     * The initial horizontal position of the end boss character.
     * @type {number}
     */
    x = 2550;
    
    /**
     * The vertical position of the end boss.
     * @type {number}
     */
    y = 100;
    
    /**
     * Audio object for the boss sound effect.
     * @type {Audio}
     */
    boss_sound = new Audio("./audio/boss.mp3");
    
    /**
     * Vertical speed of the end boss.
     * @type {number}
     */
    speedY = 0;
    
    /**
     * Timestamp of the last jump action performed by the end boss.
     * @type {number}
     */
    lastJump = 0;

    /**
     * Indicates whether the end boss is walking.
     * @type {boolean}
     */
    walk = false;
    
    /**
     * The amount of damage the end boss can inflict.
     * @type {number}
     */
    damage = 50;
    
    /**
     * The offset values for collision detection.
     * @type {Object}
     * @property {number} top - The top offset for collision.
     * @property {number} bottom - The bottom offset for collision.
     * @property {number} left - The left offset for collision.
     * @property {number} right - The right offset for collision.
     */
    offset = {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
    };
    
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
        const currentTime = new Date().getTime();
        const lastJumpTime = currentTime - this.lastJump;
        if (!this.walk) {
            this.x -= 25;
            this.walk = true;
        } else {
            this.walk = false;
        }
        if (this.isAboveGround() && (this.lastJump === 0 || lastJumpTime >= 2000)) {
            this.jump();
        }
        endbossFight = true;
    }

    /**
     * Makes the Endboss jump into the air.
     */
    jump() {
        const groundY = 100;
        this.speedY = 15;
        const interval = setInterval(() => {
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
        const currentTime = new Date().getTime();
        if (this.isDead()) {
            this.playAnimation(endbossDeadImages);
        } else if (currentTime - this.lastHit < 2000) {
            this.playAnimation(endbossHurtImages);
        } else if (currentTime - this.lastJump < 2000) {
            this.playBossSound();
            this.playAnimation(endbossAttackImages);  
        } else if (this.walk) {
            this.playBossSound();
            this.playAnimation(endbossWalkImages);  
        } 
    }

    /**
     * Plays the boss sound if the game is not muted.
     */
    playBossSound() {
        if (!mute) {
            this.boss_sound.volume = 0.5;
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
        } else if (this.isDead()) {
            this.playAnimation(endbossDeadImages);
            setTimeout(winTheGame, 500);
        }
    }
}