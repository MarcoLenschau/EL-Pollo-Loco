/**
 * Manages keyboard and mobile touch input for controlling the game.
 */
class Keyboard {
    /**
     * Indicates whether the right arrow key or mobile right button is pressed.
     * @type {boolean}
     * @default false
     */
    RIGHT = false;

    /**
     * Indicates whether the left arrow key or mobile left button is pressed.
     * @type {boolean}
     * @default false
     */
    LEFT = false;

    /**
     * Indicates whether the up arrow key is pressed.
     * @type {boolean}
     * @default false
     */
    UP = false;

    /**
     * Indicates whether the down arrow key is pressed.
     * @type {boolean}
     * @default false
     */
    DOWN = false;

    /**
     * Indicates whether the spacebar key or mobile space button is pressed.
     * @type {boolean}
     * @default false
     */
    SPACE = false;

    /**
     * Indicates whether the 'D' key or mobile throw button is pressed.
     * @type {boolean}
     * @default false
     */
    D = false;

    /**
     * Indicates whether the 'F' key is pressed.
     * @type {boolean}
     * @default false
     */
    F = false;

    /**
     * Indicates whether the 'M' key is pressed.
     * @type {boolean}
     * @default false
     */
    M = false;

    /**
     * Adds event listeners for the mobile left button.
     */
    mobileLeftKey() {
        document.getElementById("btn-left").addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.LEFT = true;
        });
        document.getElementById("btn-left").addEventListener("touchend", (e) => {
            e.preventDefault();
            this.LEFT = false;
        });
    }

    /**
     * Adds event listeners for the mobile right button.
     */
    mobileRightKey() {
        document.getElementById("btn-right").addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });
        document.getElementById("btn-right").addEventListener("touchend", (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });
    }

    /**
     * Adds event listeners for the mobile space button.
     */
    mobileSpaceKey() {
        document.getElementById("btn-space").addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.SPACE = true;
        });
        document.getElementById("btn-space").addEventListener("touchend", (e) => {
            e.preventDefault();
            this.SPACE = false;
        });
    }

    /**
     * Adds event listeners for the mobile throw button.
     */
    mobileThrowKey() {
        document.getElementById("btn-throw").addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.D = true;
        });
        document.getElementById("btn-throw").addEventListener("touchend", (e) => {
            e.preventDefault();
            this.D = false;
        });
    }

    /**
     * Initializes all mobile button event listeners.
     */
    mobileArrowKey() {
        this.mobileLeftKey();
        this.mobileRightKey();
        this.mobileSpaceKey();
        this.mobileThrowKey();
    }

    /**
     * Maps keyboard events to the corresponding class properties.
     * 
     * @param {KeyboardEvent} event - The keyboard event.
     * @param {boolean} state - The state of the key (true for pressed, false for released).
     */
    searchKeyEvent(event, state) {
        if (event.keyCode == 32) keyboard.SPACE = state;
        if (event.keyCode == 68) keyboard.D = state;
        if (event.keyCode == 70) keyboard.F = state;
        if (event.keyCode == 77) keyboard.M = state;
        this.arrowKeys(event, state);
    }

    /**
     * Handles arrow key inputs.
     * 
     * @param {KeyboardEvent} event - The keyboard event.
     * @param {boolean} state - The state of the key (true for pressed, false for released).
     */
    arrowKeys(event, state) {
        if (event.keyCode == 37) keyboard.LEFT = state;
        if (event.keyCode == 38) keyboard.UP = state;
        if (event.keyCode == 39) keyboard.RIGHT = state;
        if (event.keyCode == 40) keyboard.DOWN = state;
    }
}