/**
 * Represents a game level containing enemies, clouds, and background objects.
 */
class Level {
    /**
     * An array of enemies present in the level.
     * @type {MovableObject[]}
     */
    enemies;

    /**
     * An array of cloud objects in the level.
     * @type {Cloud[]}
     */
    clouds;

    /**
     * An array of background objects in the level.
     * @type {DrawablObject[]}
     */
    backgroundObject;

    /**
     * The x-coordinate where the level ends.
     * @type {number}
     * @default 2250
     */
    level_end_x = 2250;

    /**
     * Creates a new level instance.
     * 
     * @param {MovableObject[]} enemies - The enemies in the level.
     * @param {Cloud[]} clouds - The clouds in the level.
     * @param {DrawablObject[]} backgroundObject - The background objects in the level.
     */
    
    constructor(enemies, clouds, backgroundObject) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObject = backgroundObject;
    }
}