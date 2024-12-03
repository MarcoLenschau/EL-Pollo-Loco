class Character extends MovableObject{
    width = 150;
    heigth = 200;
    y = 235;
    world;
    speed = 5;

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
        if (this.world.keyboard.RIGHT) this.moveRight();
        if (this.world.keyboard.LEFT) this.moveLeft(); 
        if (this.world.keyboard.SPACE) this.jump();  
        this.reduceCameraX();
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
        // if (this.x >= 590) return false;
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft() {
        // if (this.x <= 10) return false;
        this.x -= this.speed;
        this.otherDirection = true;
    }

    reduceCameraX() {
        this.world.camera_x = -this.x;
    }

    jump() {
        if (this.y >= 230) {
            this.y = this.y - 100;
            setTimeout(() => {
                this.y = this.y + 100;
            },300);
        }
    }
}