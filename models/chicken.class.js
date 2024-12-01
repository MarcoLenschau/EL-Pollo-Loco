class Chicken extends MovableObject{
    width = 100;
    heigth = 60;
    y = 380;

    constructor() {
        super().loadImage("./assetes/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.moveInterval(200);
        this.loadImages(chickenImages);     
        this.moveAnimation();
    }

    moveAnimation() {
        setInterval(() => {
            const i = this.currentImage % chickenImages.length;
            const path = chickenImages[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        },200);   
    }
}