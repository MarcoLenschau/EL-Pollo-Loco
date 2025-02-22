/**
 * Represents a character in the game, managing animations, movements, interactions, 
 * and inventory (coins and bottles). Handles gravity, jumping, and collisions with other entities.
 * Extends the `MovableObject` class.
 */
class Character extends MovableObject {
    /**
     * The width of the character.
     * @type {number}
     */
    width = 150;

    /**
     * The height of the character.
     * @type {number}
     */
    heigth = 200;

    /**
     * The vertical position of the character on the canvas.
     * @type {number}
     */
    y = 230;

    /**
     * The horizontal movement speed of the character.
     * @type {number}
     */
    speed = 5;

    /**
     * The sound effect played when the character walks.
     * @type {HTMLAudioElement}
     */
    walking_sound = new Audio("./audio/walk.mp3");

    /**
     * The sound effect played when the character jumps.
     * @type {HTMLAudioElement}
     */
    jump_sound = new Audio("./audio/jump.mp3");

    /**
     * Audio object for the sound effect played when an item is collected.
     * @type {HTMLAudioElement}
     */
    collect_item_sound = new Audio("./audio/collect_item.mp3");

    /**
     * The sound effect played when the character is dead.
     * @type {HTMLAudioElement}
     */
    game_over_sound = new Audio("./audio/game_over.mp3");

    /**
     * The number of coins the character has collected.
     * @type {number}
     */
    coins = 0;

    /**
     * The number of bottles the character has collected.
     * @type {number}
     */
    bottles = 0;

    /**
     * @type {number}
     * @description The timestamp of the last action performed by the character.
     */
    lastActionTime = 0;

    /**
     * The timestamp of the last jump action performed by the character.
     * @type {number}
     */
    lastJump = 600;
    
    /**
     * Offset values for the character's position.
     * @property {number} top - The top offset value.
     * @property {number} bottom - The bottom offset value.
     * @property {number} left - The left offset value.
     * @property {number} right - The right offset value.
     */
    offset = {
        top: 50,
        bottom: 10,
        left: 20,
        right: 30
    };

    /**
     * Initializes the character by loading necessary images, applying gravity, 
     * and starting movement and animation loops.
     */
    constructor() {
        super().loadImage(characterImages[0]);
        this.loadImages(characterImages);
        this.loadImages(characterWalkImages);
        this.loadImages(characterSleepImages);
        this.loadImages(characterJumpImages);
        this.loadImages(characterDeadImages);
        this.loadImages(characterHurtImages);
        this.applyGravity();
        this.showMoveAnimation();
        this.lastActionTime = new Date().getTime();
    }

    /**
     * Starts the intervals for character movement and animation updates.
     */
    showMoveAnimation() {
        setStoppableInterval(() => this.moveCharacter(), 1000 / 60);
        setStoppableInterval(() => this.moveAnimation(), 100);
    }

    /**
     * Handles character movement based on user input and game state.
     */
    moveCharacter() {
        this.walking_sound.pause();
        if (this.isDead()) {
            this.characterIsDead();
        } 
        if (this.world.keyboard.RIGHT && this.isCharacterNotTheFarRight()) {
            this.lastActionTime = new Date().getTime();
            this.moveCharacterLeft(false);
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.lastActionTime = new Date().getTime();
            this.moveCharacterLeft(true);
        }
        if (this.isJumpKeyClicked() && !this.isAboveGround()) {
            this.lastActionTime = new Date().getTime();
            this.jump();
        }
        this.reduceCameraX();
    }

    /**
     * Moves the character in the specified direction.
     * @param {boolean} direction - `true` to move left, `false` to move right.
     */
    moveCharacterLeft(direction) {
        if (direction) {
            this.moveLeft();
        } else {
            this.moveRight();
        }
        if (!mute && !this.isAboveGround()) {
            this.walking_sound.play();
        }
        this.otherDirection = direction;
    }

    /**
     * Checks if a jump key (SPACE or UP) is pressed.
     * @returns {boolean} `true` if the jump key is pressed, otherwise `false`.
     */
    isJumpKeyClicked() {
        return this.world.keyboard.SPACE || this.world.keyboard.UP;
    }

    /**
     * Determines if the character has not reached the far-right boundary of the level.
     * @returns {boolean} `true` if the character can move further right, otherwise `false`.
     */
    isCharacterNotTheFarRight() {
        return this.x <= world.level.level_end_x;
    }

    /**
     * Updates the character's animations based on its state (e.g., dead, hurt, jumping).
     */
    moveAnimation() {
        const currentTime = new Date().getTime();
        const lastJumpTime = currentTime - this.lastJump;
        if (this.isDead()) {
            this.playAnimation(characterDeadImages);
        } else if (this.isHurt()) {
            this.playAnimation(characterHurtImages);
        } else if (this.isAboveGround() && lastJumpTime > 500) {
            this.playAnimation(characterJumpImages);
            this.lastJump = currentTime;
        } else if (this.clickKeyLeftOrRight()) {
            this.playAnimation(characterWalkImages);
        } else if (this.isSleep()) { 
            this.playAnimation(characterSleepImages);            
        } else {
            this.playAnimation(characterImages);
        }
    }

    /**
     * Checks if the character is in a sleep state.
     * 
     * This method determines if the character has been inactive for more than 5 seconds.
     * 
     * @returns {boolean} True if the character is sleeping, false otherwise.
     */
    isSleep() {
        const currentTime = new Date().getTime();
        return currentTime - this.lastActionTime > 5000;
    }

    /**
     * Handles the actions and consequences when the character dies.
     */
    characterIsDead() {
        this.otherDirection = false;
        world.level.enemies.forEach((enemie) => {
            enemie.hidden();
        });
        this.hidden();
        if (!mute) {
            this.game_over_sound.volume = 0.5;
            this.game_over_sound.play();
        }
        setTimeout(loseTheGame, 500);
        return false;
    }

    /**
     * Checks if either the LEFT or RIGHT key is pressed.
     * @returns {boolean} `true` if either key is pressed, otherwise `false`.
     */
    clickKeyLeftOrRight() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    /**
     * Adjusts the camera position to follow the character's movements.
     */
    reduceCameraX() {
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Makes the character jump, playing the jump sound and setting the vertical speed.
     */
    jump() {
        this.stopAllSounds();
        if (!mute) {
            this.jump_sound.volume = 0.5;
            this.jump_sound.play();
        }
        this.speedY = 15;
    }

    /**
     * Stops all currently playing sounds for the character.
     * This includes jump sound, walking sound, item collection sound, and game over sound.
     */
    stopAllSounds() {
        this.jump_sound.pause();
        this.walking_sound.pause();
        this.collect_item_sound.pause();
        this.game_over_sound.pause();
    }
}