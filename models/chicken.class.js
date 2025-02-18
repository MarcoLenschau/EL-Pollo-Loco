/**
 * Represents a chicken enemy in the game.
 * Extends the `MovableObject` class to provide movement and animation functionality.
 */
class Chicken extends MovableObject {
    /**
     * The width of the chicken.
     * @type {number}
     */
    width = 100;

    /**
     * The height of the chicken.
     * @type {number}
     */
    heigth = 60;

    /**
     * The vertical position of the chicken on the canvas.
     * @type {number}
     */
    y = 370;

    /**
     * The offset values for collision detection.
     * @type {Object}
     * @property {number} top - The top offset for collision.
     * @property {number} bottom - The bottom offset for collision.
     * @property {number} left - The left offset for collision.
     * @property {number} right - The right offset for collision.
     */
    offset = {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
    }

    energy = 100;
    
    walk = true;
    
    killAnimationTime = 0;

    /**
     * Creates a new chicken instance with a random horizontal position and speed.
     * Initializes the chicken's images and starts movement and animation.
     * 
     * @param {Array<string>} chickenImagesVar - An array of image paths used for animating the chicken.
     */
    constructor(chickenImagesVar) {
        super().loadImage(chickenImagesVar[0]);
        /**
         * The horizontal position of the chicken on the canvas, 
         * randomized within a specific range.
         * @type {number}
         */
        this.x = 200 + Math.random() * 2400;

        /**
         * The movement speed of the chicken, randomized within a range.
         * @type {number}
         */
        this.speed = 0.15 + Math.random() * 0.25;
        this.loadImages(chickenImagesVar);
        this.loadImage(chickenImageDead);
        this.loadImage(chickenSmallImageDead);
        this.move();
        this.showAnimation(chickenImagesVar);
    }

    /**
     * Animates the chicken by cycling through its images.
     * The animation is set to update at regular intervals.
     * 
     * @param {Array<string>} chickenImagesVar - An array of image paths for the chicken's animation.
     */
    showAnimation(chickenImagesVar) {
        setStoppableInterval(() => {
            if (this.energy > 0) {
                this.playAnimation(chickenImagesVar);
            } else {
                if (chickenImagesVar === chickenSmallImages) {
                    this.loadImage(chickenSmallImageDead);
                } else {
                    this.loadImage(chickenImageDead);
                }
            }
        }, 200);
    }

    /**
     * Moves the chicken left continuously at a fixed speed.
     */
    move() {
        setStoppableInterval(() => {
            if (this.walk) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }

    kill(enemies, enemieQuantity) {
        this.walk = false;
        if (this.killAnimationTime === 0) {
            this.killAnimation();
        } else {
            this.showKillAnimation(enemies, enemieQuantity)
        }       
    }

    killAnimation() {
        this.loadImage(chickenSmallImageDead);
        this.killAnimationTime = new Date().getTime();
    }

    showKillAnimation(enemies, enemieQuantity) {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - this.killAnimationTime;   
        if (elapsedTime > 2000) {
            enemies.splice(enemieQuantity, 1);
        } else {
            this.killAnimation();
        } 
    }
}