/**
 * Represents an object that can be drawn on the canvas.
 */
class DrawablObject {
    /**
     * The x position of the object.
     * @type {number}
     */
    x = 30;

    /**
     * The y position of the object.
     * @type {number}
     */
    y = 300;

    /**
     * The height of the object.
     * @type {number}
     */
    heigth;

    /**
     * The width of the object.
     * @type {number}
     */
    width;

    /**
     * The image of the object.
     * @type {HTMLImageElement}
     */
    img;

    /**
     * Cache for storing loaded images by their paths.
     * @type {Object.<string, HTMLImageElement>}
     */
    imageCache = {};

    /**
     * Loads an image from a specified path.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images from an array of paths and stores them in the image cache.
     * @param {Array.<string>} images - An array of image paths.
     */
    loadImages(images) {
        images.forEach(path => {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the object on the given canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.heigth);
    }

    /**
     * Draws a frame around the object if it's an instance of Character or Chicken.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.rect(
                this.x + this.offset.left, 
                this.y + this.offset.top, 
                this.width - this.offset.left - this.offset.right, 
                this.heigth - this.offset.top - this.offset.bottom
            );
        }
    }
}