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
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGroud() || this.speedY > 0) {
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
    
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y ,this.width, this.heigth);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y ,this.width, this.heigth)
            ctx.stroke();
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