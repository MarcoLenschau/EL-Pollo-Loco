class Character extends MovableObject{
    width = 150;
    heigth = 200;
    y = 235;
    world;
    speed = 5;
    walking_sound = new Audio("./audio/walk.mp3");
    jump_sound = new Audio("./audio/jump.mp3");

    constructor() {
        super().loadImage(characterImages[0]);
        this.loadImages(characterImages);
        this.showMoveAnimation();
    }

    showMoveAnimation() {
        setInterval(() => this.moveCharacter(), 1000 / 60);
        setInterval(() => this.moveAnimation(), 50);
    }

    moveCharacter() {
        this.walking_sound.pause();
        if (this.world.keyboard.RIGHT && this.isCharacterNotTheFarRight()) this.moveRight();
        if (this.world.keyboard.LEFT && this.x > 0) this.moveLeft(); 
        if (this.world.keyboard.SPACE) this.jump();  
        this.reduceCameraX();
    }

    isCharacterNotTheFarRight() {
        return this.x <= world.level.level_end_x;
    }

    moveAnimation() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            const i = this.currentImage % characterImages.length;
            const path = characterImages[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }

    moveRight() {
        this.x += this.speed;
        this.moveElementsRight(this.world.statusbars, true);
        this.moveElementsRight(this.world.level.clouds, true);
        this.walking_sound.play();
        this.otherDirection = false;
    }

    moveLeft() {
        this.x -= this.speed;
        this.moveElementsRight(this.world.statusbars, false);
        this.moveElementsRight(this.world.level.clouds, false);
        this.walking_sound.play();
        this.otherDirection = true;
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
        if (this.y >= 230) {
            this.jump_sound.play();
            this.y = this.y - 100;
            setTimeout(() => {
                this.y = this.y + 100;
            },300);
        }
    }
}