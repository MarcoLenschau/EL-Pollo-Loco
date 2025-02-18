/**
 * Represents a movable object that can move, animate, and interact with other objects.
 * It extends the DrawablObject class and includes properties for movement, gravity, and collisions.
 */
class MovableObject extends DrawablObject {
    /**
     * The current index of the image in an animation sequence.
     * @type {number}
     * @default 0
     */
    currentImage = 0;

    /**
     * The movement speed of the object.
     * @type {number}
     * @default 0.15
     */
    speed = 0.15;

    /**
     * Indicates whether the object is facing the opposite direction.
     * @type {boolean}
     * @default false
     */
    otherDirection = false;

    /**
     * The vertical speed of the object (used for jumps or falling).
     * @type {number}
     * @default 0
     */
    speedY = 0;

    /**
     * The acceleration applied to the object (used for gravity).
     * @type {number}
     * @default 1
     */
    acceleration = 1;

    /**
     * The energy level of the object (e.g., health).
     * @type {number}
     * @default 100
     */
    energy = 100;

    /**
     * The timestamp of the last hit the object received.
     * @type {number}
     * @default 0
     */
    lastHit = 0;

    /**
     * The offset values used for collision detection.
     * @type {Object}
     * @property {number} top - Top offset value.
     * @property {number} bottom - Bottom offset value.
     * @property {number} left - Left offset value.
     * @property {number} right - Right offset value.
     */
    offset = {
        top: 50,
        bottom: 0,
        left: 50,
        right: 50
    };

    /**
     * The sound effect played when the object is hurt.
     * @type {Audio}
     */
    hurt_sound = new Audio("./audio/hurt.mp3");

    /**
     * Applies gravity to the object, causing it to fall unless it is on the ground.
     */
    applyGravity() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } 
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above the ground, otherwise false.
     */
    isAboveGround() {
        return this instanceof ThrowableObject || this.y < 220;
    }

    /**
     * Plays an animation by cycling through an array of images.
     * @param {string[]} images - An array of image paths for the animation.
     */
    playAnimation(images) {
        const i = this.currentImage % images.length;
        const path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Checks if this object is colliding with another object.
     * @param {MovableObject} object - The object to check for collision.
     * @returns {boolean} True if a collision is detected, otherwise false.
     */
    isColliding(object) {
        return (
            this.x + this.width - this.offset.right > object.x + object.offset.left && 
            this.y + this.heigth - this.offset.bottom > object.y + object.offset.top &&
            this.x + this.offset.left < object.x + object.width - object.offset.right && 
            this.y + this.offset.top < object.y + object.heigth - object.offset.bottom
        );
    }

    /**
     * Checks if the object's energy has reached zero.
     * @returns {boolean} True if the object is dead, otherwise false.
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Checks if the object was recently hit.
     * @returns {boolean} True if the object was hit in the last 100 milliseconds, otherwise false.
     */
    isHurt() {
        return new Date().getTime() - this.lastHit < 100;
    }

    /**
     * Reduces the object's energy when hit and plays a hurt sound if sound is not muted.
     */
    hit() {
        if (this.energy > 0) {
            this.lastHit = new Date().getTime();
            this.energy -= 0.5;
            this.showLive(1);
            if (!mute) {
                this.hurt_sound.play();
            }
        } 
    }
    
    /**
     * Hides the object by setting its position and dimensions to null.
     */
    hidden() {
        this.x = null;
        this.y = null;
        this.width = null;
        this.heigth = null;
    }

    /**
     * Updates the status bar to reflect the object's energy.
     * @param {number} numberOfStatusbar - The index of the status bar to update.
     */
    showLive(numberOfStatusbar) {
        if (world.statusbars.length - 1 === numberOfStatusbar) {
            world.statusbars[numberOfStatusbar].analysePercentage(this.energy, endbossStatusbarImages);            
        } else {
            world.statusbars[numberOfStatusbar].analysePercentage(this.energy, statusbarLiveImages);            
        }
    }
}