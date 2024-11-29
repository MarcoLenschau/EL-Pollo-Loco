class Background extends MovableObject {
    width = 720;
    heigth = 480;
    constructor(imgPath, x) {
        super().loadImage(imgPath);
        this.y = 480 - this.heigth;
        this.x = x;
    }
}