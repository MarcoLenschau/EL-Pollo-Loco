class Character extends MovableObject{
    width = 150;
    heigth = 200;
    y = 235;
    world;
    speed = 5;

    constructor() {
        super().loadImage(characterImages[0]);
        this.loadImages(characterImages);
        this.moveAnimation();
    }

    moveAnimation() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT) this.moveRight();
            if (this.world.keyboard.LEFT) this.moveLeft(); 
            if (this.world.keyboard.SPACE) this.jump(); 
        }, 1000 / 60);
        this.walkAnimation();
    }

    walkAnimation() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                const i = this.currentImage % characterImages.length;
                const path = characterImages[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            };
        },50); 
    }

    moveRight() {
        if (this.x >= 590) return false;
        this.x += this.speed;
    }

    moveLeft() {
        if (this.x <= 10) return false;
        this.x -= this.speed;
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