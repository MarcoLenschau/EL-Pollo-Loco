/**
 * Represents a cloud object that is movable and can be drawn on the canvas.
 * The cloud object extends from the MovableObject class, inheriting movement and image loading functionality.
 */
class Cloud extends MovableObject {
    /**
     * The width of the cloud object.
     * @type {number}
     * @default 500
     */
    width = 500;
    
    /**
     * The height of the cloud object.
     * @type {number}
     * @default 150
     */
    heigth = 150;

    /**
     * The y position of the cloud object on the canvas.
     * @type {number}
     * @default 0
     */
    y = 0;

    /**
     * Creates an instance of the Cloud class, loading the cloud image and setting the initial position.
     * The cloud will start at the x position of 480 and at the top of the canvas (y = 0).
     * It calls the constructor of the MovableObject class to inherit its functionality.
     */
    constructor() {
        super().loadImage(cloudImage);
        this.x = 480;
    }
}