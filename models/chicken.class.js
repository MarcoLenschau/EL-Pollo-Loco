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
    y = 380;

    offset = {
        top: 0,
        bottom: 0,
        left: -50,
        right: -50
    }

    /**
     * Creates a new chicken instance with a random horizontal position and speed.
     * Initializes the chicken's images and starts movement and animation.
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
        this.move();
        this.showAnimation(chickenImagesVar);
        
    }

    showAnimation(chickenImagesVar) {
        // Animates the chicken by cycling through its images.
        setStoppableInterval(() => {
            this.playAnimation(chickenImagesVar);
        }, 200);
    }

    move() {
        // Moves the chicken left continuously.
        setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}