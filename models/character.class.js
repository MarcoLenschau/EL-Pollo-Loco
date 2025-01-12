class Character extends MovableObject{
    width = 150;
    heigth = 200;
    y = 230;
    speed = 5;
    walking_sound = new Audio("./audio/walk.mp3");
    jump_sound = new Audio("./audio/jump.mp3");
    coins = 0;
    bootles = 0;

    constructor() {
        super().loadImage(characterImages[0]);
        this.loadImages(characterImages);
        this.loadImages(characterJumpImages);
        this.loadImages(characterDeadImages);
        this.loadImages(characterHurtImages);
        this.applyGravity();
        this.showMoveAnimation();
    }

    showMoveAnimation() {
        setStoppableInterval(() => this.moveCharacter(), 1000 / 60);
        setStoppableInterval(() => this.moveAnimation(), 50);
    }

    moveCharacter() {
        this.walking_sound.pause();
        if (this.isDead()) { 
            this.characterIsDead();
        }
        if (this.world.keyboard.RIGHT && this.isCharacterNotTheFarRight()) {
            this.moveCharacterLeft(false);
        } 
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveCharacterLeft(true);
        } 
        if (this.isJumpKeyClicked() && !this.isAboveGroud()) {
            this.jump();
        }
        this.reduceCameraX();
    }

    moveCharacterLeft(direction) {
        if (direction) {
            this.moveLeft();     
        } else {
            this.moveRight(); 
        }
        if (!mute) {
            this.walking_sound.play();
        }
        this.otherDirection = direction;
    }

    isJumpKeyClicked() {
        return this.world.keyboard.SPACE || this.world.keyboard.UP;
    }

    isCharacterNotTheFarRight() {
        return this.x <= world.level.level_end_x;
    }

    moveAnimation() {
        if (this.isDead()) {
            this.playAnimation(characterDeadImages);
        } else if (this.isHurt()) {
            this.playAnimation(characterHurtImages);          
        } else if (this.isAboveGroud()) {
            this.playAnimation(characterJumpImages);
            this.showDefaultPicture(100);
        } else if (this.clickKeyLeftOrRight()) {
            this.playAnimation(characterImages);
        }   
    }
    
    showDefaultPicture(ms) {
        setTimeout(() => this.loadImage(characterImages[0]),ms);
    }

    characterIsDead() {
        this.otherDirection = false;
        world.level.enemies.forEach((enemie) => {
            enemie.hidden();
        });
        this.hidden();
        setTimeout(() => {
            document.getElementsByClassName("end-overlay")[0].classList.remove("hidden");
        },1000);
        return false;
    }

    clickKeyLeftOrRight() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    reduceCameraX() {
        this.world.camera_x = -this.x + 100;
    }

    jump() {
        this.jump_sound.pause();
        if (!mute) {
            this.jump_sound.play();
        }
        this.speedY = 20;
    }

    jumpOfEnemies() {
        let enemies = world.level.enemies;
        enemies.forEach((enemie, index) => {
            if (enemie.width === 100) {
                if (this.isColliding(enemie) && this.isAboveGroud()) {
                    enemies.splice(index, 1);
                };   
            }
        });
    }
}