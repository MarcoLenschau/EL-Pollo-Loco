/**
 * Represents a status bar that displays a percentage-based value, such as health or progress.
 * The status bar updates its image based on the percentage and can be shown or hidden.
 * It extends the DrawablObject class.
 */
class Statusbar extends DrawablObject {
    /**
     * The width of the status bar.
     * @type {number}
     * @default 200
     */
    width = 200;

    /**
     * The height of the status bar.
     * @type {number}
     * @default 100
     */
    heigth = 100;

    /**
     * The percentage value of the status bar, which determines the displayed image.
     * @type {number}
     * @default 100
     */
    percentage = 100;

    /**
     * Creates an instance of the Statusbar class.
     * 
     * @param {string} imgPath - The path to the initial image of the status bar.
     * @param {number} y - The y position of the status bar.
     * @param {number} [x=0] - The x position of the status bar (default is 0).
     * @param {boolean} [show=true] - Determines whether the status bar is initially visible (default is true).
     */
    constructor(imgPath, y, x = 0, show = true) {
        super().loadImage(imgPath);         
        this.y = y;
        this.x = x;
        if (!show) {
            this.hidden();
        }
    }

    /**
     * Sets the percentage value of the status bar.
     * @param {number} percentage - The new percentage value.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
    }

    /**
     * Updates the status bar image based on the given percentage value.
     * The image changes dynamically depending on the percentage thresholds.
     * 
     * @param {number} percentage - The percentage value to analyze.
     * @param {Array.<string>} images - An array of image paths corresponding to different percentage levels.
     */
    analysePercentage(percentage, images) {
        this.setPercentage(percentage);
        if (this.percentage >= 100) { this.loadImage(images[5]); } 
        else if (this.percentage >= 80) { this.loadImage(images[4]); } 
        else if (this.percentage >= 60) { this.loadImage(images[3]); } 
        else if (this.percentage >= 40) { this.loadImage(images[2]); } 
        else if (this.percentage >= 20) { this.loadImage(images[1]); } 
        else if (this.percentage <= 0) { this.loadImage(images[0]); }
    }

    /**
     * Hides the status bar by setting its position and dimensions to null.
     */
    hidden() {
        this.x = null;
        this.y = null;
        this.width = null;
        this.heigth = null;
    }

    /**
     * Shows the status bar by resetting its position and dimensions.
     */
    show() {
        this.x = 830;
        this.y = 80;
        this.width = 200;
        this.heigth = 100;
    }
}