class Chicken extends MovableObject{
    width = 100;
    heigth = 60;
    y = 380;

    constructor() {
        super().loadImage(chickenImages[0]);
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.loadImages(chickenImages);     
        this.moveAnimation();
    }

    moveAnimation() {
        setInterval(() => {
            this.moveLeft();
        },1000 / 60);
        setInterval(() => {

            this.playAnimation(chickenImages);
        },200);   
    }
}