class Character extends MovableObject{
    width = 150;
    heigth = 200;
    y = 235;
    currentImage = 0;

    constructor() {
        super().loadImage(characterImages[0]);
        this.loadImages(characterImages); 
        this.moveAnimation();
    }

    moveAnimation() {
        setInterval(() => {
            const i = this.currentImage % characterImages.length;
            const path = characterImages[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        },100);
    }

    moveRight() {
        if (this.x >= 590) return false;
        this.x += 20;
    }

    moveLeft() {
        if (this.x <= 10) return false;
        this.x -= 20;
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