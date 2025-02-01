/**
 * Represents a collectable object that is movable and can be drawn on the canvas.
 * This class extends from the MovableObject class and is used for objects that can be collected in a game or app.
 */
class CollectObject extends MovableObject {
    /**
     * The height of the collectable object.
     * @type {number}
     * @default 100
     */
    heigth = 100;

    /**
     * The width of the collectable object.
     * @type {number}
     * @default 100
     */
    width = 100;

    /**
     * The image path of the collectable object.
     * @type {string}
     */
    imgPath;

    /**
     * Creates an instance of the CollectObject class, loading an image from the provided path and setting a random position.
     * The object will be placed at a random x position between 150 and 2350, and a random y position between 0 and 150.
     * It calls the constructor of the MovableObject class to inherit its functionality.
     * 
     * @param {string} imgPath - The path to the image for the collectable object.
     */
    constructor(imgPath) {
        super().loadImage(imgPath);
        this.x = 150 + Math.random() * 2200;
        if (imgPath === coinImage) {
            this.y = 80 + Math.random() * 150;
        } else {
            this.y = 350;
        }
        
        this.imgPath = imgPath;
    }
}