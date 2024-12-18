class Character extends MovableObject{
    width = 150;
    heigth = 200;
    y = 230;
    speed = 5;
    walking_sound = new Audio("./audio/walk.mp3");
    jump_sound = new Audio("./audio/jump.mp3");


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
            this.moveCharacterLeft(false)
        } 
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveCharacterLeft(true)
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
        this.moveCloudsAndStatusbars(!direction);
    }

    isJumpKeyClicked() {
        return this.world.keyboard.SPACE || this.world.keyboard.UP;
    }

    isCharacterNotTheFarRight() {
        return this.x <= world.level.level_end_x;
    }

    moveAnimation() {
        if (this.isDead()) {
            this.otherDirection = false;
            this.playAnimation(characterDeadImages);
            return false;
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
 
    clickKeyLeftOrRight() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    moveCloudsAndStatusbars(state) {
        this.moveElementsRight(this.world.statusbars, state);
        this.moveElementsRight(this.world.level.clouds, state);
    }
    

    moveElementsRight(element, state) {
        element.forEach(statusbar => {
            if (state) {
                statusbar.x += this.speed;
            } else {
                statusbar.x -= this.speed;
            }
        });
    } 

    reduceCameraX() {
        this.world.camera_x = -this.x + 100;
    }

    jump() {
        this.jump_sound.pause();
        this.jump_sound.play();
        this.speedY = 20;     
    }

    howMuchLive() {
        let imageNumber = 0;
        if(this.energy === 100) {
            imageNumber = 100;
        } else if(this.energy < 100 && this.energy >= 80) {
            imageNumber = 80;
        } else if(this.energy <= 80 && this.energy >= 60) {
            imageNumber = 60;
        } else if(this.energy <= 60 && this.energy >= 40) {
            imageNumber = 40;
        } else if(this.energy <= 40 && this.energy > 0) {
            imageNumber = 20;
        } else if(this.energy === 0) {
            imageNumber = 0;
        }
        this.showLiveInStatusbar(imageNumber);
    }

    showLiveInStatusbar(imageNumber) {
        const imagePath = `./assetes/img/7_statusbars/1_statusbar/2_statusbar_health/green/${imageNumber}.png`;
        this.world.statusbars[1].loadImage(imagePath);
    }
    
}