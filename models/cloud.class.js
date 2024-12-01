class Cloud extends MovableObject{
    width = 500;
    heigth = 150;
    y = 0;

    constructor() {
        super().loadImage("./assetes/img/5_background/layers/4_clouds/1.png");
        this.x = 480;
        this.moveInterval(0);
    }
}