/**
 * Represents a throwable object that moves and is affected by gravity.
 * This class extends the MovableObject class and is used for objects that can be thrown in the game.
 */
class ThrowableObject extends MovableObject {
    /**
     * The height of the throwable object.
     * @type {number}
     * @default 100
     */
    heigth = 100;

    /**
     * The width of the throwable object.
     * @type {number}
     * @default 150
     */
    width = 150;

    /**
     * Indicates whether the throwable object has splashed.
     * @type {boolean}
     */
    isSplashed = false;
    
    /**
     * Creates an instance of the ThrowableObject class.
     * The object is initialized at the given x and y coordinates, and it starts moving forward while being affected by gravity.
     * 
     * @param {number} x - The initial x position of the object.
     * @param {number} y - The initial y position of the object.
     */
    constructor(x, y) {
        super().loadImage("./assetes/img/6_salsa_bottle/2_salsa_bottle_on_ground.png");   
        this.loadImages(bottleImages);
        this.loadImages(bottleSplashImages);
        this.x = x;
        this.y = y;
        this.throw();
    }

    /**
     * Initiates the throwing action.
     * The object moves forward horizontally and is affected by gravity.
     */
    throw() {  
        this.speedY = 10;
        this.applyGravity();
        setStoppableInterval(() => {
            if (this.isSplashed) {
                this.playAnimation(bottleSplashImages);
            } else if (this.isAboveGround()) {   
                this.x += 5;
                this.playAnimation(bottleImages);
            }
        }, 25);
    }
}