/**
 * Represents the main game world, managing all game objects, interactions, rendering, and logic.
 */
class World {
    /**
     * The main character in the game.
     * @type {Character}
     */
    character = new Character();

    /**
     * The current level being played.
     * @type {Level}
     */
    level = level1;

    /**
     * The status bars displayed on the screen (e.g., health, coins, bottles).
     * @type {Statusbar[]}
     */
    statusbars = [
        new Statusbar(statusbarImages[0], 0),
        new Statusbar(statusbarImages[1], 60),
        new Statusbar(statusbarImages[2], 130),
        new Statusbar(endbossStatusbarImages[5], 80, 460, false)
    ];

    /**
     * The collectible objects in the world (e.g., coins and bottles).
     * @type {CollectObject[]}
     */
    collectObjects = [
        new CollectObject(coinImage),
        new CollectObject(coinImage),
        new CollectObject(coinImage),
        new CollectObject(coinImage),
        new CollectObject(bottleImages[0]),
        new CollectObject(bottleImages[0]),
        new CollectObject(bottleImages[0]),
        new CollectObject(bottleImages[0]),
        new CollectObject(bottleImages[0]),
        new CollectObject(bottleImages[0]),
        new CollectObject(bottleImages[0]),
        new CollectObject(bottleImages[0])
    ];

    /**
     * The throwable objects (e.g., bottles) available in the game.
     * @type {ThrowableObject[]}
     */
    throwableObjects = [];

    /**
     * The canvas element for rendering the game.
     * @type {HTMLCanvasElement}
     */
    canvas;

    /**
     * The 2D rendering context for the canvas.
     * @type {CanvasRenderingContext2D}
     */
    ctx;

    /**
     * The keyboard input for controlling the game.
     * @type {Keyboard}
     */
    keyboard;

    /**
     * The camera's horizontal position offset.
     * @type {number}
     */
    camera_x = 0;

    /**
     * The timestamp of the last throwable object action.
     * @type {number}
     */
    lastThrow = 0;

    /**
     * Audio object for playing the enemy dead sound effect.
     * @type {Audio}
     */
    enemie_dead_sound = new Audio("./audio/enemie.mp3");
    
    /**
     * An instance of the Audio class that plays the sound effect for throwing.
     * @type {Audio}
     */
    throw_sound = new Audio("./audio/throw.mp3");

    /**
     * Initializes the game world, setting up the canvas, character, level, and input controls.
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level.enemies[3].world = this;
        this.draw();
        this.setWorld();
        this.runInterval();
    }

    /**
     * Links the character to the world for interaction with other objects.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Clears the canvas and redraws all game objects, including background, characters, and enemies.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBackground();
        this.addObjToMap(this.collectObjects);
        this.drawCharacterAndAnemies();
        this.addObjToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x - 30, 0);
        const self = this;
        requestAnimationFrame(() => self.draw());
    }

    /**
     * Draws the background and clouds of the level.
     */
    drawBackground() {
        this.ctx.translate(this.camera_x + 30, 0);
        this.addObjToMap(this.level.backgroundObject);
        this.addObjToMap(this.level.clouds);
    }

    /**
     * Draws the character, enemies, and status bars on the canvas.
     */
    drawCharacterAndAnemies() {
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.addObjToMap(this.statusbars);
        this.ctx.translate(this.camera_x, 0);
        this.addObjToMap(this.level.enemies);
    }

    /**
     * Adds an array of objects to the canvas map.
     * @param {MovableObject[]} objects - The objects to be added.
     */
    addObjToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    }

    /**
     * Adds a single object to the canvas map, handling direction flipping if necessary.
     * @param {MovableObject} object - The object to be added.
     */
    addToMap(object) {
        if (object.otherDirection) {
            this.flipImage(object);
        }
        object.draw(this.ctx);
        object.drawFrame(this.ctx);
        if (object.otherDirection) {
            this.flipImageBack(object);
        }
    }

    /**
     * Flips the object's image horizontally.
     * @param {MovableObject} object - The object whose image is flipped.
     */
    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    }

    /**
     * Restores the original image orientation after flipping.
     * @param {MovableObject} object - The object to restore.
     */
    flipImageBack(object) {
        this.ctx.restore();
        object.x = object.x * -1;
    }

    /**
     * Checks for collisions between the character and other objects in the game.
     * Includes enemy collisions, collectible object collisions, and throwable object interactions.
     */
    checkCollisions() {
        this.checkEnemiesCollisions();
        this.checkThrowCollisions();
    }

    /**
     * Checks for collisions between throwable objects and enemies.
     * Removes enemies or reduces their health when hit by a throwable object.
     */
    checkThrowCollisions() {
        this.level.enemies.forEach((enemie) => {
            this.throwableObjects.forEach(bottle => {
                if (enemie.isColliding(bottle)) {
                    this.enemieHit(enemie);
                this.showSplashAnimation(true);
                }
            });
        });
        this.showSplashAnimation(false);
    }

    /**
     * Handles the logic when an enemy is hit.
     * If the enemy is the end boss, it sets the enemy's energy to 0 and plays a sound if not muted.
     * Otherwise, it calls the hit method on the enemy.
     *
     * @param {Object} enemie - The enemy object that is hit.
     * @param {boolean} enemie.energy - The energy level of the enemy.
     * @param {Function} enemie.hit - The method to call when the enemy is hit.
     * @param {boolean} mute - A flag indicating whether the sound should be muted.
     * @param {Object} this.enemie_dead_sound - The sound object to play when the enemy is dead.
     * @param {Function} this.enemie_dead_sound.play - The method to play the sound.
     * @param {number} this.enemie_dead_sound.volume - The volume level of the sound.
     */
    enemieHit(enemie) {
        if (this.isEndboss(enemie)) {
            enemie.energy = 0;
            if (!mute) {
                this.enemie_dead_sound.volume = 0.3;
                this.enemie_dead_sound.play();
            }
        } else {
            enemie.hit();
        }
    }

    /**
     * Triggers the splash animation for throwable objects that have fallen below a certain height.
     * Iterates through each throwable object and checks if its y-coordinate is greater than 240.
     * If the condition is met, it sets an interval to play the splash animation at a rate of 120 frames per second.
     */
    showSplashAnimation(colliding = false) {
        this.throwableObjects.forEach(bottle => {
            if (bottle.y > 240 || colliding) { 
                setStoppableInterval(() => {
                    bottle.playAnimation(bottleSplashImages);
                },1000 / 120);
            }
        });
    }
    
    /**
     * Checks if the given enemy is the end boss.
     * 
     * @param {Object} enemie - The enemy object to check.
     * @param {number} enemie.width - The width of the enemy.
     * @returns {boolean} True if the enemy is the end boss, otherwise false.
     */
    isEndboss(enemie) {
        return enemie.width == 100;
    }

    /**
     * Checks for collisions between the character and enemies.
     * Handles the appropriate response (e.g., losing health or game over).
     */
    checkEnemiesCollisions() {
        this.level.enemies.forEach(enemie => {
            let currentTime = new Date().getTime();
            let lastHitTime = currentTime - this.character.lastHit;
            if (this.character.isColliding(enemie) && lastHitTime > 2000) {
                if (enemie.width !== 100) {
                    this.characterHit(enemie.damage);
                } else {
                    if (!this.character.isAboveGround() && enemie.energy > 0) {
                        this.characterHit(enemie.damage);
                    }
                }
            }
        });
    }

    /**
     * Reduces the character's health and updates the health status bar.
     */
    characterHit(damage) {
        this.character.hit(damage);
        this.statusbars[1].analysePercentage(this.character.energy, statusbarLiveImages);
    }
    
    /**
     * Checks for collisions between the character and collectible objects (coins or bottles).
     * Updates the character's inventory and status bars accordingly.
     */
    checkCollectObjectsCollisions() {
        this.collectObjects.forEach(collectObject => {
            if (this.character.isColliding(collectObject)) {            
                this.isObjectACoinOrbottle(collectObject);
            }
        });
    }

    /**
     * Determines if a collected object is a coin or a bottle and updates the game state.
     * @param {CollectObject} collectObject - The object being collected.
     */
    isObjectACoinOrbottle(collectObject) {
        if (collectObject.imgPath === coinImage && this.character.isAboveGround()) {
            this.character.coins += 20;
            this.statusbars[2].analysePercentage(this.character.coins, statusbarCoinImages);
            this.playCollectItemSound();
            collectObject.hidden();
        } else if (this.character.bottles <= 4) {
            this.character.bottles += 1;
            this.statusbars[0].analysePercentage(this.character.bottles * 20, statusbarbottleImages);
            this.playCollectItemSound();
            collectObject.hidden();
        }
    }
    
    /**
     * Plays the sound effect for collecting an item if the sound is not muted.
     */
    playCollectItemSound() {
        if (!mute) {
            this.character.collect_item_sound.volume = 0.3;
            this.character.collect_item_sound.play();
        }
    }

    /**
     * Checks if the player is attempting to throw an object (e.g., a bottle).
     * Throws the object if conditions are met (e.g., enough bottles, direction, and cooldown).
     */
    checkThrowObject() {
        if (this.isThrow()) {
            if (this.keyboard.D && !this.character.otherDirection && this.character.bottles > 0) {
                const bottle = new ThrowableObject(this.character.x, 250);
                this.throwableObjects.push(bottle);
                this.character.bottles -= 1;
                this.statusbars[0].analysePercentage(this.character.bottles * 20, statusbarbottleImages);
                this.lastThrow = new Date().getTime();
                if (!mute) {
                    this.throw_sound.volume = 0.3;
                    this.throw_sound.play();
                }
            }
        }
    }

    /**
     * Determines if enough time has passed since the last throw to allow another throw.
     * @returns {boolean} `true` if the character can throw again, otherwise `false`.
     */
    isThrow() {
        let currentTime = new Date().getTime();
        currentTime -= this.lastThrow;
        return currentTime > 1000;
    }
    
    /**
     * Check if key tap and then if key tap analastic which key tap. 
     */
    checkKeys() {
        if (this.keyboard.F) {
            fullscreen();
            this.keyboard.F = false;
        } else if (this.keyboard.M) {
            muteTheGame();
            this.keyboard.M = false;
        }
    }

    /**
     * Handles collisions with enemies. Removes an enemy if the character jumps on it.
     */
    jumpOfEnemies() {
        let enemies = this.level.enemies;
        enemies.forEach((enemie, index) => {
            if (enemie.width === 100) {
                if (this.isEnemieDead(enemie)) {
                    enemie.kill(enemies, index);
                }
                this.collidingEnemies(enemie);
            }
        });
    }

    /**
     * Handles the collision between the character and an enemy.
     * If the character is colliding with the enemy, is moving downwards, and is above ground,
     * the enemy's energy is set to 0, the enemy is killed, and a sound is played if not muted.
     *
     * @param {Object} enemie - The enemy object that the character is colliding with.
     */
    collidingEnemies(enemie) {
        let character = this.character;
        if (character.isColliding(enemie) && character.speedY <= 0 && character.isAboveGround()) {  
            enemie.energy = 0;
            enemie.kill(enemies, index);
            if (!mute) {
                this.enemie_dead_sound.volume = 0.5;
                this.enemie_dead_sound.play();
            }
        }
    }
    
    /**
     * Checks if the given enemy is dead.
     * 
     * @param {Object} enemie - The enemy object to check.
     * @param {number} enemie.energy - The energy level of the enemy.
     * @returns {boolean} True if the enemy's energy is 0, otherwise false.
     */
    isEnemieDead(enemie) {
        return enemie.energy === 0;
    }

    /**
     * Starts the main game intervals, including collision checks, input handling, and status updates.
     */
    runInterval() {
        setStoppableInterval(() => {
            this.checkCollisions();
            this.checkThrowObject();
            this.jumpOfEnemies();
            this.checkKeys();
            this.checkCollectObjectsCollisions();
        }, 50);
    }
}