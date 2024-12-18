class Cloud extends MovableObject{
    width = 500;
    heigth = 150;
    y = 0;

    constructor() {
        super().loadImage(cloudImage);
        this.x = 480;
    }
}