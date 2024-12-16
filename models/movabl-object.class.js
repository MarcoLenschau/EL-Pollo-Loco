class MovableObject {
    x = 30;
    y = 300;
    heigth;
    width;
    img;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGroud()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } 
        },1000 / 25)
    }

    isAboveGroud() {
        return this.y < 220;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(images) {
        images.forEach(path => {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
    
    moveInterval(minX) {
        setInterval(() => {
            if (this.x <= minX) {
                this.x = 300 + Math.random() * 500;    
            } else {
                this.x -= this.speed;
            }
        },1000 / 60);
    }

    playAnimation(images) {
        const i = this.currentImage % images.length;
        const path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}