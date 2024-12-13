class Coin extends MovableObject{
    heigth = 200;
    width = 200;

    constructor(imgPath) {
        super().loadImage(imgPath);
        this.x = 100 + Math.random() * 500;
        this.y = Math.random() * 150; 
    }
}