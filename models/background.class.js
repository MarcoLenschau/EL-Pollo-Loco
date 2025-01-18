/**
 * Represents a background object in the game.
 * Extends the `MovableObject` class to allow movement functionality.
 */
class Background extends MovableObject {
    /**
     * The width of the background object.
     * @type {number}
     */
    width = 720;

    /**
     * The height of the background object.
     * @type {number}
     */
    heigth = 480;

    /**
     * Creates an instance of the `Background` class.
     * Loads the specified image and sets the background's position.
     * 
     * @param {string} imgPath - The path to the image file for the background.
     * @param {number} x - The horizontal position of the background.
     */
    constructor(imgPath, x) {
        super().loadImage(imgPath);
        this.y = 480 - this.heigth; // Sets the vertical position of the background.
        this.x = x; // Sets the horizontal position of the background.
    }
}