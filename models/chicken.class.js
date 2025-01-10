class Chicken extends MovableObject{
    width = 100;
    heigth = 60;
    y = 380;

    constructor() {
        super().loadImage(chickenImages[0]);
        this.x = 200 + Math.random() * 2400;
        this.speed = 0.15 + Math.random() * 0.25;
        this.loadImages(chickenImages);     
        this.moveAnimation();
    }

    moveAnimation() {
        setStoppableInterval(() => {
            this.moveLeft();
        },1000 / 60);
        setStoppableInterval(() => {
            this.playAnimation(chickenImages);
        },200);   
    }
}