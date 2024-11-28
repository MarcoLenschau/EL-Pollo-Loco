class Background extends MovableObject {
    width = 750;
    heigth = 400;
    y = 80;
    x = 0;
    constructor(imgPath) {
        super().loadImage(imgPath);
    }
}