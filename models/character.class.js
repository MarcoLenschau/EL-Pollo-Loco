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
        setInterval(() => this.moveCharacter(), 1000 / 60);
        setInterval(() => this.moveAnimation(), 50);
    }

    moveCharacter() {
        this.walking_sound.pause();
        if (this.isDead()) { 
            return true;
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
        this.walking_sound.play();
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
            this.characterIsDead();
        } 
        if (this.isHurt()) {
            this.playAnimation(characterHurtImages);
        }
        if (this.isAboveGroud()) {
            this.playAnimation(characterJumpImages);
        } 
        if (this.clickKeyLeftOrRight()) {
            this.playAnimation(characterImages);
        }   
    }
    
    characterIsDead() {
        this.otherDirection = false;
        this.playAnimation(characterDeadImages);
        setTimeout(() => {
            document.getElementsByClassName("overlay-start-screen")[0].classList.remove("hidden");
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
        this.jump_sound.play();
        this.speedY = 20;     
    }
}