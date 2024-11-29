class MovableObject {
    x = 30;
    y = 300;
    heigth;
    width;
    img;
    
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        if (this.x >= 590) return false;
        this.x += 20;
    }

    moveLeft() {
        if (this.x <= 10) return false;
        this.x -= 20;
    }

    moveInterval() {
        setInterval(() => {
            this.x -= 0.15;
        },1000 / 60);
    }
}