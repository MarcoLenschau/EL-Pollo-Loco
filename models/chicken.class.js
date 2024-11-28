class Chicken extends MovableObject{
    width = 155;
    heigth = 100;
    y = 350;

    constructor() {
        super().loadImage("./assetes/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.x = 200 + Math.random() * 500;
    }
    
    eat() {
        
    }
}