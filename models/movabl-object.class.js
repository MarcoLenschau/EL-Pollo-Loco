class MovableObject extends DrawablObject {
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;

    offset = {
        top: 0,
        bottom: 30,
        left: 40,
        right: 30
    }
    hurt_sound = new Audio("./audio/hurt.mp3");

    applyGravity() {
        setStoppableInterval(() => {
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
        return this.x + this.width - this.offset.right > object.x + object.offset.left && 
            this.y + this.heigth - this.offset.bottom > object.y + object.offset.top &&
            this.x + this.offset.left < object.x + object.width - object.offset.right && 
            this.y + this.offset.top < object.y + object.heigth - object.offset.bottom; 
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let currentTime = new Date().getTime();
        currentTime -= this.lastHit;
        return currentTime < 100;
    }

    hit() {
        if (this.energy > 0) {
            this.lastHit = new Date().getTime();
            this.energy -= 2;
            if (!mute) {
                this.hurt_sound.play();
            }
        } 
    }
    
    hidden() {
        this.x = null;
        this.y = null;
        this.width = null;
        this.heigth = null;
    }
}