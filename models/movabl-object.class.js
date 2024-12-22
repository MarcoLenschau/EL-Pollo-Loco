class MovableObject extends DrawablObject {
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGroud() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } 
        },1000 / 25);
    }

    isAboveGroud() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 220;            
        }   
    }

    playAnimation(images) {
        const i = this.currentImage % images.length;
        const path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    isColliding(object) {
        return this.x + this.width > object.x && 
            this.y + this.heigth > object.y &&
            this.x < object.x && 
            this.y < object.y + object.heigth; 
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let currentTime = new Date().getTime();
        currentTime -= this.lastHit;
        return currentTime < 5000;
    }

    hit() {
        if (this.energy > 0) {
            this.lastHit = new Date().getTime();
            this.energy -= 5;
        } 
    }
}